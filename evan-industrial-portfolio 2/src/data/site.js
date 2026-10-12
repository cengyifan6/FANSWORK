export const site = {
  brand: 'EVAN / DESIGN',
  name: 'Evan Z.', // Replace with your preferred display name.
  role: {
    zh: '工业设计师 · 交通工具与产品体验',
    en: 'Industrial Designer · Mobility & Product Experience',
  },
  intro: {
    zh: '在工程逻辑与感性体验之间寻找平衡。关注交通工具、工业装备与产品系统，用清晰的形式回应真实的使用场景。',
    en: 'Working between engineering logic and human experience. Exploring mobility, industrial equipment, and product systems through clear form and real-world use cases.',
  },
  location: { zh: '请填写所在地', en: 'Add your location' },
  email: 'hello@example.com', // Replace before publishing.
  social: [
    // Add only real profile URLs, e.g. { label: 'LinkedIn', url: 'https://...' }
  ],
  resumePath: '', // Optional. Example: '/files/resume.pdf' after adding your real file.
  siteUrl: '', // Optional: set PUBLIC_SITE_URL in Netlify for canonical / Open Graph URLs.
};

export const copy = {
  zh: {
    nav: { about: '关于', work: '作品', digital: '数字项目', philosophy: '设计理念', contact: '联系' },
    heroKicker: '工业设计 · 作品档案',
    heroTitle: '让复杂的功能，\n拥有清晰的形式。',
    selected: '精选项目', selectedNote: '从问题定义到设计表达',
    viewProject: '查看项目', viewAll: '探索全部项目',
    aboutKicker: '关于我', aboutTitle: '从系统出发，\n回到人的体验。',
    aboutText: '我关注产品如何在复杂的工程约束中变得易懂、易用且具有辨识度。设计过程覆盖用户与场景研究、概念推演、形态语言、CMF 以及设计验证。以下经历与数据为模板字段，请按真实情况替换。',
    profile: '个人简介', education: '教育经历', experience: '经历', capabilities: '能力范围',
    educationValue: '请填写院校 / 专业', educationNote: '学历 · 起止年份',
    experienceValue: '请填写公司 / 工作室', experienceNote: '岗位 · 起止年份',
    skills: ['产品策略与研究', '概念设计与形态推演', '交通工具造型', 'CMF 与材质表达', '3D 建模与可视化', '原型与设计验证'],
    industrialTitle: '工业设计', industrialNote: '研究、推演与最终设计表达',
    digitalTitle: '数字项目', digitalNote: '将体验与逻辑转化为可使用的工具',
    philosophyKicker: '设计理念', philosophyTitle: '形式不是装饰，\n而是功能被理解的方式。',
    principles: [
      { n: '01', title: '先理解问题', text: '在画草图之前，先明确用户、场景、系统约束与成功标准。' },
      { n: '02', title: '让逻辑可见', text: '以比例、分区、交互和细节，把复杂功能组织成直观的体验。' },
      { n: '03', title: '为真实使用负责', text: '制造、维护、安全、成本与生命周期同样是设计的一部分。' },
    ],
    contactKicker: '建立联系', contactTitle: '有一个值得认真解决的问题？',
    contactText: '欢迎交流设计合作、概念研究或产品开发。请将邮箱替换为真实可用地址。',
    emailLabel: '发送邮件', resumeLabel: '简历 PDF', resumeMissing: '添加简历文件后显示下载入口',
    footerNote: '独立设计实践 / 作品集', backTop: '返回顶部',
    project: { overview: '项目概览', brief: '设计挑战', approach: '设计策略', process: '设计过程', outcome: '设计成果', gallery: '视觉探索', next: '下一个项目', back: '返回项目列表', disclaimer: '本页面为作品集模板中的概念案例。项目背景、过程与成果需由作者按真实项目资料核验并替换。' },
    metadata: { role: '项目角色', type: '项目类型', year: '年份', status: '项目状态' },
    statusConcept: '概念研究示例',
  },
  en: {
    nav: { about: 'About', work: 'Work', digital: 'Digital', philosophy: 'Approach', contact: 'Contact' },
    heroKicker: 'Industrial Design · Selected Work',
    heroTitle: 'Make complex function\nfeel clear and human.',
    selected: 'Selected Work', selectedNote: 'From problem framing to design expression',
    viewProject: 'Explore project', viewAll: 'Explore all work',
    aboutKicker: 'A little about me', aboutTitle: 'Start with the system.\nDesign for people.',
    aboutText: 'I explore how products can become legible, useful, and distinctive within complex engineering constraints. My process spans user and context research, concept development, form language, CMF, and design validation. Replace the sample profile fields below with verified personal information.',
    profile: 'Profile', education: 'Education', experience: 'Experience', capabilities: 'Capabilities',
    educationValue: 'Add school / discipline', educationNote: 'Degree · Years',
    experienceValue: 'Add company / studio', experienceNote: 'Role · Years',
    skills: ['Product strategy & research', 'Concept & form development', 'Mobility design', 'CMF & material expression', '3D modelling & visualization', 'Prototyping & validation'],
    industrialTitle: 'Industrial Design', industrialNote: 'Research, exploration, and design expression',
    digitalTitle: 'Digital Projects', digitalNote: 'Turning experience and logic into useful tools',
    philosophyKicker: 'Design approach', philosophyTitle: 'Form is not decoration.\nIt is how function becomes understood.',
    principles: [
      { n: '01', title: 'Understand first', text: 'Define the user, context, system constraints, and criteria for success before sketching.' },
      { n: '02', title: 'Make logic visible', text: 'Use proportion, zoning, interaction, and detail to organize complexity into a legible experience.' },
      { n: '03', title: 'Design for real use', text: 'Manufacturing, service, safety, cost, and lifecycle belong in the design process.' },
    ],
    contactKicker: 'Get in touch', contactTitle: 'Have a problem worth solving?',
    contactText: 'Open to conversations about design collaboration, concept research, and product development. Replace the sample email with a working address.',
    emailLabel: 'Send an email', resumeLabel: 'Resume PDF', resumeMissing: 'Add a real resume file to enable download',
    footerNote: 'Independent design practice / Portfolio', backTop: 'Back to top',
    project: { overview: 'Overview', brief: 'The challenge', approach: 'Design approach', process: 'Process', outcome: 'Outcome', gallery: 'Visual exploration', next: 'Next project', back: 'Back to projects', disclaimer: 'This is a conceptual sample case included in the portfolio template. Verify and replace the brief, process, and outcomes with material from your actual project.' },
    metadata: { role: 'Role', type: 'Type', year: 'Year', status: 'Status' },
    statusConcept: 'Concept study sample',
  },
};
