import { useNavigate } from "react-router-dom";
import { Variant } from "../features/model/schemas";
import dataFormatter from "../features/lib/dataFormatter";

interface VariantListProps {
  variants: Variant[];
}

export default function VariantsList({ variants }: VariantListProps) {
  const navigate = useNavigate();

  return (
      <main>
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
      </main>
  );
}