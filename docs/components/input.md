## 输入框组件

## 介绍
输入框组件是一个可重用的 Vue 3 组件，它允许父组件通过 v-model 语法绑定输入值。组件接收一个标签和一个输入框的 ID，方便创建动态和响应式的表单。

### 组件结构
一个基本的 `<Input>` 组件结构如下：
```ts
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input 
      :type="type" 
      :value="modelValue" 
      @input="handleInput" 
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
    />
    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    errorMessage: String,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      emit('update:modelValue', input.value);
    };

    return { handleInput };
  },
});
</script>

<style scoped>
.error {
  color: red;
  font-size: 12px;
}
</style>
```

### 关键部分解释

模板部分:

- `<label>`：如果提供了 label 属性，显示标签。
- `<input>` 元素：使用原生的 `<input>` 元素，动态绑定 type、value 和其他属性。
- `:value`：将 modelValue 属性绑定到输入框，以实现双向绑定。
- `@input`：监听输入事件并调用 handleInput 方法。

错误信息：如果有 errorMessage，显示相关错误提示。

脚本部分:

- `defineComponent`：使用 Vue 3 的组合式 API 定义组件。
- `props`：定义组件接收的属性，包括 modelValue、label、type 等。
- `emits`：声明组件发出的事件，这里是 update:modelValue，用于支持 v-model。
- `handleInput` 方法：在输入事件触发时调用，更新 modelValue。

### 使用 Input 组件
可以在父组件中使用这个 `<Input>` 组件：
```ts
<template>
  <div>
    <Input 
      v-model="formData.name" 
      label="姓名" 
      placeholder="请输入姓名" 
      required 
      :errorMessage="errors.name" 
    />
    <Input 
      v-model="formData.email" 
      label="邮箱" 
      type="email" 
      placeholder="请输入邮箱" 
      :errorMessage="errors.email" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Input from './Input.vue';

export default defineComponent({
  components: { Input },
  setup() {
    const formData = ref({ name: '', email: '' });
    const errors = ref({ name: '', email: '' });

    // 示例的验证逻辑可以在这里添加

    return { formData, errors };
  },
});
</script>

```
### 增强功能
可以在以下方面来增强 `<Input>` 组件的功能：
- 验证：可以添加 computed 属性来验证输入，并显示相应的错误信息。
- 样式和主题：可以添加 CSS 类以支持不同的样式和主题。
- 键盘事件：支持键盘事件，如 @keydown，以处理特定按键操作。

### 示例


```ts
<template>
  <div>
    <Input 
      v-model="formData.name" 
      label="姓名" 
      placeholder="请输入姓名" 
      :errorMessage="errors.name" 
    />
    <Input 
      v-model="formData.email" 
      label="邮箱" 
      type="email" 
      placeholder="请输入邮箱" 
      :errorMessage="errors.email" 
    />
    <button @click="validate">提交</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Input from './Input.vue';

export default defineComponent({
  components: { Input },
  setup() {
    const formData = ref({ name: '', email: '' });
    const errors = ref({ name: '', email: '' });

    const validate = () => {
      errors.value.name = formData.value.name ? '' : '姓名不能为空';
      errors.value.email = formData.value.email.includes('@') ? '' : '邮箱格式不正确';
      if (!errors.value.name && !errors.value.email) {
        console.log('提交的数据:', formData.value);
      }
    };

    return { formData, errors, validate };
  },
});
</script>
```