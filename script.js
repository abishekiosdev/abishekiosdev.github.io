/* ══════════════════════════════════════════
   Abishek — iOS Portfolio
   script.js
══════════════════════════════════════════ */

// ── CLOCK ────────────────────────────────
function updateClocks() {
  const now  = new Date();
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let h = now.getHours(), m = now.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const mm = m < 10 ? '0' + m : m;

  const mc = document.getElementById('menu-clock');
  if (mc) mc.textContent = `${days[now.getDay()]} ${mons[now.getMonth()]} ${now.getDate()} ${h}:${mm} ${ampm}`;

  const ic = document.getElementById('iphone-clock');
  if (ic) ic.textContent = `${h}:${mm}`;
}
updateClocks();
setInterval(updateClocks, 1000);

// Terminal login time
const loginEl = document.getElementById('term-login');
if (loginEl) loginEl.textContent = new Date().toDateString() + ' ' + new Date().toLocaleTimeString();


// ── THEME ────────────────────────────────
let isDark = true;
function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle('light-mode', !isDark);
  document.body.classList.toggle('dark-mode',  isDark);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.style.transform = isDark ? 'rotate(0deg)' : 'rotate(180deg)';
}


// ══════════════════════════════════════════
// iOS SIMULATOR — App Navigation
// ══════════════════════════════════════════
let currentView = 'view-home';

function openApp(viewId) {
  if (!viewId || viewId === currentView) return;

  const current = document.getElementById(currentView);
  const next    = document.getElementById(viewId);
  if (!next) return;

  // Hide current with slide-out
  if (current) {
    current.classList.remove('active', 'slide-in');
    current.classList.add('slide-out');
    setTimeout(() => {
      current.classList.remove('slide-out', 'active');
      current.style.display = 'none';
    }, 220);
  }

  // Show next with slide-in
  currentView = viewId;
  next.style.display = 'flex';
  next.classList.remove('active', 'slide-out');
  void next.offsetWidth; // force reflow
  next.classList.add('slide-in');
  setTimeout(() => {
    next.classList.remove('slide-in');
    next.classList.add('active');
  }, 280);
}

function goHome() {
  if (currentView === 'view-home') return;

  const current = document.getElementById(currentView);
  const home    = document.getElementById('view-home');

  if (current) {
    current.classList.remove('active', 'slide-in');
    current.classList.add('slide-out');
    setTimeout(() => {
      current.classList.remove('slide-out', 'active');
      current.style.display = 'none';
    }, 220);
  }

  currentView = 'view-home';
  if (home) {
    home.style.display = 'flex';
    home.classList.remove('slide-out', 'slide-in');
    home.classList.add('active');
  }

  // Pulse home indicator
  const hi = document.querySelector('.home-indicator');
  if (hi) {
    hi.style.background = 'rgba(255,255,255,.7)';
    setTimeout(() => hi.style.background = '', 280);
  }
}


// ══════════════════════════════════════════
// macOS WINDOW MANAGEMENT
// ══════════════════════════════════════════
let zCounter = 300;

const WIN_ICONS = {
  'win-terminal':   '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zm-8.29-2.29L12.41 12 9.71 9.29l1.41-1.41L15.24 12l-4.12 4.12-1.41-1.42z"/></svg>',
  'win-contact':    '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  'simulator-wrap': '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.1.09 2.23-.58 2.95-1.39z"/></svg>',
};
const WIN_LABELS = {
  'win-terminal':   'Terminal',
  'win-contact':    'Contact',
  'simulator-wrap': 'iOS Simulator',
};

function bringToFront(id) {
  const el = document.getElementById(id);
  if (el) el.style.zIndex = ++zCounter;
}

function openWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.classList.remove('hidden');
  win.style.display = 'flex';
  bringToFront(id);
  removeDockItem(id);
  if (id === 'win-terminal') setTimeout(focusTerminal, 80);
}

function closeWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.style.transition = 'opacity .15s, transform .15s';
  win.style.opacity = '0';
  win.style.transform = 'scale(.94)';
  setTimeout(() => {
    win.classList.add('hidden');
    win.style.display = win.style.opacity = win.style.transform = win.style.transition = '';
  }, 150);
  removeDockItem(id);
}

function minimizeWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.classList.add('hidden');
  addDockItem(id);
}

function toggleMaximize(id) {
  const win = document.getElementById(id);
  if (!win) return;
  if (win.classList.contains('maximized')) {
    win.classList.remove('maximized');
    const s = win._savedPos;
    if (s) {
      win.style.top       = s.top;
      win.style.left      = s.left;
      win.style.width     = s.width;
      win.style.height    = s.height;
      win.style.transform = s.transform || '';
    }
  } else {
    win._savedPos = {
      top: win.style.top, left: win.style.left,
      width: win.style.width, height: win.style.height,
      transform: win.style.transform,
    };
    win.style.transform = 'none';
    win.classList.add('maximized');
  }
}

// Click to bring to front
document.querySelectorAll('.mac-window, .simulator-wrap').forEach(w => {
  w.addEventListener('mousedown', () => bringToFront(w.id));
});

// Double-click header to maximize
document.querySelectorAll('.win-header, .sim-toolbar').forEach(hdr => {
  hdr.addEventListener('dblclick', () => {
    const win = hdr.closest('.mac-window, .simulator-wrap');
    if (win) toggleMaximize(win.id);
  });
});

// DOCK
function addDockItem(id) {
  const tray = document.getElementById('dock-tray');
  if (!tray || document.getElementById('dock-' + id)) return;
  const item = document.createElement('div');
  item.className = 'dock-item';
  item.id = 'dock-' + id;
  item.innerHTML = `<div class="dock-item-icon">${WIN_ICONS[id] || ''}</div><span>${WIN_LABELS[id] || id}</span>`;
  item.addEventListener('click', () => openWindow(id));
  tray.appendChild(item);
}
function removeDockItem(id) {
  const e = document.getElementById('dock-' + id);
  if (e) e.remove();
}


// ── DRAG ─────────────────────────────────
let _drag = null;
function dragStart(e, id) {
  const win = document.getElementById(id);
  if (!win || win.classList.contains('maximized')) return;
  bringToFront(id);
  const rect = win.getBoundingClientRect();
  _drag = { el: win, ox: e.clientX - rect.left, oy: e.clientY - rect.top };
  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup',   dragEnd);
  e.preventDefault();
}
function dragMove(e) {
  if (!_drag) return;
  _drag.el.style.left      = (e.clientX - _drag.ox) + 'px';
  _drag.el.style.top       = Math.max(28, e.clientY - _drag.oy) + 'px';
  _drag.el.style.right     = 'auto';
  _drag.el.style.transform = 'none';
}
function dragEnd() {
  _drag = null;
  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('mouseup',   dragEnd);
}


// ══════════════════════════════════════════
// TERMINAL — Sequential line-by-line output
// ══════════════════════════════════════════
const termHistory = document.getElementById('term-history');
const termInput   = document.getElementById('term-input');
const cmdHistory  = [];
let histIdx   = -1;
let termBusy  = false;

function focusTerminal() {
  if (termInput) termInput.focus();
}

function scrollTerm() {
  const w = document.getElementById('terminal-wrap');
  if (w) w.scrollTop = w.scrollHeight;
}

function appendLine(html, cls = '', delay = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!termHistory) { resolve(); return; }
      const div = document.createElement('div');
      div.className = 't-line' + (cls ? ' ' + cls : '');
      div.innerHTML = html;
      termHistory.appendChild(div);
      scrollTerm();
      resolve();
    }, delay);
  });
}

async function printLines(lines, gap = 32) {
  termBusy = true;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    await appendLine(l.html ?? l, l.cls ?? '', i * gap);
  }
  await appendLine('', '', lines.length * gap); // trailing blank
  termBusy = false;
  scrollTerm();
}

