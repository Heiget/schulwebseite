const cardsEl = document.getElementById('cards');
const countEl = document.getElementById('count');
const searchEl = document.getElementById('search');

function render(list){
  cardsEl.innerHTML = '';
  list.forEach(a=>{
    const div = document.createElement('article');
    div.className = 'card';
    div.innerHTML = `
      <div class='tag'>${a.type}</div>
      <h3>${a.title}</h3>
      <div class='meta'>${a.authors.length? a.authors.join(', '): 'Redaktion'}</div>
      <div class='excerpt'>${a.excerpt}</div>
      <div style='margin-top:10px;text-align:right'><button class='btn' data-id='${a.id}'>Lesen</button></div>
    `;
    cardsEl.appendChild(div);
  });
  countEl.textContent = list.length;
}

// initial render
render(articles);

// open modal
document.body.addEventListener('click',e=>{
  const btn = e.target.closest('button[data-id]');
  if(btn){
    const id = Number(btn.dataset.id);
    const art = articles.find(x=>x.id===id);
    if(!art) return;
    document.getElementById('modal-title').innerText = art.title;
    document.getElementById('modal-meta').innerText = (art.authors.length? art.authors.join(', '): 'Redaktion') + ' — ' + art.type + ' • ' + art.day;
    document.getElementById('modal-body').innerHTML = art.content;
    document.getElementById('modal').classList.add('open');
    document.body.classList.add('modal-open'); // Prevent background scroll
  }
});
document.getElementById('modal-close').addEventListener('click',()=>{
  document.getElementById('modal').classList.remove('open');
  document.body.classList.remove('modal-open'); // Allow background scroll again
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    document.getElementById('modal').classList.remove('open');
    document.body.classList.remove('modal-open'); // Allow background scroll again
  }
});

// search
searchEl.addEventListener('input',()=>{
  const q = searchEl.value.trim().toLowerCase();
  const filtered = articles.filter(a=>{
    return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.authors.join(' ').toLowerCase().includes(q) || a.type.toLowerCase().includes(q);
  });
  render(filtered);
});
/*
// filter buttons
document.querySelectorAll('nav .btn').forEach(b=>{
  b.addEventListener('click',()=>{
    const f = b.dataset.filter;
    if(f==='all') render(articles);
    else render(articles.filter(a=>a.day===f));
  });
});
*/
// Keyboard: Esc to close modal
document.addEventListener('keydown',e=>{ if(e.key==='Escape') document.getElementById('modal').classList.remove('open'); });

// Small helper: export current page as HTML file
function download(filename, text) {
  const el = document.createElement('a');
  el.setAttribute('href','data:text/html;charset=utf-8,' + encodeURIComponent(text));
  el.setAttribute('download', filename);
  el.style.display='none';
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}


/*
// Add export button
const exportBtn = document.createElement('button');
exportBtn.className='btn';
exportBtn.textContent='Exportiere Seite (HTML)';
exportBtn.style.marginLeft='8px';
exportBtn.addEventListener('click',()=>{
  const html = '<!doctype html>' + document.documentElement.outerHTML;
  download('schuelerzeitung.html', html);
});
document.querySelector('.toolbar').appendChild(exportBtn);

*/

// Add Dark/Light mode switch
const modeBtn = document.createElement('button');
modeBtn.className = 'btn';
modeBtn.textContent = '🌙 / ☀️';
modeBtn.style.marginLeft = '8px';
modeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('light');
});
document.querySelector('.toolbar').appendChild(modeBtn);