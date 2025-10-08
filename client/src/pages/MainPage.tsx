import { useVariants } from "../features/hooks/useVariants";
import VariantsList from "../features/components/MainPage/VariantsList";
import SearchSection from "../features/components/MainPage/SearchSection";
import HeaderSection from "../features/components/MainPage/BodyHeaderSection";
import LoadingState from "../features/components/MainPage/LoadingState";
import ErrorState from "../features/components/MainPage/ErrorState";

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
      
      <VariantsList variants={recentVariants} />
      
      <SearchSection />
    </main>
  );
}