/* ==========================================================================
   Jasper — Dados de exemplo (TODOS num só lugar, consistentes)
   Demo estática. Nada de backend. Tudo hardcoded.
   ========================================================================== */

const DATA = {};

DATA.club = { name: 'Clube Águias Reais', initials: 'ÁR' };

DATA.user = {
  name: 'Renata Soares',
  role: 'Secretária',
  initials: 'RS',
};

DATA.today = 'Sábado, 14 de junho de 2026';

DATA.units = ['Falcões', 'Águias', 'Panteras', 'Leões', 'Tigres'];

/* Categorias de especialidade + cor (representações genéricas, NÃO oficiais) */
DATA.categories = [
  { key: 'ADRA', name: 'ADRA', color: '#7c8aa3' },
  { key: 'artes', name: 'Artes e Habilidades Manuais', color: '#2f6fb0' },
  { key: 'agricolas', name: 'Atividades Agrícolas', color: '#2e7d5b' },
  { key: 'missionarias', name: 'Atividades Missionárias e Comunitárias', color: '#c0392b' },
  { key: 'profissionais', name: 'Atividades Profissionais', color: '#6b7280' },
  { key: 'recreativas', name: 'Atividades Recreativas', color: '#e0742e' },
  { key: 'ciencia', name: 'Ciência e Saúde', color: '#2f9bd0' },
  { key: 'natureza', name: 'Estudos da Natureza', color: '#3a8f3a' },
  { key: 'domesticas', name: 'Habilidades Domésticas', color: '#c8911f' },
];
DATA.categoryByKey = Object.fromEntries(DATA.categories.map((c) => [c.key, c]));

/* Classes regulares (não-lineares — idade é só referência) */
DATA.classes = [
  { name: 'Amigo', age: 10 },
  { name: 'Companheiro', age: 11 },
  { name: 'Pesquisador', age: 12 },
  { name: 'Pioneiro', age: 13 },
  { name: 'Excursionista', age: 14 },
  { name: 'Guia', age: 15 },
];

/* ---- Roster de desbravadores (30, distribuídos pelas 5 unidades) -------- */
DATA.pathfinders = [
  // Falcões (7)
  { id: 'lucas', name: 'Lucas Andrade Silva', unit: 'Falcões', age: 12, specialties: 15 },
  { id: 'beatriz', name: 'Beatriz Costa', unit: 'Falcões', age: 11, specialties: 7 },
  { id: 'sofia', name: 'Sofia Souza', unit: 'Falcões', age: 10, specialties: 5 },
  { id: 'arthur', name: 'Arthur Gomes', unit: 'Falcões', age: 15, specialties: 14 },
  { id: 'cecilia', name: 'Cecília Nunes', unit: 'Falcões', age: 14, specialties: 11 },
  { id: 'clara', name: 'Clara Teixeira', unit: 'Falcões', age: 13, specialties: 11 },
  { id: 'vicente', name: 'Vicente Dias', unit: 'Falcões', age: 12, specialties: 8 },
  // Águias (5)
  { id: 'gabriel', name: 'Gabriel Lima', unit: 'Águias', age: 11, specialties: 5 },
  { id: 'mariana', name: 'Mariana Rocha', unit: 'Águias', age: 13, specialties: 9 },
  { id: 'felipe', name: 'Felipe Castro', unit: 'Águias', age: 12, specialties: 6 },
  { id: 'laura', name: 'Laura Pinto', unit: 'Águias', age: 14, specialties: 10 },
  { id: 'daniel', name: 'Daniel Souza', unit: 'Águias', age: 10, specialties: 4 },
  // Panteras (7)
  { id: 'pedro', name: 'Pedro Oliveira', unit: 'Panteras', age: 12, specialties: 6 },
  { id: 'murilo', name: 'Murilo Almeida', unit: 'Panteras', age: 14, specialties: 9 },
  { id: 'rafael', name: 'Rafael Mendes', unit: 'Panteras', age: 13, specialties: 8 },
  { id: 'julia', name: 'Júlia Ferreira', unit: 'Panteras', age: 11, specialties: 7 },
  { id: 'bruno', name: 'Bruno Carvalho', unit: 'Panteras', age: 15, specialties: 12 },
  { id: 'larissa', name: 'Larissa Dias', unit: 'Panteras', age: 12, specialties: 5 },
  { id: 'enzo', name: 'Enzo Martins', unit: 'Panteras', age: 10, specialties: 3 },
  // Leões (5)
  { id: 'thiago', name: 'Thiago Barros', unit: 'Leões', age: 13, specialties: 8 },
  { id: 'camila', name: 'Camila Nunes', unit: 'Leões', age: 12, specialties: 6 },
  { id: 'otavio', name: 'Otávio Ramos', unit: 'Leões', age: 14, specialties: 9 },
  { id: 'isabela', name: 'Isabela Cruz', unit: 'Leões', age: 11, specialties: 5 },
  { id: 'heitor', name: 'Heitor Lopes', unit: 'Leões', age: 10, specialties: 4 },
  // Tigres (6)
  { id: 'helena', name: 'Helena Rodrigues', unit: 'Tigres', age: 11, specialties: 6 },
  { id: 'manuela', name: 'Manuela Reis', unit: 'Tigres', age: 13, specialties: 8 },
  { id: 'davi', name: 'Davi Moreira', unit: 'Tigres', age: 12, specialties: 7 },
  { id: 'valentina', name: 'Valentina Cardoso', unit: 'Tigres', age: 14, specialties: 10 },
  { id: 'gustavo', name: 'Gustavo Pereira', unit: 'Tigres', age: 10, specialties: 4 },
  { id: 'yasmin', name: 'Yasmin Teixeira', unit: 'Tigres', age: 11, specialties: 5 },
];

