import ExercisesList from "../features/components/ExercisesList";

export default function ExercisesPage() {
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center gap-2 dark:bg-slate-600">
      <ExercisesList />
    </main>
  );
}
