import { useState } from "react";
import { useWorkouts } from "./hooks/useWorkouts";
import WorkoutList from "./components/WorkoutList";
import WorkoutDetail from "./pages/WorkoutDetail";

export default function App() {
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkouts();
  const [selectedId, setSelectedId] = useState(null);

  const selectedWorkout = workouts.find(w => w.id === selectedId);

  return (
    <div className="container mx-auto p-4">
      <h1>🏋️ Scheda Palestra</h1>
      {selectedWorkout ? (
        <div>
          <button onClick={() => setSelectedId(null)}>⬅ Torna</button>
          <WorkoutDetail workout={selectedWorkout} onUpdate={updateWorkout} />
        </div>
      ) : (
        <WorkoutList
          workouts={workouts}
          onAdd={addWorkout}
          onSelect={setSelectedId}
          onDelete={deleteWorkout}
        />
      )}
    </div>
  );
}
