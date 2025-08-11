// public/ai.js — mémoire locale par objectif (localStorage)

const chat = document.getElementById('chat');
const msg  = document.getElementById('msg');
const send = document.getElementById('send');
const goalSelect = document.getElementById('goal');
const newGoalBtn = document.getElementById('newGoal');

const STORE_KEY = 'mof_memory_v1';

// ---------- Storage helpers ----------
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { current:null, goals:{} }; }
  catch { return { current:null, goals:{} }; }
}
function saveState(st) { localStorage.setItem(STORE_KEY, JSON.stringify(st)); }

function ensureDefaultGoal(st) {
  if (!st.current) {
    const id = 'goal_' + Date.now();
    st.current = id;
    st.goals[id] = { name: 'Général', history: [] };
    saveState(st);
  }
  return st;
}
function currentGoal(st) { return st.goals[st.current]; }

// ---------- UI helpers ----------
function bubble(role, text) {
  const div = document.createElement('div');
  div.className = 'bubble ' + (role === 'user' ? 'me' : 'ai');
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function renderGoals() {
  let st = ensureDefaultGoal(loadState());
  goalSelect.innerHTML = '';
  Object.entries(st.goals).forEach(([id, g]) => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = g.name;
    if (st.current === id) opt.selected = true;
    goalSelect.appendChild(opt);
  });
}

function renderChat() {
  let st = ensureDefaultGoal(loadState());
  const g = currentGoal(st);
  chat.innerHTML = '';
  g.history.forEach(m => bubble(m.role, m.content));
  renderGoals();
}

// ---------- Goal actions ----------
newGoalBtn.addEventListener('click', () => {
  const name = prompt("Nom de l'objectif ? (ex : Épargner 3000 €)");
  if (!name) return;
  let st = loadState();
  const id = 'goal_' + Date.now();
  st.goals[id] = { name, history: [] };
  st.current = id;
  saveState(st);
  renderChat();
});

goalSelect.addEventListener('change', (e) => {
  let st = loadState();
  st.current = e.target.value;
  saveState(st);
  renderChat();
});

// ---------- Chat ----------
async function sendMessage() {
  const text = (msg.value || '').trim();
  if (!text) return;

  // UI + save user message
  bubble('user', text);
  msg.value = '';
  send.disabled = true;

  let st = ensureDefaultGoal(loadState());
  const g = currentGoal(st);
  g.history.push({ role: 'user', content: text, ts: Date.now() });

  // on cap l'historique envoyé (ex: 30 derniers échanges)
  const MAX_TURNS = 30;
  const recent = g.history.slice(-MAX_TURNS);

  const payload = {
    // On envoie l'historique complet (récent) pour que le modèle "se souvienne"
    messages: recent.map(m => ({ role: m.role, content: m.content })),
    // Un petit contexte côté système (utile pour guider le ton)
    userContext: {
      goalName: g.name,
      allGoals: Object.values(st.goals).map(x => x.name),
      locale: 'fr-FR'
    }
  };

  try {
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await r.json();
    const content = data?.content || "Désolé, je n'ai pas pu répondre.";
    bubble('assistant', content);

    // save assistant message
    let st2 = loadState();
    const g2 = currentGoal(st2);
    g2.history.push({ role: 'assistant', content, ts: Date.now() });
    saveState(st2);
  } catch (e) {
    bubble('assistant', "Erreur réseau : " + String(e));
  } finally {
    send.disabled = false;
  }
}

send.addEventListener('click', sendMessage);
msg.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// init
renderChat();