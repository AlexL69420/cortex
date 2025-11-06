import { useVariants } from "../features/hooks/useVariants";
import VariantsList from "../shared/VariantsList";
import SearchSection from "../features/components/MainPage/SearchSection";
import HeaderSection from "../features/components/MainPage/BodyHeaderSection";
import LoadingState from "../shared/LoadingState";
import ErrorState from "../shared/ErrorState";
import { Link } from "react-router-dom";

export default function MainPage() {
  // Используем хук Tanstack Query для получения вариантов
  const { data: allVariants, isLoading, error } = useVariants();

  // Берем только первые 5 элементов (или меньше, если их меньше 5)
  const recentVariants = allVariants?.slice(0, 5) || [];

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
      <HeaderSection />
      <div className="flex w-2/3 flex-col gap-2 px-2">
        <h1 className="font-mono text-2xl italic text-black dark:text-red-400">
          Новые варианты
        </h1>
        <div className="flex flex-col gap-4 rounded-2xl border-2 bg-white p-5 dark:bg-slate-600">
          <VariantsList variants={recentVariants} />
          <Link
            to="/variants"
            className="text-gray-400 hover:underline dark:text-gray-300"
          >
            ещё варианты...
          </Link>
        </div>
      </div>
      <SearchSection />
      
    </main>
    
  );
}