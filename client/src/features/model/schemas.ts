import { z } from 'zod';

// Схемы для фильтров
export const variantsFilterSchema = z.object({
  author: z.string().optional(),
  search: z.string().optional(),
});

export const exercisesFilterSchema = z.object({
  id_variant: z.number().positive().optional(),
  search: z.string().optional(),
});

// Схема для варианта
export const variantSchema = z.object({
  id: z.number().positive(),
  created_at: z.string().datetime(),
  name: z.string().min(1, "Name is required").max(255),
  author: z.string().min(1, "Author is required").max(100),
  num: z.number().int().positive(),
  difficulty: z.string().min(1, "Difficulty is required").max(100),
});

// Схема для упражнения
export const exerciseSchema = z.object({
  id: z.number().positive(),
  created_at: z.string().datetime(),
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().min(1, "Description is required"),
  problem: z.string().min(1, "Problem is required"),
  solution: z.string().min(1, "Solution is required"),
  num: z.number().int().positive(),
  id_variant: z.number().positive(),
  difficulty: z.string().min(1, "Difficulty is required").max(100),
  answer: z.string().min(1, "Answer is required").max(100),
});


// Схемы для массивов
export const variantsArraySchema = z.array(variantSchema);
export const exercisesArraySchema = z.array(exerciseSchema);

// Схемы для создания
export const createVariantSchema = variantSchema.omit({ id: true, created_at: true });
export const createExerciseSchema = exerciseSchema.omit({ id: true, created_at: true });

// Схемы для обновления
export const updateVariantSchema = createVariantSchema.partial();
export const updateExerciseSchema = createExerciseSchema.partial();

// Типы
export type Variant = z.infer<typeof variantSchema>;
export type Exercise = z.infer<typeof exerciseSchema>;
export type CreateVariantInput = z.infer<typeof createVariantSchema>;
export type UpdateVariantInput = z.infer<typeof updateVariantSchema>;
export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;
export type UpdateExerciseInput = z.infer<typeof updateExerciseSchema>;

// Типы для фильтров
export type VariantsFilter = z.infer<typeof variantsFilterSchema>;
export type ExercisesFilter = z.infer<typeof exercisesFilterSchema>;