/* =========================
   DATA (SKILLS + PROJECTS)
   ========================= */

const SKILLS = [
  { id: 'html', title: 'HTML & CSS', cat: 'frontend' },
  { id: 'js', title: 'JavaScript', cat: 'frontend' },
  { id: 'react', title: 'React', cat: 'frontend' },
  { id: 'node', title: 'Node.js', cat: 'backend' },
  { id: 'mongo', title: 'MongoDB', cat: 'backend' },
  { id: 'vscode', title: 'VS Code', cat: 'tools' },
  { id: 'git', title: 'GitHub', cat: 'tools' }
];

const PROJECTS = [
  {
    title: 'Taste Heaven',
    desc: 'Full-stack restaurant app',
    img: 'image/download.jpg',
    demo: 'https://guptadeepak155.github.io/taste-Heaven/',
    repo: 'https://github.com/guptadeepak155/taste-Heaven.git'
  },
  {
    title: 'Ramji Fruit & Veggie Shop',
    desc: 'E-Commerce app',
    img: 'image/ChatGPT Image Nov 17, 2025, 01_59_12 PM.png',
    demo: 'https://guptadeepak155.github.io/Ramji-Fruit-Veggie-Shop/',
    repo: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop.git'
  },
  {
    title: 'Society Management',
    desc: 'PHP & MySQL app',
    img: 'image/society.png',
    demo: 'https://guptadeepak155.github.io/Society-Management-System/',
    repo: 'https://github.com/guptadeepak155/Society-Management-System.git'
  }
];

/* =========================
   HELPERS
   ========================= */
function escapeHtml(str) {
  return String(str).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/* =========================
   TYPING EFFECT (custom)
   ========================= */
function typeLines(el, lines, speed = 40, pause = 1200) {
  let li = 0, pos = 0, forward = true;
  function step() {
    const current = lines[li];
    if (forward) {
      pos++;
      el.textContent = current.slice(0, pos);
      if (pos === current.length) {
        forward = false;
        setTimeout(step, pause);
        return;
      }
    } else {
      pos--;
      el.textContent = current.slice(0, pos);
      if (pos === 0) {
        forward = true;
        li = (li + 1) % lines.length;
      }
    }
    setTimeout(step, speed);
  }
  step();
}

/* =========================
   RENDER SKILLS
   ========================= */
function renderSkills(filter = 'all') {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  grid.innerHTML = SKILLS
    .filter(skill => filter === 'all' || skill.cat === filter)
    .map(s => `<div class="skill-card reveal">${escapeHtml(s.title)}</div>`)
    .join('');
}

/* =========================
   RENDER PROJECTS (with tilt attr)
   ========================= */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card reveal" data-tilt data-tilt-max="12" data-tilt-scale="1.02">
      <div class="project-thumb-wrapper">
        <img src="${p.img}" alt="${escapeHtml(p.title)}" class="project-thumb" />
      </div>
      <div class="project-title">${escapeHtml(p.title)}</div>
      <div class="project-desc">${escapeHtml(p.desc)}</div>
      <div class="project-links">
        <a class="tiny-link" href="${p.demo}" target="_blank" rel="noopener">Live</a>
        <a class="tiny-link" href="${p.repo}" target="_blank" rel="noopener">Repo</a>
      </div>
    </article>
  `).join('');
}

/* =========================
   CONTACT HANDLER
   ========================= */
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('cname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const message = document.getElementById('cmessage').value.trim();
  const msgEl = document.getElementById('formMsg');

  if (!name || !email || !message) {
    if (msgEl) { msgEl.textContent = 'Please complete all fields.'; }
    return false;
  }

  if (msgEl) {
    msgEl.textContent = 'Thanks — message captured locally (demo).';
    msgEl.style.color = '#1b75d0';
  }

  // Clear
  document.getElementById('cname').value = '';
  document.getElementById('cemail').value = '';
  document.getElementById('cmessage').value = '';
  return false;
}

/* =========================
   REVEAL ON SCROLL (IntersectionObserver)
   ========================= */
function initReveals() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // keep visible
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  // also observe dynamically added reveal children (skill/project cards)
  document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    obs.observe(el);
  });
}

/* =========================
   INIT TILT (VanillaTilt)
   ========================= */
function initTilt() {
  if (window.VanillaTilt) {
    const tiltEls = document.querySelectorAll('[data-tilt]');
    VanillaTilt.init(tiltEls, {
      max: 12,
      speed: 400,
      glare: false,
      scale: 1.02,
      easing: "cubic-bezier(.03,.98,.52,.99)"
    });
  }
}

/* =========================
   PAGE INIT
   ========================= */
document.addEventListener('DOMContentLoaded', () => {
  // loader: hide later on window.load
  const loader = document.getElementById('site-loader');

  // typed lines
  const typedEl = document.getElementById('typed-line');
  if (typedEl) {
    const lines = [
      'I build responsive web apps with MERN.',
      'Frontend UI, backend APIs, and full-stack projects.',
      'Learning Flutter • Passionate about clean code.'
    ];
    typeLines(typedEl, lines, 36, 1200);
  }

  // render content
  renderSkills();
  renderProjects();

  // set year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', e => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const filter = e.currentTarget.dataset.filter || 'all';
      renderSkills(filter);
      // re-init reveals for new elements
      setTimeout(initReveals, 100);
    });
  });

  // smooth nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (ev) => {
      // small delay to allow scroll behavior; mobile: collapse nav not implemented
      setTimeout(() => {
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
        ev.currentTarget.classList.add('active');
      }, 300);
    });
  });

  // initialize reveals and tilt (after a short delay so elements exist)
  setTimeout(() => {
    initReveals();
    initTilt();
  }, 120);

  // hide loader on full load
  window.addEventListener('load', () => {
    if (loader) loader.classList.add('hidden');
  });
});
