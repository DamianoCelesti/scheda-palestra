import { useState, useEffect } from "react";

//    Creo una funzione (custom hook) chiamata useLocalStorage
//    Serve per salvare dati nel localStorage del browser e mantenerli dopo il refresh
export function useLocalStorage(key, initialValue) {

    //   Creo uno stato chiamato "data"
    //   useState qui controlla se nel localStorage esiste già qualcosa con quella chiave
    //   Se sì → lo carica (dopo averlo convertito da JSON)
    //   Se no → usa il valore iniziale passato (initialValue)
    const [data, setData] = useState(() => {
        try {
            // Legge dal localStorage
            const item = localStorage.getItem(key);
            // Converte da stringa a oggetto, altrimenti usa valore iniziale
            return item ? JSON.parse(item) : initialValue;
        } catch {
            // Se c'è un errore (es. JSON non valido), restituisce comunque il valore iniziale
            return initialValue;
        }
    });

    //   useEffect viene eseguito ogni volta che "data" o "key" cambiano
    //   Serve per aggiornare automaticamente il localStorage con il nuovo valore
    useEffect(() => {
        // Salva nel localStorage in formato stringa
        localStorage.setItem(key, JSON.stringify(data));
    }, [key, data]);


    //   Restituisce lo stato e la funzione per aggiornarlo
    //   È come useState, ma con salvataggio automatico nel localStorage. Così i dati rimangono anche dopo aver aggiornato o chiuso la pagina.

    return [data, setData];
}
