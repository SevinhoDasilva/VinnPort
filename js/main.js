const loader = document.getElementById('loader');
const loaderPercent = document.getElementById('loaderPercent');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Loading screen: animated percentage + smooth exit.
if (loader) {
  let progress = 0;
  const progressTimer = window.setInterval(() => {
    progress = Math.min(progress + Math.floor(Math.random() * 13) + 5, 94);
    if (loaderPercent) loaderPercent.textContent = String(progress).padStart(2, '0') + '%';
  }, 90);
  window.addEventListener('load', () => {
    window.clearInterval(progressTimer);
    if (loaderPercent) loaderPercent.textContent = '100%';
    const finish = () => loader.classList.add('loaded');
    window.setTimeout(finish, reduceMotion ? 80 : 500);
  }, { once: true });
  // Avoid trapping the visitor behind the intro if a resource fails to load.
  window.setTimeout(() => {
    if (!loader.classList.contains('loaded')) loader.classList.add('loaded');
  }, 4500);
}

document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

const themeButton = document.getElementById('themeToggle');
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('vinnfolio-theme') || 'dark'; } catch (_) { }
if (savedTheme === 'light') document.body.classList.add('light-theme');

// A soft radial reveal makes theme changes feel intentional, without a loader.
function switchTheme() {
  if (!themeButton) return;
  const isLight = document.body.classList.contains('light-theme');
  const nextLight = !isLight;
  const rect = themeButton.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  themeButton.classList.add('is-switching');
  themeButton.setAttribute('aria-pressed', String(nextLight));
  themeButton.innerHTML = nextLight ? '<span class="theme-glyph">☾</span>' : '<span class="theme-glyph">☼</span>';

  const applyTheme = () => {
    document.body.classList.toggle('light-theme', nextLight);
    try { localStorage.setItem('vinnfolio-theme', nextLight ? 'light' : 'dark'); } catch (_) { }
  };

  if (reduceMotion) {
    applyTheme();
    themeButton.classList.remove('is-switching');
    return;
  }

  const wipe = document.createElement('div');
  wipe.className = 'theme-wipe';
  wipe.style.setProperty('--wipe-x', `${x}px`);
  wipe.style.setProperty('--wipe-y', `${y}px`);
  wipe.style.background = nextLight ? '#f3f1e9' : '#171813';
  document.body.appendChild(wipe);
  // Start small, expand over the page, then reveal the newly applied palette.
  requestAnimationFrame(() => {
    wipe.classList.add('theme-wipe-active');
    window.setTimeout(applyTheme, 260);
    window.setTimeout(() => {
      wipe.classList.add('theme-wipe-out');
      window.setTimeout(() => {
        wipe.remove();
        themeButton.classList.remove('is-switching');
      }, 420);
    }, 520);
  });
}
if (themeButton) {
  themeButton.innerHTML = document.body.classList.contains('light-theme') ? '<span class="theme-glyph">☾</span>' : '<span class="theme-glyph">☼</span>';
  themeButton.setAttribute('aria-label', 'Ganti tema terang atau gelap');
  themeButton.setAttribute('aria-pressed', String(document.body.classList.contains('light-theme')));
  themeButton.addEventListener('click', switchTheme);
}

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', String(opened));
    menuToggle.textContent = opened ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));
}

// Scroll reveals with a small stagger for cards, headings and sections.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  document.querySelectorAll('.reveal, .feature-card, .project-row, .gallery-card, .skill-grid article, .contact-link').forEach((el, index) => {
    if (!el.classList.contains('reveal')) el.classList.add('motion-item');
    el.style.setProperty('--motion-delay', `${Math.min(index % 6, 5) * 70}ms`);
    revealObserver.observe(el);
  });
} else {
  document.querySelectorAll('.reveal, .motion-item').forEach(el => el.classList.add('revealed'));
}

// Tiny cursor-follow glow on primary buttons, disabled for touch/reduced motion.
if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.btn-primary, .whatsapp-cta').forEach(button => {
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      button.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
    });
  });
}
