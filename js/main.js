/* ===== MARK PORTFOLIO V3 — Main JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Custom Cursor --- */
  const cursor = document.getElementById('cursor');
  if (cursor && window.innerWidth > 768) {
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });
    // Hover on cards → VIEW mode
    document.querySelectorAll('.work-card, .video-card, .photo-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover-view'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover-view'));
    });
  }

  /* --- Nav scroll state --- */
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* --- Mobile nav toggle --- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  /* --- Back to top --- */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- GSAP Animations --- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    const heroEls = ['.hero-avatar', '.hero-name', '.hero-title', '.hero-quote', '.hero-scroll'];
    heroEls.forEach((sel, i) => {
      const el = document.querySelector(sel);
      if (el) {
        gsap.to(el, {
          opacity: 1, y: 0,
          duration: 0.9,
          delay: 0.3 + i * 0.15,
          ease: 'power3.out',
          from: { y: 30 }
        });
        gsap.set(el, { y: 30 });
      }
    });

    // Section labels & titles
    gsap.utils.toArray('.section-label, .cat-num').forEach(el => {
      gsap.from(el, {
        x: -30, opacity: 0, duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    gsap.utils.toArray('.section-title, .cat-title').forEach(el => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    gsap.utils.toArray('.section-desc, .cat-desc').forEach(el => {
      gsap.from(el, {
        y: 30, opacity: 0, duration: 0.7, delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    // Work cards
    gsap.utils.toArray('.work-card').forEach((card, i) => {
      gsap.from(card, {
        y: 60, opacity: 0, duration: 0.8, delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true }
      });
    });

    // Video cards
    gsap.utils.toArray('.video-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50, opacity: 0, scale: 0.96, duration: 0.7, delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true }
      });
    });

    // Timeline items
    gsap.utils.toArray('.tl-item').forEach((item, i) => {
      gsap.from(item, {
        x: -40, opacity: 0, duration: 0.7, delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%', once: true }
      });
    });

    // Skill tags
    gsap.utils.toArray('.skill-tag').forEach((tag, i) => {
      gsap.from(tag, {
        y: 20, opacity: 0, scale: 0.9, duration: 0.4, delay: i * 0.03,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: tag, start: 'top 92%', once: true }
      });
    });

    // Contact rows
    gsap.utils.toArray('.contact-row').forEach((row, i) => {
      gsap.from(row, {
        y: 30, opacity: 0, duration: 0.6, delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 88%', once: true }
      });
    });

    // Photos
    gsap.utils.toArray('.photo-item').forEach((item, i) => {
      gsap.from(item, {
        y: 40, opacity: 0, scale: 0.95, duration: 0.6, delay: i * 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 90%', once: true }
      });
    });
  }

  /* --- Video Click-to-Play --- */
  document.querySelectorAll('.video-card[data-src]').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.dataset.src;
      if (!src) return;
      const isPortrait = document.body.classList.contains('portrait-page');
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.className = 'thumb';
      video.style.cssText = 'width:100%;aspect-ratio:' + (isPortrait ? '9/16' : '16/9') + ';object-fit:cover;background:#000';
      video.innerHTML = '<source src="' + src + '" type="video/mp4">';
      const img = card.querySelector('img.thumb');
      const playBtn = card.querySelector('.play-btn');
      if (img) img.replaceWith(video);
      if (playBtn) playBtn.remove();
      card.style.cursor = 'default';
      card.removeAttribute('data-src');
    }, { once: true });
  });
});
