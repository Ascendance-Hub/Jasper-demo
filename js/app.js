/* ==========================================================================
   Jasper — App: roteamento por JS, estado do seletor "Vendo como"
   Tudo em memória (sem localStorage). Funciona abrindo o index.html direto.
   ========================================================================== */

const MOBILE_VIEWS = ['assinatura-mobile', 'cartao-desbravador'];

const ROLE_DEFAULT_VIEW = {
  secretario: 'dashboard',
  responsavel: 'assinatura-mobile',
  desbravador: 'cartao-desbravador',
};

/* nav ativo por view (para destacar o item certo) */
const VIEW_TO_NAV = {
  dashboard: 'inicio',
  'autorizacoes': 'autorizacoes',
  'autorizacao-detalhe': 'autorizacoes',
  'assinatura-mobile': 'autorizacoes',
  'pessoas-desbravadores': 'pessoas',
  'pessoas-lideranca': 'pessoas',
  'pessoas-externos': 'pessoas',
  'ficha-desbravador': 'pessoas',
  'ficha-lideranca': 'pessoas',
  'ficha-externo': 'pessoas',
  'busca-instrutor': 'pessoas',
  'cartao-desbravador': 'pessoas',
  eventos: 'eventos',
  financeiro: 'financeiro',
  comunicacao: 'comunicacao',
};

const APP = {
  role: 'secretario',
  view: 'dashboard',
  params: {},
  // estados auxiliares de demo
  mobileStep: 'intro',     // fluxo de assinatura mobile
  mobileMode: 'auth',      // 'auth' | 'refuse'
  pinUnlocked: false,      // dados sensíveis liberados nesta "sessão"
  fichaTab: 'info',        // info | progresso | sensiveis
  dashTab: 'resolver',     // resolver | geral
  sidebarOpen: false,
};

const root = document.getElementById('root');

function navigate(view, params = {}) {
  APP.view = view;
  APP.params = params;
  APP.sidebarOpen = false;
  if (params.tab) APP.fichaTab = params.tab;
  window.scrollTo(0, 0);
  render();
}

function setRole(role) {
  APP.role = role;
  APP.view = ROLE_DEFAULT_VIEW[role];
  APP.params = {};
  APP.mobileStep = 'intro';
  APP.mobileMode = 'auth';
  render();
}

/* ---- Render principal --------------------------------------------------- */
function render() {
  const isPhone = APP.role !== 'secretario' || MOBILE_VIEWS.includes(APP.view);
  document.body.style.background = isPhone ? '' : 'var(--bg)';

  if (isPhone) {
    // o secretário pode espiar telas-celular (assinatura/cartão); precisa de volta
    const backView = APP.view === 'assinatura-mobile' ? 'autorizacao-detalhe'
      : APP.view === 'cartao-desbravador' ? 'ficha-desbravador' : 'dashboard';
    const backBtn = APP.role === 'secretario'
      ? `<button class="btn btn--sm phone-back" data-view="${backView}">${icon('arrowLeft')} Voltar ao painel</button>`
      : '';
    root.innerHTML = `
      <div class="phone-stage fade-in">
        ${backBtn}
        <div style="position:absolute;top:20px;right:24px;z-index:5">
          ${roleSelectorFloating()}
        </div>
        ${Screens[APP.view]()}
      </div>`;
  } else {
    const activeNav = VIEW_TO_NAV[APP.view] || '';
    root.innerHTML = `
      <div class="app">
        ${renderSidebar(activeNav)}
        <div class="${APP.sidebarOpen ? 'scrim' : ''}" id="scrim"></div>
        <main class="main">
          ${renderTopbar(APP.role)}
          <div class="content fade-in">${Screens[APP.view]()}</div>
        </main>
      </div>`;
    const sb = document.getElementById('sidebar');
    if (sb && APP.sidebarOpen) sb.classList.add('open');
  }
  const mt = document.getElementById('menuToggle');
  mt.innerHTML = icon('menu');
  // em modo "telefone" não há sidebar — esconde o toggle (vence o !important do media query)
  if (isPhone) mt.style.setProperty('display', 'none', 'important');
  else mt.style.removeProperty('display');
}

function roleSelectorFloating() {
  const opts = [
    ['secretario', 'Secretário'], ['responsavel', 'Responsável'], ['desbravador', 'Desbravador'],
  ].map(([v, l]) => `<option value="${v}" ${v === APP.role ? 'selected' : ''}>${l}</option>`).join('');
  return `<div class="viewas"><span class="dot"></span><label>Vendo como:</label><select id="viewAs">${opts}</select></div>`;
}

/* ---- Delegação de eventos ---------------------------------------------- */
document.addEventListener('click', (e) => {
  const navEl = e.target.closest('[data-view]');
  if (navEl) {
    e.preventDefault();
    const params = {};
    if (navEl.dataset.id) params.id = navEl.dataset.id;
    if (navEl.dataset.tab) params.tab = navEl.dataset.tab;
    navigate(navEl.dataset.view, params);
    return;
  }

  const actionEl = e.target.closest('[data-action]');
  if (actionEl) {
    handleAction(actionEl.dataset.action, actionEl);
    return;
  }

  // botões de ação leve (toast + estado "concluído"), sem re-render
  const fxEl = e.target.closest('[data-toast], [data-done]');
  if (fxEl) {
    if (fxEl.dataset.done !== undefined) markDone(fxEl);
    if (fxEl.dataset.toast) toast(fxEl.dataset.toast);
    return;
  }

  if (e.target.closest('#menuToggle')) {
    APP.sidebarOpen = !APP.sidebarOpen;
    render();
    return;
  }
  if (e.target.closest('#scrim')) {
    APP.sidebarOpen = false;
    render();
  }
});