/* Distribuição por unidade (derivada do roster) */
DATA.unitCounts = DATA.units.map((u) => ({
  unit: u,
  count: DATA.pathfinders.filter((p) => p.unit === u).length,
}));

/* ---- Especialidades por categoria do Lucas (galeria) ------------------- */
/* 15 conquistadas + 3 em andamento; soma por categoria bate com o cartão.   */
DATA.lucasSpecByCategory = {
  ADRA: 0, artes: 3, agricolas: 1, missionarias: 2, profissionais: 1,
  recreativas: 2, ciencia: 3, natureza: 2, domesticas: 1,
};
DATA.lucasSpecialties = [
  { name: 'Nós e Amarras', cat: 'artes', done: true },
  { name: 'Modelagem em Argila', cat: 'artes', done: true },
  { name: 'Cestaria', cat: 'artes', done: false },
  { name: 'Jardinagem', cat: 'agricolas', done: true },
  { name: 'Arte de Acampar', cat: 'recreativas', done: true },
  { name: 'Orientação', cat: 'recreativas', done: false },
  { name: 'Primeiros Socorros', cat: 'ciencia', done: true },
  { name: 'Saúde e Cura', cat: 'ciencia', done: true },
  { name: 'Aptidão Física', cat: 'ciencia', done: false },
  { name: 'Observação de Aves', cat: 'natureza', done: true },
  { name: 'Árvores', cat: 'natureza', done: true },
  { name: 'Culinária', cat: 'domesticas', done: true },
  { name: 'Computação', cat: 'profissionais', done: true },
  { name: 'Mordomia Cristã', cat: 'missionarias', done: true },
  { name: 'Comunicação', cat: 'missionarias', done: true },
];

/* Jornada de classes do Lucas (não-linear) */
DATA.lucasJourney = [
  { name: 'Amigo', age: 10, state: 'done' },
  { name: 'Companheiro', age: 11, state: 'done' },
  { name: 'Pesquisador', age: 12, state: 'current' },
  { name: 'Pioneiro', age: 13, state: 'progress' },
  { name: 'Excursionista', age: 14, state: 'future' },
  { name: 'Guia', age: 15, state: 'future' },
];

