import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import type * as H from 'history';

type OnBeforeChange = (prevLocation: H.Location | null, nextLocation: H.Location) => boolean;
type OnAfterChange = (prevLocation: H.Location, nextLocation: H.Location) => void;

interface UseLocationListenOptions {
  onBeforeChange?: OnBeforeChange;
  onAfterChange?: OnAfterChange;
}

const useLocationListen = ({
  onBeforeChange,
  onAfterChange,
}: UseLocationListenOptions = {}): H.Location => {
  const [prevLocation, setPrevLocation] = useState(useLocation());
  const history = useHistory();
  // useEffect(()=> {

  // })

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      const bol = onBeforeChange && !onBeforeChange(prevLocation, location);
      if (bol) {
        // 如果返回 false，则阻止路由变化，并且不进行任何操作。
        console.info(bol, 'onBeforeChange 阻止路由变化', prevLocation, location);
        return history.block();
      }

      if (onAfterChange) {
        onAfterChange(prevLocation, location);
      }

      setPrevLocation(location);
      return false;
    });

    return () => {
      unlisten();
    };
  }, [history, onBeforeChange, onAfterChange, prevLocation]);

  return prevLocation;
};

export default useLocationListen;

// import { useEffect, useState } from 'react';

// type OnBeforeChange = (prevLocation: string, nextLocation: string) => boolean;
// type OnAfterChange = (location: string) => void;
// type Options = {
//   onBeforeChange?: OnBeforeChange;
//   onAfterChange?: OnAfterChange;
// };
// const useLocationListen = ({ onBeforeChange, onAfterChange }: Options): string => {
//   const [prevLocation, setPrevLocation] = useState(window.location.href);

//   useEffect(() => {
//     const handleLocationChange = () => {
//       const nextLocation = window.location.href;
//       console.info(nextLocation, '');
//       if (onBeforeChange && !onBeforeChange(prevLocation, nextLocation)) {
//         console.info('pushState');
//         // if (window.history.state?.__isCancelHistory !== true) {
//         //   window.history.replaceState({ __isCancelHistory: true }, '', prevLocation);
//         //   setPrevLocation(prevLocation);
//         // }
//         // setPrevLocation(prevLocation)
//         setPrevLocation(prevLocation);
//         window.history.pushState({}, '', prevLocation);
//       } else if (onBeforeChange?.(prevLocation, nextLocation)) {
//         console.info('通过')
//         setPrevLocation(nextLocation);
//         onAfterChange?.(nextLocation);
//       } else {
//         console.info('什么也没有');
//       }
//     };

//     // const handleHistoryChange = (event: PopStateEvent | Event) => {
//     //   const nextLocation = window.location.href;

//     //   if (onBeforeChange && !onBeforeChange(prevLocation, nextLocation)) {
//     //     event.preventDefault();
//     //     window.history.replaceState({ __isCancelHistory: true }, '', prevLocation);
//     //   } else {
//     //     setPrevLocation(nextLocation);
//     //     onAfterChange?.(nextLocation);
//     //   }
//     // };

//     window.addEventListener('popstate', handleLocationChange);
//     // window.addEventListener('replacestate', handleHistoryChange);

//     return () => {
//       window.removeEventListener('popstate', handleLocationChange);
//       // window.removeEventListener('replacestate', handleHistoryChange);
//     };
//   }, [onBeforeChange, onAfterChange, window.location]);

//   return prevLocation;
// };

// export default useLocationListen;
