import { useState } from "react";

export default function Home({ workouts, onAdd, onSelect, onDelete }) {
    const [newTitle, setNewTitle] = useState("");

    const handleAdd = () => {
        if (!newTitle.trim()) return alert("Inserisci un nome per la scheda!");
        onAdd(newTitle.trim());
        setNewTitle("");
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Le mie schede</h2>
            <ul className="space-y-2">
                {workouts.length === 0 && <p>Nessuna scheda ancora creata 😅</p>}
                {workouts.map((w) => (
                    <li
                        key={w.id}
                        className="flex justify-between items-center bg-gray-100 rounded p-2"
                    >
                        <button
                            onClick={() => onSelect(w.id)}
                            className="text-blue-600 hover:underline"
                        >
                            {w.title}
                        </button>
                        <button
                            onClick={() => onDelete(w.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex gap-2">
                <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Nome nuova scheda..."
                    className="border p-1 flex-1 rounded"
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    ➕ Aggiungi
                </button>
            </div>
        </div>
    );
}
