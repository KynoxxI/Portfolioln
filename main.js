/* ── Inject modal.css dynamically on pages that need it ──────── */
if (document.getElementById('modal-overlay')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'modal.css';
  document.head.appendChild(link);
}

/* ── Navbar scroll effect ────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Hamburger / Mobile nav ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    // animate bars
    const bars = hamburger.querySelectorAll('span');
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    }
  });
  // Close when link clicked
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '';
      });
    });
  });
}

/* ── Scroll animations (IntersectionObserver) ───────────────── */
const animEls = document.querySelectorAll('.animate-in');
if (animEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  animEls.forEach(el => io.observe(el));
}

/* ── Modals ──────────────────────────────────────────────────── */
function openModal(id) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // hide all, show target
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('open'));
  const target = document.getElementById(id);
  if (target) target.classList.add('open');
}
function closeAllModals() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('open'));
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
});

/* ── Contact form (demo) ─────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;
  // Simulate sending
  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;
  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('show');
  }, 1200);
}

/* ── Smooth page-load fade ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .3s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
