const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
let sectionObserver;
let ticking = false;

function setMenu(open) {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-primary-nav]');
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? (document.documentElement.lang.startsWith('zh') ? '关闭导航' : 'Close navigation') : (document.documentElement.lang.startsWith('zh') ? '打开导航' : 'Open navigation'));
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}

function updateScrollUI() {
  const y = window.scrollY || document.documentElement.scrollTop;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0;
  const progress = document.querySelector('#scroll-progress span');
  progress?.style.setProperty('transform', `scaleX(${ratio})`);
  document.querySelector('[data-site-header]')?.classList.toggle('is-scrolled', y > 18);
  document.querySelector('[data-back-top]')?.classList.toggle('is-visible', y > 600);
  document.documentElement.style.setProperty('--hero-shift', `${Math.min(y, 800) * 0.09}px`);
  ticking = false;
}

function initReveal() {
  revealObserver?.disconnect();
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal], [data-hero-reveal]').forEach((el) => el.classList.add('is-visible'));
    document.documentElement.classList.remove('js-ready');
    return;
  }
  document.documentElement.classList.add('js-ready');
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (entry.target).classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  const targets = document.querySelectorAll([
    '[data-hero-reveal]', '.section-heading', '.project-card', '.about-layout',
    '.digital-card', '.principle', '.contact-actions', '.case-hero-inner',
    '.case-cover', '.case-side', '.case-section', '.case-end'
  ].join(','));
  targets.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 75}ms`);
    revealObserver?.observe(el);
  });
}

function initSectionTracking() {
  sectionObserver?.disconnect();
  const sections = [...document.querySelectorAll('main section[id], .case-section[id]')];
  const navLinks = [...document.querySelectorAll('[data-nav-section]')];
  if (!sections.length || !('IntersectionObserver' in window)) return;
  sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const activeId = (visible.target).id;
    navLinks.forEach((link) => {
      const active = link.dataset.navSection === activeId;
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    document.querySelectorAll('.case-side a').forEach((link) => {
      const active = link.hash === `#${activeId}`;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { threshold: [0.08, 0.2, 0.35], rootMargin: '-20% 0px -58% 0px' });
  sections.forEach((section) => sectionObserver?.observe(section));
}

function updateLightbox(dialog, triggers, index) {
  if (!triggers.length) return;
  const safeIndex = (index + triggers.length) % triggers.length;
  const trigger = triggers[safeIndex];
  const image = dialog.querySelector('[data-lightbox-image]');
  const caption = dialog.querySelector('[data-lightbox-caption]');
  const count = dialog.querySelector('[data-lightbox-count]');
  if (image) {
    image.src = trigger.dataset.src || '';
    image.alt = trigger.dataset.alt || '';
  }
  if (caption) caption.textContent = trigger.dataset.alt || '';
  if (count) count.textContent = `${String(safeIndex + 1).padStart(2, '0')} / ${String(triggers.length).padStart(2, '0')}`;
  dialog.dataset.activeIndex = String(safeIndex);
  dialog.dataset.galleryCount = String(triggers.length);
}

function initPage() {
  setMenu(false);
  initReveal();
  initSectionTracking();
  updateScrollUI();
}

// A single delegated event layer continues working across Astro view transitions.
document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const menuToggle = target.closest('[data-menu-toggle]');
  if (menuToggle) {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenu(!expanded);
    return;
  }

  if (target.closest('[data-primary-nav] a')) {
    setMenu(false);
  }

  if (target.closest('[data-back-top]')) {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    return;
  }

  const filterButton = target.closest('[data-filter]');
  if (filterButton) {
    const filter = filterButton.dataset.filter || 'all';
    const applyFilter = () => {
      const cards = [...document.querySelectorAll('[data-project-card]')];
      let visible = 0;
      cards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.hidden = !matches;
        card.classList.toggle('is-filter-hidden', !matches);
        if (matches) {
          visible += 1;
          card.classList.remove('is-visible');
          requestAnimationFrame(() => card.classList.add('is-visible'));
        }
      });
      document.querySelectorAll('[data-filter]').forEach((button) => {
        const active = button === filterButton;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      const status = document.querySelector('[data-filter-status]');
      if (status) status.textContent = document.documentElement.lang.startsWith('zh') ? `已展示 ${visible} 个项目` : `${visible} selected project${visible === 1 ? '' : 's'}`;
    };
    if (!reduceMotion.matches && 'startViewTransition' in document) {
      document.startViewTransition?.(applyFilter);
    } else applyFilter();
    return;
  }

  const trigger = target.closest('[data-lightbox-trigger]');
  if (trigger) {
    const gallery = trigger.closest('[data-gallery]');
    const dialog = document.querySelector('[data-lightbox]');
    const triggers = gallery ? [...gallery.querySelectorAll('[data-lightbox-trigger]')] : [];
    if (!dialog || !triggers.length) return;
    updateLightbox(dialog, triggers, triggers.indexOf(trigger));
    dialog.dataset.galleryKey = gallery?.id || 'active-gallery';
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('[data-lightbox-close]')?.focus();
    return;
  }

  const close = target.closest('[data-lightbox-close]');
  if (close) {
    document.querySelector('[data-lightbox]')?.close();
    return;
  }

  const navButton = target.closest('[data-lightbox-prev], [data-lightbox-next]');
  if (navButton) {
    const dialog = navButton.closest('[data-lightbox]');
    const gallery = document.querySelector('[data-gallery]');
    const triggers = gallery ? [...gallery.querySelectorAll('[data-lightbox-trigger]')] : [];
    if (!dialog || !triggers.length) return;
    const current = Number(dialog.dataset.activeIndex || 0);
    updateLightbox(dialog, triggers, current + (navButton.hasAttribute('data-lightbox-next') ? 1 : -1));
  }
});

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const dialog = target?.closest('[data-lightbox]');
  if (dialog && target === dialog) dialog.close();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menuWasOpen = toggle?.getAttribute('aria-expanded') === 'true';
    setMenu(false);
    if (menuWasOpen) toggle?.focus();
    return; // Native <dialog> handles its own Escape behavior.
  }
  const dialog = document.querySelector('[data-lightbox]');
  if (!dialog?.open) return;
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  const triggers = [...document.querySelectorAll('[data-gallery] [data-lightbox-trigger]')];
  const current = Number(dialog.dataset.activeIndex || 0);
  updateLightbox(dialog, triggers, current + (event.key === 'ArrowRight' ? 1 : -1));
});

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollUI);
    ticking = true;
  }
}, { passive: true });
window.addEventListener('resize', updateScrollUI, { passive: true });
reduceMotion.addEventListener?.('change', initPage);
document.addEventListener('astro:page-load', initPage);
initPage();
