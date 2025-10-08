import MainPageBody from "../features/components/MainPage/MainPageBody";
import { MyFooter } from "../features/components/Footer";
import Header from "../features/components/Header";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 dark:bg-slate-600">
      <Header />
      <MainPageBody />
      <MyFooter />
    </main>
  );
}
