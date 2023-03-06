import React from 'react';
import { useInstanceState } from 'ahooks';

export default function () {
  const [state, setState] = useInstanceState({ name: 'Alex', age: 18 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ [name]: value });
    setState({ [name]: value });
  };
  const handleChangeFn = (e) => {
    setState(({}) => {
      return { age: Number(e.target.value) };
    });
  };

  return (
    <div>
      Name: <input type="text" name="name" onChange={handleChange} />
      Age: <input type="number" name="age" onChange={handleChangeFn} />
      <p>
        Name: {state.name}, Age: {state.age}
      </p>
      <button onClick={() => window.alert(JSON.stringify(state, null, 2))}>Alart</button>
      <button
        onClick={() => {
          state.age++;
        }}
      >
        test
      </button>
    </div>
  );
}
