<template>
  <button @click="changeState">{{ drawline ? "cancel" : "draw line" }}</button>
  <v-stage
    :config="stageConfig"
    :onmousemove="handelMouseMove"
    ref="stage"
    @mousemove="handleMouseMove"
  >
    <v-layer id="layer">
      <v-circle
        v-for="node in nodes"
        :key="node.id"
        :config="node"
        :draggable="dragstate"
        @dragmove="updateNodeLocation"
        @mousedown="handleMouseDown"
      />
      <v-line
        v-for="line in lines"
        :key="line.id"
        :config="line"
        :points="getPoints(nodes[line.from], nodes[line.to])"
      />
      <v-line :config="tmpline"></v-line>
    </v-layer>
  </v-stage>
</template>
<script setup>
import Konva from "konva";
import { reactive, ref } from "vue";
let stageConfig = {
  width: innerWidth,
  height: innerHeight,
};
let dragstate = ref(true);

function generateCircle() {
  let num = 4;
  let res = [];
  while (res.length < num) {
    res.push({
      id: "circle_" + res.length,
      x: innerWidth * Math.random(),
      y: innerHeight * Math.random(),
      fill: Konva.Util.getRandomColor(),
      radius: 10 * Math.random() + 20,
      //把draggable状态改为响应式  draggable: dragstate.value没有响应只是赋值
    });
  }
  console.log(res);
  return res;
}
let nodes = reactive(generateCircle());
function generateLine() {
  let res = [];
  res.push({
    id: "line_1",
    stroke: "black",
    fill: "black",
    from: 0,

    to: 1,
  });
  return res;
}
let lines = reactive(generateLine());
function updateNodeLocation({ target }) {
  let id = Number(target.attrs.id.substring(7));
  nodes[id].x = target.attrs.x;
  nodes[id].y = target.attrs.y; //更新点的坐标
}
function getPoints(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  let angle = Math.atan2(-dy, dx);
  const radius = 50;
  return [
    from.x + -radius * Math.cos(angle + Math.PI),
    from.y + radius * Math.sin(angle + Math.PI),
    to.x + -radius * Math.cos(angle),
    to.y + radius * Math.sin(angle),
  ];
}
let drawline = ref(false);
function changeState() {
  drawline.value = !drawline.value;
  dragstate.value = !dragstate.value;
  if (drawline.value == null) {
    tmpline.value = {};
  }
}
let stage = ref();

let tmpline = ref({});
function handleMouseDown(e) {
  if (!drawline.value) return;
  let id = Number(e.target.attrs.id.substring(7));
  tmpline.value = {
    id: "templine",
    stroke: "black",
    fill: "black",
    from: id,
    points: [nodes[id].x, nodes[id].y, nodes[id].x, nodes[id].y],
  };
}
function handleMouseMove(e) {
  if (tmpline.value == {}) return;
  console.log(e);
  tmpline.value.points[2] = e.x;
  tmpline.value.points[3] = e.y;
}
</script>
