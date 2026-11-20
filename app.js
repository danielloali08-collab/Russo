const $ = (id) => document.getElementById(id);
const STORE = "russo_pwa_v1";
const lessons = [
 {id:"l1",title:"Saluti e presentazioni",level:"A0 · Fondamenta",desc:"Dire ciao, presentarsi e chiedere come sta qualcuno.",body:"<p>In russo puoi salutare in modo informale con <b>Привет</b> (privét, ciao) e in modo più formale con <b>Здравствуйте</b> (zdrástvuyte, buongiorno/salve).</p><p><b>Меня зовут…</b> significa “Mi chiamo…”. <b>Как тебя зовут?</b> è “Come ti chiami?” in modo informale.</p><p>Per chiedere “Come stai?”: <b>Как дела?</b>. Una risposta semplice è <b>Хорошо, спасибо</b> (Bene, grazie).</p>",words:[["Привет","ciao","informale"],["Здравствуйте","salve / buongiorno","formale"],["Спасибо","grazie",""],["Меня зовут","mi chiamo",""],["Как дела?","come va?",""]],grammar:[["Tu informale e Lei formale","Ты si usa con amici e persone familiari. Вы si usa in situazioni formali o con più persone.","Как тебя зовут? — Come ti chiami?"]] },
 {id:"l2",title:"Alfabeto: lettura e parole utili",level:"A0 · Fondamenta",desc:"Consolidare la lettura del cirillico e riconoscere parole frequenti.",body:"<p>Il russo usa il cirillico. Alcune lettere somigliano a quelle latine ma hanno un suono diverso: <b>В</b> = v, <b>Н</b> = n, <b>Р</b> = r, <b>С</b> = s, <b>У</b> = u.</p><p>Leggi lentamente e fai attenzione all'accento tonico: in russo la posizione dell'accento è importante e spesso non è scritta.</p>",words:[["дом","casa","maschile"],["вода","acqua","femminile"],["мама","mamma","femminile"],["мир","pace / mondo","maschile"]],grammar:[["Lettere ingannevoli","В si pronuncia v; Н si pronuncia n; Р si pronuncia r; С si pronuncia s; У si pronuncia u.","вода (vadà) — acqua"]] },
 {id:"l3",title:"Pronomi personali ed essere al presente",level:"A1 · Prime frasi",desc:"Costruire frasi semplici: io, tu, lui/lei e noi.",body:"<p>I pronomi principali sono <b>я</b> (io), <b>ты</b> (tu), <b>он</b> (lui), <b>она</b> (lei), <b>мы</b> (noi), <b>вы</b> (voi/Lei), <b>они</b> (loro).</p><p>Al presente, il verbo “essere” normalmente si omette nelle frasi nominali: <b>Я студент</b> = Sono uno studente. <b>Она дома</b> = Lei è a casa.</p>",words:[["Я","io","pronome"],["Ты","tu","pronome informale"],["Он","lui","pronome"],["Она","lei","pronome"],["Мы","noi","pronome"]],grammar:[["Essere al presente","Nelle frasi nominali al presente il verbo быть (essere) di norma non si esprime.","Я студент. — Sono uno studente."]] },
 {id:"l4",title:"Genere dei nomi e aggettivi",level:"A1 · Prime frasi",desc:"Riconoscere maschile, femminile e neutro.",body:"<p>I nomi russi hanno tre generi. Spesso i nomi che terminano in consonante sono maschili, quelli in -а/-я femminili e quelli in -о/-е neutri. Esistono eccezioni.</p><p>L'aggettivo concorda con il nome: новый дом (casa nuova, maschile), новая книга (libro nuovo, femminile), новое окно (finestra nuova, neutro).</p>",words:[["новый","nuovo (maschile)","aggettivo"],["новая","nuova (femminile)","aggettivo"],["новое","nuovo (neutro)","aggettivo"],["книга","libro","femminile"]],grammar:[["Tre generi grammaticali","Il genere del nome influenza la forma di aggettivi e altre parole concordate.","новый дом · новая книга · новое окно"]] }
];
const quizItems = [
 {q:"Come si dice “grazie” in russo?",opts:["Пожалуйста","Спасибо","Привет"],a:1,why:"Спасибо significa “grazie”. Пожалуйста significa “prego / per favore”."},
 {q:"Quale lettera russa si pronuncia come la N latina?",opts:["Н","Р","В"],a:0,why:"Н si pronuncia n. Р si pronuncia r e В si pronuncia v."},
 {q:"Quale espressione è più formale per salutare?",opts:["Привет","Пока","Здравствуйте"],a:2,why:"Здравствуйте è un saluto formale; Привет è informale."},
 {q:"Che cosa significa “Меня зовут Анна”?",opts:["Mi chiamo Anna","Dov'è Anna?","Anna sta bene"],a:0,why:"Меня зовут… significa letteralmente “mi chiamano…”, cioè “mi chiamo…”."},
 {q:"Quale pronome significa “noi”?",opts:["Они","Мы","Вы"],a:1,why:"Мы significa noi. Они significa loro e Вы significa voi/Lei."}
];
let state = loadState();
let activeQuiz = null;
let deferredInstall = null;
function loadState(){try{return JSON.parse(localStorage.getItem(STORE))||{words:[],grammar:[],completed:[],scores:[],level:"Da valutare",placementDone:false}}catch{return {words:[],grammar:[],completed:[],scores:[],level:"Da valutare",placementDone:false}}}
function save(){localStorage.setItem(STORE,JSON.stringify(state));renderAll()}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2400)}
function go(view){document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===view));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>go(b.dataset.view)));
function renderHome(){
 const done=state.completed.length, pct=Math.round(done/lessons.length*100);
 $("progressText").textContent=pct+"%";$("progressBar").style.width=pct+"%";
 $("wordCount").textContent=state.words.length;$("grammarCount").textContent=state.grammar.length;$("lessonCount").textContent=done;
 const next=lessons.find(l=>!state.completed.includes(l.id));
 $("nextTag").textContent=state.placementDone?"PROSSIMA LEZIONE":"PRIMA VALUTAZIONE";
 $("nextTitle").textContent=state.placementDone?(next?.title||"Percorso iniziale completato"):"Scopri il tuo livello";
 $("nextDesc").textContent=state.placementDone?(next?.desc||"Hai completato le prime unità. Il percorso verrà ampliato."):"Una breve verifica per calibrare il percorso.";
 $("startNext").onclick=()=>state.placementDone?(next?openLesson(next.id):go("lessons")):(go("quiz"),startQuiz("placement"));
 $("levelLabel").textContent=state.level;$("completedLabel").textContent=done;
}
function renderLessons(){
 $("lessonList").innerHTML=lessons.map(l=>{const done=state.completed.includes(l.id);return `<article class="lesson-card ${done?"done":""}"><div class="lesson-icon">${done?"✓":"Я"}</div><div class="grow"><span class="tag">${l.level}</span><h3>${l.title}</h3><p>${l.desc}</p></div><button class="secondary" data-lesson="${l.id}">${done?"Ripassa":"Apri"}</button></article>`}).join("");
 document.querySelectorAll("[data-lesson]").forEach(b=>b.onclick=()=>openLesson(b.dataset.lesson));
}
function openLesson(id){
 const l=lessons.find(x=>x.id===id);if(!l)return;
 const area=$("quizArea");
 area.innerHTML=`<article class="quiz-card"><p class="eyebrow">${l.level}</p><h2>${l.title}</h2><div class="lesson-content">${l.body}</div><hr style="border:0;border-top:1px solid var(--line);margin:16px 0"><p><b>Parole da ricordare</b></p><div>${l.words.map(w=>`<p><b>${w[0]}</b> — ${w[1]} <small class="muted">${w[2]}</small></p>`).join("")}</div><p><b>Regola grammaticale</b></p>${l.grammar.map(g=>`<p><b>${g[0]}</b><br>${g[1]}<br><i>${g[2]}</i></p>`).join("")}<div class="quiz-controls"><button class="secondary" id="lessonBack">Indietro</button><button class="primary" id="lessonDone">${state.completed.includes(id)?"Completata ✓":"Segna come completata"}</button></div></article>`;
 $("lessonBack").onclick=()=>{$("quizArea").innerHTML="";go("lessons")};
 $("lessonDone").onclick=()=>{if(!state.completed.includes(id))state.completed.push(id);l.words.forEach(w=>{if(!state.words.some(x=>x.ru===w[0]))state.words.push({ru:w[0],it:w[1],note:w[2]})});l.grammar.forEach(g=>{if(!state.grammar.some(x=>x.title===g[0]))state.grammar.push({title:g[0],body:g[1],example:g[2]})});save();toast("Lezione salvata negli archivi");$("quizArea").innerHTML="";go("lessons")};
 go("quiz");window.scrollTo({top:0,behavior:"smooth"});
}
function startQuiz(type){
 activeQuiz={type,items:type==="placement"?quizItems.slice(0,4):quizItems,index:0,answers:[],locked:false};renderQuestion();
}
function renderQuestion(){
 const q=activeQuiz.items[activeQuiz.index];if(!q)return;
 const area=$("quizArea");area.innerHTML=`<article class="quiz-card"><div class="progress-label"><span>${activeQuiz.type==="placement"?"TEST DI LIVELLO":"QUIZ DI RIPASSO"}</span><b>${activeQuiz.index+1}/${activeQuiz.items.length}</b></div><div class="progress-track"><div style="width:${(activeQuiz.index+1)/activeQuiz.items.length*100}%"></div></div><h3>${q.q}</h3><div id="options">${q.opts.map((o,i)=>`<button class="quiz-option" data-opt="${i}">${o}</button>`).join("")}</div><div id="feedback"></div><div class="quiz-controls"><button id="quizNext" class="primary" disabled>${activeQuiz.index===activeQuiz.items.length-1?"Termina":"Continua"}</button></div></article>`;
 document.querySelectorAll("[data-opt]").forEach(b=>b.onclick=()=>chooseOption(Number(b.dataset.opt)));
 $("quizNext").onclick=nextQuestion;
}
function chooseOption(i){
 if(activeQuiz.locked)return;activeQuiz.locked=true;const q=activeQuiz.items[activeQuiz.index];activeQuiz.answers.push(i);
 document.querySelectorAll("[data-opt]").forEach((b,n)=>{b.disabled=true;if(n===q.a)b.classList.add("selected")});
 const ok=i===q.a;$("feedback").innerHTML=`<div class="quiz-feedback ${ok?"correct":"wrong"}"><b>${ok?"Corretto!":"Non proprio."}</b> ${q.why}</div>`;$("quizNext").disabled=false;
}
function nextQuestion(){
 if(activeQuiz.index<activeQuiz.items.length-1){activeQuiz.index++;activeQuiz.locked=false;renderQuestion();return}
 const score=activeQuiz.answers.filter((a,i)=>a===activeQuiz.items[i].a).length;
 state.scores.push({date:new Date().toISOString(),score,total:activeQuiz.items.length,type:activeQuiz.type});
 if(activeQuiz.type==="placement"){state.placementDone=true;state.level=score>=3?"A1 iniziale (da confermare)":"Pre-A1 / A0";}save();
 $("quizArea").innerHTML=`<article class="quiz-card"><p class="eyebrow">RISULTATO</p><h2>${score} / ${activeQuiz.items.length} risposte corrette</h2><p class="muted">${activeQuiz.type==="placement"?"Stima iniziale indicativa: "+state.level+". Non è una certificazione; il livello sarà affinato con lettura, ascolto e produzione.":"Continua a ripassare: gli errori indicano cosa consolidare."}</p><button id="afterQuiz" class="primary full">Torna alle attività</button></article>`;
 $("afterQuiz").onclick=()=>{go(activeQuiz.type==="placement"?"lessons":"home");$("quizArea").innerHTML=""};activeQuiz=null;
}
$("placementBtn").onclick=()=>startQuiz("placement");$("reviewQuizBtn").onclick=()=>startQuiz("review");
$("wordForm").onsubmit=e=>{e.preventDefault();const ru=$("wordRu").value.trim(),it=$("wordIt").value.trim();if(state.words.some(w=>w.ru.toLowerCase()===ru.toLowerCase())){toast("Questa parola è già nell'archivio");return}state.words.unshift({ru,it,note:$("wordNote").value.trim()});e.target.reset();save();toast("Parola aggiunta")};
$("grammarForm").onsubmit=e=>{e.preventDefault();state.grammar.unshift({title:$("grammarTitle").value.trim(),body:$("grammarBody").value.trim(),example:$("grammarExample").value.trim()});e.target.reset();save();toast("Regola salvata")};
function renderWords(){const term=$("wordSearch").value.toLowerCase();const list=state.words.filter(w=>(w.ru+" "+w.it+" "+(w.note||"")).toLowerCase().includes(term));$("wordList").innerHTML=list.length?list.map((w,i)=>`<article class="entry"><div class="entry-main"><strong>${escapeHtml(w.ru)}</strong><div class="translation">${escapeHtml(w.it)}</div>${w.note?`<div class="note">${escapeHtml(w.note)}</div>`:""}</div><button class="delete-btn" data-delword="${state.words.indexOf(w)}" aria-label="Elimina">×</button></article>`).join(""):`<div class="empty">Il tuo vocabolario è ancora vuoto. Aggiungi la prima parola o completa una lezione.</div>`;document.querySelectorAll("[data-delword]").forEach(b=>b.onclick=()=>{state.words.splice(Number(b.dataset.delword),1);save()})}
function renderGrammar(){$("grammarList").innerHTML=state.grammar.length?state.grammar.map((g,i)=>`<article class="entry"><div class="entry-main"><strong>${escapeHtml(g.title)}</strong><div class="translation">${escapeHtml(g.body)}</div>${g.example?`<div class="note">${escapeHtml(g.example)}</div>`:""}</div><button class="delete-btn" data-delgrammar="${i}" aria-label="Elimina">×</button></article>`).join(""):`<div class="empty">Non hai ancora salvato regole grammaticali. Le regole delle lezioni completate compariranno qui.</div>`;document.querySelectorAll("[data-delgrammar]").forEach(b=>b.onclick=()=>{state.grammar.splice(Number(b.dataset.delgrammar),1);save()})}
$("wordSearch").oninput=renderWords;
function renderAll(){renderHome();renderLessons();renderWords();renderGrammar()}
$("askGemini").onclick=async()=>{
 const key=$("geminiKey").value.trim(),prompt=$("aiPrompt").value.trim(),out=$("aiResult");
 if(!key||!prompt){toast("Inserisci la chiave API e una domanda");return}
 out.classList.remove("hidden");out.textContent="Sto preparando la risposta…";$("askGemini").disabled=true;
 const system="Sei un insegnante esperto di lingua russa per uno studente italofono principiante. Spiega in italiano, con accuratezza, esempi in cirillico e accento tonico quando utile. Distingui sempre regole certe ed eccezioni. Non inventare.";
 try{
  const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="+encodeURIComponent(key),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.4}})});
  const data=await r.json();if(!r.ok)throw new Error(data.error?.message||"Errore API");
  out.textContent=data.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("\n")||"Nessuna risposta ricevuta.";
 }catch(err){out.textContent="Non sono riuscito a ottenere una risposta: "+err.message+"\nControlla la chiave, la connessione e la disponibilità del modello."}
 finally{$("askGemini").disabled=false}
};
function buildPrompt(){return "Agisci come un docente di russo per un italofono principiante. Rispondi in italiano, con esempi in cirillico e spiegazioni progressive. La mia domanda: "+$("aiPrompt").value.trim()}
$("copyPrompt").onclick=async()=>{try{await navigator.clipboard.writeText(buildPrompt());toast("Prompt copiato")}catch{toast("Copia non disponibile in questo browser")}};
$("openChatGPT").onclick=()=>window.open("https://chatgpt.com/","_blank","noopener");
$("openClaude").onclick=()=>window.open("https://claude.ai/","_blank","noopener");
$("exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="backup-russo.json";a.click();URL.revokeObjectURL(a.href)};
$("importFile").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const obj=JSON.parse(await f.text());if(!Array.isArray(obj.words)||!Array.isArray(obj.grammar)||!Array.isArray(obj.completed))throw Error();state={...state,...obj};save();toast("Backup importato")}catch{toast("File di backup non valido")}e.target.value=""};
$("resetBtn").onclick=()=>{if(confirm("Vuoi cancellare tutti i vocaboli, le regole e i progressi salvati su questo dispositivo?")){localStorage.removeItem(STORE);state=loadState();save();toast("Dati cancellati")}};
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstall=e;$("installBtn").classList.remove("hidden")});
$("installBtn").onclick=async()=>{if(!deferredInstall)return;deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;$("installBtn").classList.add("hidden")};
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
renderAll();
