## 模态框组件

## 介绍
在 Vue 3 中，创建一个模态框（Modal）组件是一种常见的 UI 设计模式，用于显示重要信息、提示或表单等

### 组件结构
```ts
<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content" @click.stop>
      <header>
        <h3>{{ title }}</h3>
        <button class="close-button" @click="close">×</button>
      </header>
      <div class="modal-body">
        <slot></slot>
      </div>
      <footer>
        <button @click="close">取消</button>
        <button @click="confirm">确认</button>
      </footer>
    </div>
  </div>
</template>
```
```ts
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '模态框标题',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible', 'confirm'],
  setup(props, { emit }) {
    const close = () => {
      emit('update:visible', false);
    };

    const confirm = () => {
      emit('confirm');
      close();
    };

    return { close, confirm };
  },
});
</script>
```

```ts
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  border-radius: 5px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
}
.close-button {
  background: none;
  border: none;
  font-size: 1.5em;
}
</style>
```
### 关键要素
- `<template>`：定义模态框的结构，包括标题、内容和按钮。
- `props`：接收 title 和 visible 属性，以控制模态框的显示和标题内容。
- `emits`：发出事件，允许父组件控制模态框的可见性和处理确认操作。
- `样式`：使用 CSS 实现模态框的遮罩层和内容样式。


### 使用示例

```ts
<template>
  <div>
    <button @click="showModal">打开模态框</button>
    <Modal :visible="isModalVisible" @update:visible="isModalVisible = $event" @confirm="handleConfirm">
      <p>这是模态框的内容。</p>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from './Modal.vue';

export default defineComponent({
  components: { Modal },
  setup() {
    const isModalVisible = ref(false);

    const showModal = () => {
      isModalVisible.value = true;
    };

    const handleConfirm = () => {
      console.log('确认按钮被点击');
    };

    return { isModalVisible, showModal, handleConfirm };
  },
});
</script>
```

### 扩展功能
可以根据需要扩展模态框组件，例如：

- 动态内容：支持动态传递内容，可以通过插槽实现。
- 动画效果：添加过渡效果来增强用户体验。
- 自定义样式：通过 props 允许父组件传递自定义样式或类名。
- 关闭时的回调：在模态框关闭时执行特定的操作。



