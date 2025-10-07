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
