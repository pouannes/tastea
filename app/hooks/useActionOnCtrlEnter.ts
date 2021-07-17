import { useEffect, useCallback } from 'react';

const useActionOnCtrlEnter = (onCtrlEnter: () => void): void => {
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        onCtrlEnter();
      }
    },
    [onCtrlEnter]
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => window.removeEventListener('keydown', keyDownHandler);
  }, [keyDownHandler]);
};

export default useActionOnCtrlEnter;
