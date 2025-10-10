import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuid } from "uuid";

//    Custom hook chiamato useWorkouts
//    Serve per gestire tutte le operazioni sulle schede di allenamento (CRUD)
//    e salvarle in modo permanente nel browser grazie a useLocalStorage
export function useWorkouts() {

    //    Creo uno stato chiamato "workouts" che legge/salva i dati nel localStorage
    //    - "workouts" contiene la lista delle schede di allenamento
    //    - "setWorkouts" serve per aggiornarla
    const [workouts, setWorkouts] = useLocalStorage("workouts", []);

    //  Funzione per aggiungere una nuova scheda
    function addWorkout(title) {

        // Creo un nuovo oggetto scheda con:
        //  - id univoco (creato con uuid)
        //  - titolo
        //  - array vuoto di esercizi

        const newWorkout = { id: uuid(), title, exercises: [] };

        // Aggiungo la nuova scheda all'elenco e aggiorno lo stato

        setWorkouts([...workouts, newWorkout]);
    }

    //   Funzione per aggiornare una scheda già esistente
    function updateWorkout(id, updated) {

        // Scorre tutte le schede:
        //  - se trova quella con l'id giusto, la aggiorna con i nuovi dati
        //  - altrimenti la lascia invariata

        setWorkouts(workouts.map(w => (w.id === id ? { ...w, ...updated } : w)));
    }

    //    Funzione per eliminare una scheda

    function deleteWorkout(id) {

        // Filtra l'elenco rimuovendo quella con l'id selezionato

        setWorkouts(workouts.filter(w => w.id !== id));
    }

    //   Restituisco tutte le funzioni e i dati per poterle usare nei componenti

    return { workouts, addWorkout, updateWorkout, deleteWorkout };
}
