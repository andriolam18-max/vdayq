(function () {
  'use strict';

  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const canvas = document.getElementById('confetti-canvas');

  if (!btnYes || !btnNo) return;

  let pointerX = -9999;
  let pointerY = -9999;
  let noCenterX = window.innerWidth / 2;
  let noCenterY = window.innerHeight / 2;
  const runAwayRadius = 140;
  const runAwaySpeed = 8;
  let rafId = null;
  let initialized = false;

  function getPointerPosition(e) {
    if (e.touches && e.touches.length) {
      pointerX = e.touches[0].clientX;
      pointerY = e.touches[0].clientY;
    } else {
      pointerX = e.clientX;
      pointerY = e.clientY;
    }
  }

  function clearPointer() {
    pointerX = -9999;
    pointerY = -9999;
  }

  document.addEventListener('mousemove', getPointerPosition, { passive: true });
  document.addEventListener('touchmove', getPointerPosition, { passive: true });
  document.addEventListener('mouseleave', clearPointer);
  document.addEventListener('touchend', clearPointer);

  function updateNoButton() {
    const btnRect = btnNo.getBoundingClientRect();
    const halfW = btnRect.width / 2;
    const halfH = btnRect.height / 2;
    const minX = halfW;
    const maxX = window.innerWidth - halfW;
    const minY = halfH;
    const maxY = window.innerHeight - halfH;

    if (!initialized) {
      noCenterX = Math.min(maxX, Math.max(minX, noCenterX));
      noCenterY = Math.min(maxY, Math.max(minY, noCenterY));
      initialized = true;
    }

    const dx = pointerX - noCenterX;
    const dy = pointerY - noCenterY;
    const dist = Math.hypot(dx, dy);

    if (dist < runAwayRadius && pointerX > -1000) {
      const angle = Math.atan2(dy, dx);
      const moveX = Math.cos(angle) * runAwaySpeed;
      const moveY = Math.sin(angle) * runAwaySpeed;
      noCenterX -= moveX;
      noCenterY -= moveY;
    }

    noCenterX = Math.max(minX, Math.min(maxX, noCenterX));
    noCenterY = Math.max(minY, Math.min(maxY, noCenterY));

    btnNo.style.left = noCenterX + 'px';
    btnNo.style.top = noCenterY + 'px';
    btnNo.style.transform = 'translate(-50%, -50%)';
    rafId = requestAnimationFrame(updateNoButton);
  }
  rafId = requestAnimationFrame(updateNoButton);

  const VALENTINE_COLORS = ['#c41e3a', '#ff69b4', '#e8a0a0', '#fff5f7', '#d4a574', '#ffb6c1', '#8b1538'];

  function runConfetti() {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const count = 120;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 3 + 4,
        size: Math.random() * 8 + 4,
        color: VALENTINE_COLORS[Math.floor(Math.random() * VALENTINE_COLORS.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let anyVisible = false;
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        if (p.y < canvas.height + 20) anyVisible = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });
      if (anyVisible) requestAnimationFrame(draw);
    }
    draw();
  }

  const yesOverlay = document.getElementById('yes-overlay');

  function onYes() {
    btnYes.disabled = true;
    if (yesOverlay) {
      yesOverlay.classList.add('is-visible');
      yesOverlay.setAttribute('aria-hidden', 'false');
    }
    runConfetti();
    setTimeout(function () {
      window.location.reload();
    }, 4000);
  }

  btnYes.addEventListener('click', onYes);
  btnYes.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onYes();
    }
  });
})();