/* Ficha completa do Lucas */
DATA.lucas = {
  id: 'lucas',
  name: 'Lucas Andrade Silva',
  unit: 'Falcões',
  age: 12,
  specialties: 15,
  classesDone: 2,
  specInProgress: 3,
  personal: {
    'Nome completo': 'Lucas Andrade Silva',
    'Data de nascimento': '03/02/2014 (12 anos)',
    'Unidade': 'Falcões',
    'No clube desde': 'Fevereiro de 2023',
  },
  contact: {
    'Celular': '(12) 99876-5432',
    'E-mail': 'marta.andrade@email.com',
    'Endereço': 'Rua das Hortênsias, 245 — Vila Nova',
    'Cidade': 'Campos do Jordão / SP · CEP 12460-000',
  },
  school: {
    'Escola': 'E.E. Prof. João Ribeiro',
    'Série': '7º ano do Ensino Fundamental',
    'Período': 'Manhã',
  },
  guardians: [
    { name: 'Marta Andrade Silva', initials: 'MA', rel: 'Mãe · responsável principal', contact: '(12) 99876-5432 · marta.andrade@email.com' },
    { name: 'Carlos Andrade Silva', initials: 'CA', rel: 'Pai', contact: '(12) 99811-2030 · carlos.andrade@email.com' },
  ],
  currentClass: { name: 'Pesquisador', age: 12, req: 18, done: 12 },
};

/* ---- Evento de referência + assinaturas (30) --------------------------- */
DATA.event = {
  name: 'Acampamento de Inverno 2026',
  dates: '10 a 13 de julho · 2026',
  place: 'Sítio Recanto da Serra — Campos do Jordão, SP',
  deadline: '17/06/2026',
  total: 30, signed: 23, pending: 5, refused: 2,
  bring: 'Saco de dormir, lanterna, agasalho, garrafa de água e kit de higiene',
};

/* Helper para gerar assinaturas a partir do roster */
function _resp(first, surname) { return `${first} ${surname}`; }
const _firstSurname = (n) => n.split(' ').slice(1).join(' ');

DATA.signatures = (function () {
  // status especiais definidos manualmente (consistente com prints/spec)
  const pendentes = {
    pedro: { resp: 'Sandra Oliveira', sent: 'enviado há 2 dias' },
    murilo: { resp: 'Roberto Almeida', sent: 'enviado há 4 dias' },
    larissa: { resp: 'Fernanda Dias', sent: 'enviado há 1 dia' },
    otavio: { resp: 'Marcos Ramos', sent: 'enviado há 3 dias' },
    yasmin: { resp: 'Paula Teixeira', sent: 'enviado há 2 dias' },
  };
  const recusadas = {
    enzo: { resp: 'Tânia Martins', reason: 'Viagem em família na mesma data.' },
    daniel: { resp: 'Sérgio Souza', reason: 'Motivo de saúde.' },
  };
  // responsáveis e horários de assinatura para alguns (resto gerado)
  const signedInfo = {
    lucas: { resp: 'Marta Andrade Silva', ts: '28/05 · 21h04' },
    beatriz: { resp: 'Cláudia Costa', ts: '30/05 · 19h47' },
    helena: { resp: 'Paulo Rodrigues', ts: '31/05 · 08h12' },
    sofia: { resp: 'Sandra Souza', ts: '02/06 · 22h31' },
    gabriel: { resp: 'Luiz Lima', ts: '03/06 · 13h09' },
  };
  const tsPool = ['27/05 · 18h22', '29/05 · 09h15', '30/05 · 20h03', '01/06 · 07h48',
    '01/06 · 21h10', '02/06 · 12h36', '03/06 · 19h55', '04/06 · 08h27',
    '04/06 · 22h14', '05/06 · 10h41', '06/06 · 17h09', '07/06 · 09h33',
    '08/06 · 20h50', '09/06 · 07h22', '10/06 · 19h18', '11/06 · 21h47',
    '12/06 · 08h05', '12/06 · 22h39'];
  let tsi = 0;
  return DATA.pathfinders.map((p) => {
    const surname = _firstSurname(p.name);
    if (pendentes[p.id]) {
      return { ...p, status: 'pending', resp: pendentes[p.id].resp, sent: pendentes[p.id].sent };
    }
    if (recusadas[p.id]) {
      return { ...p, status: 'refused', resp: recusadas[p.id].resp, reason: recusadas[p.id].reason, ts: '29/05 · 14h02' };
    }
    const info = signedInfo[p.id];
    return {
      ...p,
      status: 'signed',
      resp: info ? info.resp : _resp(['Ana', 'Paulo', 'Sandra', 'Marcos', 'Luiza', 'Rita', 'João'][p.name.length % 7], surname),
      ts: info ? info.ts : tsPool[tsi++ % tsPool.length],
    };
  });
})();

