## 模拟短信发送

---

### 介绍
`useSmsSender` 提供了一种简单的方式来处理短信发送的功能，尽管这里的实现仅为模拟。通过使用 Vue 3 的响应式 API，该函数能够让组件轻松管理发送状态和错误信息。这种设计方式提升了代码的可维护性和可读性，同时遵循了组合式 API 的理念。开发者可以在真实的应用中扩展该功能，例如添加实际的 API 调用、错误处理和用户反馈，增强用户体验。该组合式函数可在不同组件间复用，提高了代码的灵活性和效率。

---

### 代码展示

以下代码定义了一个自定义组合式函数 `useSmsSender`，用于模拟发送短信的功能：

```ts
import { ref } from 'vue';

export function useSmsSender() {
  const isSending = ref(false);
  const errorMessage = ref('');

  const sendSms = (phoneNumber: string, message: string) => {
    isSending.value = true;
    errorMessage.value = '';

     setTimeout(() => {
        console.log(`短信发送到 ${phoneNumber}: ${message}`);
      isSending.value = false;
    }, 2000); // 2秒延迟
  };

  return { sendSms, isSending, errorMessage };
}
```
---

### 关键部分解释

- `isSending`：使用 `ref` 创建一个响应式布尔值，指示当前是否正在发送短信。
- `errorMessage`：使用 `ref` 存储错误信息，初始值为空字符串。
- `sendSms` 方法：接受两个参数：`phoneNumber` 和 `message`。当调用该方法时，首先将 `isSending` 设置为 true，并清空 `errorMessage`。然后使用 `setTimeou`t 模拟发送短信的过程，延迟 2 秒后打印发送信息，最后将 `isSending`设置为 false。
- 函数返回一个对象，包含 `sendSms` 方法以及响应式状态 `isSending` 和 `errorMessage`，供组件使用。