import { axiosInstance } from './axiosConfig';
import {
  validateVariantsArray,
  validateVariant,
  validateCreateVariant,
  validateUpdateVariant,
} from '../model/validation';
import type { Variant, CreateVariantInput, UpdateVariantInput, Exercise } from '../model/schemas';

export const variantsApi = {
  // GET - получение всех вариантов
  fetchVariants: async (): Promise<Variant[]> => {
    const response = await axiosInstance.get('/variants');
    return validateVariantsArray(response.data);
  },

  // GET - получение варианта по ID
  fetchVariantById: async (id: number): Promise<Variant> => {
    const response = await axiosInstance.get(`/variants/${id}`);
    return validateVariant(response.data);
  },

  // GET - получение упражнений для варианта
  fetchVariantExercises: async (id: number): Promise<Exercise[]> => {
    const response = await axiosInstance.get(`/variants/${id}/exercises`);
    return response.data;
  },

  // POST - создание нового варианта
  createVariant: async (variantData: CreateVariantInput): Promise<Variant> => {
    const validatedData = validateCreateVariant(variantData);
    const response = await axiosInstance.post('/variants', validatedData);
    return validateVariant(response.data);
  },

  // PUT - обновление варианта
  updateVariant: async ({ id, ...variantData }: { id: number } & UpdateVariantInput): Promise<Variant> => {
    const validatedData = validateUpdateVariant(variantData);
    const response = await axiosInstance.put(`/variants/${id}`, validatedData);
    return validateVariant(response.data);
  },

  // DELETE - удаление варианта
  deleteVariant: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/variants/${id}`);
  },
};