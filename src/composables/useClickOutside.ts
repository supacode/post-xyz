import { type Ref, onMounted, onUnmounted } from 'vue';

export const useClickOutside = ({
  callback,
  elementRef,
}: {
  elementRef: Ref<HTMLElement | null>;
  callback: (event: MouseEvent) => void;
}) => {
  const onClickOutside = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback(event);
    }
  };

  onMounted(() => document.addEventListener('click', onClickOutside, true));
  onUnmounted(() => document.removeEventListener('click', onClickOutside, true));
};
