/* ==========================================================================
   Jasper — Telas (render functions). Cada uma devolve HTML string.
   ========================================================================== */

const Screens = {};

/* ======================= subtabs de Pessoas ============================= */
function pessoasSubtabs(active) {
  const tabs = [
    ['lideranca', 'Liderança', 'pessoas-lideranca'],
    ['desbravadores', 'Desbravadores', 'pessoas-desbravadores'],
    ['externos', 'Externos', 'pessoas-externos'],
  ];
  return `<div class="subtabs">${tabs.map(([k, l, v]) =>
    `<button data-view="${v}" class="${k === active ? 'is-active' : ''}">${l}</button>`).join('')}</div>`;
}

/* ======================= DASHBOARD ====================================== */
Screens['dashboard'] = function () {
  const toggle = `
    <div class="segmented">
      <button class="${APP.dashTab === 'resolver' ? 'is-active' : ''}" data-action="dash-resolver">Para resolver</button>
      <button class="${APP.dashTab === 'geral' ? 'is-active' : ''}" data-action="dash-geral">Visão geral</button>
    </div>`;
  return APP.dashTab === 'resolver' ? dashResolver(toggle) : dashGeral(toggle);
};

function dashResolver(toggle) {
  const d = DATA.dashboard;
  const urgentMain = d.urgent[0], urgentSoft = d.urgent[1];
  return `
    <div class="page-head">
      <div>
        <div class="date">${DATA.today}</div>
        <h1>${d.greeting}</h1>
        <p class="sub">Há <strong>${d.attentionCount} itens</strong> pedindo sua atenção hoje — nada que a gente não resolva.</p>
      </div>
      ${toggle}
    </div>

    <div class="grid">
      <!-- Autorizações urgentes -->
      <div class="card card--pad attn-card">
        <div class="attn-head">
          <div class="card-icn" style="background:var(--red-soft);color:var(--red-600)">${icon('shieldCheck')}</div>
          <div>
            <div class="eyebrow" style="color:var(--red-600)">Precisa de você agora</div>
            <h3>Autorizações urgentes</h3>
          </div>
        </div>
        <div class="urgent-row">
          <div class="info">
            <div class="t">${urgentMain.name} ${badge(urgentMain.daysLabel, 'badge--red')}</div>
            <div class="d">${urgentMain.detail}</div>
          </div>
          <div class="actions">
            <button class="btn btn--primary btn--sm" data-done="Lembretes enviados" data-toast="Lembretes reenviados aos 5 responsáveis pendentes.">${icon('send')} Reenviar lembretes</button>
            <button class="btn btn--sm" data-view="autorizacao-detalhe" data-id="inverno">Ver detalhes</button>
          </div>
        </div>
        <div class="soft-row">
          <div class="info">
            <div class="t" style="font-weight:700;display:flex;align-items:center;gap:10px">${urgentSoft.name} ${badge(urgentSoft.daysLabel, 'badge--gold')}</div>
            <div class="d" style="color:var(--ink-2);font-size:13.5px;margin-top:3px">${urgentSoft.detail}</div>
          </div>
          <button class="btn btn--sm" data-done="Enviado" data-toast="Lembrete reenviado.">${icon('send')} Reenviar</button>
        </div>
      </div>

      <!-- Frequência em queda -->
      <div class="card card--pad">
        <div class="attn-head">
          <div class="card-icn" style="background:var(--gold-soft);color:var(--gold-600)">${icon('users')}</div>
          <div>
            <div class="eyebrow" style="color:var(--gold-600)">Cuidado · um sinal para acolher</div>
            <h3>Frequência em queda</h3>
          </div>
        </div>
        <p style="color:var(--ink-2);margin:6px 0 4px">${d.frequency.length} desbravadores faltaram nas últimas reuniões. Talvez valha um contato carinhoso.</p>
        <div class="mini-list">
          ${d.frequency.map((p) => `
            <div class="mini-row">
              ${avatar(p.initials)}
              <div class="info">
                <div class="name">${p.name}</div>
                <div class="meta">Unidade ${p.unit} · faltou nas últimas <strong>${p.missed} reuniões</strong></div>
              </div>
              <button class="btn btn--sm" data-done="Conselheiro avisado" data-toast="Conselheiro avisado — com carinho.">${icon('send')} Avisar conselheiro</button>
            </div>`).join('')}
        </div>
      </div>

      <!-- Financeiro -->
      <div class="card card--pad">
        <div class="soft-row" style="padding:0">
          <div style="display:flex;gap:14px;align-items:center">
            <div class="card-icn" style="background:#eef1f6;color:var(--ink-2)">${icon('wallet')}</div>
            <div>
              <div class="eyebrow">Financeiro · trate com discrição</div>
              <div style="margin-top:2px"><strong>${d.finance.count} mensalidades</strong> em atraso · total <strong>${d.finance.total}</strong></div>
            </div>
          </div>
          <button class="btn btn--sm" data-view="financeiro">Ver inadimplência ${icon('chevronRight')}</button>
        </div>
      </div>

      <!-- Eventos + Aniversariantes -->
      <div class="grid grid-2">
        <div class="card card--pad">
          <div class="attn-head">
            <div class="card-icn" style="background:#eef1f6;color:var(--navy-700)">${icon('calendar')}</div>
            <div><div class="eyebrow">Agenda</div><h3>Eventos próximos</h3></div>
          </div>
          <div class="mini-list">
            ${d.events.map((e) => `
              <div class="mini-row">
                <div class="info"><div class="name">${e.name}</div><div class="meta">${e.when}</div></div>
              </div>`).join('')}
          </div>
        </div>
        <div class="card card--pad">
          <div class="attn-head">
            <div class="card-icn" style="background:var(--gold-soft);color:var(--gold-600)">${icon('gift')}</div>
            <div><div class="eyebrow">Para celebrar</div><h3>Aniversariantes da semana</h3></div>
          </div>
          <div class="mini-list">
            ${d.birthdays.map((b) => `
              <div class="mini-row">
                ${avatar(b.initials)}
                <div class="info"><div class="name">${b.name}</div><div class="meta">${b.detail}</div></div>
                <button class="btn btn--gold btn--sm" data-done="Parabéns enviado" data-toast="Mensagem de parabéns preparada para ${b.name}.">${icon('gift')} Enviar parabéns</button>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="dash-footer"><strong>Tudo certo por aqui.</strong> Bom sábado, Renata.</div>`;
}

function dashGeral(toggle) {
  const o = DATA.overview;
  return `
    <div class="page-head">
      <div>
        <h1>Visão geral</h1>
        <p class="sub">${o.subtitle}</p>
      </div>
      ${toggle}
    </div>

    <div class="grid grid-4">
      ${o.kpis.map((k) => `
        <div class="card kpi">
          <div class="label">${k.label}</div>
          <div class="value">${k.value}</div>
          <div class="delta"><span class="tag">${icon('trendingUp')} ${k.delta}</span> ${k.note}</div>
        </div>`).join('')}
    </div>

    <div style="height:18px"></div>
    <div class="card card--pad chart-card">
      <div class="eyebrow">Tendência</div>
      <h3>Frequência ao longo do ano</h3>
      <div class="csub">Presença média mensal (%) — 2026</div>
      ${lineChart(o.frequency)}
    </div>

    <div style="height:18px"></div>
    <div class="grid grid-2">
      <div class="card card--pad chart-card">
        <div class="eyebrow">Composição</div>
        <h3>Distribuição por unidade</h3>
        <div class="csub">${DATA.pathfinders.length} desbravadores ativos</div>
        <div class="bars">
          ${(() => {
            const maxN = Math.max(...DATA.unitCounts.map((u) => u.count));
            return DATA.unitCounts.map((u) => {
              const h = 40 + (u.count / maxN) * 110; // 40–150px conforme a contagem
              return `<div class="bar-col"><div class="bv">${u.count}</div><div class="bar" style="height:${h}px"></div><div class="bl">${u.unit}</div></div>`;
            }).join('');
          })()}
        </div>
      </div>
      <div class="card card--pad chart-card">
        <div class="eyebrow">Desenvolvimento</div>
        <h3>Progresso de classes</h3>
        <div class="csub">Desbravadores em cada classe regular</div>
        <div class="hbars">
          ${o.classProgress.map((c) => `
            <div class="hbar">
              <div class="hl">${c.name}</div>
              <div class="track"><div class="fill" style="width:${(c.n / 8) * 100}%"></div></div>
              <div class="hv">${c.n}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div style="height:18px"></div>
    <div class="card card--pad chart-card">
      <div class="eyebrow">Tesouraria</div>
      <h3>Financeiro do mês</h3>
      <div class="csub">Entradas e saídas · junho de 2026</div>
      <div class="hbars" style="margin-top:8px">
        <div class="hbar"><div class="hl">Entradas</div><div class="track"><div class="fill" style="width:100%;background:var(--green-600)"></div></div><div class="hv">2.480</div></div>
        <div class="hbar"><div class="hl">Saídas</div><div class="track"><div class="fill" style="width:50%;background:var(--red-600)"></div></div><div class="hv">1.240</div></div>
      </div>
      <div style="margin-top:14px;color:var(--ink-2)">Saldo do mês: <strong style="color:var(--green-700)">+R$ 1.240</strong></div>
    </div>`;
}

/* gráfico de linha em SVG (sóbrio) */
function lineChart(data) {
  const W = 760, H = 230, padL = 40, padR = 30, padT = 16, padB = 34;
  const min = 70, max = 95;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const x = (i) => padL + (innerW * i) / (data.length - 1);
  const y = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
  const pts = data.map((d, i) => [x(i), y(d.v)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L ${x(data.length - 1).toFixed(1)} ${(padT + innerH).toFixed(1)} L ${padL} ${(padT + innerH).toFixed(1)} Z`;
  const grids = [70, 75, 80, 85, 90, 95];
  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;margin-top:6px" role="img" aria-label="Frequência mensal">
    ${grids.map((g) => `<line x1="${padL}" x2="${W - padR}" y1="${y(g)}" y2="${y(g)}" stroke="#eef0f3" stroke-width="1"/>
      <text x="${padL - 10}" y="${y(g) + 4}" font-size="11" fill="#9aa1ad" text-anchor="end">${g}</text>`).join('')}
    <defs><linearGradient id="freqFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#243b6b" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#243b6b" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${area}" fill="url(#freqFill)"/>
    <path d="${line}" fill="none" stroke="#243b6b" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${pts.map((p, i) => {
      const last = i === pts.length - 1;
      return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${last ? 6 : 4.5}" fill="${last ? '#e0a82e' : '#fff'}" stroke="${last ? '#e0a82e' : '#243b6b'}" stroke-width="2.5"/>`;
    }).join('')}
    ${data.map((d, i) => `<text x="${x(i).toFixed(1)}" y="${H - 10}" font-size="11.5" fill="#6b7280" text-anchor="middle">${d.m}</text>`).join('')}
  </svg>`;
}

/* ======================= AUTORIZAÇÕES (lista) =========================== */
Screens['autorizacoes'] = function () {
  const statusMap = {
    urgent: ['badge--red', 'Urgente'], open: ['badge--gold', 'Em aberto'], done: ['badge--green', 'Concluída'],
  };
  return `
    <div class="page-head">
      <div>
        <h1>Autorizações</h1>
        <p class="sub">Acompanhe as assinaturas dos responsáveis para cada saída do clube.</p>
      </div>
      <button class="btn btn--primary" data-toast="Nova autorização — formulário ilustrativo nesta demo.">${icon('shieldCheck')} Nova autorização</button>
    </div>
    <div class="grid">
      ${DATA.authorizations.map((a) => {
        const pct = Math.round((a.signed / a.total) * 100);
        const [bc, bl] = statusMap[a.status];
        const deadlineTxt = a.status === 'done' ? 'Encerrada' : `Prazo ${a.deadline}` + (a.daysLeft ? ` · em ${a.daysLeft} dias` : ' · hoje');
        return `
          <button class="card card--pad row clickable" style="display:block;text-align:left" data-view="autorizacao-detalhe" data-id="${a.id}">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px">
              <div style="flex:1">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:4px">
                  <h3 style="font-size:18px">${a.name}</h3>
                  ${badge(bl, bc, true)}
                </div>
                <div style="color:var(--ink-2);font-size:14px">${a.dates} · ${deadlineTxt}</div>
                <div class="progress-head" style="margin:16px 0 8px">
                  <strong>${a.signed} de ${a.total} assinadas</strong>
                  <span class="pct">${pct}%</span>
                </div>
                <div class="seg-bar"><div class="s-green" style="width:${pct}%"></div></div>
              </div>
              ${icon('chevronRight', 'chev')}
            </div>
          </button>`;
      }).join('')}
    </div>`;
};

/* ======================= AUTORIZAÇÃO (detalhe) ========================== */
Screens['autorizacao-detalhe'] = function () {
  const ev = DATA.event;
  const sigs = DATA.signatures;
  const pct = Math.round((ev.signed / ev.total) * 100);
  const counts = {
    todos: ev.total, pendentes: ev.pending, assinadas: ev.signed, recusadas: ev.refused,
  };
  const statusKeyToTab = { signed: 'assinadas', pending: 'pendentes', refused: 'recusadas' };
  const statusBadge = (s) => {
    if (s === 'signed') return badge('Assinada', 'badge--green') ;
    if (s === 'pending') return `<span class="badge badge--gold">${icon('clock')} Pendente</span>`;
    return badge('Recusada', 'badge--red');
  };
  return `
    ${crumbs([{ label: 'Autorizações', view: 'autorizacoes' }, { label: ev.name }])}
    <div class="page-head">
      <div>
        <h1>${ev.name}</h1>
        <div class="ph-contact" style="display:flex;gap:22px;flex-wrap:wrap;color:var(--ink-2);font-size:14px;margin-top:8px">
          <span style="display:inline-flex;gap:7px;align-items:center">${icon('calendar')} ${ev.dates}</span>
          <span style="display:inline-flex;gap:7px;align-items:center">${icon('mapPin')} ${ev.place}</span>
          <span style="display:inline-flex;gap:7px;align-items:center">${icon('clock')} Prazo ${ev.deadline}</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;align-items:flex-end">
        <button class="btn btn--primary" data-done="Lembretes enviados" data-toast="Lembrete enviado aos ${ev.pending} responsáveis pendentes.">${icon('send')} Reenviar aos ${ev.pending} pendentes</button>
        <button class="btn btn--sm" data-view="assinatura-mobile">${icon('phone')} Ver assinatura (mobile)</button>
      </div>
    </div>

    <div class="card card--pad">
      <div class="progress-head"><strong>Progresso das assinaturas</strong><span class="pct"><strong style="color:var(--ink)">${ev.signed}</strong> de ${ev.total} assinadas · ${pct}%</span></div>
      <div class="seg-bar">
        <div class="s-green" style="width:${(ev.signed / ev.total) * 100}%"></div>
        <div class="s-gold" style="width:${(ev.pending / ev.total) * 100}%"></div>
        <div class="s-red" style="width:${(ev.refused / ev.total) * 100}%"></div>
      </div>
      <div class="stat-tri" style="margin-top:20px">
        <div class="stat-box"><div class="n">${ev.signed} <span class="dot" style="background:var(--green-600)"></span></div><div class="l">Assinadas</div></div>
        <div class="stat-box"><div class="n">${ev.pending} <span class="dot" style="background:var(--gold-500)"></span></div><div class="l">Pendentes</div></div>
        <div class="stat-box"><div class="n">${ev.refused} <span class="dot" style="background:var(--red-600)"></span></div><div class="l">Recusadas</div></div>
      </div>
    </div>

    <div style="height:18px"></div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px 22px;flex-wrap:wrap">
        <div class="filters" style="margin:0">
          <button class="filter-pill is-active" data-action="auth-tab" data-tab="todos">Todos <span class="n">${counts.todos}</span></button>
          <button class="filter-pill" data-action="auth-tab" data-tab="pendentes">Pendentes <span class="n">${counts.pendentes}</span></button>
          <button class="filter-pill" data-action="auth-tab" data-tab="assinadas">Assinadas <span class="n">${counts.assinadas}</span></button>
          <button class="filter-pill" data-action="auth-tab" data-tab="recusadas">Recusadas <span class="n">${counts.recusadas}</span></button>
        </div>
        <div class="search" style="max-width:260px"><span>${icon('search')}</span><input placeholder="Buscar desbravador" data-search="sig"></div>
      </div>
      <div class="sig-head">
        <span>Desbravador</span><span>Responsável</span><span>Status</span><span></span>
      </div>
      ${sigs.map((s) => {
        const tab = statusKeyToTab[s.status];
        const respLabel = s.status === 'signed' ? 'Assinado por' : s.status === 'pending' ? 'Aguardando' : 'Recusado por';
        const action = s.status === 'pending'
          ? `<button class="btn btn--sm" data-done="Lembrete enviado" data-toast="Lembrete reenviado para ${s.resp}.">${icon('bell')} Reenviar lembrete</button>`
          : `<button class="btn btn--ghost btn--sm" data-toast="Mais ações (demo)">···</button>`;
        const ts = s.status === 'pending' ? s.sent : (s.status === 'refused' ? `recusada · ${s.ts}` : s.ts);
        return `
          <div class="sig-row" data-sig-status="${tab}" data-searchable="sig" data-name="${s.name.toLowerCase()}">
            <div class="who">${avatar(DATA.initials(s.name))}<div><div class="row__title">${s.name}</div><div class="row__sub">Unidade ${s.unit} · ${s.age} anos</div></div></div>
            <div class="sig-resp"><div class="lab">${respLabel}</div><div class="nm">${s.resp}</div></div>
            <div class="sig-status">${statusBadge(s.status)}<div class="ts">${ts}</div>${s.reason ? `<div class="ts" style="color:var(--red-600)">"${s.reason}"</div>` : ''}</div>
            <div class="sig-action">${action}</div>
          </div>`;
      }).join('')}
    </div>`;
};

/* ======================= ASSINATURA (mobile) ============================ */
Screens['assinatura-mobile'] = function () {
  return `
    <div class="phone-caption">
      <span class="eyebrow">Jasper · autorização de saída</span>
      <div class="t">Assinatura pelo responsável</div>
    </div>
    <div class="phone">
      <div class="phone__screen">
        ${phoneStatusBar()}
        ${signatureBody()}
      </div>
    </div>
    <button class="btn btn--sm demo-reset" data-action="mobile-restart">${icon('refresh')} Reiniciar demonstração</button>`;
};

function phoneStatusBar() {
  return `<div class="phone__statusbar">
    <span>9:30</span>
    <div class="phone__notch"></div>
    <div class="sb-icons"><span>📶</span><span>🔋</span></div>
  </div>`;
}

function signatureBody() {
  const ev = DATA.event;
  const lucas = DATA.lucas;

  if (APP.mobileStep === 'success') {
    return `<div class="phone__scroll"><div class="m-success">
      <div class="seal">${icon('check')}</div>
      <h2>Autorização registrada!</h2>
      <p>Obrigado, Marta. A diretoria do ${DATA.club.name} já foi avisada que o Lucas está autorizado.</p>
      <div style="height:18px"></div>
      <span class="badge badge--green"><span class="dot"></span>Assinado em 14/06 · 09h31</span>
    </div></div>
    <div class="phone__actions"><button class="btn btn--block" data-action="mobile-restart">Concluir</button></div>`;
  }
  if (APP.mobileStep === 'refused') {
    return `<div class="phone__scroll"><div class="m-success refusal">
      <div class="seal">${icon('x')}</div>
      <h2>Recusa registrada</h2>
      <p>Tudo bem, Marta. A diretoria foi avisada e poderá conversar com você se precisar.</p>
    </div></div>
    <div class="phone__actions"><button class="btn btn--block" data-action="mobile-restart">Concluir</button></div>`;
  }
  if (APP.mobileStep === 'confirm') {
    return `<div class="phone__scroll">
      <div class="m-org">
        <div class="mini-badge">${DATA.club.initials}</div>
        <div><div class="t">${DATA.club.name}</div><div class="s">Autorização de saída</div></div>
      </div>
      <div class="m-pad">
        <h2 style="font-size:22px">Confirme a autorização</h2>
        <p style="color:var(--ink-2);margin-top:6px">Leia o termo abaixo antes de confirmar.</p>
      </div>
      <div class="m-card" style="background:#fafbfc">
        <div class="eyebrow">Termo de autorização</div>
        <p style="margin-top:8px;font-size:13.5px;color:var(--ink-2);line-height:1.5">
          Autorizo a participação de <strong>${lucas.name}</strong> no evento <strong>${ev.name}</strong>,
          de ${ev.dates}, em ${ev.place}. Estou ciente das atividades e do que levar, e confirmo os dados de contato de emergência.
        </p>
      </div>
      <div class="m-pad">
        <div class="confirm-box">
          <input type="checkbox" id="confirmChk">
          <label for="confirmChk">Eu, <strong>Marta Andrade Silva</strong>, responsável por Lucas, li e autorizo a participação.</label>
        </div>
      </div>
    </div>
    <div class="phone__actions">
      <button class="btn btn--primary btn--block btn--lg" data-action="auth-confirm">${icon('shieldCheck')} Confirmar autorização</button>
      <button class="btn btn--ghost btn--block" style="margin-top:8px" data-action="mobile-restart">Voltar</button>
    </div>`;
  }
  if (APP.mobileStep === 'refuse') {
    return `<div class="phone__scroll">
      <div class="m-org">
        <div class="mini-badge">${DATA.club.initials}</div>
        <div><div class="t">${DATA.club.name}</div><div class="s">Autorização de saída</div></div>
      </div>
      <div class="m-pad">
        <h2 style="font-size:22px">Não autorizar</h2>
        <p style="color:var(--ink-2);margin-top:6px">Se quiser, conte o motivo. É opcional e ajuda a diretoria a entender.</p>
        <div style="height:14px"></div>
        <textarea class="reason-field" placeholder="Motivo (opcional)…"></textarea>
      </div>
    </div>
    <div class="phone__actions">
      <button class="btn btn--block btn--lg" style="border-color:var(--red-600);color:var(--red-600)" data-action="refuse-confirm">Confirmar recusa</button>
      <button class="btn btn--ghost btn--block" style="margin-top:8px" data-action="mobile-restart">Voltar</button>
    </div>`;
  }

  // intro
  return `<div class="phone__scroll">
    <div class="m-org">
      <div class="mini-badge">${DATA.club.initials}</div>
      <div><div class="t">${DATA.club.name}</div><div class="s">Autorização de saída</div></div>
    </div>
    <div class="m-pad">
      <h2 style="font-size:24px">Olá, Marta!</h2>
      <p style="color:var(--ink-2);margin-top:6px">Você recebeu uma autorização para revisar e assinar. Leve um minutinho para conferir os detalhes.</p>
      <div style="height:14px"></div>
      <span class="m-deadline">${icon('clock')} Faltam 3 dias — assine até ${ev.deadline}</span>
    </div>
    <div class="m-card">
      <div class="eyebrow">Você está autorizando</div>
      <div style="display:flex;gap:14px;align-items:center;margin-top:12px">
        ${photoAvatar('avatar--lg')}
        <div><div style="font-weight:800;font-size:17px">${DATA.lucas.name}</div><div style="color:var(--ink-2);font-size:14px">Unidade ${DATA.lucas.unit} · ${DATA.lucas.age} anos</div></div>
      </div>
    </div>
    <div class="m-card">
      <div class="eyebrow">O evento</div>
      <h3 style="color:var(--navy-800);font-size:19px;margin:6px 0 8px">${ev.name}</h3>
      <div class="m-event-field">${icon('calendar')}<div><div class="k">Quando</div><div class="v">${ev.dates}</div></div></div>
      <div class="m-event-field">${icon('mapPin')}<div><div class="k">Onde</div><div class="v">${ev.place}</div></div></div>
      <div class="m-event-field">${icon('backpack')}<div><div class="k">O que levar</div><div class="v">${ev.bring}</div></div></div>
    </div>
    <div style="height:8px"></div>
  </div>
  <div class="phone__actions">
    <button class="btn btn--primary btn--block btn--lg" data-action="auth-start">${icon('shieldCheck')} Autorizar</button>
    <button class="btn btn--ghost btn--block" style="margin-top:6px" data-action="refuse-start">Não autorizar</button>
  </div>`;
}

/* ======================= PESSOAS · Desbravadores ======================== */
Screens['pessoas-desbravadores'] = function () {
  const byUnit = DATA.units.map((u) => ({ unit: u, list: DATA.pathfinders.filter((p) => p.unit === u) }));
  const pills = [['todas', 'Todas as unidades', DATA.pathfinders.length],
    ...DATA.units.map((u) => [u, u, DATA.pathfinders.filter((p) => p.unit === u).length])];
  return `
    ${crumbs([{ label: 'Pessoas', view: 'pessoas-desbravadores' }, { label: 'Desbravadores' }])}
    ${pessoasSubtabs('desbravadores')}
    <div class="page-head">
      <div><h1>Desbravadores</h1><p class="sub">${DATA.pathfinders.length} desbravadores ativos em ${DATA.units.length} unidades.</p></div>
      <button class="btn btn--primary" data-toast="Cadastro de desbravador — ilustrativo nesta demo.">${icon('userPlus')} Adicionar desbravador</button>
    </div>
    <div class="search"><span>${icon('search')}</span><input placeholder="Buscar por nome…" data-search="desb"></div>
    <div class="filters">
      ${pills.map(([k, l, n], i) => `<button class="filter-pill ${i === 0 ? 'is-active' : ''}" data-action="unit-filter" data-unit="${k}">${l} <span class="n">${n}</span></button>`).join('')}
    </div>
    ${byUnit.map(({ unit, list }) => `
      <div data-unit-group="${unit}" data-group="desb">
        <div class="group-label"><span class="t">Unidade ${unit}</span><span class="n">${list.length}</span></div>
        <div class="list">
          ${list.map((p) => `
            <button class="row clickable" data-searchable="desb" data-name="${p.name.toLowerCase()}" data-view="ficha-desbravador" data-id="${p.id}">
              ${avatar(DATA.initials(p.name))}
              <div class="row__main"><div class="row__title">${p.name}</div><div class="row__sub">Unidade ${p.unit} · ${p.age} anos</div></div>
              <div class="row__end">${badge(p.specialties + ' especialidades', 'badge--navy-soft')}${icon('chevronRight', 'chev')}</div>
            </button>`).join('')}
        </div>
      </div>`).join('')}`;
};

/* ======================= PESSOAS · Liderança ============================ */
Screens['pessoas-lideranca'] = function () {
  return `
    ${crumbs([{ label: 'Pessoas', view: 'pessoas-desbravadores' }, { label: 'Liderança' }])}
    ${pessoasSubtabs('lideranca')}
    <div class="page-head">
      <div><h1>Liderança</h1><p class="sub">Quem opera o clube. Uma pessoa pode acumular vários papéis — e parte da liderança é adolescente.</p></div>
      <button class="btn btn--primary" data-toast="Cadastro de liderança — ilustrativo nesta demo.">${icon('userPlus')} Adicionar pessoa à liderança</button>
    </div>
    <div style="display:flex;gap:12px;margin-bottom:6px">
      <div class="search"><span>${icon('search')}</span><input placeholder="Buscar por nome…" data-search="lead"></div>
      <select class="select-plain">${DATA.roleFilters.map((r) => `<option>${r}</option>`).join('')}</select>
    </div>
    <div style="height:12px"></div>
    <div class="list" data-group="lead">
      ${DATA.leaders.map((l) => {
        const roles = l.roles.map((r) => `<span class="badge ${r.primary ? 'role' : 'role--alt'}">${r.t}</span>`).join('');
        const unitTxt = l.unit ? ` <span style="color:var(--ink-2)">· Unidade ${l.unit}</span>` : '';
        const minorTag = l.minor ? ' ' + `<span class="badge badge--gold"><span class="dot"></span>Menor de 18 · ${l.age}</span>` : '';
        return `
          <button class="row clickable" data-searchable="lead" data-name="${l.name.toLowerCase()}" data-view="ficha-lideranca" data-id="${l.id}">
            ${avatar(l.initials)}
            <div class="row__main">
              <div class="row__title">${l.name}${minorTag}</div>
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:6px">${roles}${unitTxt}</div>
            </div>
            <div class="row__end" style="text-align:right">
              <div style="color:var(--ink-2);font-size:13px;line-height:1.6">${l.email}<br>${l.phone}</div>
              ${icon('chevronRight', 'chev')}
            </div>
          </button>`;
      }).join('')}
    </div>`;
};

/* ======================= PESSOAS · Externos ============================= */
Screens['pessoas-externos'] = function () {
  return `
    ${crumbs([{ label: 'Pessoas', view: 'pessoas-desbravadores' }, { label: 'Externos' }])}
    ${pessoasSubtabs('externos')}
    <div class="page-head">
      <div><h1>Externos</h1><p class="sub">Instrutores e palestrantes convidados. Não têm conta — são registros de contato com histórico entre clubes.</p></div>
      <div style="display:flex;gap:10px">
        <button class="btn" data-view="busca-instrutor">${icon('search')} Buscar instrutor</button>
        <button class="btn btn--primary" data-toast="Convite de externo — ilustrativo nesta demo.">${icon('userPlus')} Convidar externo</button>
      </div>
    </div>
    <div class="search"><span>${icon('search')}</span><input placeholder="Buscar por nome ou especialidade…" data-search="ext"></div>
    <div style="height:14px"></div>
    <div class="list" data-group="ext">
      ${DATA.externals.map((x) => `
        <button class="row clickable" data-searchable="ext" data-name="${(x.name + ' ' + x.specialty).toLowerCase()}" data-view="ficha-externo" data-id="${x.id}">
          <div class="avatar" style="background:${x.tone};color:var(--navy-700)">${x.initials}</div>
          <div class="row__main">
            <div class="row__title">${x.name}</div>
            <div class="row__sub" style="display:flex;align-items:center;gap:7px"><span class="dot" style="width:7px;height:7px;border-radius:50%;background:${x.dot};display:inline-block"></span>${x.specialty}</div>
          </div>
          <div class="row__end">
            <span class="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><path d="M12 2 4 5v6c0 5 8 11 8 11s8-6 8-11V5Z"/></svg>Atuou em <strong>${x.clubs}</strong> clubes · <strong>${x.activities}</strong> atividades</span>
            <span style="color:var(--ink-3);font-size:13px">última: ${x.last}</span>
            ${icon('chevronRight', 'chev')}
          </div>
        </button>`).join('')}
    </div>`;
};

/* ======================= FICHA · Desbravador ============================ */
Screens['ficha-desbravador'] = function () {
  const L = DATA.lucas;
  const tabBtn = (k, label, ic) => `<button data-action="ficha-tab" data-tab="${k}" class="${APP.fichaTab === k ? 'is-active' : ''}">${ic ? icon(ic) : ''}${label}</button>`;
  let body = '';
  if (APP.fichaTab === 'progresso') body = progressoDesbravador();
  else if (APP.fichaTab === 'sensiveis') body = dadosSensiveis();
  else body = infoGeralDesbravador();
  return `
    ${crumbs([{ label: 'Pessoas', view: 'pessoas-desbravadores' }, { label: 'Desbravadores', view: 'pessoas-desbravadores' }, { label: L.name }])}
    <div class="card profile-head">
      ${photoAvatar('avatar--xl')}
      <div class="ph-main">
        <h1>${L.name}</h1>
        <div class="ph-sub">Unidade ${L.unit} · ${L.age} anos · ${DATA.club.name}</div>
      </div>
      <div class="ph-stats"><div><strong>${L.specialties}</strong> especialidades</div><div><strong>${L.classesDone}</strong> classes concluídas</div></div>
    </div>
    <div class="subtabs" style="margin-top:18px">
      ${tabBtn('info', 'Informações gerais')}
      ${tabBtn('progresso', 'Progresso')}
      ${tabBtn('sensiveis', 'Dados sensíveis', 'lock')}
    </div>
    <div class="fade-in">${body}</div>`;
};

function fieldList(obj) {
  return Object.entries(obj).map(([k, v]) => `<div class="field"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('');
}

function infoGeralDesbravador() {
  const L = DATA.lucas;
  return `
    <div class="info-grid">
      <div class="info-panel"><div class="eyebrow">Dados pessoais</div>${fieldList(L.personal)}</div>
      <div class="info-panel"><div class="eyebrow">Contato & endereço</div>${fieldList(L.contact)}</div>
      <div class="info-panel"><div class="eyebrow">Dados escolares</div>${fieldList(L.school)}</div>
      <div class="info-panel"><div class="eyebrow">Responsáveis</div>
        ${L.guardians.map((g) => `<div class="resp-card">${avatar(g.initials)}<div><div class="nm">${g.name}</div><div class="meta">${g.rel}</div><div class="meta">${g.contact}</div></div></div>`).join('')}
      </div>
    </div>`;
}

function progressoDesbravador() {
  const L = DATA.lucas;
  const journey = DATA.lucasJourney;
  return `
    <div class="info-panel">
      <div class="section-title">Classes</div>
      <div class="section-sub">As classes não são lineares — várias podem andar ao mesmo tempo. A idade é só referência.</div>
      <div class="class-grid">
        ${journey.map((j) => {
          if (j.state === 'done') return `<div class="class-card done"><div class="cc-top"><div class="cc-name">${j.name}</div><div class="cc-age">${j.age} anos</div></div><div class="cc-state">${icon('check')} Concluída</div></div>`;
          if (j.state === 'current') return `<div class="class-card active"><div class="cc-top"><div class="cc-name">${j.name}</div><div class="cc-age">${j.age} anos</div></div><div class="cc-state">Em andamento · ${L.currentClass.done}/${L.currentClass.req}</div><div class="cc-track"><div class="cc-fill" style="width:${(L.currentClass.done / L.currentClass.req) * 100}%"></div></div></div>`;
          if (j.state === 'progress') return `<div class="class-card active"><div class="cc-top"><div class="cc-name">${j.name}</div><div class="cc-age">${j.age} anos</div></div><div class="cc-state">Iniciada · 3/25</div><div class="cc-track"><div class="cc-fill" style="width:12%"></div></div></div>`;
          return `<div class="class-card"><div class="cc-top"><div class="cc-name">${j.name}</div><div class="cc-age">${j.age} anos</div></div><div class="cc-state" style="color:var(--ink-3)">Não iniciada</div></div>`;
        }).join('')}
      </div>
    </div>
    <div style="height:18px"></div>
    <div class="info-grid" style="grid-template-columns:1fr 1.4fr">
      <div class="info-panel">
        <div class="section-title">Especialidades por categoria</div>
        <div class="section-sub">${L.specialties} conquistadas · ${L.specInProgress} em andamento</div>
        ${categoryBars(DATA.lucasSpecByCategory)}
        <p class="muted-note" style="margin-top:14px">Insígnias representadas de forma genérica (círculo da categoria + ícone) — as artes oficiais são registradas.</p>
      </div>
      <div class="info-panel">
        <div class="section-title">Galeria de especialidades</div>
        <div class="search" style="margin:8px 0 16px"><span>${icon('search')}</span><input placeholder="Buscar especialidade…" data-search="spec"></div>
        <div class="spec-gallery" data-group="spec">
          ${DATA.lucasSpecialties.map((s) => `<div data-searchable="spec" data-name="${s.name.toLowerCase()}">${specialtyGallery([s])}</div>`).join('')}
        </div>
      </div>
    </div>`;
}

function dadosSensiveis() {
  if (!APP.pinUnlocked) {
    return `
      <div class="card pin-gate">
        <div class="lock">${icon('lock')}</div>
        <h3>Dados sensíveis protegidos</h3>
        <p>Digite o PIN de 4 dígitos para liberar nesta sessão. (Demo: qualquer 4 dígitos funcionam.)</p>
        <div class="pin-inputs">
          <input maxlength="1" inputmode="numeric" aria-label="dígito 1">
          <input maxlength="1" inputmode="numeric" aria-label="dígito 2">
          <input maxlength="1" inputmode="numeric" aria-label="dígito 3">
          <input maxlength="1" inputmode="numeric" aria-label="dígito 4">
        </div>
        <button class="btn btn--primary btn--block" data-action="pin-submit">${icon('unlock')} Liberar acesso</button>
      </div>`;
  }
  return `
    <div class="session-bar">
      <span style="display:inline-flex;gap:8px;align-items:center">${icon('unlock')} Acesso liberado nesta sessão</span>
      <button class="btn btn--sm" data-action="pin-lock">${icon('lock')} Bloquear novamente</button>
    </div>
    <div class="info-grid">
      <div class="info-panel"><div class="eyebrow">Saúde</div>
        ${fieldList({ 'Tipo sanguíneo': 'O+', 'Alergias': 'Dipirona', 'Restrições alimentares': 'Nenhuma', 'Observações médicas': 'Usa óculos para longe' })}
      </div>
      <div class="info-panel"><div class="eyebrow">Convênio & documentos</div>
        ${fieldList({ 'Plano de saúde': 'Unimed · carteirinha 0099-4521', 'RG': '45.812.330-7', 'CPF': '512.330.118-04', 'Contato de emergência': 'Marta Andrade · (12) 99876-5432' })}
      </div>
    </div>
    <p class="protect-note" style="margin-top:16px">${icon('shield')} Acesso a dados sensíveis é registrado. Trate com responsabilidade.</p>`;
}

/* ======================= FICHA · Liderança (Letícia, menor) ============= */
Screens['ficha-lideranca'] = function () {
  const L = DATA.leticia;
  const tabBtn = (k, label, ic) => `<button data-action="ficha-tab" data-tab="${k}" class="${APP.fichaTab === k ? 'is-active' : ''}">${ic ? icon(ic) : ''}${label}</button>`;
  let body = '';
  if (APP.fichaTab === 'progresso') body = progressoLideranca();
  else if (APP.fichaTab === 'sensiveis') body = dadosSensiveis();
  else body = infoGeralLideranca();
  return `
    ${crumbs([{ label: 'Pessoas', view: 'pessoas-desbravadores' }, { label: 'Liderança', view: 'pessoas-lideranca' }, { label: L.name }])}
    ${backlink('Liderança', 'pessoas-lideranca')}
    <div class="card profile-head">
      ${avatar(L.initials, 'avatar--xl')}
      <div class="ph-main">
        <h1>${L.name}
          <span class="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>2FA inativo</span>
          <span class="badge badge--gold"><span class="dot"></span>Menor de 18 · ${L.age} anos</span>
        </h1>
        <div class="ph-sub"><span class="badge role">${L.role}</span> · ${L.roleDesc}</div>
        <div class="ph-contact"><span>${icon('mail')} ${L.email}</span><span>${icon('phone')} ${L.phone}</span></div>
      </div>
    </div>
    <div class="subtabs" style="margin-top:18px">
      ${tabBtn('info', 'Informações gerais')}
      ${tabBtn('progresso', 'Progresso')}
      ${tabBtn('sensiveis', 'Dados sensíveis', 'lock')}
    </div>
    <div class="fade-in">${body}</div>`;
};

function infoGeralLideranca() {
  const L = DATA.leticia;
  return `
    <div class="info-grid">
      <div class="info-panel"><div class="eyebrow">Dados pessoais</div>${fieldList(L.personal)}</div>
      <div class="info-panel"><div class="eyebrow">Contato & endereço</div>${fieldList(L.contact)}</div>
      <div class="info-panel"><div class="eyebrow">Cargos e permissões</div>
        <div class="resp-card" style="background:#f6f8fb"><div><div class="nm">${L.permissions.title}</div><div class="meta">${L.permissions.desc}</div></div></div>
      </div>
      <div class="info-panel"><div class="eyebrow">Unidades vinculadas</div>
        <div class="field" style="display:flex;align-items:center;gap:10px;border:none">${icon('users')}<span>Unidade <strong>${L.linkedUnits.join(', ')}</strong></span></div>
      </div>
      <div class="info-panel" style="grid-column:1/-1">
        <div class="eyebrow">Responsáveis vinculados</div>
        <div class="protect-banner" style="margin:12px 0">${icon('shield')} Líder menor de 18 — mantém proteção de menor.</div>
        ${L.guardians.map((g) => `<div class="resp-card">${avatar(g.initials)}<div><div class="nm">${g.name}</div><div class="meta">${g.rel}</div></div></div>`).join('')}
      </div>
    </div>`;
}

function progressoLideranca() {
  const L = DATA.leticia;
  return `
    <div class="info-panel">
      <div class="section-title">Jornada de classes (regular)</div>
      <div class="section-sub">Letícia também é desbravadora — segue as classes regulares, como qualquer membro.</div>
      ${journeyRow(L.journey)}
    </div>
    <div style="height:18px"></div>
    <div class="info-panel">
      <div class="section-title">Especialidades por categoria</div>
      <div class="section-sub">Especialidades regulares conquistadas.</div>
      ${categoryBars(L.specByCategory)}
    </div>
    <div style="height:18px"></div>
    <div class="lead-block">
      <div class="eyebrow">Trilha de liderança</div>
      <h3>Classes de liderança</h3>
      <div class="lead-levels">
        ${L.leaderClasses.map((c) => `<div class="lead-level"><div class="ll-name">${c.name}</div><div class="ll-state">${c.done ? '✓ ' : ''}${c.state}</div></div>`).join('')}
      </div>
      <div style="height:20px"></div>
      <div class="eyebrow">Pode instruir</div>
      <div class="spec-chips" style="margin-top:10px">
        ${L.canInstruct.map((s) => `<span class="badge" style="background:rgba(255,255,255,.12);color:#fff">${icon('award')} ${s}</span>`).join('')}
      </div>
    </div>`;
}

/* ======================= FICHA · Externo (Anderson) ===================== */
Screens['ficha-externo'] = function () {
  const A = DATA.anderson;
  return `
    ${crumbs([{ label: 'Pessoas', view: 'pessoas-desbravadores' }, { label: 'Externos', view: 'pessoas-externos' }, { label: A.name }])}
    ${pessoasSubtabs('externos')}
    ${backlink('Externos', 'pessoas-externos')}
    <div class="card card--pad">
      <div style="display:flex;gap:20px;align-items:flex-start">
        <div class="avatar avatar--xl" style="background:${A.tone};color:var(--navy-700)">${A.initials}</div>
        <div style="flex:1">
          <h1 style="font-size:24px">${A.name}</h1>
          <div class="ph-contact" style="margin-top:8px">
            <span>${icon('mail')} ${A.email}</span>
            <span>${icon('phone')} ${A.phone}</span>
            <span>${icon('mapPin')} ${A.city}</span>
          </div>
          <div class="spec-chips">${A.specialties.map((s) => `<span class="badge badge--navy-soft">${s}</span>`).join('')}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <button class="btn btn--primary" data-done="Convite enviado" data-toast="Convite enviado a ${A.name}.">${icon('calendar')} Convidar para um evento</button>
          <button class="btn" data-done="Relatório gerado" data-toast="Relatório de comprovação gerado (demo).">${icon('fileText')} Gerar relatório de comprovação</button>
        </div>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:18px;padding-top:18px;border-top:1px solid var(--border-2)">
        <span class="badge badge--gold">${icon('award')} Reconhecido por ${A.recognizedBy} clubes da plataforma</span>
        <span class="badge badge--green">${icon('shieldCheck')} Consentiu em compartilhar histórico entre clubes</span>
      </div>
      <p class="protect-note">${icon('clock')} Registro de contato — o externo não acessa o sistema.</p>
    </div>

    <div style="height:18px"></div>
    <div class="card card--pad">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:19px">Histórico de atuação entre clubes</h3>
        <span style="color:var(--ink-2)">Atuou em <strong style="color:var(--ink)">${A.clubsCount} clubes diferentes</strong> · ${A.activitiesCount} atividades registradas</span>
      </div>
      <div class="timeline" style="margin-top:8px">
        ${A.history.map((h) => `
          <div class="tl-row">
            <div class="tl-icn">${icon('fileText')}</div>
            <div class="tl-main">
              <div class="tt">${h.club} <span class="badge">${h.role}</span></div>
              <div class="td">${h.activity}</div>
            </div>
            <div class="tl-date">${h.date}</div>
          </div>`).join('')}
      </div>
    </div>`;
};

/* ======================= BUSCA REVERSA DE INSTRUTOR ===================== */
Screens['busca-instrutor'] = function () {
  return `
    ${crumbs([{ label: 'Pessoas', view: 'pessoas-desbravadores' }, { label: 'Externos', view: 'pessoas-externos' }, { label: 'Buscar instrutor' }])}
    ${backlink('Externos', 'pessoas-externos')}
    <div class="page-head"><div><h1>Buscar instrutor</h1><p class="sub">Encontre externos com histórico de confiança para a especialidade ou atividade que você precisa.</p></div></div>
    <div class="card card--pad">
      <label class="eyebrow">Do que você precisa?</label>
      <div class="search" style="margin-top:10px"><span>${icon('search')}</span><input placeholder="Ex.: instrutor de Primeiros Socorros para acampamento" data-search="ext"></div>
      <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
        <select class="select-plain"><option>Qualquer categoria</option>${DATA.categories.map((c) => `<option>${c.name}</option>`).join('')}</select>
        <select class="select-plain"><option>Qualquer distância</option><option>Até 50 km</option><option>Até 100 km</option></select>
        <select class="select-plain"><option>Reconhecido por qualquer nº de clubes</option><option>3+ clubes</option><option>5+ clubes</option></select>
      </div>
    </div>
    <div style="height:18px"></div>
    <div class="group-label"><span class="t">Resultados</span><span class="n">${DATA.externals.length}</span></div>
    <div class="list" data-group="ext">
      ${DATA.externals.map((x) => `
        <div class="row" data-searchable="ext" data-name="${(x.name + ' ' + x.specialty).toLowerCase()}">
          <div class="avatar" style="background:${x.tone};color:var(--navy-700)">${x.initials}</div>
          <div class="row__main">
            <div class="row__title">${x.name}</div>
            <div class="row__sub" style="display:flex;align-items:center;gap:7px"><span style="width:7px;height:7px;border-radius:50%;background:${x.dot};display:inline-block"></span>${x.specialty}</div>
          </div>
          <div class="row__end">
            <span class="badge badge--gold">${icon('award')} ${x.clubs} clubes · ${x.activities} atividades</span>
            <button class="btn btn--primary btn--sm" data-done="Convidado" data-toast="Convite enviado a ${x.name}.">${icon('send')} Convidar</button>
          </div>
        </div>`).join('')}
    </div>`;
};

/* ======================= CARTÃO DO DESBRAVADOR (mobile) ================= */
Screens['cartao-desbravador'] = function () {
  const L = DATA.lucas;
  const cc = L.currentClass;
  return `
    <div class="phone-caption">
      <span class="eyebrow">Jasper · cartão do desbravador</span>
      <div class="t">Meu cartão</div>
    </div>
    <div class="phone">
      <div class="phone__screen">
        ${phoneStatusBar()}
        <div class="phone__scroll">
          <div class="cartao-hero">
            <div class="ch-top">
              ${photoAvatar('avatar--lg')}
              <div><h2>${L.name}</h2><div class="ch-sub">Unidade ${L.unit} · ${L.age} anos<br>${DATA.club.name}</div></div>
            </div>
            <div class="ch-stats">
              <div><div class="num">${L.specialties}</div><div class="lab">especialidades</div></div>
              <div><div class="num">${L.classesDone}</div><div class="lab">classes concluídas</div></div>
            </div>
          </div>

          <div class="m-card cartao-class" style="margin-top:-20px">
            <div class="eyebrow" style="color:var(--gold-600)">Sua classe agora</div>
            <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px">
              <h2 style="color:var(--navy-800);font-size:24px">${cc.name}</h2>
              <span style="color:var(--ink-2);font-size:13.5px">classe dos ${cc.age} anos</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin:12px 0 6px">
              <strong>${cc.done} de ${cc.req} requisitos</strong>
              <span style="color:var(--gold-600);font-weight:700">Você está quase lá!</span>
            </div>
            <div class="cc-track" style="height:10px"><div class="cc-fill" style="width:${(cc.done / cc.req) * 100}%;background:var(--navy-700)"></div></div>
            <button class="btn btn--ghost btn--block" style="margin-top:12px;justify-content:space-between" data-toast="Lista de requisitos (demo)">Ver o que falta ${icon('chevronDown')}</button>
          </div>

          <div class="m-card" style="padding:16px 8px">
            <h3 style="font-size:18px;margin:0 8px 14px">Sua jornada</h3>
            ${journeyRow(DATA.lucasJourney)}
          </div>

          <div class="m-card">
            <h3 style="font-size:18px">Minhas especialidades</h3>
            <div style="color:var(--ink-2);font-size:13.5px;margin:2px 0 14px">${L.specialties} conquistadas · ${L.specInProgress} em andamento</div>
            <div class="eyebrow" style="margin-bottom:10px">Por categoria</div>
            ${categoryBars(DATA.lucasSpecByCategory)}
          </div>
          <div style="height:10px"></div>
        </div>
        <div class="phone__actions">
          <button class="btn btn--primary btn--block btn--lg" data-done="Cartão pronto para compartilhar" data-toast="Cartão pronto para compartilhar (demo).">${icon('send')} Compartilhar meu cartão</button>
        </div>
      </div>
    </div>
    <button class="btn btn--sm demo-reset" data-view="cartao-desbravador">${icon('refresh')} Reiniciar demonstração</button>`;
};

/* ======================= Páginas auxiliares (nav completo) ============== */
function lightPage(title, sub, body) {
  return `<div class="page-head"><div><h1>${title}</h1><p class="sub">${sub}</p></div></div>${body}`;
}

Screens['eventos'] = function () {
  return lightPage('Eventos', 'Calendário e organização das atividades do clube.',
    `<div class="grid">${DATA.authorizations.map((a) => `
      <div class="card card--pad" style="display:flex;justify-content:space-between;align-items:center;gap:16px">
        <div style="display:flex;gap:14px;align-items:center">
          <div class="card-icn" style="background:#eef1f6;color:var(--navy-700)">${icon('calendar')}</div>
          <div><div style="font-weight:700;font-size:16px">${a.name}</div><div style="color:var(--ink-2);font-size:14px">${a.dates}</div></div>
        </div>
        <button class="btn btn--sm" data-view="autorizacao-detalhe" data-id="inverno">Ver autorizações</button>
      </div>`).join('')}
    </div>
    <p class="muted-note" style="margin-top:20px">Seção ilustrativa desta demo — o foco da apresentação está em Autorizações e Pessoas.</p>`);
};

Screens['financeiro'] = function () {
  return lightPage('Financeiro', 'Resumo de mensalidades, entradas e saídas do clube.',
    `<div class="grid grid-4">
      <div class="card kpi"><div class="label">Saldo do mês</div><div class="value">+R$ 1.240</div><div class="delta"><span class="tag">${icon('trendingUp')} positivo</span></div></div>
      <div class="card kpi"><div class="label">Entradas (jun)</div><div class="value">R$ 2.480</div></div>
      <div class="card kpi"><div class="label">Saídas (jun)</div><div class="value">R$ 1.240</div></div>
      <div class="card kpi"><div class="label">Em atraso</div><div class="value" style="color:var(--red-600)">8</div><div class="delta">mensalidades · R$ 640,00</div></div>
    </div>
    <div style="height:18px"></div>
    <div class="card card--pad"><div class="eyebrow">Tratar com discrição</div><h3 style="margin-top:4px">Inadimplência</h3>
      <p style="color:var(--ink-2);margin-top:8px">8 famílias com mensalidades em atraso. O Jasper sugere abordagens discretas e acolhedoras — sem expor ninguém.</p>
      <button class="btn btn--sm" style="margin-top:14px" data-done="Lembrete enviado" data-toast="Lembrete gentil enviado (demo).">${icon('send')} Enviar lembrete gentil</button>
    </div>
    <p class="muted-note" style="margin-top:20px">Seção ilustrativa desta demo.</p>`);
};

Screens['comunicacao'] = function () {
  return lightPage('Comunicação', 'Avisos, mensagens aos responsáveis e mural do clube.',
    `<div class="card card--pad"><div class="attn-head"><div class="card-icn" style="background:var(--gold-soft);color:var(--gold-600)">${icon('bell')}</div><div><div class="eyebrow">Mural</div><h3>Próximo comunicado</h3></div></div>
      <p style="color:var(--ink-2);margin-top:10px">"Reunião regular neste sábado às 14h. Tragam o uniforme completo. Teremos ensaio para o Acampamento de Inverno."</p>
      <button class="btn btn--sm" style="margin-top:14px" data-done="Comunicado enviado" data-toast="Comunicado enviado aos responsáveis (demo).">${icon('send')} Enviar aos responsáveis</button>
    </div>
    <p class="muted-note" style="margin-top:20px">Seção ilustrativa desta demo.</p>`);
};
