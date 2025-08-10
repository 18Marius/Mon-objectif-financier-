(function(){
  const API_URL = "/api/chat";
  const chat = document.getElementById('chat');
  const msg = document.getElementById('msg');
  const send = document.getElementById('send');
  if(!chat || !msg || !send) return;

  function append(text, who){
    const div = document.createElement('div');
    div.className = 'bubble ' + (who === 'me' ? 'me' : 'ai');
    if (who === 'ai' && window.marked) div.innerHTML = window.marked.parse(text);
    else div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    return div;
  }

  async function ask(question){
    const thinking = append('…', 'ai');
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages:[{ role:"user", content: question }], userContext:{ locale:"fr-FR" } })
      });
      const data = await res.json();
      thinking.remove();
      append(data.content || "Réponse vide.", 'ai');
    } catch(e){
      thinking.remove();
      append("Erreur de connexion à l'IA. Réessaie.", 'ai');
      console.error(e);
    }
  }

  send.addEventListener('click', ()=>{
    const t = msg.value.trim();
    if(!t) return;
    append(t, 'me');
    msg.value = '';
    ask(t);
  });
  msg.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){ e.preventDefault(); send.click(); }
  });
})();
