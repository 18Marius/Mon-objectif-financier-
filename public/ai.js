// public/ai.js
(() => {
  const chat = document.getElementById('chat');
  const msg  = document.getElementById('msg');
  const send = document.getElementById('send');

  function bubble(role, text) {
    const div = document.createElement('div');
    // classes attendues par ton CSS: "bubble ai" / "bubble me"
    div.className = 'bubble ' + (role === 'user' ? 'me' : 'ai');
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  async function sendMessage() {
    const text = (msg.value || '').trim();
    if (!text) return;
    bubble('user', text);
    msg.value = '';
    send.disabled = true;

    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: text }],
          userContext: {}
        })
      });

      const data = await r.json();
      const content = data?.content || 'Réponse vide.';
      bubble('assistant', content);
    } catch (e) {
      bubble('assistant', 'Erreur: ' + (e?.message || e));
    } finally {
      send.disabled = false;
    }
  }

  send.addEventListener('click', sendMessage);
  msg.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
})();
