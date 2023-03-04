import { useEffect, useState } from 'react';
import type { Location } from 'history';

type LocationChangeHandler = (location: Location) => void | (() => void);

type OnBeforeChange = (
  prevLocation: globalThis.Location,
  nextLocation: globalThis.Location,
) => boolean;
type OnAfterChange = (location: globalThis.Location) => void;
type Options = {
  onBeforeChange?: OnBeforeChange;
  onAfterChange?: OnAfterChange;
};

function useLocationListen({ onBeforeChange, onAfterChange }: Options) {
  const [prevLocation, setPrevLocation] = useState(window.location);
  useEffect(() => {
    const nextLocation = window.location;
    const handleLocationChange = () => {
      if (onBeforeChange && !onBeforeChange(prevLocation, nextLocation)) {
        console.info('pushState');
        onAfterChange?.(prevLocation);
        window.history.pushState({}, '', prevLocation.href);
      } else {
        // setPrevLocation(nextLocation);
      }
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [onLocationChange]);
}

export default useLocationListen;
