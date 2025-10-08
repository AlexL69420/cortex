import { z } from 'zod';
import {
  variantsArraySchema,
  variantSchema,
  createVariantSchema,
  updateVariantSchema,
  exercisesArraySchema,
  exerciseSchema,
  createExerciseSchema,
  updateExerciseSchema,
  answersArraySchema,
  answerSchema,
  createAnswerSchema,
  updateAnswerSchema,
  type Variant,
  type Exercise,
  type Answer,
  type CreateVariantInput,
  type UpdateVariantInput,
  type CreateExerciseInput,
  type UpdateExerciseInput,
  type CreateAnswerInput,
  type UpdateAnswerInput,
} from './schemas';

// Базовые функции валидации
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error);
      throw new Error(`Data validation failed: ${error}`);
    }
    throw error;
  }
};

// Валидаторы для вариантов
export const validateVariant = (data: unknown): Variant => validateData(variantSchema, data);
export const validateVariantsArray = (data: unknown): Variant[] => validateData(variantsArraySchema, data);
export const validateCreateVariant = (data: unknown): CreateVariantInput => validateData(createVariantSchema, data);
export const validateUpdateVariant = (data: unknown): UpdateVariantInput => validateData(updateVariantSchema, data);

// Валидаторы для упражнений
export const validateExercise = (data: unknown): Exercise => validateData(exerciseSchema, data);
export const validateExercisesArray = (data: unknown): Exercise[] => validateData(exercisesArraySchema, data);
export const validateCreateExercise = (data: unknown): CreateExerciseInput => validateData(createExerciseSchema, data);
export const validateUpdateExercise = (data: unknown): UpdateExerciseInput => validateData(updateExerciseSchema, data);

// Валидаторы для ответов
export const validateAnswer = (data: unknown): Answer => validateData(answerSchema, data);
export const validateAnswersArray = (data: unknown): Answer[] => validateData(answersArraySchema, data);
export const validateCreateAnswer = (data: unknown): CreateAnswerInput => validateData(createAnswerSchema, data);
export const validateUpdateAnswer = (data: unknown): UpdateAnswerInput => validateData(updateAnswerSchema, data);