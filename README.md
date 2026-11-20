# Russo — PWA mobile (prima versione)

Questa è una prima versione installabile su Android. È una PWA statica: non richiede un server applicativo né un database a pagamento.

## Cosa contiene
- Home con progresso e prossima attività
- Test iniziale indicativo
- Prime quattro unità introduttive
- Quiz di ripasso
- Archivio separato di vocaboli e grammatica
- Salvataggio locale nel browser (`localStorage`)
- Esportazione/importazione del backup JSON
- Supporto PWA e cache offline della struttura
- Tutor Gemini opzionale e collegamenti a ChatGPT/Claude

## Limiti da conoscere
- I dati restano nel browser di questo dispositivo: non c'è sincronizzazione cloud.
- La cache offline rende accessibile la struttura dell'app, ma l'AI richiede Internet.
- Il collegamento Gemini usa una chiave API inserita dall'utente. Per questa prima versione la richiesta parte dal browser: è una soluzione da prototipo personale, NON adatta a un'app pubblica con chiavi condivise. Non pubblicare mai una chiave API nel codice.
- Gemini può offrire una quota gratuita per alcuni modelli, ma limiti e condizioni possono cambiare.
- ChatGPT e Claude si aprono nelle rispettive app/siti: il confronto è manuale. Le loro API non sono incluse perché normalmente comportano costi.
- Il test attuale è solo un orientamento A0/A1, non una valutazione CEFR completa. Per stimare B1 servono prove di ascolto, lettura, scrittura e produzione orale.

## Come provarla sul computer
Apri la cartella con VS Code e avvia un server statico locale (ad esempio l'estensione Live Server). Per il service worker serve `localhost` o HTTPS.

## Come pubblicarla gratis con GitHub Pages
1. Crea un repository GitHub nuovo.
2. Carica tutti i file di questa cartella nella radice del repository.
3. Apri **Settings → Pages**.
4. Seleziona **Deploy from a branch**, scegli `main` e `/ (root)`, poi salva.
5. Attendi la pubblicazione e apri l'indirizzo HTTPS ottenuto da Chrome su Android.
6. In Chrome: menu ⋮ → **Aggiungi a schermata Home** oppure **Installa app**.

GitHub Pages ospita soltanto i file statici dell'app. Non ospita un server AI.

## Prossimo sviluppo consigliato
1. Ampliare il test iniziale e il curriculum A0–A1.
2. Aggiungere ripasso programmato (spaced repetition) e registrazione degli errori.
3. Aggiungere esercizi di ascolto e pronuncia.
4. Spostare le chiamate AI dietro un backend sicuro prima di rendere l'app pubblica.
5. Aggiungere sincronizzazione opzionale e gratuita entro i limiti del piano scelto.
