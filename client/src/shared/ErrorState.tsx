interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="min-h-screen w-3/5 px-2 py-3 text-black dark:bg-slate-700 dark:text-white">
      {error}
    </div>
  );
}