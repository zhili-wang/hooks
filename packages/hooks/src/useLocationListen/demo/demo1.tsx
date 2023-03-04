import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLocationListen } from 'ahooks';

const App = () => {
  // const history = useHistory()
  const onBeforeChange = (prevLocation, nextLocation) => {
    console.log('handleBeforeChange', prevLocation, nextLocation);
    // return window.confirm('Do you really want to leave?');
    return false;
  };

  const history = useLocationListen({ onBeforeChange });
  const handleClick = () => {};

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button
              onClick={() => {
                console.log(window.confirm('Do you really want to leave?'));
              }}
            >
              test
            </button>
          </li>
          <li>
            <button onClick={() => history.push('/')}>ahooks</button>
            {/* <Link to="/">To ahooks</Link> */}
          </li>
          <li>
            <Link to="/hooks/use-request/index">To useLocationListen</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div>
        <h3>Page: {location.pathname}</h3>
      </div>
    </div>
  );
};

export default App;

// import React, { useState } from 'react';
// import useLocationListen from '../index';
// // import { useLocationListen } from 'ahooks';

// const App = () => {
//   const [count, setCount] = useState(0);
//   const url = 'http://localhost:8000/hooks/use-update'
//   const handleBeforeChange = (prevLocation, nextLocation) => {
//     console.log('handleBeforeChange', prevLocation, nextLocation);
//     return window.confirm('Do you really want to leave?');
//   };

//   const location = useLocationListen(handleBeforeChange);
//   // const location = useLocationListen((prevLocation, nextLocation) => {
//   //   console.log(prevLocation, nextLocation, 'onBeforeChange')
//   //     if (nextLocation.href === url && count < 3) {
//   //       setCount(count + 1);
//   //       return false; // 阻止跳转
//   //     }
//   //     return true; // 允许跳转
//   // });
//   // const location = useLocationListen({
//   //   onBeforeChange(prevLocation, nextLocation) {
//   //     console.log(prevLocation, nextLocation, 'onBeforeChange')
//   //     if (nextLocation === url && count < 3) {
//   //       setCount(count + 1);
//   //       return false; // 阻止跳转
//   //     }
//   //     return true; // 允许跳转
//   //   },
//   // });

//   const handleClick = () => {
//     // window.location.href = url;
//     // history.pushState({}, "", '/hooks/use-update');
//     // history.back()
//   };

//   return (
//     <div>
//       <p>当前页面：{location.href}</p>
//       <p>禁止跳转次数：{count}</p>
//       <button onClick={handleClick}>跳转</button>
//     </div>
//   );
// };

// export default App;
