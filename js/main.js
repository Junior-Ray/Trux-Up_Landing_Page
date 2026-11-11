(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };

  // ---- Menú móvil
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('open', open);
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); burger.focus(); }
  });

  // ---- Movimiento: botón de pausa de la intro (+ se detiene sola tras 3 ciclos)
  const pause = document.querySelector('.pause');
  const setCalm = (on, remember) => {
    root.classList.toggle('calm', on);
    pause.setAttribute('aria-pressed', String(on));
    pause.textContent = on ? 'Reanudar animación' : 'Pausar animación';
    if (remember) store.set('truxup-calm', on ? '1' : '0');
  };
  if (reduce || store.get('truxup-calm') === '1') setCalm(true, false);
  pause.addEventListener('click', () => setCalm(!root.classList.contains('calm'), true));
  const bus = document.querySelector('.bus');
  let cycles = 0;
  bus.addEventListener('animationiteration', () => { if (++cycles >= 3) setCalm(true, false); });

  // ---- Aparecer al hacer scroll
  const items = document.querySelectorAll('.reveal');
  const watch = (els, cb, threshold) => {
    if (!('IntersectionObserver' in window)) { els.forEach(cb); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { cb(en.target); io.unobserve(en.target); } });
    }, { threshold });
    els.forEach((el) => io.observe(el));
  };
  watch(items, (el) => el.classList.add('in'), 0.15);

  // ---- Cifras (count-up, una vez, solo con movimiento)
  const fmt = (n) => (n >= 1000 ? String(Math.round(n)).replace(/(\d)(?=(\d{3})+$)/g, '$1 ') : String(Math.round(n)));
  watch(document.querySelectorAll('[data-to]'), (el) => {
    if (root.classList.contains('calm')) return;
    const to = +el.dataset.to, t0 = performance.now(), dur = 1200;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(to);
    };
    requestAnimationFrame(tick);
  }, 0.5);

  // ---- Cabecera compacta y barra de progreso al hacer scroll
  const header = document.querySelector('.header');
  const bar = document.querySelector('.progress');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = window.scrollY, max = root.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', y > 24);
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // ---- Figuras que se animan una vez al entrar (cámara, viaje)
  watch(document.querySelectorAll('.cam, .trip'), (el) => el.classList.add('drawn'), 0.4);

  // ---- Dibujo de rutas (mapa y demo)
  const mapbox = document.querySelector('.mapbox');
  const lines = mapbox.querySelectorAll('.linea');
  lines.forEach((l, i) => l.style.setProperty('--i', i));
  watch([mapbox, document.querySelector('.demo__map')], (el) => el.classList.add('drawn'), 0.25);

  // ---- Mapa interactivo: lista de líneas <-> trazado
  const card = document.getElementById('linecard');
  const buttons = [...document.querySelectorAll('.linelist button')];
  let pinned = null;
  const show = (code) => {
    mapbox.classList.toggle('has-active', !!code);
    lines.forEach((l) => l.classList.toggle('on', l.dataset.line === code));
  };
  const select = (code) => {
    pinned = pinned === code ? null : code;
    show(pinned);
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.line === pinned)));
    const b = buttons.find((x) => x.dataset.line === pinned);
    card.innerHTML = b
      ? '<strong></strong><span></span>'
      : '<strong>Ninguna línea elegida</strong><span>Toca una línea de la lista para ver su empresa y su tarifa estimada.</span>';
    if (b) {
      card.firstChild.textContent = b.dataset.name;
      card.lastChild.textContent = b.dataset.op + ' · Tarifa estimada: S/ ' + b.dataset.fare;
    }
  };
  buttons.forEach((b) => {
    b.addEventListener('click', () => select(b.dataset.line));
    b.addEventListener('mouseenter', () => show(b.dataset.line));
    b.addEventListener('mouseleave', () => show(pinned));
  });
  lines.forEach((l) => {
    l.addEventListener('click', () => select(l.dataset.line));
    l.addEventListener('mouseenter', () => show(l.dataset.line));
    l.addEventListener('mouseleave', () => show(pinned));
  });

  // ---- Demo: escuchar la respuesta (nunca se reproduce sola)
  const play = document.getElementById('demo-play');
  if (play && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
    play.hidden = false;
    const synth = window.speechSynthesis;
    const lbl = play.querySelector('.lbl');
    const reset = () => { play.setAttribute('aria-pressed', 'false'); lbl.textContent = '▶ Escuchar respuesta'; };
    play.addEventListener('click', () => {
      if (synth.speaking) { synth.cancel(); reset(); return; }
      const clone = document.getElementById('demo-text').cloneNode(true);
      clone.querySelector('.who').remove();
      const u = new SpeechSynthesisUtterance(clone.textContent.trim());
      u.lang = 'es-PE';
      u.onend = u.onerror = reset;
      play.setAttribute('aria-pressed', 'true');
      lbl.textContent = '■ Detener';
      synth.speak(u);
    });
    window.addEventListener('pagehide', () => synth.cancel());
  }
})();
