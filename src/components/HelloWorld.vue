<template>
  <div>{{ count }}</div>
  <button @click="addcount">++</button>
  <div>{{ num }}</div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    num: Number,
  },
  setup() {
    let count = 0;
    const addcount = () => {
      count++;
    };
    return {
      count,
      addcount,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
