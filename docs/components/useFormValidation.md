## 表单验证

---

### 介绍
`useFormValidation` 是一个灵活且可重用的表单验证解决方案，能够处理多个字段的验证逻辑。它通过结合响应式 API 使字段状态在 Vue 组件中可自动更新。该函数的设计使得验证逻辑清晰且易于扩展，适用于各种表单应用场景。开发者可以根据需求轻松地添加或修改验证规则，从而提高表单的用户体验和数据的有效性。这种组合式 API 的使用方式也符合 Vue 3 的设计理念，增强了组件的可维护性和可组合性。

---

### 代码展示
以下代码实现了一个自定义组合式函数 `useFormValidation`，用于处理表单字段的验证逻辑。

```ts
import { ref } from 'vue';

interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

export function useFormValidation() {
  const fields = ref<Record<string, { value: any; rules: ValidationRule[]; error: string | null }>>({});

  const registerField = (name: string, rules: ValidationRule[]) => {
    fields.value[name] = { value: '', rules, error: null };
  };

  const validateField = (name: string) => {
    const field = fields.value[name];
    if (!field) return;

    for (const rule of field.rules) {
      if (!rule.validate(field.value)) {
        field.error = rule.message;
        return;
      }
    }
    field.error = null; // 清除错误
  };

  const validateAll = () => {
    Object.keys(fields.value).forEach(validateField);
    return Object.values(fields.value).every(field => !field.error);
  };

  return {
    fields,
    registerField,
    validateField,
    validateAll,
  };
}
```
---

### 关键部分解释：
- `ValidationRule`：定义了一个接口，用于表示表单验证规则。每个规则包含一个 `validate` 方法和一个 `message` 字段。`validate` 方法用于检查值是否有效，返回布尔值；`message` 用于描述验证失败时的错误信息。
- `fields`：使用 `ref` 创建一个响应式对象，存储表单字段的状态。每个字段由 `value`（字段值）、`rules`（验证规则数组）和 `error`（错误信息）组成。
- `registerField` 方法：用于注册一个表单字段及其验证规则，将字段的初始值设置为空，错误信息初始化为 null。
- `validateField` 方法：接受字段名，执行该字段的所有验证规则。如果某个规则验证失败，设置相应的错误信息；如果所有规则验证通过，则清除错误信息。
- `validateAll` 方法：遍历所有字段并调用 `validateField` 方法，返回布尔值表示所有字段是否有效。