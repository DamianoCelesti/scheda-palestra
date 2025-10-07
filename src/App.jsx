import { useState } from "react";
import { useWorkouts } from "./hooks/useWorkouts";
import WorkoutList from "./components/WorkoutList";
import WorkoutDetail from "./pages/WorkoutDetail";

export default function App() {
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkouts();
  const [selectedId, setSelectedId] = useState(null);

  const selectedWorkout = workouts.find((w) => w.id === selectedId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🏋️ Scheda Palestra</h1>

      {selectedWorkout ? (
        <WorkoutDetail
          workout={selectedWorkout}
          onUpdate={updateWorkout}
          onBack={() => setSelectedId(null)}
        />
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
