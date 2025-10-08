import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

export default function ErrorPage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-md bg-gradient-to-br from-slate-50 to-slate-100 text-center dark:from-slate-800 dark:to-slate-900 dark:text-white">
        {/* Анимированная иконка */}
        <div className="relative mb-8">
          <div className="mx-auto flex size-32 animate-pulse items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <FaExclamationTriangle className="text-6xl text-red-500 dark:text-red-400" />
          </div>
          {/* Декоративные круги */}
          <div className="absolute -right-2 -top-2 size-8 animate-bounce rounded-full bg-red-200 dark:bg-red-800/40"></div>
          <div className="absolute -bottom-2 -left-2 size-6 animate-bounce rounded-full bg-red-300 delay-75 dark:bg-red-700/40"></div>
        </div>

        {/* Текст ошибки */}
        <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-white">500</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Упс! Что-то пошло не так
        </h2>
        <p className="mb-8 px-4 leading-relaxed text-gray-600 dark:text-gray-300">
          Произошла непредвиденная ошибка. Не волнуйтесь, наша команда уже
          уведомлена и работает над решением проблемы.
        </p>

        {/* Кнопки действий */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <FaRedo className="text-sm" />
            Попробовать снова
          </button>
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-500 px-6 py-3 text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-600 hover:shadow-lg dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            <FaHome className="text-sm" />
            На главную
          </button>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Если проблема остаётся, пожалуйста, свяжитесь с нашей службой
            поддержки
          </p>
          <a
            href="mailto:alexleto24@gmail.com"
            className="mt-2 inline-block text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            alexleto24@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}