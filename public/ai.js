// public/ai.js — compatible IDs + mémoire par objectif (localStorage)

document.addEventListener('DOMContentLoaded', () => {
  // --- helpers
  const pick = (...ids) => ids.map(id => document.getElementById(id)).find(Boolean);
  const chat  = pick('chat');
  const msg   = pick('msg');
  const send  = pick('send');
  const reset = pick('reset');

  // deux variantes possibles pour les IDs d’objectifs
  const goalSelect = pick('goal', 'objectiveSelect');
  const newGoalBtn = pick('newGoal', 'addObjective');
  const nameInput  = pick('newObjectiveName'); // si présent

  // rendre les boutons inoffensifs (pas de submit GET)
  send?.setAttribute('type', 'button');
  newGoalBtn?.setAttribute('type','button');
  reset?.setAttribute('type','button');

  // --- stockage
  const K_OBJS = 'mof_objectives_v1';
  const K_HIST = (id) => `mof_history_${id}`;
  const load = (k,f)=>{ try{ return JSON.parse(localStorage.getItem(k)) ?? f; }catch{ return f; } };
  const save = (k,v)=>localStorage.setItem(k, JSON.stringify(v));
  const uuid = ()=> 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{
    const r=Math.random()*16|0, v=c==='x'?r:(r&0x3|0x8); return v.toString(16);
  });

  // init objectifs
  let objectives = load(K_OBJS, []);
  if (!objectives.length) {
    objectives = [{ id: uuid(), name: 'Général' }];
    save(K_OBJS, objectives);
  }
  let currentId = objectives[0].id;

  function refreshSelect() {
    if (!goalSelect) return;
    goalSelect.innerHTML = '';
    for (const o of objectives) {
      const opt = document.createElement('option');
      opt.value = o.id; opt.textContent = o.name;
      if (o.id === currentId) opt.selected = true;
      goalSelect.appendChild(opt);
    }
  }

  function renderHistory(id){
    if (!chat) return;
    chat.innerHTML = '';
    const hist = load(K_HIST(id), []);
    for (const m of hist) {
      const div = document.createElement('div');
      div.className = 'bubble ' + (m.role === 'assistant' ? 'ai' : 'me');
      div.textContent = m.content;
      chat.appendChild(div);
    }
    chat.scrollTop = chat.scrollHeight;
  }

  refreshSelect();
  renderHistory(currentId);

  goalSelect?.addEventListener('change', () => {
    currentId = goalSelect.value;
    renderHistory(currentId);
  });

  newGoalBtn?.addEventListener('click', () => {
    const name = (nameInput?.value?.trim()) || prompt("Nom de l'objectif ? (ex : Épargner 3000 €)");
    if (!name) return;
    const o = { id: uuid(), name };
    objectives.push(o); save(K_OBJS, objectives);
    if (nameInput) nameInput.value = '';
    currentId = o.id;
    refreshSelect(); renderHistory(currentId);
  });

  reset?.addEventListener('click', () => {
    localStorage.removeItem(K_HIST(currentId));
    renderHistory(currentId);
  });

  function bubble(role, text){
    if (!chat) return;
    const div = document.createElement('div');
    div.className = 'bubble ' + (role === 'assistant' ? 'ai' : 'me');
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  async function sendMessage(){
    const text = (msg?.value || '').trim();
    if (!text) return;
    bubble('user', text);
    if (msg) msg.value = '';
    if (send) send.disabled = true;

    try{
      const history = load(K_HIST(currentId), []);
      const MAX_TURNS = 30; // limite soft envoyée au modèle
      const messages = history.concat([{ role: 'user', content: text }]).slice(-MAX_TURNS);

      const r = await fetch('/api/chat', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          messages,
          userContext: { objectiveId: currentId }
        })
      });

      const data = await r.json();
      const content = data?.content || 'Réponse vide.';
      bubble('assistant', content);

      const after = history.concat([{ role:'user', content:text }, { role:'assistant', content }]);
      save(K_HIST(currentId), after);
    }catch(e){
      bubble('assistant', 'Erreur : ' + (e.message || e));
    }finally{
      if (send) send.disabled = false;
    }
  }

  send?.addEventListener('click', sendMessage);
  msg?.addEventListener('keydown', e => { if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); } });
});