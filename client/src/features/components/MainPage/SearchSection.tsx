import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { useVariants } from "../../hooks/useVariants";
import LoadingState from "../../../shared/LoadingState";
import ErrorState from "../../../shared/ErrorState";

export default function SearchSection() {
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [searchID, setSearchID] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  
  const navigate = useNavigate();

  // Используем хук для получения всех вариантов
  const { data: allVariants, isLoading, error: queryError } = useVariants();

  const handleRandomVariant = () => {
    if (!allVariants || allVariants.length === 0) {
      setError("Нет доступных вариантов");
      return;
    }

    try {
      // Выбираем случайный вариант из всех доступных
      const randomIndex = Math.floor(Math.random() * allVariants.length);
      const randomVariant = allVariants[randomIndex];
      
      navigate(`/variant/${randomVariant.id}`);
      setError("");
    } catch (err) {
      setError("Ошибка при выборе случайного варианта");
    }
  };

  const handleSearchById = () => {
    if (searchID) {
      navigate(`/variant/${searchID}`);
    }
  };

  // Если загружаем данные, показываем индикатор загрузки
  if (isLoading) {
    return (
      <div className="px-10">
        <LoadingState />
      </div>
    );
  }

  // Если ошибка загрузки
  if (queryError) {
    return (
      <div className="px-10">
        <ErrorState error={queryError.message} />
      </div>
    );
  }

  return (
    <>
      <p className="px-10">
        Также вы можете найти нужный вариант по его номеру или выбрать вариант
        по его сложности. В случае выбора варианта по номеру, введите номер в
        поле и нажмите на кнопку "Начать экзамен". Для начала выполнения
        варианта по сложности, выберите нужную вам сложность и нажмите на кнопку
        "Начать экзамен" справа. после этого для вас будет подобран случайный
        вариант выбранной сложности.
      </p>

      <div className="flex flex-row items-center justify-between gap-5 px-10">
        <div className="flex flex-col">
          <p>Введите номер КИМ</p>
          <div className="flex flex-row gap-2">
            <TextInput
              id="kimID"
              placeholder="Номер КИМ"
              type="number"
              onChange={(e) => setSearchID(parseInt(e.target.value))}
            />
            <Button
              color="light"
              onClick={handleSearchById}
              disabled={!searchID}
            >
              Начать экзамен
            </Button>
          </div>
        </div>
        
        <h1>или</h1>
        
        <div className="flex flex-col">
          <p>Выберите сложность</p>
          <div className="flex flex-row gap-2">
            <div className="w-32">
              <Dropdown color="light" label={difficulty} dismissOnClick={false}>
                <Dropdown.Item onClick={() => setDifficulty("easy")}>
                  easy
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDifficulty("medium")}>
                  medium
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDifficulty("hard")}>
                  hard
                </Dropdown.Item>
              </Dropdown>
            </div>
            <Button color="light" onClick={handleRandomVariant}>
              Начать экзамен
            </Button>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-500  ">
          {error}
        </div>
      )}
    </>
  );
}