import { Outlet } from "react-router-dom";
import Header from "../features/components/Header";
import { MyFooter } from "../features/components/Footer";

export default function Layout() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 dark:bg-slate-600">
      <Header />
      <div className="flex w-full justify-center"> {/* Контейнер для контента */}
        <Outlet /> {/* Здесь будут рендериться дочерние компоненты */}
      </div>
      <MyFooter />
    </main>
  );
}