// ── COMMAND DATA ─────────────────────────

const HELP_LINES = [
  { html: '<span class="t-green">Available commands:</span>' },
  { html: '  <span class="t-cyan">whoami</span>       — Show identity details' },
  { html: '  <span class="t-cyan">about</span>        — Open About app in simulator' },
  { html: '  <span class="t-cyan">skills</span>       — Open Skills app in simulator' },
  { html: '  <span class="t-cyan">experience</span>   — Open Experience app' },
  { html: '  <span class="t-cyan">apps</span>         — Open App Store screen' },
  { html: '  <span class="t-cyan">contact</span>      — Open Contact app' },
  { html: '  <span class="t-cyan">education</span>    — Open Education app' },
  { html: '  <span class="t-cyan">home</span>         — Go to iPhone home screen' },
  { html: '  <span class="t-cyan">ls</span>           — List portfolio sections' },
  { html: '  <span class="t-cyan">cat resume</span>   — Print resume summary' },
  { html: '  <span class="t-cyan">linkedin</span>     — Open LinkedIn profile' },
  { html: '  <span class="t-cyan">theme</span>        — Toggle light/dark mode' },
  { html: '  <span class="t-cyan">clear</span>        — Clear terminal' },
];

const WHOAMI_LINES = [
  { html: '<span class="t-green">abishek@macbook</span>' },
  { html: '<span class="t-dim">─────────────────────────────</span>' },
  { html: '<span class="t-orange">Name    </span>: Abishek' },
  { html: '<span class="t-orange">Role    </span>: iOS Developer' },
  { html: '<span class="t-orange">Exp     </span>: 4+ Years' },
  { html: '<span class="t-orange">Location</span>: Coimbatore, India' },
  { html: '<span class="t-orange">Status  </span>: <span class="t-green">✓ Available for Opportunities</span>' },
  { html: '<span class="t-orange">Email   </span>: iosdev.abishek@gmail.com' },
  { html: '<span class="t-orange">Phone   </span>: +91 7010642760' },
  { html: '<span class="t-orange">LinkedIn</span>: <span class="t-blue">abishek-m-223772212</span>' },
];

const LS_LINES = [
  { html: '<span class="t-purple">drwxr-xr-x</span>  about/' },
  { html: '<span class="t-purple">drwxr-xr-x</span>  skills/' },
  { html: '<span class="t-purple">drwxr-xr-x</span>  experience/' },
  { html: '<span class="t-purple">drwxr-xr-x</span>  apps/' },
  { html: '<span class="t-purple">drwxr-xr-x</span>  education/' },
  { html: '<span class="t-purple">drwxr-xr-x</span>  contact/' },
  { html: '<span class="t-green">-rw-r--r--</span>   resume.pdf' },
  { html: '<span class="t-green">-rw-r--r--</span>   portfolio.html' },
];

