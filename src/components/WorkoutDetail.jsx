import { useState } from "react";

export default function WorkoutDetail({ workout, onUpdate }) {
    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");

    const addExercise = () => {
        if (!exerciseName.trim() || !sets || !reps) return;
        const newExercise = { id: Date.now(), name: exerciseName, sets, reps };
        onUpdate(workout.id, {
            exercises: [...workout.exercises, newExercise],
        });
        setExerciseName("");
        setSets("");
        setReps("");
    };

    return (
        <div className="p-4">
            <h2>{workout.title}</h2>
            <ul>
                {workout.exercises.map(ex => (
                    <li key={ex.id}>
                        {ex.name} — {ex.sets}x{ex.reps}
                    </li>
                ))}
            </ul>

            <h3>Aggiungi esercizio</h3>
            <input
                placeholder="Esercizio"
                value={exerciseName}
                onChange={e => setExerciseName(e.target.value)}
            />
            <input
                placeholder="Serie"
                type="number"
                value={sets}
                onChange={e => setSets(e.target.value)}
            />
            <input
                placeholder="Ripetizioni"
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)}
            />
            <button onClick={addExercise}>Aggiungi</button>
        </div>
    );
}
