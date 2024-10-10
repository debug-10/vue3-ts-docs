## 倒计时计时器

---

### 介绍
`useCountdown` 是一个简洁而强大的自定义组合式函数，适用于需要倒计时的场景，如游戏计时、定时器或其他需要时间控制的功能。通过结合 Vue 3 的响应式 API 和生命周期管理，它提供了清晰的接口，使得组件开发更加灵活和高效。这个函数可以方便地在不同组件中复用，提高了代码的可维护性和重用性。

---

### 代码展示
以下定义了一个自定义组合式函数 `useCountdown`，用于实现倒计时功能
```ts
import { ref, onUnmounted } from 'vue';

export function useCountdown(initialTime: number) {
  const timeLeft = ref(initialTime);
  const isActive = ref(false);
 let interval: ReturnType<typeof setInterval> | null = null;


  const start = () => {
    if (isActive.value || timeLeft.value <= 0) return;

    isActive.value = true;
    interval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        clearInterval(interval!);
        isActive.value = false;
      }
    }, 1000);
  };

  const stop = () => {
    if (interval) {
      clearInterval(interval);
      isActive.value = false;
    }
  };

  const reset = () => {
    stop();
    timeLeft.value = initialTime;
  };

  onUnmounted(() => {
    stop();
  });

  return { timeLeft, isActive, start, stop, reset };
}
```

---

### 关键部分解释：
- `timeLeft`：用于存储剩余时间，使用 `ref` 使其具备响应式特性。
- `isActive`：布尔值，用于指示倒计时是否正在进行。
倒计时逻辑：
- `start` 方法：开始倒计时。首先检查是否已经在计时或剩余时间是否小于等于零。如果可以开始，则设置一个定时器，每秒钟减少 `timeLeft` 的值。当倒计时结束时，清除定时器并更新状态。
- `stop` 方法：停止倒计时，清除定时器并更新状态。
- `reset` 方法：停止计时并将剩余时间重置为初始值。
生命周期管理：
- 使用 `onUnmounted` 钩子，在组件卸载时停止计时，防止内存泄漏和不必要的定时器继续运行。