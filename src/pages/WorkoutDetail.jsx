import { useState } from "react";

export default function WorkoutDetail({ workout, onBack, onUpdate }) {
    const [name, setName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");

    const addExercise = () => {
        if (!name.trim() || !sets || !reps)
            return alert("Compila tutti i campi!");

        const s = Number(sets);
        const r = Number(reps);
        if (s <= 0 || r <= 0)
            return alert("Serie e ripetizioni devono essere numeri positivi!");

        const newExercise = {
            id: Date.now(),
            name: name.trim(),
            sets: s,
            reps: r,
            progress: [],
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
                type="button"
                onClick={onBack}
                className="mb-2 text-blue-600 hover:underline"
            >
                ⬅ Torna indietro
            </button>

            <h2 className="text-xl font-bold mb-4">{workout.title}</h2>

            {workout.exercises.length === 0 ? (
                <p>Nessun esercizio aggiunto ancora 💪</p>
            ) : (
                <ul className="space-y-3">
                    {workout.exercises.map((ex) => (
                        <li key={ex.id} className="bg-gray-100 p-3 rounded">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    {ex.name} — {ex.sets}x{ex.reps}
                                </span>
                                <button
                                    onClick={() => deleteExercise(ex.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    🗑️
                                </button>
                            </div>


                            <ExerciseProgress
                                workoutId={workout.id}
                                exercises={workout.exercises}
                                exercise={ex}
                                onUpdate={onUpdate}
                            />
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-6">
                <h3 className="font-semibold mb-2">Aggiungi esercizio</h3>
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
                        min="1"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                        className="border p-1 rounded"
                    />
                    <input
                        placeholder="Ripetizioni"
                        type="number"
                        min="1"
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



function ExerciseProgress({ workoutId, exercise, exercises, onUpdate }) {
    const [weight, setWeight] = useState("");

    const addProgress = () => {
        const w = Number(weight);
        if (!w || w <= 0) return alert("Inserisci un peso valido (positivo)");

        const newEntry = {
            date: new Date().toLocaleDateString(),
            weight: w,
        };

        const updatedExercises = exercises.map((e) =>
            e.id === exercise.id
                ? { ...e, progress: [...(e.progress || []), newEntry] }
                : e
        );

        onUpdate(workoutId, { exercises: updatedExercises });
        setWeight("");
    };


    const deleteProgress = (index) => {

        if (!confirm("Vuoi davvero cancellare questo progresso?")) return;

        const updatedExercises = exercises.map((e) =>
            e.id === exercise.id
                ? {
                    ...e,
                    progress: e.progress.filter((_, i) => i !== index),
                }
                : e
        );

        onUpdate(workoutId, { exercises: updatedExercises });
    };

    return (
        <div className="mt-3 bg-white p-2 rounded border">
            <label className="text-sm font-medium block mb-1">
                Aggiungi progresso
            </label>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min="1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Peso (kg)"
                    className="border p-1 rounded w-24"
                />
                <button
                    type="button"
                    onClick={addProgress}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                    ➕ Aggiungi
                </button>
            </div>

            {exercise.progress?.length > 0 && (
                <div className="mt-2">
                    <h4 className="font-semibold text-sm text-gray-700">
                        📈 Progresso:
                    </h4>
                    <ul className="text-sm pl-1">
                        {exercise.progress.map((p, i) => (
                            <li
                                key={i}
                                className="flex justify-between items-center bg-gray-50 p-1 rounded mt-1"
                            >
                                <span>
                                    {p.date} → {p.weight} kg
                                </span>
                                <button
                                    type="button"
                                    onClick={() => deleteProgress(i)}
                                    className="text-red-500 hover:text-red-700 text-xs ml-2"
                                    title="Elimina questo progresso"
                                >
                                    🗑️
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
