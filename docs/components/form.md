## 表单组件

## 介绍
在 Vue 3 中，表单组件通常用于收集用户输入，如文本、选择、复选框等

### 组件结构
一个基本的表单组件通常包括以下结构：
```ts
<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>
    <button type="submit">提交</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['submit'],
  setup(_, { emit }) {
    const handleSubmit = () => {
      emit('submit');
    };

    return { handleSubmit };
  },
});
</script>
```

### 关键部分解释

模板部分

- `<form>` 元素：使用 HTML 的 `<form>` 元素来创建表单。

- `@submit.prevent`：使用 Vue 的事件修饰符 `.prevent` 来防止默认表单提交行为。

- `<slot>`：允许插入子组件或其他内容，使得使用组件时可以灵活添加输入字段。

提交按钮：添加一个提交按钮来触发表单提交。

脚本部分

- `defineComponent`：使用 Vue 3 的组合式 API 定义组件。

- `emits`：声明该组件会发出的事件，这里是 `'submit'`。

- `handleSubmit` 方法：处理提交逻辑，调用 `emit('submit')` 将事件传递给父组件。

### 使用表单组件
可以在父组件中使用这个 `<Form>` 组件，并添加输入字段：
```ts
<template>
  <Form @submit="onSubmit">
    <input v-model="formData.name" placeholder="姓名" required />
    <input v-model="formData.email" type="email" placeholder="邮箱" required />
  </Form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Form from './Form.vue';

export default defineComponent({
  components: { Form },
  setup() {
    const formData = ref({ name: '', email: '' });

    const onSubmit = () => {
      console.log('提交的数据:', formData.value);
    };

    return { formData, onSubmit };
  },
});
</script>
```





## 示例
```ts
<template>
  <Form @submit="onSubmit">
    <input v-model="formData.name" placeholder="姓名" required />
    <span v-if="errors.name">{{ errors.name }}</span>
    <input v-model="formData.email" type="email" placeholder="邮箱" required />
    <span v-if="errors.email">{{ errors.email }}</span>
  </Form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Form from './Form.vue';

export default defineComponent({
  components: { Form },
  setup() {
    const formData = ref({ name: '', email: '' });
    const errors = ref({ name: '', email: '' });

    const validate = () => {
      errors.value.name = formData.value.name ? '' : '姓名不能为空';
      errors.value.email = formData.value.email.includes('@') ? '' : '邮箱格式不正确';
      return !errors.value.name && !errors.value.email;
    };

    const onSubmit = () => {
      if (validate()) {
        console.log('提交的数据:', formData.value);
      }
    };

    return { formData, errors, onSubmit };
  },
});
</script>
```