/* Lista de autorizações (eventos com progresso) */
DATA.authorizations = [
  { id: 'inverno', name: 'Acampamento de Inverno 2026', dates: '10–13 jul · 2026', total: 30, signed: 23, deadline: '17/06', daysLeft: 3, status: 'urgent' },
  { id: 'horto', name: 'Passeio ao Horto Florestal', dates: '20 jun · 2026', total: 18, signed: 16, deadline: '18/06', daysLeft: 9, status: 'open' },
  { id: 'feira', name: 'Feira de Ciências Regional', dates: '02 ago · 2026', total: 24, signed: 9, deadline: '25/07', daysLeft: 22, status: 'open' },
  { id: 'visita', name: 'Visita ao Asilo São Vicente', dates: '24 mai · 2026', total: 20, signed: 20, deadline: '20/05', daysLeft: 0, status: 'done' },
];

/* ---- Liderança --------------------------------------------------------- */
DATA.leaders = [
  { id: 'marcelo', name: 'Marcelo Andrade', initials: 'MA', roles: [{ t: 'Diretor', primary: true }], email: 'marcelo.andrade@email.com', phone: '(12) 99700-1100' },
  { id: 'patricia', name: 'Patrícia Gomes', initials: 'PG', roles: [{ t: 'Diretora associada', primary: true }, { t: 'Instrutora' }], email: 'patricia.gomes@email.com', phone: '(12) 99700-2200' },
  { id: 'renata', name: 'Renata Soares', initials: 'RS', roles: [{ t: 'Secretária', primary: true }, { t: 'Instrutora' }], email: 'renata.soares@email.com', phone: '(12) 99876-1234' },
  { id: 'roberto', name: 'Roberto Lima', initials: 'RL', roles: [{ t: 'Tesoureiro', primary: true }], email: 'roberto.lima@email.com', phone: '(12) 99700-3300' },
  { id: 'daniel-c', name: 'Pr. Daniel Castro', initials: 'PD', roles: [{ t: 'Capelão', primary: true }], email: 'daniel.castro@email.com', phone: '(12) 99700-4400' },
  { id: 'juliana', name: 'Juliana Reis', initials: 'JR', roles: [{ t: 'Conselheira', primary: true }, { t: 'Instrutora' }], unit: 'Águias', email: 'juliana.reis@email.com', phone: '(12) 99700-5500' },
  { id: 'tiago', name: 'Tiago Nunes', initials: 'TN', roles: [{ t: 'Conselheiro', primary: true }], unit: 'Panteras', email: 'tiago.nunes@email.com', phone: '(12) 99700-6600' },
  { id: 'sara', name: 'Sara Mendes', initials: 'SM', roles: [{ t: 'Conselheira', primary: true }, { t: 'Instrutora' }], unit: 'Tigres', email: 'sara.mendes@email.com', phone: '(12) 99700-7700' },
  { id: 'brunot', name: 'Bruno Tavares', initials: 'BT', roles: [{ t: 'Conselheiro', primary: true }], unit: 'Leões', email: 'bruno.tavares@email.com', phone: '(12) 99700-8800' },
  { id: 'leticia', name: 'Letícia Campos', initials: 'LC', roles: [{ t: 'Conselheira associada', primary: true }], unit: 'Falcões', minor: true, age: 16, email: 'leticia.campos@email.com', phone: '(12) 99700-9900' },
];

DATA.roleFilters = ['Todos os papéis', 'Diretoria', 'Conselheiro', 'Instrutor', 'Tesouraria', 'Capelania'];

