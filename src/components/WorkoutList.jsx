import { useState } from "react";

export default function WorkoutList({ workouts, onAdd, onSelect, onDelete }) {
    const [newTitle, setNewTitle] = useState("");

    const handleAdd = () => {
        if (newTitle.trim()) {
            onAdd(newTitle.trim());
            setNewTitle("");
        }
    };

    return (
        <div className="p-4">
            <h2>Le mie schede</h2>
            <ul>
                {workouts.map(w => (
                    <li key={w.id} className="flex justify-between">
                        <button onClick={() => onSelect(w.id)}>{w.title}</button>
                        <button onClick={() => onDelete(w.id)}>❌</button>
                    </li>
                ))}
            </ul>
            <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Nuova scheda..."
            />
            <button
                onClick={handleAdd}
                className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600 mt-3"
            >
                ➕ Aggiungi
            </button>

        </div>
    );
}
