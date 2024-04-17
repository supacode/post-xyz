import { ref } from 'vue';
import { useMutation, type MutationFunction } from '@tanstack/vue-query';

type Mutation = {
  mutationFn: MutationFunction;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  onSettled?: () => void;
};

/**
 * Custom mutation hook that encapsulates the useMutation from @tanstack/vue-query.
 * We created this to manage the isLoading state internally since the default useMutation
 * does not provide an isLoading state out of the box.
 * This composable we'll make it reusable across components and avoids repetition of isLoading logic.
 */
export const useAppMutation = ({ mutationFn, onError, onSettled, onSuccess }: Mutation) => {
  const isLoading = ref(false);
  const error = ref<Error>();
  const data = ref<unknown>(null);

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: (res) => {
      data.value = res;
      onSuccess?.();
    },
    onError: (res) => {
      error.value = res;
      onError?.(res);
    },
    onSettled: () => {
      isLoading.value = false;
      onSettled?.();
    },
  });

  const makeMutation = (variables?: unknown) => {
    isLoading.value = true;
    mutate(variables);
  };

  return {
    isLoading,
    error,
    data,
    mutate: makeMutation,
  };
};
