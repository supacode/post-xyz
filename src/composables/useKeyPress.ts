import { onMounted, onUnmounted } from 'vue';

export const useKeyPress = ({
  targetKey,
  callback,
}: {
  /** The key to listen for */
  targetKey: string;
  /** The callback to call when the key is pressed */
  callback: () => void;
}) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === targetKey) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown, true);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown, true);
  });
};
