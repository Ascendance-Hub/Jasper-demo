/* ==========================================================================
   Jasper — Componentes reutilizáveis + ícones (SVG inline, traço simples)
   ========================================================================== */

/* ---- Ícones (estilo Lucide, stroke) ------------------------------------ */
const ICON = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
  shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><path d="M16 12h.01"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  barChart: '<path d="M3 3v18h18"/><rect x="7" y="10" width="3" height="8"/><rect x="12" y="6" width="3" height="12"/><rect x="17" y="13" width="3" height="5"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9"/><path d="M12 8S10 2 7 4s5 4 5 4ZM12 8s2-6 5-4-5 4-5 4Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  backpack: '<path d="M5 21V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v12"/><path d="M9 5V3h6v2"/><path d="M5 13h14"/><path d="M10 13v3h4v-3"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  unlock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.6-1.5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  trendingUp: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13.5 7 22l5-3 5 3-1.2-8.5"/>',
  fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
  userPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5.5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z"/>',
  microscope: '<path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2M9 12a2 2 0 0 1-2-2V6h4v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a8 8 0 0 1-8 8"/><path d="M2 21c0-3 1.9-6.5 5-8"/>',
  palette: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2a10 10 0 0 0 0 20 2.5 2.5 0 0 0 2-4 2.5 2.5 0 0 1 2-4h2a4 4 0 0 0 4-4 10 10 0 0 0-10-8Z"/>',
};

function icon(name, cls) {
  const path = ICON[name] || '';
  // width/height como atributos de apresentação: garante tamanho-base mesmo
  // sem CSS; regras de classe (.btn svg, .seal svg…) ainda sobrescrevem.
  return `<svg class="${cls || ''}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

/* ícone temático por categoria de especialidade */
const CAT_ICON = {
  ADRA: 'heart', artes: 'palette', agricolas: 'leaf', missionarias: 'users',
  profissionais: 'fileText', recreativas: 'backpack', ciencia: 'microscope',
  natureza: 'leaf', domesticas: 'gift',
};

/* ---- Helpers de markup ------------------------------------------------- */
function avatar(initials, cls) {
  return `<div class="avatar ${cls || ''}">${initials}</div>`;
}
function photoAvatar(cls) {
  return `<div class="avatar avatar--photo ${cls || ''}">Foto<br>ou<br>browse</div>`;
}
function badge(text, variant, withDot) {
  return `<span class="badge ${variant || ''}">${withDot ? '<span class="dot"></span>' : ''}${text}</span>`;
}

/* ---- Sidebar ----------------------------------------------------------- */
const NAV_ITEMS = [
  { id: 'inicio', label: 'Início', icon: 'home', view: 'dashboard' },
  { id: 'pessoas', label: 'Pessoas', icon: 'users', view: 'pessoas-desbravadores' },
  { id: 'eventos', label: 'Eventos', icon: 'calendar', view: 'eventos' },
  { id: 'autorizacoes', label: 'Autorizações', icon: 'shield', view: 'autorizacoes' },
  { id: 'financeiro', label: 'Financeiro', icon: 'wallet', view: 'financeiro' },
  { id: 'comunicacao', label: 'Comunicação', icon: 'bell', view: 'comunicacao' },
];

function renderSidebar(activeNav, allowedNav) {
  const items = NAV_ITEMS
    .filter((it) => !allowedNav || allowedNav.includes(it.id))
    .map((it) => `
      <button class="nav__item ${it.id === activeNav ? 'is-active' : ''}" data-nav="${it.id}" data-view="${it.view}">
        ${icon(it.icon)}<span>${it.label}</span>
      </button>`).join('');
  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar__brand">
        <div class="brand-badge">${DATA.club.initials}</div>
        <div class="name">${DATA.club.name}</div>
      </div>
      <nav class="nav">${items}</nav>
      <div class="sidebar__spacer"></div>
      <div class="sidebar__user">
        ${avatar(DATA.user.initials)}
        <div>
          <div class="u-name">${DATA.user.name}</div>
          <div class="u-role">${DATA.user.role}</div>
        </div>
      </div>
    </aside>`;
}

/* ---- Topbar "Vendo como" ----------------------------------------------- */
function renderTopbar(currentRole) {
  const opts = [
    ['secretario', 'Secretário'],
    ['responsavel', 'Responsável'],
    ['desbravador', 'Desbravador'],
  ].map(([v, l]) => `<option value="${v}" ${v === currentRole ? 'selected' : ''}>${l}</option>`).join('');
  return `
    <div class="topbar">
      <div class="viewas">
        <span class="dot"></span>
        <label>Vendo como:</label>
        <select id="viewAs">${opts}</select>
      </div>
    </div>`;
}

/* breadcrumb */
function crumbs(parts) {
  // parts: [{label, view}] — último é current
  return `<div class="crumbs">${parts.map((p, i) => {
    const last = i === parts.length - 1;
    const sep = i > 0 ? '<span class="sep">' + icon('chevronRight') + '</span>' : '';
    if (last) return `${sep}<span class="current">${p.label}</span>`;
    return `${sep}<a data-view="${p.view}">${p.label}</a>`;
  }).join('')}</div>`;
}

function backlink(label, view) {
  return `<button class="backlink" data-view="${view}">${icon('arrowLeft')}${label}</button>`;
}

/* barras horizontais por categoria (ficha + cartão) */
function categoryBars(byCat) {
  return `<div class="cat-bars">${DATA.categories.map((c) => {
    const n = byCat[c.key] || 0;
    const max = 4;
    const w = Math.max(0, Math.min(100, (n / max) * 100));
    return `<div class="cat-row ${n === 0 ? 'zero' : ''}">
      <div class="cl">${c.name}</div>
      <div class="track"><div class="fill" style="width:${w}%;background:${c.color}"></div></div>
      <div class="cv">${n}</div>
    </div>`;
  }).join('')}</div>`;
}

/* galeria de especialidades com busca */
function specialtyGallery(list) {
  return list.map((s) => {
    const cat = DATA.categoryByKey[s.cat];
    return `<div class="spec-item ${s.done ? '' : 'in-progress'}" data-spec="${s.name.toLowerCase()}">
      <div class="spec-emblem" style="background:${cat.color}">${icon(CAT_ICON[s.cat])}</div>
      <div>
        <div class="sn">${s.name}</div>
        <div class="sc">${cat.name}${s.done ? '' : ' · em andamento'}</div>
      </div>
    </div>`;
  }).join('');
}

/* jornada de classes (cartão / progresso) */
function journeyRow(journey) {
  return `<div class="journey">${journey.map((j) => {
    let cls = 'future', inner = j.age;
    if (j.state === 'done') { cls = 'done'; inner = icon('check'); }
    else if (j.state === 'current') { cls = 'current'; inner = icon('award'); }
    else if (j.state === 'progress') { cls = 'current'; inner = j.age; }
    return `<div class="j-node ${j.state === 'future' ? 'future' : ''}">
      <div class="j-dot ${cls}">${inner}</div>
      <div class="j-label">${j.name}</div>
    </div>`;
  }).join('')}</div>`;
}
