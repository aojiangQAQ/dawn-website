// Stars
(function() {
  const c = document.getElementById('stars');
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*100+'%';
    s.style.animationDelay = (Math.random()*3)+'s';
    s.style.animationDuration = (2+Math.random()*3)+'s';
    s.style.width = s.style.height = (1+Math.random()*1.5)+'px';
    c.appendChild(s);
  }
})();

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth scroll
document.querySelectorAll('.nav__link[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== SIDEBAR VIEW SWITCHING =====
(function() {
  const navItems = document.querySelectorAll('.hero__preview-nav-item[data-view]');
  const views = document.querySelectorAll('.preview-view[data-view]');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-view');

      // Update nav active state
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Switch view with animation
      views.forEach(v => {
        if (v.getAttribute('data-view') === target) {
          v.classList.add('active');
          // Re-trigger animation
          v.style.animation = 'none';
          v.offsetHeight; // force reflow
          v.style.animation = '';
        } else {
          v.classList.remove('active');
        }
      });
    });
  });
})();

// Console typing effect
(function() {
  const lines = [
    { text: '[14:32:01] [Server] Starting Minecraft server on *:25565', cls: '' },
    { text: '[14:32:02] [Server] Loading properties', cls: '' },
    { text: '[14:32:02] [Server] Default game type: SURVIVAL', cls: '' },
    { text: '[14:32:03] [Paper] Loading 24 plugins...', cls: 'yellow' },
    { text: '[14:32:04] [Server] Done (1.842s)! For help, type "help"', cls: 'green' },
    { text: '[14:32:05] [Server] Dawn Server Launcher connected', cls: 'green' },
    { text: '[14:32:10] [Player] Steve joined the game', cls: 'yellow' },
  ];
  const el = document.getElementById('console');
  if (!el) return;
  let idx = 0;
  function addLine() {
    if (idx >= lines.length) { idx = 0; el.innerHTML = ''; }
    const line = lines[idx];
    const span = document.createElement('span');
    const timeMatch = line.text.match(/^(\[.*?\])\s/);
    if (timeMatch) {
      const dim = document.createElement('span');
      dim.className = 'dim';
      dim.textContent = timeMatch[1] + ' ';
      span.appendChild(dim);
      const rest = line.text.substring(timeMatch[0].length);
      if (line.cls) {
        const tag = document.createElement('span');
        tag.className = line.cls;
        const bracketEnd = rest.indexOf(']');
        if (bracketEnd > 0) {
          tag.textContent = rest.substring(0, bracketEnd + 1) + ' ';
          span.appendChild(tag);
          span.appendChild(document.createTextNode(rest.substring(bracketEnd + 2)));
        } else {
          tag.textContent = rest;
          span.appendChild(tag);
        }
      } else {
        span.appendChild(document.createTextNode(rest));
      }
    } else {
      span.textContent = line.text;
    }
    span.appendChild(document.createElement('br'));
    span.style.opacity = '0';
    span.style.transition = 'opacity 0.3s';
    el.appendChild(span);
    requestAnimationFrame(() => { span.style.opacity = '1'; });
    idx++;
    setTimeout(addLine, 1500 + Math.random() * 1000);
  }
  setTimeout(addLine, 2000);
})();