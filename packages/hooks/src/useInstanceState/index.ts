import { useRef, useCallback } from 'react';
import { isFunction } from '../utils';
import type { MutableRefObject } from 'react';

export type SetState<T extends Record<string, any>> = (
  state: Partial<T> | null | ((prevState: Readonly<T>) => Partial<T> | null),
) => void;

const useInstanceState = <T extends Record<string, any>>(
  initialState: T | (() => T),
): [T, SetState<T>] => {
  const initialized = useRef(false);
  const ref = useRef<T>() as MutableRefObject<T>;

  if (!initialized.current) {
    ref.current = isFunction(initialState) ? (initialState as () => T)() : initialState || {};
    initialized.current = true;
  }

  const SetState = useCallback((patch: unknown) => {
    const newState = isFunction(patch) ? patch(ref.current) : patch;
    for (const key in newState) {
      if (Object.prototype.hasOwnProperty.call(newState, key)) {
        // @ts-ignore
        ref.current[key] = newState[key];
      }
    }
  }, []);

  return [ref.current, SetState];
};

export default useInstanceState;
