## 按钮组件

## 介绍
在 Vue 3 中，Button 组件是常见的 UI 组件，用于触发操作或事件

### 组件结构
```ts
<template>
  <button :class="`btn ${type}`" @click="handleClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>
```

```ts
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'primary', // 可选类型：primary, secondary, danger等
    },
    disabled: {
      type: Boolean,
      default: false, // 是否禁用按钮
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (event: MouseEvent) => {
      if (!props.disabled) {
        emit('click', event);
      }
    };

    return { handleClick };
  },
});
</script>
```

```ts
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'primary', // 可选类型：primary, secondary, danger等
    },
    disabled: {
      type: Boolean,
      default: false, // 是否禁用按钮
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (event: MouseEvent) => {
      if (!props.disabled) {
        emit('click', event);
      }
    };

    return { handleClick };
  },
});
</script>
```


基本上，Button 组件可以包括以下几个方面：

1.基本结构：使用 `<template>` 定义按钮的 HTML 结构，通常包括一个 `<button>` 元素。

2.样式：通过 CSS 类或内联样式来定义按钮的外观，可以支持不同的状态（如悬停、禁用等）。

3.Props：

- `type`：按钮类型（如 primary, secondary, danger）。
- `disabled`：控制按钮是否禁用。
- `loading`：显示加载状态。

4.事件：
- `@click`：处理按钮点击事件，可以传递事件处理函数。

5.插槽：允许用户自定义按钮内容，例如图标、文本等。

### 扩展功能
你可以根据需要扩展按钮组件的功能：

- 图标支持：允许在按钮中添加图标。
- loading 状态：在按钮执行异步操作时显示加载状态。
- 不同大小：添加 size prop，以支持小、中、大等不同按钮大小。
- 自定义样式：允许通过 props 传递自定义样式或类名。

### 示例

```ts
<template>
  <button :class="`btn ${type}`" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'primary',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (event: MouseEvent) => {
      emit('click', event);
    };

    return { handleClick };
  },
});
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: white;
}
.btn.primary {
  background-color: blue;
}
.btn.secondary {
  background-color: gray;
}
</style>

```