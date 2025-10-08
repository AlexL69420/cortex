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
});

// Схема для ответа
export const answerSchema = z.object({
  id: z.number().positive(),
  text: z.string().min(1, "Text is required"),
  id_exercise: z.number().positive(),
});

// Схемы для массивов
export const variantsArraySchema = z.array(variantSchema);
export const exercisesArraySchema = z.array(exerciseSchema);
export const answersArraySchema = z.array(answerSchema);

// Схемы для создания
export const createVariantSchema = variantSchema.omit({ id: true, created_at: true });
export const createExerciseSchema = exerciseSchema.omit({ id: true, created_at: true });
export const createAnswerSchema = answerSchema.omit({ id: true });

// Схемы для обновления
export const updateVariantSchema = createVariantSchema.partial();
export const updateExerciseSchema = createExerciseSchema.partial();
export const updateAnswerSchema = createAnswerSchema.partial();

// Типы
export type Variant = z.infer<typeof variantSchema>;
export type Exercise = z.infer<typeof exerciseSchema>;
export type Answer = z.infer<typeof answerSchema>;
export type CreateVariantInput = z.infer<typeof createVariantSchema>;
export type UpdateVariantInput = z.infer<typeof updateVariantSchema>;
export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;
export type UpdateExerciseInput = z.infer<typeof updateExerciseSchema>;
export type CreateAnswerInput = z.infer<typeof createAnswerSchema>;
export type UpdateAnswerInput = z.infer<typeof updateAnswerSchema>;

// Типы для фильтров
export type VariantsFilter = z.infer<typeof variantsFilterSchema>;
export type ExercisesFilter = z.infer<typeof exercisesFilterSchema>;