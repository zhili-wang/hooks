---
nav:
  path: /hooks
---

# useInstanceState

一个管理 object 类型 state 的 Hooks，用法与 `useState` 基本一致。
在使用`useState`时，每次更新状态都会重新渲染组件，而`useInstanceState`的只会在更新函数调用时才会更新 state 的值，不会直接触发重新渲染组件。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState] = useInstanceState<T extends Record<string, any>>(
  initialState: T = {} as T
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void]
```
