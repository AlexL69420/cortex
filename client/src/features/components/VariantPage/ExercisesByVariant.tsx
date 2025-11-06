import { TextInput } from "flowbite-react";
import { useExercisesByVariant } from "../../hooks/useExercises";
import { useState } from "react";
import ErrorState from "../../../shared/ErrorState";
import LoadingState from "../../../shared/LoadingState";

interface ExercisesProps {
  variantId: number, 
  isTestCompleted: boolean, 
  results: { [key: number]: boolean }, 
  handleGivenAnswer: (exerciseId: number, newAnswer: string) => void, 
  givenAnswer: { [key: number]: string }
}

export default function ExercisesByVariant({
  variantId, 
  isTestCompleted, 
  results, 
  handleGivenAnswer, 
  givenAnswer
}: ExercisesProps) {
    const { data: exercises, isLoading, error } = useExercisesByVariant(variantId);
    const [showSolution, setShowSolution] = useState<{ [key: number]: boolean }>({});

    const handleShowSolution = (exerciseId: number) => {
      setShowSolution((prev) => ({
        ...prev,
        [exerciseId]: !prev[exerciseId],
      }));
    };

    // Отображение состояния загрузки
    if (isLoading) {
      return <LoadingState />;
    }
  
    // Отображение ошибки
    if (error) {
      return <ErrorState error={error.message} />;
    }
 
    return (
        <main className="flex flex-col gap-4 p-5">
            {exercises ? (
            <ul>
                {exercises.map((exercise, index) => (
                <li key={exercise.id}>
                    <div
                    className={`mx-4 my-6 flex flex-col gap-2 rounded-2xl border-2  p-5 ${
                        isTestCompleted
                        ? results[index]
                            ? "bg-green-200 dark:bg-green-400"
                            : "bg-red-200 dark:bg-red-400"
                        : " bg-white dark:bg-slate-600"
                    }`}
                    >
                    <h2 className="font-bold">{exercise.description}: </h2>
                    <p className="font-sans">{exercise.problem}</p>
                    <div
                        className="text-gray-600 hover:cursor-pointer hover:underline dark:text-slate-300"
                        onClick={() => handleShowSolution(exercise.id)}
                    >
                        {showSolution[exercise.id]
                        ? "Скрыть решение"
                        : "Показать решение"}
                    </div>
                    {showSolution[exercise.id] && (
                        <>
                        {exercise.solution && <p>{exercise.solution}</p>}
                        {exercise.answer && (
                            <p className="font-bold">Ответ: {exercise.answer}</p> 
                        )}
                        </>
                    )}
                    {isTestCompleted ? (
                        <>
                        <p>Ваш ответ: {givenAnswer[index]}</p>
                        <p>Правильный ответ: {exercise.answer}</p>
                        </>
                    ) : (
                        <TextInput
                        placeholder="введите ответ"
                        onChange={(e) =>
                            handleGivenAnswer(index, e.target.value)
                        }
                        ></TextInput>
                    )}
                    </div>
                </li>
                ))}
            </ul>
            ) : (
            <p>Нет данных для отображения</p>
            )}
        </main>
  );
}