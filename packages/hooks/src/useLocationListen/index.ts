import { useState, useEffect, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import type * as H from 'history';
import { Modal } from 'antd';

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
  const history = useHistory();
  const [prevLocation, setPrevLocation] = useState(useLocation());
  const [lock, setLock] = useState(false);

  useEffect(() => {
    const promptMessage = ''; // 保存提示信息
    const blockNavigation = true; // 保存是否阻止导航的状态

    window.addEventListener('beforeunload', (event) => {
      // 如果阻止导航，添加提示信息
      if (blockNavigation) {
        // event.preventDefault();
        // event.returnValue = onBeforeChange
        // event.returnValue = Modal.confirm({
        //   content: '确定退出吗？',
        //   onOk: () => {
        //     // setLock(false);
        //     // unBlock();
        //     // 解锁后继续跳转
        //     // history.push(nextLocation.pathname);
        //     return true;
        //   },
        // });
        return false;
      }
    });
    const unBlock = history.block((nextLocation, actions) => {
      return onBeforeChange?.();
    });
    return () => {
      unBlock?.();
    };
  }, []);

  // useEffect(() => {
  //   let unBlock;
  //   // if (lock) {
  //     // 上锁
  //     unBlock = history.block((nextLocation) => {
  //       // 自己的弹窗组件
  //       Modal.confirm({
  //         content: '确定退出吗？',
  //         onOk: () => {
  //           // setLock(false);
  //           // unBlock();
  //            // 解锁后继续跳转
  //           history.push(nextLocation.pathname);
  //         },
  //       });
  //     });
  //   // } else {
  //   //    // 解锁
  //   //   unBlock?.();
  //   // }
  // }, [lock])

  // useEffect(() => {
  //   const unlisten = history.listen((location, action) => {
  //     const bol = onBeforeChange && !onBeforeChange(prevLocation, location);
  //     if (bol) {
  //       // 如果返回 false，则阻止路由变化，并且不进行任何操作。
  //       console.info(bol, 'onBeforeChange 阻止路由变化', prevLocation, location);
  //       return history.block();
  //     }

  //     if (onAfterChange) {
  //       onAfterChange(prevLocation, location);
  //     }

  //     setPrevLocation(location);
  //     return false;
  //   });

  //   return () => {
  //     unlisten();
  //   };
  // }, [history, onBeforeChange, onAfterChange, prevLocation]);

  // useEffect(() => {
  //   const _wr = function (type) {
  //     let orig = history[type];
  //     return function () {
  //       const e = new Event(type);
  //       e.arguments = arguments;
  //       window.dispatchEvent(e);
  //       // 注意事件监听在url变更方法调用之前 也就是在事件监听的回调函数中获取的页面链接为跳转前的链接
  //       let rv = orig.apply(this, arguments);
  //       return rv;
  //     };
  //   };
  //   history.pushState = _wr('pushState');
  //   history.replaceState = _wr('replaceState');
  //   window.addEventListener('pushState', function (e) {
  //     const path = e && e.arguments.length > 2 && e.arguments[2];
  //     const url = /^http/.test(path) ? path : location.protocol + '//' + location.host + path;
  //     console.log('old:' + location.href, 'new:' + url);
  //   });
  //   window.addEventListener('replaceState', function (e) {
  //     const path = e && e.arguments.length > 2 && e.arguments[2];
  //     const url = /^http/.test(path) ? path : location.protocol + '//' + location.host + path;
  //     console.log('old:' + location.href, 'new:' + url);
  //   });
  // }, []);
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
