const GH = 'https://github.com/Saadsiddiqui10'

export const profile = {
  name: 'Saad Siddiqui',
  role: 'Full-Stack & AI Automation Developer',
  location: 'Karachi, Pakistan',
  email: 'saadsiddiqui2002@outlook.com',
  github: GH,
  linkedin: 'https://www.linkedin.com/in/saad-siddiqui-97442a23a/',
}

// Two lenses on the same work. The hero switch changes the copy,
// the default project filter and the order of the skill groups.
export const modes = {
  fullstack: {
    label: 'Full-stack',
    lead: ['I', 'ship', 'production', 'web', 'apps,'],
    accent: ['end', 'to', 'end.'],
    intro:
      'a full-stack developer working in Laravel, React and Node.js. I build the store, the admin panel, the payments and the tests, and take it from an empty database to production.',
    filter: 'all',
    skillsFirst: ['Languages', 'Frontend', 'Backend'],
  },
  ai: {
    label: 'AI & automation',
    lead: ['I', 'build', 'AI', 'and', 'automation'],
    accent: ['into', 'real', 'products.'],
    intro:
      'a developer who builds AI-powered and automated web apps, from the LLM call to the deployed product: Claude API features, signature-verified webhooks, queued notifications and inventory workflows that run without a manual step.',
    filter: 'ai',
    skillsFirst: ['AI & LLMs', 'Automation & integrations', 'Backend'],
  },
}

export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export const now = [
  { k: 'Now', v: 'Full-Stack Engineer', sub: 'YM Tech Fusion LLC · remote, USA' },
  { k: 'Also', v: 'Internee Support Developer', sub: 'MD Nexus Solutions · .NET & Epicor ERP' },
  { k: 'Shipped', v: 'vanzapack.com', sub: 'Laravel 12 store · about 300 products', href: 'https://vanzapack.com' },
]

export const featured = {
  eyebrow: 'Client project · Dubai, UAE',
  title: 'VanzaPack',
  tagline:
    'A live e-commerce store for a packaging and food-service supplier, built and launched end to end, from database design to production deployment.',
  url: 'https://vanzapack.com',
  shot: '/shots/vanzapack.webp',
  stack: ['Laravel 12', 'PHP 8.2', 'MySQL', 'Blade', 'Tailwind', 'Vite', 'PHPUnit'],
  stats: [
    { n: '~300', l: 'products in 8 nested category trees' },
    { n: '6', l: 'admin roles with granular permissions' },
    { n: '7', l: 'sort modes, live filters, autocomplete search' },
  ],
  points: [
    {
      h: 'Storefront and checkout',
      p: 'Variant pricing and stock, multi-step checkout for guests and account holders, coupons, shipping and tax rules, wishlist, photo reviews, and order tracking with cancel and reorder.',
    },
    {
      h: 'Admin and operations',
      p: 'Role-based admin panel, an order status workflow that restocks automatically on cancellation, inventory history, sales reports and CSV exports.',
    },
    {
      h: 'Pluggable payments',
      p: 'A payment-gateway layer (interface and manager) running cash on delivery and bank transfer, so a card gateway can be added without touching checkout.',
    },
    {
      h: 'SEO, messaging and tests',
      p: 'JSON-LD products and breadcrumbs, generated sitemap, queued email notifications, pre-filled WhatsApp enquiry links, and PHPUnit feature and unit tests.',
    },
  ],
}

export const filters = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Full-stack' },
  { id: 'ai', label: 'AI & automation' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'other', label: 'Other' },
]

