# 🏋️‍♂️ Scheda Palestra — React + LocalStorage

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![LocalStorage](https://img.shields.io/badge/Data-Persistente%20con%20LocalStorage-blue?logo=googlechrome&logoColor=white)](https://developer.mozilla.org/docs/Web/API/Window/localStorage)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

> Un'app React per creare e gestire schede di allenamento personalizzate 💪  
> I dati vengono salvati in **LocalStorage**, quindi non servono server o database!

---

## 🚀 Funzionalità principali

✨ **Gestione schede di allenamento (CRUD)**
- ➕ Crea nuove schede  
- 🗑️ Elimina o aggiorna quelle esistenti  

🏋️‍♀️ **Gestione esercizi**
- Aggiungi esercizi con serie e ripetizioni  
- Elimina singoli esercizi  

📈 **Tracciamento progressi**
- Registra i pesi usati nel tempo  
- Visualizza la cronologia con data e peso  

💾 **Salvataggio automatico**
- Tutto viene memorizzato in `localStorage`  
- Nessuna perdita di dati al refresh  

📱 **Design responsive**
- Ottimizzato per desktop e mobile  
- Stile pulito con `CSS` personalizzato  

---

## 🧱 Struttura del progetto

```bash
📁 src
 ├── App.jsx                 # Componente principale con logica di navigazione
 ├── main.jsx                # Entry point React
 ├── index.css               # Stili globali (layout, bottoni, colori)
 ├── hooks/
 │   ├── useLocalStorage.js  # Hook per salvare dati in localStorage
 │   └── useWorkouts.js      # Hook per gestire CRUD delle schede
 ├── components/
 │   └── WorkoutList.jsx     # Lista delle schede + creazione nuove
 └── pages/
     └── WorkoutDetail.jsx   # Dettaglio scheda + esercizi e progressi
```
---

## 💾 Come eseguire il progetto

> Segui questi semplici passaggi per avviare l’app **Scheda Palestra** in locale 🏋️‍♀️

---

### 🧩 1️⃣ Clona la repository
Clona il progetto dal tuo account GitHub:
```bash
git clone https://github.com/tuo-username/scheda-palestra.git
cd scheda-palestra
```
## ⚙️ Installazione e avvio del progetto

> Segui questi semplici passaggi per installare le dipendenze e avviare l’applicazione React 🧩

---

### ⚙️ 2️⃣ Installa le dipendenze
Installa tutti i pacchetti necessari con **npm**:
```bash
npm install
```

### ▶️ 3️⃣ Avvia il server di sviluppo

Esegui il progetto in modalità sviluppo con il comando:

```bash
npm run dev
```

### 🌐 Apri il progetto nel browser

Una volta avviato il server, apri il seguente indirizzo nel tuo browser preferito:

👉 [http://localhost:5173](http://localhost:5173)

---

## 🗂️ Hook personalizzato — `useLocalStorage.js`

📍 **Percorso:** `src/hooks/useLocalStorage.js`  

Questo hook personalizzato consente di **salvare e leggere automaticamente i dati dal LocalStorage** del browser.  
È un modo semplice per mantenere i dati salvati anche dopo il refresh della pagina o la chiusura del browser.

---

### ✨ Esempio d’uso

```js
const [workouts, setWorkouts] = useLocalStorage("workouts", []);
```
---

### ⚙️ Come funziona

1. 🔹 Inizializza uno stato React (`useState`) sincronizzato con il `localStorage`.  
2. 🔹 Se la chiave specificata (`key`) esiste già, carica i dati salvati.  
3. 🔹 Se non esiste, utilizza il valore iniziale (`initialValue`).  
4. 🔹 Ogni volta che i dati cambiano, aggiorna automaticamente il `localStorage`.  
5. 🔹 Ritorna una coppia `[data, setData]` come `useState`.

---

### 🧩 Codice sorgente

```js
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [data, setData] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
}
```

---
## 🏋️ Hook personalizzato — `useWorkouts.js`

📍 **Percorso:** `src/hooks/useWorkouts.js`  

Questo hook personalizzato gestisce tutte le **operazioni CRUD (Create, Read, Update, Delete)** relative alle schede di allenamento.  
Utilizza `useLocalStorage` per salvare in modo persistente le schede create, così da mantenerle anche dopo la chiusura del browser.

---

### ✨ Esempio d’uso

```js
const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkouts();
```
---

### ⚙️ Come funziona

1. 🔹 Usa `useLocalStorage` per salvare tutte le schede di allenamento nel browser.  
2. 🔹 `addWorkout(title)` → crea una nuova scheda con ID univoco e un titolo.  
3. 🔹 `updateWorkout(id, updatedData)` → aggiorna una scheda esistente con i nuovi dati.  
4. 🔹 `deleteWorkout(id)` → elimina una scheda in base al suo ID.  
5. 🔹 Restituisce un oggetto contenente la lista delle schede e le funzioni per modificarle.

---

### 🧩 Codice sorgente

```js
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuid } from "uuid";

export function useWorkouts() {
  const [workouts, setWorkouts] = useLocalStorage("workouts", []);

  function addWorkout(title) {
    const newWorkout = { id: uuid(), title, exercises: [] };
    setWorkouts([...workouts, newWorkout]);
  }

  function updateWorkout(id, updated) {
    setWorkouts(workouts.map(w => (w.id === id ? { ...w, ...updated } : w)));
  }

  function deleteWorkout(id) {
    setWorkouts(workouts.filter(w => w.id !== id));
  }

  return { workouts, addWorkout, updateWorkout, deleteWorkout };
}
```
---
### 🔄 Diagramma logico

```text
React Component
     │
     ▼
 useWorkouts()
     │
     ▼
 useLocalStorage()
     │
     ▼
 localStorage (Browser)
```
