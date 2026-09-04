document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Active link highlight berdasarkan halaman saat ini */
  const navAnchors = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navAnchors.forEach(a => {
    const linkPage = a.getAttribute('href');
    a.classList.toggle('active', linkPage === currentPage);
  });

  /* Animated stat counters */
  const stats = document.querySelectorAll('.stat-num');
  const COUNT_DURATION = 500; // durasi animasi hitung, dalam milidetik (500 = 0.5 detik)

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    let startTime = null;

    const tick = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / COUNT_DURATION, 1);
      el.textContent = Math.round(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const statObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => statObserver.observe(s));

  /* Reveal on scroll */
  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(item => revealObserver.observe(item));

  /* Contact form (front-end only) */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    if (!form.checkValidity()) {
      note.textContent = 'Mohon lengkapi semua kolom dengan benar.';
      note.style.color = '#E2734F';
      return;
    }
    note.textContent = `Terima kasih, ${name}! Pesanmu sudah kami terima.`;
    note.style.color = '#2F6F5E';
    form.reset();
  });

});