/* Ficha da Letícia (líder menor de 18) */
DATA.leticia = {
  id: 'leticia',
  name: 'Letícia Campos', initials: 'LC',
  role: 'Conselheira associada', roleDesc: 'Conselheiro(a) da Unidade Falcões',
  email: 'leticia.campos@email.com', phone: '(12) 99700-9900',
  minor: true, age: 16, twoFA: false,
  personal: {
    'Nome completo': 'Letícia Campos',
    'Data de nascimento': '05/04/2010 (16 anos)',
    'Unidade': 'Falcões',
    'No clube desde': 'Fevereiro de 2023',
  },
  contact: {
    'Celular': '(12) 99700-9900',
    'E-mail': 'leticia.campos@email.com',
    'Endereço': 'Rua das Acácias, 88 — Centro',
    'Cidade': 'Campos do Jordão / SP · CEP 12460-010',
  },
  permissions: { title: 'Conselheira associada', desc: 'Apoia o conselheiro titular no acompanhamento da unidade.' },
  linkedUnits: ['Falcões'],
  guardians: [
    { name: 'Sônia Campos', initials: 'SC', rel: 'Mãe · responsável principal · (12) 99700-9911' },
    { name: 'Eduardo Campos', initials: 'EC', rel: 'Pai · (12) 99700-9922' },
  ],
  // progresso regular (mesmo modelo do desbravador)
  journey: [
    { name: 'Amigo', age: 10, state: 'done' },
    { name: 'Companheiro', age: 11, state: 'done' },
    { name: 'Pesquisador', age: 12, state: 'done' },
    { name: 'Pioneiro', age: 13, state: 'done' },
    { name: 'Excursionista', age: 14, state: 'current' },
    { name: 'Guia', age: 15, state: 'progress' },
  ],
  specByCategory: { ADRA: 1, artes: 4, agricolas: 1, missionarias: 3, profissionais: 2, recreativas: 3, ciencia: 4, natureza: 3, domesticas: 2 },
  // blocos de liderança
  leaderClasses: [
    { name: 'Líder', state: 'Concluída', done: true },
    { name: 'Líder Master', state: 'Em andamento', done: false },
    { name: 'Líder Master Avançado', state: 'Não iniciada', done: false },
  ],
  canInstruct: ['Primeiros Socorros', 'Nós e Amarras', 'Observação de Aves'],
};

/* ---- Externos ---------------------------------------------------------- */
DATA.externals = [
  { id: 'anderson', name: 'Anderson Reis', initials: 'AR', specialty: 'Primeiros Socorros', dot: '#2f9bd0', clubs: 4, activities: 11, last: 'mar/2026', tone: '#dbeafe' },
  { id: 'marina', name: 'Marina Lopes', initials: 'ML', specialty: 'Liderança & meditação', dot: '#c0392b', clubs: 6, activities: 18, last: 'abr/2026', tone: '#fde4e1' },
  { id: 'jorge', name: 'Jorge Tanaka', initials: 'JT', specialty: 'Nós, Amarras e Pioneirias', dot: '#2f6fb0', clubs: 3, activities: 7, last: 'fev/2026', tone: '#dfe7f3' },
  { id: 'beatrizn', name: 'Beatriz Nunes', initials: 'BN', specialty: 'Observação de Aves e Natureza', dot: '#3a8f3a', clubs: 2, activities: 5, last: 'out/2025', tone: '#dcefdc' },
  { id: 'paulov', name: 'Paulo Veras', initials: 'PV', specialty: 'Astronomia', dot: '#2f9bd0', clubs: 5, activities: 9, last: 'dez/2025', tone: '#dbeafe' },
  { id: 'helenac', name: 'Helena Castro', initials: 'HC', specialty: 'Culinária de acampamento', dot: '#c8911f', clubs: 2, activities: 4, last: 'jun/2025', tone: '#faecc9' },
];

