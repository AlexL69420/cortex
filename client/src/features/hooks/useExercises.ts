import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { exercisesApi } from '../api/exercisesApi';
import type { Exercise, CreateExerciseInput, UpdateExerciseInput, ExercisesFilter } from '../model/schemas';

// Ключи для query cache
export const exerciseKeys = {
  all: ['exercises'] as const,
  lists: () => [...exerciseKeys.all, 'list'] as const,
  list: (filters: ExercisesFilter) => [...exerciseKeys.lists(), filters] as const,
  details: () => [...exerciseKeys.all, 'detail'] as const,
  detail: (id: number) => [...exerciseKeys.details(), id] as const,
  answers: (id: number) => [...exerciseKeys.detail(id), 'answers'] as const,
  byVariant: (variantId: number) => [...exerciseKeys.all, 'variant', variantId] as const,
};

// Хук для получения всех упражнений
export const useExercises = (filters: ExercisesFilter = {}): UseQueryResult<Exercise[], Error> => {
  return useQuery({
    queryKey: exerciseKeys.list(filters),
    queryFn: exercisesApi.fetchExercises,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Хук для получения упражнения по ID
export const useExercise = (id: number | undefined): UseQueryResult<Exercise, Error> => {
  return useQuery({
    queryKey: exerciseKeys.detail(id!),
    queryFn: () => exercisesApi.fetchExerciseById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Хук для получения упражнений по варианту
export const useExercisesByVariant = (variantId: number | undefined): UseQueryResult<Exercise[], Error> => {
  return useQuery({
    queryKey: exerciseKeys.byVariant(variantId!),
    queryFn: () => exercisesApi.fetchExercisesByVariant(variantId!),
    enabled: !!variantId,
    staleTime: 5 * 60 * 1000,
  });
};

// Хук для создания упражнения
export const useCreateExercise = (): UseMutationResult<Exercise, Error, CreateExerciseInput> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exercisesApi.createExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exerciseKeys.lists() });
    },
  });
};

// Хук для обновления упражнения
export const useUpdateExercise = (): UseMutationResult<Exercise, Error, { id: number } & UpdateExerciseInput> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exercisesApi.updateExercise,
    onSuccess: (updatedExercise) => {
      queryClient.setQueryData(exerciseKeys.detail(updatedExercise.id), updatedExercise);
      queryClient.invalidateQueries({ queryKey: exerciseKeys.lists() });
    },
  });
};

// Хук для удаления упражнения
export const useDeleteExercise = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exercisesApi.deleteExercise,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: exerciseKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: exerciseKeys.lists() });
    },
  });
};