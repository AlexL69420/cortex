import { useState } from "react";

import { useExercises } from "../hooks/useExercises";
import LoadingState from "../../shared/LoadingState";
import ErrorState from "../../shared/ErrorState";
import { Exercise } from "../model/types";



interface ExercisesListProps {
  isConstructorMode?: boolean; // Режим конструктора
  onSelectExercise?: (exercise: Exercise) => void; // Обработчик выбора задания
  selectedExercises?: Exercise[]; // Выбранные задания
}

export default function ExercisesList({
  isConstructorMode = false,
  onSelectExercise,
  selectedExercises = [],
}: ExercisesListProps) {
  
  const { data: exercises, isLoading, error } = useExercises();

  // Состояние для поискового запроса
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Состояние для хранения видимости решений для каждого задания
  const [showSolution, setShowSolution] = useState<{ [key: number]: boolean }>(
    {},
  );

  const handleShowSolution = (exerciseId: number) => {
    setShowSolution((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  // Обработчик выбора задания
  const handleSelectExercise = (exercise: Exercise) => {
    if (isConstructorMode && onSelectExercise) {
      onSelectExercise(exercise);
    }
  };

  // Проверка, выбрано ли задание
  const isExerciseSelected = (exerciseId: number) => {
    return selectedExercises.some((ex) => ex.id === exerciseId);
  };

  // Фильтрация заданий по поисковому запросу
  const filteredExercises = exercises ? exercises.filter((exercise) =>
    exercise.description.toLowerCase().includes(searchQuery.toLowerCase()),
  ) : exercises

  // Отображение состояния загрузки
  if (isLoading) {
    return (
      <LoadingState />
    );
  }

  // Отображение ошибки
  if (error) {
    return (
      <ErrorState error = {error.message}  />
    );
  }

  return (
    <main className="flex min-h-screen w-3/5 flex-col items-center gap-4 bg-zinc-100 px-2 py-3 text-black dark:bg-slate-700 dark:text-white">
      {/* Поле для поиска */}
      <input
        type="text"
        placeholder="Поиск по описанию..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-1/3 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-600"
      />

      <div className="flex flex-col gap-4 p-5">
        {filteredExercises ? (
          <ul>
            {filteredExercises.map((exercise) => (
              <li key={exercise.id}>
                <div
                  className={`mx-4 my-6 flex flex-col gap-2 rounded-2xl border-2 p-5 ${
                    isConstructorMode ? "hover:cursor-pointer " : ""
                  } ${
                    isConstructorMode && isExerciseSelected(exercise.id)
                      ? "bg-gray-200 hover:cursor-pointer dark:bg-gray-600"
                      : ""
                  }`}
                  onClick={() => handleSelectExercise(exercise)} 
                >
                  <h2 className="font-bold">{exercise.description}: </h2>
                  <p className="font-sans">{exercise.problem}</p>
                  {!isConstructorMode && (
                    <div
                      className="text-gray-600 hover:cursor-pointer hover:underline dark:text-slate-300"
                      onClick={() => handleShowSolution(exercise.id)}
                    >
                      {showSolution[exercise.id]
                        ? "Скрыть решение"
                        : "Показать решение"}
                    </div>
                  )}
                  {!isConstructorMode && showSolution[exercise.id] && (
                    <>
                      {exercise.solution && <p>{exercise.solution}</p>}
                      {exercise.answer && (
                        <p className="font-bold">Ответ: {exercise.answer}</p>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет данных для отображения</p>
        )}
      </div>
    </main>
  );
}
