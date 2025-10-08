import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { variantsApi } from '../api/variantsApi';
import type { Variant, CreateVariantInput, UpdateVariantInput, VariantsFilter, Exercise } from '../model/schemas';

// Ключи для query cache
export const variantKeys = {
  all: ['variants'] as const,
  lists: () => [...variantKeys.all, 'list'] as const,
  list: (filters: VariantsFilter) => [...variantKeys.lists(), filters] as const,
  details: () => [...variantKeys.all, 'detail'] as const,
  detail: (id: number) => [...variantKeys.details(), id] as const,
  exercises: (id: number) => [...variantKeys.detail(id), 'exercises'] as const,
};

// Хук для получения всех вариантов
export const useVariants = (filters: VariantsFilter = {}): UseQueryResult<Variant[], Error> => {
  return useQuery({
    queryKey: variantKeys.list(filters),
    queryFn: variantsApi.fetchVariants,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Хук для получения варианта по ID
export const useVariant = (id: number | undefined): UseQueryResult<Variant, Error> => {
  return useQuery({
    queryKey: variantKeys.detail(id!),
    queryFn: () => variantsApi.fetchVariantById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Хук для получения упражнений варианта
export const useVariantExercises = (variantId: number | undefined): UseQueryResult<Exercise[], Error> => {
  return useQuery({
    queryKey: variantKeys.exercises(variantId!),
    queryFn: () => variantsApi.fetchVariantExercises(variantId!),
    enabled: !!variantId,
  });
};

// Хук для создания варианта
export const useCreateVariant = (): UseMutationResult<Variant, Error, CreateVariantInput> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: variantsApi.createVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: variantKeys.lists() });
    },
  });
};

// Хук для обновления варианта
export const useUpdateVariant = (): UseMutationResult<Variant, Error, { id: number } & UpdateVariantInput> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: variantsApi.updateVariant,
    onSuccess: (updatedVariant) => {
      queryClient.setQueryData(variantKeys.detail(updatedVariant.id), updatedVariant);
      queryClient.invalidateQueries({ queryKey: variantKeys.lists() });
    },
  });
};

// Хук для удаления варианта
export const useDeleteVariant = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: variantsApi.deleteVariant,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: variantKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: variantKeys.lists() });
    },
  });
};