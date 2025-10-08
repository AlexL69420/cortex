import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Variant } from "../../model/schemas";
import dataFormatter from "../../lib/dataFormatter";

interface VariantListProps {
  variants: Variant[];
}

export default function VariantsList({ variants }: VariantListProps) {
  const navigate = useNavigate();

  return (
    <div className="flex w-2/3 flex-col gap-2 px-2">
      <h1 className="font-mono text-2xl italic text-black dark:text-red-400">
        Новые варианты
      </h1>
      <div className="flex flex-col gap-4 rounded-2xl border-2 bg-white p-5 dark:bg-slate-600">
        {variants.length > 0 ? (
          <ul>
            {variants.map((variant) => (
              <li key={variant.id}>
                <div
                  className="flex flex-row gap-2 hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-400"
                  onClick={() => navigate(`/variant/${variant.id}`)}
                >
                  <p>{dataFormatter(variant.created_at)}: </p>
                  <h2 className="font-bold hover:underline">
                    {variant.name}
                  </h2>
                  <p> by {variant.author}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет данных для отображения</p>
        )}
        <Link
          to="/variants"
          className="text-gray-400 hover:underline dark:text-gray-300"
        >
          ещё варианты...
        </Link>
      </div>
    </div>
  );
}