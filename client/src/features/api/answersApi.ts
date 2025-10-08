import { axiosInstance } from './axiosConfig';
import {
  validateAnswersArray,
  validateAnswer,
  validateCreateAnswer,
  validateUpdateAnswer,
} from '../model/validation';
import type { Answer, CreateAnswerInput, UpdateAnswerInput } from '../model/schemas';

export const answersApi = {
  // GET - получение всех ответов
  fetchAnswers: async (): Promise<Answer[]> => {
    const response = await axiosInstance.get('/answers');
    return validateAnswersArray(response.data);
  },

  // GET - получение ответа по ID
  fetchAnswerById: async (id: number): Promise<Answer> => {
    const response = await axiosInstance.get(`/answers/${id}`);
    return validateAnswer(response.data);
  },

  // GET - получение ответов для упражнения
  fetchAnswersByExercise: async (exerciseId: number): Promise<Answer[]> => {
    const response = await axiosInstance.get('/answers', {
      params: { id_exercise: exerciseId }
    });
    return validateAnswersArray(response.data);
  },

  // POST - создание нового ответа
  createAnswer: async (answerData: CreateAnswerInput): Promise<Answer> => {
    const validatedData = validateCreateAnswer(answerData);
    const response = await axiosInstance.post('/answers', validatedData);
    return validateAnswer(response.data);
  },

  // PUT - обновление ответа
  updateAnswer: async ({ id, ...answerData }: { id: number } & UpdateAnswerInput): Promise<Answer> => {
    const validatedData = validateUpdateAnswer(answerData);
    const response = await axiosInstance.put(`/answers/${id}`, validatedData);
    return validateAnswer(response.data);
  },

  // DELETE - удаление ответа
  deleteAnswer: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/answers/${id}`);
  },
};