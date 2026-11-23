// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

navLinks.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  })
);

// Header shadow on scroll
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Fade-in on scroll
const revealTargets = document.querySelectorAll('.pillar, .service, .step, .audience, .value, .section-head, .two-col > *, .about-grid > *');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Contact form
// NOTE: There is no backend yet. Set FORM_ENDPOINT to a form service URL
// (e.g. Formspree, Netlify Forms, Basin) to start receiving submissions.
const FORM_ENDPOINT = '';

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.className = 'form-status';

  const required = [document.getElementById('name'), document.getElementById('email')];
  let valid = true;
  required.forEach((field) => {
    const ok = field.value.trim() !== '' && field.checkValidity();
    field.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    statusEl.textContent = 'Please enter your name and a valid email address.';
    statusEl.classList.add('error');
    return;
  }

  if (FORM_ENDPOINT) {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error('Request failed');
    } catch {
      statusEl.textContent = 'Something went wrong. Please try again shortly.';
      statusEl.classList.add('error');
      return;
    }
  }

  form.reset();
  statusEl.textContent = "Thanks! We'll be in touch soon to talk about growing your farm.";
  statusEl.classList.add('success');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Logo links scroll back to the top of the page
document.querySelectorAll('a[href="#top"]').forEach((link) =>
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', location.pathname + location.search);
  })
);
