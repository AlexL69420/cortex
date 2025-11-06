export interface Variant {
  id: number;
  created_at: string;
  name: string;
  author: string;
  num: number;
  difficulty: string;
}

export interface Exercise {
  id: number;
  created_at: string;
  name: string;
  description: string;
  problem: string;
  solution: string;
  num: number;
  id_variant: number;
  difficulty: string;
  answer: string;
}



// Типы для создания/обновления
export type CreateVariantInput = Omit<Variant, 'id' | 'created_at'>;
export type UpdateVariantInput = Partial<CreateVariantInput>;

export type CreateExerciseInput = Omit<Exercise, 'id' | 'created_at'>;
export type UpdateExerciseInput = Partial<CreateExerciseInput>;

// Фильтры
export interface VariantsFilter {
  author?: string;
  search?: string;
}

export interface ExercisesFilter {
  id_variant?: number;
  search?: string;
}