const RESUME_LINES = [
  { html: '<span class="t-orange">═══════════════════════════════════════</span>' },
  { html: '<span class="t-green">   ABISHEK — iOS DEVELOPER</span>' },
  { html: '<span class="t-orange">═══════════════════════════════════════</span>' },
  { html: '' },
  { html: '<span class="t-cyan">EXPERIENCE</span>' },
  { html: '  <span class="t-green">▸</span> Newgene Technologies     Oct 2024 – Jan 2026' },
  { html: '    <span class="t-dim">Swift · MVC · Realm · Azure Face API · REST APIs</span>' },
  { html: '    Construction apps · facial recognition · location tracking' },
  { html: '' },
  { html: '  <span class="t-green">▸</span> Hoffen Soft              Mar 2022 – Sep 2024' },
  { html: '    <span class="t-dim">Swift · UIKit · MVC · Apple Pay · Fastlane · Xcode Cloud</span>' },
  { html: '    Enterprise food-ordering apps · Apple Pay · CI/CD' },
  { html: '' },
  { html: '<span class="t-cyan">EDUCATION</span>' },
  { html: '  <span class="t-green">▸</span> B.Sc. IT — Bharathidasan University (2018–2021)' },
  { html: '' },
  { html: '<span class="t-cyan">SKILLS</span>' },
  { html: '  <span class="t-green">▸</span> Swift · UIKit · SwiftUI · Cocoa Touch · Combine' },
  { html: '  <span class="t-green">▸</span> MVC · MVVM · RESTful APIs · Realm · Core Data · Firebase' },
  { html: '  <span class="t-green">▸</span> Xcode · CI/CD · Fastlane · Xcode Cloud · App Store Connect' },
  { html: '  <span class="t-green">▸</span> Azure Face API · Apple Pay · Push Notifications · Location' },
  { html: '' },
  { html: '<span class="t-cyan">PUBLISHED APPS</span>' },
  { html: '  <span class="t-green">▸</span> eSafe       <span class="t-dim">apps.apple.com/in/app/esafe/id6503290863</span>' },
  { html: '  <span class="t-green">▸</span> E-Bis       <span class="t-dim">apps.apple.com/in/app/e-bis/id1469181013</span>' },
  { html: '  <span class="t-green">▸</span> Paytronix   <span class="t-dim">apps.apple.com/us/app/paytronix-cafe-rewards/id523749180</span>' },
  { html: '  <span class="t-green">▸</span> Yogurtland  <span class="t-dim">apps.apple.com/us/app/yogurtland/id60496832</span>' },
  { html: '<span class="t-orange">═══════════════════════════════════════</span>' },
];

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── COMMAND HANDLER ──────────────────────
async function runCommand(raw) {
  if (termBusy) return;
  const lc = raw.trim().toLowerCase();

  // Echo typed command
  await appendLine(`<span class="t-green">abishek@macbook:~$</span> ${escHtml(raw.trim())}`, 't-cmd-echo');
  if (raw.trim()) {
    cmdHistory.unshift(raw.trim());
    histIdx = -1;
  }
  if (!lc.trim()) { scrollTerm(); return; }

  // ── NAVIGATION COMMANDS ──
  if (lc === 'about') {
    await appendLine('<span class="t-green">▶ Opening About...</span>');
    setTimeout(() => openApp('view-about'), 250);

  } else if (lc === 'skills') {
    await appendLine('<span class="t-green">▶ Opening Skills...</span>');
    setTimeout(() => openApp('view-skills'), 250);

  } else if (lc === 'experience' || lc === 'exp') {
    await appendLine('<span class="t-green">▶ Opening Experience...</span>');
    setTimeout(() => openApp('view-experience'), 250);

  } else if (lc === 'apps' || lc === 'store') {
    await appendLine('<span class="t-green">▶ Opening App Store...</span>');
    setTimeout(() => openApp('view-apps'), 250);

  } else if (lc === 'contact') {
    await appendLine('<span class="t-green">▶ Opening Contact...</span>');
    setTimeout(() => openApp('view-contact'), 250);

  } else if (lc === 'education' || lc === 'edu') {
    await appendLine('<span class="t-green">▶ Opening Education...</span>');
    setTimeout(() => openApp('view-education'), 250);

  } else if (lc === 'home') {
    await appendLine('<span class="t-green">▶ Going to Home Screen...</span>');
    setTimeout(goHome, 250);

  } else if (lc === 'linkedin' || lc === 'open linkedin') {
    await appendLine('<span class="t-green">▶ Opening LinkedIn...</span>');
    setTimeout(() => window.open('https://www.linkedin.com/in/abishek-m-223772212/', '_blank'), 250);

  // ── INFO COMMANDS ──
  } else if (lc === 'whoami') {
    await printLines(WHOAMI_LINES, 25);

  } else if (lc === 'help') {
    await printLines(HELP_LINES, 30);

  } else if (lc === 'ls' || lc === 'ls -la' || lc === 'ls -l') {
    await printLines(LS_LINES, 28);

  } else if (lc === 'cat resume' || lc === 'cat resume.pdf') {
    await printLines(RESUME_LINES, 20);

  } else if (lc === 'theme') {
    toggleTheme();
    await appendLine(`<span class="t-green">✓ Switched to ${isDark ? 'Dark' : 'Light'} mode.</span>`);

  } else if (lc === 'clear' || lc === 'cls') {
    if (termHistory) termHistory.innerHTML = '';

  } else if (lc === 'date') {
    await appendLine(`<span class="t-cyan">${new Date().toString()}</span>`);

  } else if (lc === 'pwd') {
    await appendLine('<span class="t-cyan">/Users/abishek/portfolio</span>');

  } else if (lc.startsWith('echo ')) {
    const msg = raw.trim().slice(5).replace(/^["']|["']$/g, '');
    await appendLine(`<span class="t-cyan">${escHtml(msg)}</span>`);

  } else {
    await appendLine(`<span class="t-red">zsh: command not found: ${escHtml(lc)}</span>`);
    await appendLine(`<span class="t-dim">Type <span class="t-green">help</span> for available commands.</span>`);
  }
  scrollTerm();
}

// Terminal keyboard input
if (termInput) {
  termInput.addEventListener('keydown', async e => {
    if (e.key === 'Enter') {
      const val = termInput.value;
      termInput.value = '';
      await runCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < cmdHistory.length - 1) {
        histIdx++;
        termInput.value = cmdHistory[histIdx] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) {
        histIdx--;
        termInput.value = cmdHistory[histIdx] || '';
      } else {
        histIdx = -1;
        termInput.value = '';
      }
    }
  });
}
const termWrap = document.getElementById('terminal-wrap');
if (termWrap) termWrap.addEventListener('click', focusTerminal);


// ── ANIMATED BACKGROUND ──────────────────
(function() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Dot {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - .5) * .35;
      this.vy = (Math.random() - .5) * .35;
      this.r  = Math.random() * 1.3 + .4;
      this.a  = Math.random() * .4 + .1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190,160,255,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) pts.push(new Dot());

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 85) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(190,160,255,${(1 - d / 85) * .1})`;
          ctx.lineWidth   = .5;
          ctx.stroke();
        }
      }
      pts[i].update();
      pts[i].draw();
    }
    requestAnimationFrame(frame);
  }
  frame();
})();


// ── KEYBOARD SHORTCUTS ───────────────────
document.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey) {
    switch (e.key) {
      case '1': e.preventDefault(); openWindow('win-terminal'); break;
      case '2': e.preventDefault(); openWindow('win-contact'); break;
    }
  }
  if (e.key === 'Escape') {
    // If inside an app, go home first
    if (currentView !== 'view-home') { goHome(); return; }
    // Otherwise close topmost macOS window
    const wins = Array.from(document.querySelectorAll('.mac-window:not(.hidden)'));
    if (wins.length) {
      const top = wins.reduce((a, b) => +a.style.zIndex > +b.style.zIndex ? a : b);
      closeWindow(top.id);
    }
  }
});


// ── ON LOAD ──────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Ensure home screen is shown correctly
  const home = document.getElementById('view-home');
  if (home) {
    home.style.display = 'flex';
    home.classList.add('active');
  }

  // Open terminal after short delay with sequenced welcome
  setTimeout(async () => {
    openWindow('win-terminal');
    await new Promise(r => setTimeout(r, 500));
    await printLines([
      { html: '<span class="t-green">✓ Portfolio loaded.</span>' },
      { html: '<span class="t-dim">Click any app icon on the iPhone to explore.</span>' },
      { html: 'Type <span class="t-green">help</span> for terminal commands.' },
    ], 45);
    focusTerminal();
  }, 700);
});
