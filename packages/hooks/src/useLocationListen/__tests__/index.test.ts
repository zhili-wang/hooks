import { renderHook } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import useLocationListen from '../index1';

describe('useLocationListen', () => {
  it('should update the URL when history change event is triggered', () => {
    const { result } = renderHook(() => useLocationListen());
    const nextLocation = 'https://example.com/path';

    fireEvent.popState(window, { state: null, url: nextLocation });

    expect(result.current).toBe(nextLocation);
  });

  it('should cancel location change if onBeforeChange returns false', () => {
    const { result } = renderHook(() => useLocationListen((prevLocation, nextLocation) => false));
    const nextLocation = 'https://example.com/path';
    const prevLocation = result.current;

    fireEvent.popState(window, { state: null, url: nextLocation });

    expect(result.current).toBe(prevLocation);
  });

  it('should update location if onBeforeChange returns true', () => {
    const { result } = renderHook(() => useLocationListen((prevLocation, nextLocation) => true));
    const nextLocation = 'https://example.com/path';

    fireEvent.popState(window, { state: null, url: nextLocation });

    expect(result.current).toBe(nextLocation);
  });

  it('should call onAfterChange callback if provided', () => {
    const onAfterChange = jest.fn();
    const { result } = renderHook(() =>
      useLocationListen((prevLocation, nextLocation) => true, onAfterChange),
    );
    const nextLocation = 'https://example.com/path';

    fireEvent.popState(window, { state: null, url: nextLocation });

    expect(onAfterChange).toHaveBeenCalledTimes(1);
    expect(onAfterChange).toHaveBeenCalledWith(result.current, nextLocation);
  });
});