DATA.anderson = {
  id: 'anderson', name: 'Anderson Reis', initials: 'AR',
  email: 'anderson.reis@email.com', phone: '(12) 99654-1020', city: 'São José dos Campos / SP',
  tone: '#dbeafe',
  specialties: ['Primeiros Socorros', 'Salvamento Aquático', 'Saúde e Ciência'],
  recognizedBy: 4, consented: true,
  clubsCount: 5, activitiesCount: 8,
  history: [
    { club: 'Clube Águias Reais', role: 'Instrutor', activity: 'Especialidade de Primeiros Socorros', date: 'mar/2026' },
    { club: 'Clube Pioneiros do Vale', role: 'Instrutor', activity: 'Oficina de Salvamento Aquático', date: 'jan/2026' },
    { club: 'Clube Sentinelas da Serra', role: 'Palestrante', activity: 'Palestra: segurança em acampamentos', date: 'nov/2025' },
    { club: 'Clube Águias Reais', role: 'Instrutor', activity: 'Especialidade de Primeiros Socorros (turma 2)', date: 'set/2025' },
    { club: 'Clube Monte Sião', role: 'Instrutor', activity: 'Treinamento de RCP para líderes', date: 'jul/2025' },
    { club: 'Clube Pioneiros do Vale', role: 'Instrutor', activity: 'Especialidade de Saúde', date: 'mai/2025' },
    { club: 'Clube Sentinelas da Serra', role: 'Instrutor', activity: 'Especialidade de Primeiros Socorros', date: 'mar/2025' },
    { club: 'Clube Estrela do Norte', role: 'Instrutor', activity: 'Mutirão de primeiros socorros (camporee)', date: 'out/2024' },
  ],
};

/* ---- Dashboard "Para resolver" ----------------------------------------- */
DATA.dashboard = {
  greeting: 'Bom dia, Renata!',
  attentionCount: 4,
  urgent: [
    { name: 'Acampamento de Inverno 2026', daysLabel: 'em 3 dias', detail: '5 de 30 autorizações ainda não assinadas · prazo 17/06', primary: true, eventId: 'inverno' },
    { name: 'Passeio ao Horto Florestal', daysLabel: 'em 9 dias', detail: '2 de 18 autorizações pendentes', primary: false, eventId: 'horto' },
  ],
  frequency: [
    { id: 'pedro', name: 'Pedro Oliveira', initials: 'PO', unit: 'Panteras', missed: 4 },
    { id: 'beatriz', name: 'Beatriz Costa', initials: 'BC', unit: 'Falcões', missed: 3 },
    { id: 'murilo', name: 'Murilo Almeida', initials: 'MA', unit: 'Panteras', missed: 3 },
  ],
  finance: { count: 8, total: 'R$ 640,00' },
  events: [
    { name: 'Reunião regular', when: 'Sábado, 14/06 · 14h' },
    { name: 'Acampamento de Inverno 2026', when: '10 a 13/07 · Campos do Jordão' },
    { name: 'Passeio ao Horto Florestal', when: 'Sábado, 20/06 · 09h' },
  ],
  birthdays: [
    { id: 'heitor', name: 'Heitor Lopes', initials: 'HL', detail: 'Faz 11 anos · quinta, 19/06' },
    { id: 'manuela', name: 'Manuela Reis', initials: 'MR', detail: 'Faz 14 anos · sábado, 21/06' },
  ],
  footer: 'Tudo certo por aqui. Bom sábado, Renata.',
};

/* ---- Visão geral (gráficos) -------------------------------------------- */
DATA.overview = {
  subtitle: 'Saúde do Clube Águias Reais · junho de 2026',
  kpis: [
    { label: 'Desbravadores ativos', value: '30', delta: '+2', note: 'vs. mês anterior' },
    { label: 'Presença média do mês', value: '87%', delta: '+4 pts', note: 'vs. mês anterior' },
    { label: 'Especialidades no ano', value: '142', delta: '+18', note: 'concluídas em 2026' },
    { label: 'Saldo do mês', value: '+R$ 1.240', delta: 'positivo', note: 'entradas − saídas' },
  ],
  frequency: [
    { m: 'Jan', v: 78 }, { m: 'Fev', v: 82 }, { m: 'Mar', v: 79 },
    { m: 'Abr', v: 85 }, { m: 'Mai', v: 84 }, { m: 'Jun', v: 87 },
  ],
  classProgress: [
    { name: 'Amigo', n: 8 }, { name: 'Companheiro', n: 7 }, { name: 'Pesquisador', n: 5 },
    { name: 'Pioneiro', n: 4 }, { name: 'Excursionista', n: 3 }, { name: 'Guia', n: 3 },
  ],
  finance: { entradas: 2480, saidas: 1240 },
};

/* ---- Helpers de acesso ------------------------------------------------- */
DATA.pathfinderById = Object.fromEntries(DATA.pathfinders.map((p) => [p.id, p]));
DATA.initials = (name) => name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
