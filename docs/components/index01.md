
## vuevse能力介绍
VueUse 提供了多个方面的能力，涵盖了以下几个领域：

1.响应式状态管理：提供组合函数用于创建和管理响应式状态，如 `useState` 和 `useRef`。

2.副作用管理：包括 `useEffect` 和 `useWatch` 等，用于处理副作用和观察数据变化。

3.DOM 操作：如 `useClickAway` 和 `useIntersectionObserver`，简化 DOM 事件处理和交互。

4.节流与防抖：提供 `useThrottle` 和 `useDebounce`，优化性能和用户体验。

5.定时器和间隔：如 `useInterval` 和 `useTimeout`，用于处理定时任务。

6.浏览器 API：如 `useFetch` 和 `useStorage`，集成常用的浏览器功能。

7.功能性工具：包括数组和对象处理的工具函数，简化开发过程。

## 安装
`npm i @vueuse/core`

## 用法示例
只需从 `@vueuse/core` 导入您需要的函数

```ts
<script setup>
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

// 跟踪鼠标位置
const { x, y } = useMouse()

// 用户是否喜欢暗黑主题
const isDark = usePreferredDark()

// 在本地存储中持久化状态
const store = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
  },
)
</script>
```