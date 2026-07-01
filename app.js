var data = {};
var today = new Date();
var view = new Date(today.getFullYear(), today.getMonth(), 1);
var selectedKey = null;
var months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];

function setSyncStatus(state, text){
  var el = document.getElementById('syncStatus');
  if(!el) return;
  el.className = 'sync-pill' + (state ? ' ' + state : '');
  el.textContent = text || '';
}

function openInfo(){
  document.getElementById('infoCard').classList.add('open');
  document.getElementById('infoBtn').classList.add('open');
}
function closeInfo(){
  document.getElementById('infoCard').classList.remove('open');
  document.getElementById('infoBtn').classList.remove('open');
}

function keyOf(y,m,d){ return y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0'); }

function loadFromCloud(){
  setSyncStatus('loading', 'Synchro…');
  fetch(WORKER_URL)
  .then(function(r){ return r.json(); })
  .then(function(json){
    data = json.data || {};
    setSyncStatus('ok', 'Synchro');
    try { localStorage.setItem('monCarnetRegles', JSON.stringify(data)); } catch(e){}
    render();
  })
  .catch(function(){
    setSyncStatus('err', 'Hors ligne');
    try { data = JSON.parse(localStorage.getItem('monCarnetRegles')) || {}; } catch(e){ data = {}; }
    render();
  });
}

function saveToCloud(){
  setSyncStatus('loading', 'Synchro…');
  fetch(WORKER_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: data })
  })
  .then(function(r){ return r.json(); })
  .then(function(){
    setSyncStatus('ok', 'Synchro');
    try { localStorage.setItem('monCarnetRegles', JSON.stringify(data)); } catch(e){}
  })
  .catch(function(){
    setSyncStatus('err', 'Hors ligne');
  });
}

function changeMonth(delta){
  view.setMonth(view.getMonth()+delta);
  render();
}

function goToday(){
  view = new Date(today.getFullYear(), today.getMonth(), 1);
  render();
}

var toastTimer = null;
function showToast(msg){
  var el = document.getElementById('toast');
  if(!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ el.classList.remove('show'); }, 1400);
}

function openSheet(key){
  selectedKey = key;
  var p = key.split('-');
  var dt = new Date(parseInt(p[0]), parseInt(p[1])-1, parseInt(p[2]));
  document.getElementById('sheetDate').textContent =
    dt.toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long'});
  document.getElementById('removeBtn').style.display = data[key] ? 'block' : 'none';
  document.getElementById('overlay').classList.add('show');
}
function closeSheet(){ document.getElementById('overlay').classList.remove('show'); selectedKey=null; }
function setFlow(f){ if(selectedKey){ data[selectedKey]=f; saveToCloud(); render(); showToast('✓ Enregistré'); } closeSheet(); }
function removeDay(){ if(selectedKey){ delete data[selectedKey]; saveToCloud(); render(); showToast('Jour retiré'); } closeSheet(); }

document.getElementById('overlay').addEventListener('click', function(e){
  if(e.target === this) closeSheet();
});

function render(){
  var y = view.getFullYear(), m = view.getMonth();
  document.getElementById('monthLabel').textContent = months[m] + ' ' + y;
  document.getElementById('recapTitle').textContent = 'Récap de ' + months[m] + ' ' + y + ' :';
  var cal = document.getElementById('calendar');
  cal.innerHTML = '';
  var first = new Date(y, m, 1);
  var startDay = (first.getDay()+6)%7;
  var daysInMonth = new Date(y, m+1, 0).getDate();
  var todayKey = keyOf(today.getFullYear(), today.getMonth(), today.getDate());
  for(var i=0;i<startDay;i++){
    var e = document.createElement('div'); e.className='day empty'; cal.appendChild(e);
  }
  var count = 0;
  for(var d=1; d<=daysInMonth; d++){
    var key = keyOf(y,m,d);
    var btn = document.createElement('button');
    btn.className = 'day';
    btn.textContent = d;
    if(data[key]){ btn.className += ' f'+data[key]; count++; }
    if(key === todayKey){ btn.className += ' today'; }
    (function(k){ btn.onclick = function(){ openSheet(k); }; })(key);
    cal.appendChild(btn);
  }
  var r = document.getElementById('recapText');
  if(count===0){ r.textContent = "Aucun jour noté pour l'instant."; }
  else { r.textContent = '🌸 ' + count + (count>1?' jours':' jour') + ' de règles'; }
}

function exportData(){
  var now = new Date();
  var stamp = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
  var payload = JSON.stringify({ app: 'monCarnetRegles', exportedAt: now.toISOString(), data: data }, null, 2);
  var blob = new Blob([payload], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'mon-carnet-' + stamp + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
}

loadFromCloud();
