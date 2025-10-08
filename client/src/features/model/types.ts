export interface Variant {
  id: number;
  created_at: string;
  name: string;
  author: string;
  num: number;
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
}

export interface Answer {
  id: number;
  text: string;
  id_exercise: number;
}

export interface ExerciseWithAnswers extends Exercise {
  answers: Answer[];
}

export interface VariantWithExercises extends Variant {
  exercises: ExerciseWithAnswers[];
}

// Типы для создания/обновления
export type CreateVariantInput = Omit<Variant, 'id' | 'created_at'>;
export type UpdateVariantInput = Partial<CreateVariantInput>;

export type CreateExerciseInput = Omit<Exercise, 'id' | 'created_at'>;
export type UpdateExerciseInput = Partial<CreateExerciseInput>;

export type CreateAnswerInput = Omit<Answer, 'id'>;
export type UpdateAnswerInput = Partial<CreateAnswerInput>;

// Фильтры
export interface VariantsFilter {
  author?: string;
  search?: string;
}

export interface ExercisesFilter {
  id_variant?: number;
  search?: string;
}