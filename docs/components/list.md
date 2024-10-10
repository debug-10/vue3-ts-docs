## 列表组件

## 介绍

### 组件结构
一个基本的 <List> 组件结构：
```ts
<template>
  <ul>
    <li v-for="(item, index) in items" :`key="index`">
      <slot :item="item">{{ item }}</slot>
    </li>
  </ul>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    items: {
      type: Array as () => Array<string>,
      required: true,
    },
  },
});
</script>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
  cursor: pointer;
}
li:hover {
  background-color: #f0f0f0;
}
</style>
```

### 关键部分解释

模板部分
- `<ul>` 和 `<li>`：使用无序列表来展示项。
- `v-for`：通过 `v-for` 指令循环遍历 `items` 数组，并渲染每个项。
- `:key`：使用 `:key` 来提供唯一标识，优化渲染性能。
- `<slot>`：允许使用插槽自定义每个列表项的显示内容，提供灵活性。
- `@click`：为每个项添加点击事件处理程序，触发 `handleClick` 方法。

脚本部分
- `defineComponent`：使用 Vue 3 的组合式 API 定义组件。
- `props`：定义 `items` 属性，要求为一个数组，包含要显示的列表项。
- `emits`：声明组件发出的事件，这里是 `item-click`，用于响应项的点击事件。
- `handleClick` 方法：在点击列表项时调用，发出 `item-click` 事件，传递被点击的项。

### 使用 List 组件
可以在父组件中使用这个 `<List>` 组件：

```ts
<template>
  <div>
    <List :items="itemList" @item-click="onItemClick">
      <template #default="{ item }">
        <strong>{{ item }}</strong>  <!-- 自定义项的显示内容 -->
      </template>
    </List>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import List from './List.vue';

export default defineComponent({
  components: { List },
  setup() {
    const itemList = ref(['项 1', '项 2', '项 3']);

    const onItemClick = (item: string) => {
      console.log('点击了:', item);
    };

    return { itemList, onItemClick };
  },
});
</script>
```

### 增强功能
为了增强 <List> 组件的功能，可以考虑以下方面：

- 自定义样式：可以通过 CSS 或提供 props 来支持不同的主题或样式。
- 支持多选：可以添加功能以支持多选项，允许用户选择多个项。
- 搜索与过滤：集成搜索框，允许用户过滤列表项。
- 虚拟滚动：对于大型列表，考虑实现虚拟滚动以优化性能。

### 示例
支持多选的 List 组件
```ts
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index" @click="toggleSelect(item)">
      <input type="checkbox" :checked="isSelected(item)" />
      <span>{{ item }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    items: {
      type: Array as () => Array<string>,
      required: true,
    },
  },
  setup(props) {
    const selectedItems = ref<string[]>([]);

    const toggleSelect = (item: string) => {
      const index = selectedItems.value.indexOf(item);
      if (index === -1) {
        selectedItems.value.push(item);
      } else {
        selectedItems.value.splice(index, 1);
      }
    };

    const isSelected = (item: string) => selectedItems.value.includes(item);

    return { toggleSelect, isSelected };
  },
});
</script>
```