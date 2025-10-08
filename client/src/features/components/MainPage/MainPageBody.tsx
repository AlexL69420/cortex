import { useVariants } from "../../hooks/useVariants";
import VariantsList from "./VariantsList";
import SearchSection from "./SearchSection";
import HeaderSection from "./BodyHeaderSection";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export default function MainPageBody() {
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