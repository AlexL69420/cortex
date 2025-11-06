import { useVariants } from "../features/hooks/useVariants";
import LoadingState from "../shared/LoadingState";
import ErrorState from "../shared/ErrorState";
import VariantsList from "../shared/VariantsList";
import NoVariantsFoundError from "../features/components/VariantsListPage/NoVariantsFoundError";


export default function VariantsListPage() {
   // Используем хук Tanstack Query для получения вариантов
   const { data: allVariants, isLoading, error } = useVariants();

    // Отображение состояния загрузки
    if (isLoading) {
      return <LoadingState />;
    }
  
    // Отображение ошибки
    if (error) {
      return <ErrorState error={error.message} />;
    }

  return (
    <main className="flex min-h-screen w-3/5 flex-col items-center gap-4 bg-zinc-100 px-2 py-3 text-black dark:bg-slate-700 dark:text-white">
      {allVariants ? <VariantsList variants={allVariants} /> : <NoVariantsFoundError />}
    </main>
  );
}
