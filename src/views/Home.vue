<template>
  <div>a:{{ a }}</div>
  <div>b:{{ b }}</div>
  <div>{{ c }}</div>
  <button @click="handle">btn</button>
  <input value="value" @input="handleInput" />
</template>

<script>
// @ is an alias to /src
import { ref, reactive } from "vue";

export default {
  name: "Home",
  setup(props, { emit }) {
    let a = ref(100),
      b = ref(1);
    let c = reactive({ name: "屮", value: 123 });
    const handle = () => {
      console.log("handle");
      a.value++;
      b.value++;
      c.value++;
      c.name = String.fromCharCode(c.name.charCodeAt(0) + 1);
    };

    function handleInput(e) {
      emit("update:value", e.target.value);
    }
    return {
      a,
      b,
      c,
      handle,
      handleInput,
    };
  },
};
</script>
