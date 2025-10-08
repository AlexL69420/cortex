import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { answersApi } from '../api/answersApi';
import type { Answer, CreateAnswerInput, UpdateAnswerInput } from '../model/schemas';

// Ключи для query cache
export const answerKeys = {
  all: ['answers'] as const,
  lists: () => [...answerKeys.all, 'list'] as const,
  details: () => [...answerKeys.all, 'detail'] as const,
  detail: (id: number) => [...answerKeys.details(), id] as const,
  byExercise: (exerciseId: number) => [...answerKeys.all, 'exercise', exerciseId] as const,
};

// Хук для получения всех ответов
export const useAnswers = (): UseQueryResult<Answer[], Error> => {
  return useQuery({
    queryKey: answerKeys.lists(),
    queryFn: answersApi.fetchAnswers,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Хук для получения ответов по упражнению
export const useAnswersByExercise = (exerciseId: number | undefined): UseQueryResult<Answer[], Error> => {
  return useQuery({
    queryKey: answerKeys.byExercise(exerciseId!),
    queryFn: () => answersApi.fetchAnswersByExercise(exerciseId!),
    enabled: !!exerciseId,
    staleTime: 5 * 60 * 1000,
  });
};

// Хук для создания ответа
export const useCreateAnswer = (): UseMutationResult<Answer, Error, CreateAnswerInput> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: answersApi.createAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: answerKeys.lists() });
    },
  });
};

// Хук для обновления ответа
export const useUpdateAnswer = (): UseMutationResult<Answer, Error, { id: number } & UpdateAnswerInput> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: answersApi.updateAnswer,
    onSuccess: (updatedAnswer) => {
      queryClient.setQueryData(answerKeys.detail(updatedAnswer.id), updatedAnswer);
      queryClient.invalidateQueries({ queryKey: answerKeys.lists() });
    },
  });
};

// Хук для удаления ответа
export const useDeleteAnswer = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: answersApi.deleteAnswer,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: answerKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: answerKeys.lists() });
    },
  });
};