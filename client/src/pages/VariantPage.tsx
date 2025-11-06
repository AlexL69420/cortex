import { useParams, Link } from "react-router-dom";
import dataFormatter from "../features/lib/dataFormatter";
import LoadingState from "../shared/LoadingState";
import ErrorState from "../shared/ErrorState";
import { useVariant } from "../features/hooks/useVariants";
import ExercisesByVariant from "../features/components/VariantPage/ExercisesByVariant";
import { Button } from "flowbite-react";
import { useExercisesByVariant } from "../features/hooks/useExercises";
import { useTest } from "../features/model/TestContext";
import { useTimer } from "../features/hooks/useTimer";

export default function VariantPage() {
  const { id } = useParams();
  const variantId: number = id ? parseInt(id) : -1;
  
  const { data: variant, isLoading, error } = useVariant(variantId);
  const { data: exercises } = useExercisesByVariant(variantId);
  
  const { 
    state, 
    setAnswer, 
    setResults, 
    completeTest, 
    toggleTimerPause 
  } = useTest();
  
  const { givenAnswers, results, isTestCompleted } = state;
  const { timeLeft, timerPaused, formatTime } = useTimer();

  const handleGivenAnswer = (exerciseId: number, newAnswer: string) => {
    setAnswer(exerciseId, newAnswer);
  };

  const handleCompleteTest = () => {
    if (!exercises) return;
    
    const newResults: { [key: number]: boolean } = {};
    exercises.forEach((exercise, index) => {
      newResults[index] = exercise.answer === givenAnswers[index];
    });
    
    setResults(newResults);
    completeTest();
  };

  const handlePauseResumeTimer = () => {
    toggleTimerPause();
  };

  const calculateScore = () => {
    return Object.values(results).filter((result) => result).length;
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
      <main className="flex min-h-screen w-3/5 flex-col items-center gap-4 bg-zinc-200 px-2 py-3 text-black dark:bg-slate-700 dark:text-white">
        <div className="flex flex-row items-center gap-4">
          <div className="font-bold">{variant?.name}</div>
          <div className="">{dataFormatter(variant?.created_at)}</div>
          <div className="flex flex-row gap-2 font-serif">
            <h2>Сложность:</h2>
            <h2 className="font-bold">{variant?.difficulty}</h2>
          </div>
          <div className="">{variant?.author}</div>
        </div>

        <div className="flex flex-row items-center gap-4 rounded-2xl border-2 bg-white p-2 dark:bg-slate-600">
          <div className="font-bold">
            Осталось времени: {formatTime(timeLeft)}
          </div>
          <Button color="light" onClick={handlePauseResumeTimer}>
            {timerPaused ? "Возобновить" : "Пауза"}
          </Button>
        </div>

        <ExercisesByVariant 
          variantId={variantId}
          isTestCompleted={isTestCompleted}
          results={results} 
          handleGivenAnswer={handleGivenAnswer} 
          givenAnswer={givenAnswers}
        />

        {isTestCompleted && (
          <div className="font-bold">
            Количество набранных баллов: {calculateScore()}
          </div>
        )}

        {isTestCompleted ? (
          <Link to="/">
            <Button color="light">Вернуться на главную</Button>
          </Link>
        ) : (
          <Button color="light" onClick={handleCompleteTest}>
            Завершить тестирование
          </Button>
        )}
      </main>
  );
}