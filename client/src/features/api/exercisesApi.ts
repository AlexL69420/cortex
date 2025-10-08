import { axiosInstance } from './axiosConfig';
import {
  validateExercisesArray,
  validateExercise,
  validateCreateExercise,
  validateUpdateExercise,
} from '../model/validation';
import type { Exercise, CreateExerciseInput, UpdateExerciseInput } from '../model/schemas';

export const exercisesApi = {
  // GET - получение всех упражнений
  fetchExercises: async (): Promise<Exercise[]> => {
    const response = await axiosInstance.get('/exercises');
    return validateExercisesArray(response.data);
  },

  // GET - получение упражнения по ID
  fetchExerciseById: async (id: number): Promise<Exercise> => {
    const response = await axiosInstance.get(`/exercises/${id}`);
    return validateExercise(response.data);
  },

  // GET - получение ответов для упражнения
  fetchExerciseAnswers: async (id: number): Promise<Exercise[]> => {
    const response = await axiosInstance.get(`/exercises/${id}/answers`);
    return response.data;
  },

  // GET - получение упражнений с фильтрацией по варианту
  fetchExercisesByVariant: async (variantId: number): Promise<Exercise[]> => {
    const response = await axiosInstance.get('/exercises', {
      params: { id_variant: variantId }
    });
    return validateExercisesArray(response.data);
  },

  // POST - создание нового упражнения
  createExercise: async (exerciseData: CreateExerciseInput): Promise<Exercise> => {
    const validatedData = validateCreateExercise(exerciseData);
    const response = await axiosInstance.post('/exercises', validatedData);
    return validateExercise(response.data);
  },

  // PUT - обновление упражнения
  updateExercise: async ({ id, ...exerciseData }: { id: number } & UpdateExerciseInput): Promise<Exercise> => {
    const validatedData = validateUpdateExercise(exerciseData);
    const response = await axiosInstance.put(`/exercises/${id}`, validatedData);
    return validateExercise(response.data);
  },

  // DELETE - удаление упражнения
  deleteExercise: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/exercises/${id}`);
  },
};