export const projects = [
  {
    id: 'kanbrain',
    shot: { src: '/shots/kanbrain.webp', label: 'kanbrain-ai.vercel.app' },
    name: 'Kanbrain AI',
    kind: 'AI Kanban board',
    tags: ['ai', 'fullstack'],
    desc: 'A drag-and-drop task board where one click sends a task to the Claude API and returns a checklist of AI-generated subtasks. The API key stays server-side behind an Express endpoint, and subtasks feed a live progress bar.',
    stack: ['React', 'Vite', 'dnd-kit', 'Express', 'Claude API'],
    links: [
      { label: 'Live', href: 'https://kanbrain-ai.vercel.app' },
      { label: 'Code', href: `${GH}/kanbrain-AI` },
    ],
  },
  {
    id: 'market',
    name: 'MARKET',
    kind: 'E-commerce app with payment automation',
    tags: ['fullstack', 'ai'],
    desc: 'A REST API with JWT auth, bcrypt hashing and admin-only routes, plus search, price filters and pagination. Signature-verified Stripe webhooks mark orders paid and decrement stock, and prices are re-checked on the server.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    links: [
      { label: 'Frontend code', href: `${GH}/shop-frontend` },
      { label: 'API code', href: `${GH}/shop-backend` },
    ],
  },
  {
    id: 'chattr',
    name: 'Chattr',
    kind: 'Real-time chat app',
    tags: ['fullstack'],
    desc: 'Multi-room live messaging over WebSockets with typing indicators, online presence, emoji reactions and drag-and-drop file sharing up to 5 MB. Deployed on Render.',
    stack: ['React', 'Socket.io', 'Express', 'Multer'],
    links: [{ label: 'Code', href: `${GH}/chattr` }],
  },
  {
    id: 'autovexa',
    name: 'AutoVexaAI',
    kind: 'Company website',
    tags: ['frontend'],
    desc: 'Designed and built the website for my own venture, AutoVexaAI.',
    stack: ['React.js'],
    links: [{ label: 'autovexaai.com', href: 'https://autovexaai.com' }],
  },
  {
    id: 'snh',
    name: 'SNH Packing Commerce',
    kind: 'Laravel storefront',
    tags: ['fullstack'],
    desc: 'A storefront with product variants, guest and account checkout, coupons with validity windows and usage tracking, stock reservation and restoration, and an admin dashboard for products, orders and inventory.',
    stack: ['Laravel', 'MySQL', 'Vite', 'Stripe', 'PayPal'],
    links: [{ label: 'Code', href: `${GH}/snh-app` }],
  },
  {
    id: 'atmos',
    name: 'Atmos',
    kind: 'Weather app',
    tags: ['frontend'],
    desc: 'A full-screen weather app with live conditions, a 7-day forecast, an hourly temperature chart, city search with autocomplete and air-quality monitoring.',
    stack: ['React', 'Vite', 'Recharts', 'OpenWeatherMap API'],
    links: [
      { label: 'Live', href: 'https://weather-app-dun-eta-37.vercel.app' },
      { label: 'Code', href: `${GH}/weather-app` },
    ],
  },
  {
    id: 'todo',
    shot: { src: '/shots/todo.webp', label: 'todo-mern-steel.vercel.app' },
    name: 'Todo MERN',
    kind: 'Task manager',
    tags: ['fullstack'],
    desc: 'A full CRUD REST API with filtering, search, priorities and overdue detection, with React Context for state.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    links: [
      { label: 'Live', href: 'https://todo-mern-steel.vercel.app' },
      { label: 'Code', href: `${GH}/todo-mern` },
    ],
  },
  {
    id: 'blood',
    name: 'Smart Blood Group Management System',
    kind: 'Desktop app',
    tags: ['other'],
    desc: 'A desktop app for managing blood group records, built on OOP principles: inheritance, encapsulation and polymorphism.',
    stack: ['Java', 'JavaFX'],
    links: [{ label: 'Code', href: `${GH}/-Smart-Blood-Group-Management-System` }],
  },
]

export const experience = [
  {
    role: 'Full-Stack Engineer',
    org: 'YM Tech Fusion LLC',
    orgUrl: 'https://ymtechfusion.com',
    where: 'USA · remote',
    when: '2026 – Present',
    about: 'U.S. IT consultancy for ERP (Epicor, Microsoft Dynamics 365), SQL Server and business applications.',
    points: [
      'Built and launched vanzapack.com, the live e-commerce store for a Dubai packaging supplier, from database design to production deployment.',
      'Automated order operations: a status workflow that restocks inventory on cancellation, logs every stock movement and fires queued email and in-app notifications.',
      'Delivered role-based access control with 6 roles, sales reports, CSV exports, an activity log and a PHPUnit test suite.',
    ],
  },
  {
    role: 'Internee Support Developer',
    org: 'MD Nexus Solutions',
    orgUrl: 'https://mdnexussolutions.com',
    where: 'Karachi',
    when: 'Oct 2026 – Present · 6-month internship',
    about: 'Epicor ERP consultancy and custom software development.',
    points: [
      'Develop and support .NET applications and Epicor ERP solutions for client businesses, under a dedicated mentor.',
    ],
  },
]

export const skills = [
  { group: 'Languages', items: ['PHP 8', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'Java', 'C/C++'] },
  {
    group: 'Frontend',
    items: ['React 18', 'Vite', 'Tailwind CSS', 'Laravel Blade', 'HTML5/CSS3', 'React Router', 'Context API', 'dnd-kit'],
  },
  {
    group: 'Backend',
    items: ['Laravel 12', 'Node.js', 'Express', '.NET', 'REST API design', 'Socket.io', 'JWT auth', 'Role-based access control'],
  },
  { group: 'AI & LLMs', items: ['Anthropic Claude API', 'Prompt design', 'AI features inside web apps'] },
  {
    group: 'Automation & integrations',
    items: ['Stripe payment intents', 'Signature-verified webhooks', 'Queues & background jobs', 'Transactional email', 'WhatsApp click-to-chat', 'CSV exports', 'Epicor ERP'],
  },
  { group: 'Databases', items: ['MySQL', 'MongoDB (Mongoose)'] },
  {
    group: 'Testing & tooling',
    items: ['PHPUnit', 'Vitest', 'Git/GitHub', 'npm workspaces', 'Vercel', 'Render', 'Linux basics', 'Technical SEO'],
  },
]
