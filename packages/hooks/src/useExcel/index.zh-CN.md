---
nav:
  path: /hooks
---

# useExcel

提供表格数据的导入和导出能力的 Hook，如果你的应用需要处理大量的表格数据，可以使用这个 Hook 来帮助你解析和处理这些数据。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 动态元素高度

<code src="./demo/demo2.tsx" />

## API

```typescript
const [list, scrollTo] = useVirtualList<T>(
  originalList: T[],
  options: {
    containerTarget: (() => Element) | Element | MutableRefObject<Element>,
    wrapperTarget: (() => Element) | Element | MutableRefObject<Element>,
    itemHeight: number | ((index: number, data: T) => number),
    overscan?: number,
  }
);
```

### Params

| 参数         | 说明               | 类型      | 默认值 |
| ------------ | ------------------ | --------- | ------ |
| originalList | 包含大量数据的列表 | `T[]`     | `[]`   |
| options      | 配置项             | `Options` | -      |

### Options

| 参数            | 说明                                                   | 类型                                                        | 默认值 |
| --------------- | ------------------------------------------------------ | ----------------------------------------------------------- | ------ |
| containerTarget | 外面容器，支持 DOM 节点或者 Ref 对象                   | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -      |
| wrapperTarget   | 内部容器，支持 DOM 节点或者 Ref 对象                   | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -      |
| itemHeight      | 行高度，静态高度可以直接写入像素值，动态高度可传入函数 | `number` \| `((index: number, data: T) => number)`          | -      |
| overscan        | 视区上、下额外展示的 DOM 节点数量                      | `number`                                                    | `5`    |

### Result

| 参数     | 说明                   | 类型                           |
| -------- | ---------------------- | ------------------------------ |
| list     | 当前需要展示的列表内容 | `{ data: T, index: number }[]` |
| scrollTo | 快速滚动到指定 index   | `(index: number) => void`      |
