import { useState } from "react";

export default function WorkoutDetail({ workout, onBack, onUpdate }) {
    const [name, setName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");

    const addExercise = () => {
        if (!name.trim() || !sets || !reps)
            return alert("Compila tutti i campi!");
        const newExercise = {
            id: Date.now(),
            name,
            sets: Number(sets),
            reps: Number(reps),
        };
        onUpdate(workout.id, {
            exercises: [...workout.exercises, newExercise],
        });
        setName("");
        setSets("");
        setReps("");
    };

    const deleteExercise = (id) => {
        onUpdate(workout.id, {
            exercises: workout.exercises.filter((e) => e.id !== id),
        });
    };

    return (
        <div className="p-4">
            <button
                onClick={onBack}
                className="mb-2 text-blue-600 hover:underline"
            >
                ⬅ Torna indietro
            </button>

            <h2 className="text-xl font-bold mb-2">{workout.title}</h2>

            {workout.exercises.length === 0 ? (
                <p>Nessun esercizio aggiunto ancora 💪</p>
            ) : (
                <ul className="space-y-2">
                    {workout.exercises.map((ex) => (
                        <li
                            key={ex.id}
                            className="flex justify-between bg-gray-100 p-2 rounded"
                        >
                            <span>
                                {ex.name} — {ex.sets}x{ex.reps}
                            </span>
                            <button
                                onClick={() => deleteExercise(ex.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4">
                <h3 className="font-semibold mb-1">Aggiungi esercizio</h3>
                <div className="flex flex-col gap-2">
                    <input
                        placeholder="Nome esercizio"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-1 rounded"
                    />
                    <input
                        placeholder="Serie"
                        type="number"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                        className="border p-1 rounded"
                    />
                    <input
                        placeholder="Ripetizioni"
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        className="border p-1 rounded"
                    />
                    <button
                        onClick={addExercise}
                        className="bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600"
                    >
                        ➕ Aggiungi esercizio
                    </button>
                </div>
            </div>
        </div>
    );
}