document.addEventListener('change', (e) => {
  if (e.target.id === 'viewAs') setRole(e.target.value);
});

/* filtros / busca / abas locais (sem re-render completo) */
document.addEventListener('input', (e) => {
  if (e.target.matches('[data-search]')) {
    const scope = e.target.dataset.search;
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll(`[data-searchable="${scope}"]`).forEach((el) => {
      const hit = el.dataset.name && el.dataset.name.includes(q);
      el.hidden = q && !hit;
    });
    // esconde labels de grupo vazios
    document.querySelectorAll(`[data-group="${scope}"]`).forEach((g) => {
      const anyVisible = g.querySelector('[data-searchable]:not([hidden])');
      const lbl = g.querySelector('.group-label');
      if (lbl) lbl.hidden = !anyVisible;
    });
  }
});

/* ---- Ações (botões de demo) -------------------------------------------- */
function handleAction(action, el) {
  switch (action) {
    /* ---- toggle dashboard ---- */
    case 'dash-resolver': APP.dashTab = 'resolver'; render(); break;
    case 'dash-geral': APP.dashTab = 'geral'; render(); break;

    /* ---- abas da ficha ---- */
    case 'ficha-tab':
      APP.fichaTab = el.dataset.tab;
      render();
      break;

    /* ---- filtros de unidade / papel (lista) ---- */
    case 'unit-filter':
      filterUnit(el.dataset.unit);
      break;
    case 'auth-tab':
      filterSigTab(el.dataset.tab);
      break;

    /* ---- PIN ---- */
    case 'pin-submit': {
      const inputs = [...document.querySelectorAll('.pin-inputs input')];
      const filled = inputs.every((i) => i.value.match(/\d/));
      if (filled) { APP.pinUnlocked = true; render(); }
      else { inputs.find((i) => !i.value)?.focus(); }
      break;
    }
    case 'pin-lock': APP.pinUnlocked = false; render(); break;

    /* ---- fluxo de assinatura mobile ---- */
    case 'auth-start': APP.mobileStep = 'confirm'; APP.mobileMode = 'auth'; renderPhoneScreen(); break;
    case 'refuse-start': APP.mobileStep = 'refuse'; APP.mobileMode = 'refuse'; renderPhoneScreen(); break;
    case 'auth-confirm': {
      const chk = document.getElementById('confirmChk');
      if (chk && chk.checked) { APP.mobileStep = 'success'; renderPhoneScreen(); }
      else { chk?.focus(); const lbl = chk?.closest('.confirm-box'); if (lbl) { lbl.style.outline = '2px solid var(--gold-500)'; lbl.style.borderRadius = '8px'; } }
      break;
    }
    case 'refuse-confirm': APP.mobileStep = 'refused'; renderPhoneScreen(); break;
    case 'mobile-restart': APP.mobileStep = 'intro'; APP.mobileMode = 'auth'; renderPhoneScreen(); break;

    /* ---- toasts + retorno visível nos botões de ação ---- */
    default:
      if (el.dataset.done !== undefined) markDone(el);
      if (el.dataset.toast) toast(el.dataset.toast);
  }
}

/* transforma o botão em estado "concluído" (verde, com check) */
function markDone(el) {
  if (el.classList.contains('btn--done')) return;
  el.classList.add('btn--done');
  el.disabled = true;
  el.innerHTML = icon('check') + (el.dataset.done || 'Feito');
}

function renderPhoneScreen() {
  // re-renderiza só dentro do stage (mantém o seletor)
  render();
}

/* filtro de unidade na lista de desbravadores (sem re-render) */
function filterUnit(unit) {
  document.querySelectorAll('[data-action="unit-filter"]').forEach((b) => b.classList.toggle('is-active', b.dataset.unit === unit));
  document.querySelectorAll('[data-unit-group]').forEach((g) => {
    g.hidden = unit !== 'todas' && g.dataset.unitGroup !== unit;
  });
}

/* filtro de abas de assinatura */
function filterSigTab(tab) {
  document.querySelectorAll('[data-action="auth-tab"]').forEach((b) => b.classList.toggle('is-active', b.dataset.tab === tab));
  document.querySelectorAll('[data-sig-status]').forEach((r) => {
    r.hidden = tab !== 'todos' && r.dataset.sigStatus !== tab;
  });
}

/* ---- Toast ------------------------------------------------------------- */
let toastTimer;
function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;left:50%;bottom:32px;transform:translateX(-50%);background:var(--navy-800);color:#fff;padding:13px 22px;border-radius:12px;font-weight:600;font-size:14px;box-shadow:var(--shadow-lg);z-index:100;opacity:0;transition:opacity .2s,transform .2s;display:flex;align-items:center;gap:10px';
    document.body.appendChild(t);
  }
  t.innerHTML = icon('check') + msg;
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(8px)'; }, 2200);
}

/* auto-avança foco nos campos de PIN */
document.addEventListener('input', (e) => {
  if (e.target.closest('.pin-inputs') && e.target.value) {
    const next = e.target.nextElementSibling;
    if (next && next.tagName === 'INPUT') next.focus();
  }
});

/* ---- Boot -------------------------------------------------------------- */
// deep-link opcional: index.html#view ou #view/id (útil no GitHub Pages)
function applyHash() {
  const h = location.hash.replace(/^#/, '');
  if (!h) return false;
  const [view, id] = h.split('/');
  if (view === 'visao-geral') { APP.view = 'dashboard'; APP.dashTab = 'geral'; return true; }
  if (view === 'assinatura-mobile' && id) APP.mobileStep = id;
  if (Screens[view]) { APP.view = view; APP.params = id ? { id } : {}; return true; }
  return false;
}
applyHash();
window.addEventListener('hashchange', () => { if (applyHash()) render(); });
render();
