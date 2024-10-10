## 组合式函数

### 什么是组合式函数

“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。组合式函数逻辑复用的核心思想就是在组合式函数里写逻辑代码，需要在模板中使用或其他地方使用的变量或者函数直接return出来，然后在需要使用这些逻辑的组件中引入即可。

### 定义组合式函数

一定要将在组件中需要使用到的变量或者方法return出去，否则是没有效果的

```ts
import { ref } from "vue";

export function useCounter (initValue = 0){
    //响应式变量 count initValue
    const count = ref<number>(initValue)

    //增加计数的函数
    const increament = () => {
        count.value++;
    }

    //减少计数的函数
    const decreament = () => {
        count.value--;
    }

    const clear = () => {
        count.value = 0;
    }

    return{
        count,increament,decreament,clear
    }
}
```

### 在组件中使用

在组件中使用的时候首先import该组合式函数，然后执行函数，得到需要的变量和方法。

```ts
<template>
    <div>
        <p>当前计数器的值：{{  count }}</p>
        <button @click="increament">增加</button>
        <button @click="decreament">减少</button>
        <button @click="clear">清零</button>
    </div>
</template>

<script setup lang="ts">
import { useCounter } from '../composables/useCounter';

const { count , increament , decreament , clear} = useCounter(10)

</script>
```
组合式函数中的复用代码可以同时在多个组件中使用










