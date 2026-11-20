const CFG = window.CINEMA_CONFIG || {};
const DEMO = !CFG.SUPABASE_URL || !CFG.SUPABASE_ANON_KEY;
const H = DEMO ? {} : {apikey: CFG.SUPABASE_ANON_KEY, 'Content-Type': 'application/json', ...(CFG.SUPABASE_ANON_KEY.startsWith('sb_') ? {} : {Authorization: 'Bearer ' + CFG.SUPABASE_ANON_KEY})};
const URL_T = DEMO ? '' : CFG.SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/respostas';
async function enviarResposta(d) {
  if (DEMO) {
    const l = JSON.parse(localStorage.getItem('cinema_demo') || '[]');
    l.unshift({...d, created_at: new Date().toISOString()});
    localStorage.setItem('cinema_demo', JSON.stringify(l));
    return;
  }
  const r = await fetch(URL_T, {method: 'POST', headers: {...H, Prefer: 'return=minimal'}, body: JSON.stringify(d)});
  if (!r.ok) throw new Error('Falha ao enviar (' + r.status + ')');
}
async function listarRespostas() {
  if (DEMO) return JSON.parse(localStorage.getItem('cinema_demo') || '[]');
  const r = await fetch(URL_T + '?select=*&order=created_at.desc&limit=1000', {headers: H});
  if (!r.ok) throw new Error('Falha ao carregar (' + r.status + ')');
  return r.json();
}
