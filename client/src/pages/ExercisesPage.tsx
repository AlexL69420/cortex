import ExercisesList from "../features/components/Exercises";
import { MyFooter } from "../features/components/Footer";
import Header from "../features/components/Header";

export default function ExercisesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 dark:bg-slate-600">
      <Header />
      <ExercisesList />
      <MyFooter />
    </main>
  );
}
