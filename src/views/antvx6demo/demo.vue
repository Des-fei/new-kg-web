<template>
  <div class="antv-x6">
    <div class="left">
      <div id="stencil" class="stencil"></div>
      <div class="sign" v-if="flag" @click="hiddenStencil()">---</div>
      <div class="sign" v-else @click="hiddenStencil()">+++</div>
    </div>
    <div id="container" class="container"></div>
  </div>
</template>

<script>
import { Graph, Addon } from "@antv/x6";
export default {
  name: "AntvX6",
  data() {
    return {
      chartData: {
        nodes: [
          {
            id: "node1", // String，可选，节点的唯一标识
            x: 40, // Number，必选，节点位置的 x 值
            y: 40, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: "hello", // String，节点标签
          },
          {
            id: "node2", // String，节点的唯一标识
            x: 160, // Number，必选，节点位置的 x 值
            y: 180, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: "world", // String，节点标签
          },
        ],
        edges: [
          {
            source: "node1", // String，必须，起始节点 id
            target: "node2", // String，必须，目标节点 id
          },
        ],
      },
      graph: null,
      stencil: null,
      flag: true,
    };
  },
  mounted() {
    //初始化画布
    const graph = new Graph({
      container: document.getElementById("container"),
      width: 1920,
      height: 1080,
      background: {
        color: "#fffbe6", // 设置画布背景颜色
      },
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    });
    graph.fromJSON(this.chartData);
    // graph.zoom(-0.5);
    // graph.translate(80, 40);

    const stencil = new Addon.Stencil({
      title: "基础组件",
      target: graph,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      groups: [
        {
          title: "A类组件",
          name: "group1",
        },
        {
          title: "B类组件",
          name: "group2",
          graphHeight: 250,
          layoutOptions: {
            rowHeight: 70,
          },
        },
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55,
      },
    });
    document.getElementById("stencil").appendChild(stencil.container);
  },
  methods: {
    hiddenStencil() {
      this.flag = !this.flag;
      console.log(this.flag);
    },
  },
};
</script>

<style lang="scss" scoped>
.antv-x6 {
  .left {
    width: 500px;
    height: 1080px;
    position: absolute;
    .sign {
      background: red;
    }
  }
  .container {
    z-index: -1;
  }
}
</style>
