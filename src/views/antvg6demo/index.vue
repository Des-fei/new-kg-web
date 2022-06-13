<template>
  <div class="antv-g6">
    <div id="container" class="container"></div>
    <div class="node-description" v-show="nodeDetail">
      <div class="title">{{ curTitle }}</div>
      <div class="description">{{ type }}</div>
      <div class="detail">
        <div
          class="edge-title"
          style="height: 50px; padding: 10px; line-height: 50px"
        >
          <span class="label">label</span>
          <span class="source">source</span>
          <span class="target">target</span>
        </div>
        <div
          class="all-edges"
          v-for="(item, index) in curEdges"
          :key="index"
          style="height: 30px; padding: 10px; line-height: 30px"
        >
          <span class="label">{{ item.label }}</span>
          <span class="source">{{ item.source }}</span>
          <span class="target">{{ item.target }}</span>
        </div>
      </div>
    </div>
    <!-- <div class="box">
      <span
        class="button"
        v-for="(item, i) in buttons"
        @click="selectWay(item)"
        :key="i"
        >{{ item }}</span
      >
    </div> -->
    <el-dialog title="编辑节点属性" :visible.sync="editNodeVisible">
    </el-dialog>
  </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  data() {
    return {
      temp: null,
      selectedWay: null,
      buttons: ["多选", "框选", "拉索"],
      chartData: {
        nodes: [
          {
            id: "0",
            label: "0",
            cluster: "a",
          },
          {
            id: "1",
            label: "1",
            cluster: "a",
          },
          {
            id: "2",
            label: "2",
            cluster: "a",
          },
          {
            id: "3",
            label: "3",
            cluster: "a",
          },
          {
            id: "4",
            label: "4",
            cluster: "a",
          },
          {
            id: "5",
            label: "5",
            cluster: "a",
          },
          {
            id: "6",
            label: "6",
            cluster: "a",
          },
          {
            id: "7",
            label: "7",
            cluster: "a",
          },
          {
            id: "8",
            label: "8",
            cluster: "a",
          },
          {
            id: "9",
            label: "9",
            cluster: "a",
          },
          {
            id: "10",
            label: "10",
            cluster: "a",
          },
          {
            id: "11",
            label: "11",
            cluster: "a",
          },
          {
            id: "12",
            label: "12",
            cluster: "a",
          },
          {
            id: "13",
            label: "13",
            cluster: "b",
          },
          {
            id: "14",
            label: "14",
            cluster: "b",
          },
          {
            id: "15",
            label: "15",
            cluster: "b",
          },
          {
            id: "16",
            label: "16",
            cluster: "b",
          },
          {
            id: "17",
            label: "17",
            cluster: "b",
          },
          {
            id: "18",
            label: "18",
            cluster: "c",
          },
          {
            id: "19",
            label: "19",
            cluster: "c",
          },
          {
            id: "20",
            label: "20",
            cluster: "c",
          },
          {
            id: "21",
            label: "21",
            cluster: "c",
          },
          {
            id: "22",
            label: "22",
            cluster: "c",
          },
          {
            id: "23",
            label: "23",
            cluster: "c",
          },
          {
            id: "24",
            label: "24",
            cluster: "c",
          },
          {
            id: "25",
            label: "25",
            cluster: "c",
          },
          {
            id: "26",
            label: "26",
            cluster: "c",
          },
          {
            id: "27",
            label: "27",
            cluster: "c",
          },
          {
            id: "28",
            label: "28",
            cluster: "c",
          },
          {
            id: "29",
            label: "29",
            cluster: "c",
          },
          {
            id: "30",
            label: "30",
            cluster: "c",
          },
          {
            id: "31",
            label: "31",
            cluster: "d",
          },
          {
            id: "32",
            label: "32",
            cluster: "d",
          },
          {
            id: "33",
            label: "33",
            cluster: "d",
          },
        ],
        edges: [
          {
            source: "0",
            target: "1",
          },
          {
            source: "0",
            target: "2",
          },
          {
            source: "0",
            target: "3",
          },
          {
            source: "0",
            target: "4",
          },
          {
            source: "0",
            target: "5",
          },
          {
            source: "0",
            target: "7",
          },
          {
            source: "0",
            target: "8",
          },
          {
            source: "0",
            target: "9",
          },
          {
            source: "0",
            target: "10",
          },
          {
            source: "0",
            target: "11",
          },
          {
            source: "0",
            target: "13",
          },
          {
            source: "0",
            target: "14",
          },
          {
            source: "0",
            target: "15",
          },
          {
            source: "0",
            target: "16",
          },
          {
            source: "2",
            target: "3",
          },
          {
            source: "4",
            target: "5",
          },
          {
            source: "4",
            target: "6",
          },
          {
            source: "5",
            target: "6",
          },
          {
            source: "7",
            target: "13",
          },
          {
            source: "8",
            target: "14",
          },
          {
            source: "9",
            target: "10",
          },
          {
            source: "10",
            target: "22",
          },
          {
            source: "10",
            target: "14",
          },
          {
            source: "10",
            target: "12",
          },
          {
            source: "10",
            target: "24",
          },
          {
            source: "10",
            target: "21",
          },
          {
            source: "10",
            target: "20",
          },
          {
            source: "11",
            target: "24",
          },
          {
            source: "11",
            target: "22",
          },
          {
            source: "11",
            target: "14",
          },
          {
            source: "12",
            target: "13",
          },
          {
            source: "16",
            target: "17",
          },
          {
            source: "16",
            target: "18",
          },
          {
            source: "16",
            target: "21",
          },
          {
            source: "16",
            target: "22",
          },
          {
            source: "17",
            target: "18",
          },
          {
            source: "17",
            target: "20",
          },
          {
            source: "18",
            target: "19",
          },
          {
            source: "19",
            target: "20",
          },
          {
            source: "19",
            target: "33",
          },
          {
            source: "19",
            target: "22",
          },
          {
            source: "19",
            target: "23",
          },
          {
            source: "20",
            target: "21",
          },
          {
            source: "21",
            target: "22",
          },
          {
            source: "22",
            target: "24",
          },
          {
            source: "22",
            target: "25",
          },
          {
            source: "22",
            target: "26",
          },
          {
            source: "22",
            target: "23",
          },
          {
            source: "22",
            target: "28",
          },
          {
            source: "22",
            target: "30",
          },
          {
            source: "22",
            target: "31",
          },
          {
            source: "22",
            target: "32",
          },
          {
            source: "22",
            target: "33",
          },
          {
            source: "23",
            target: "28",
          },
          {
            source: "23",
            target: "27",
          },
          {
            source: "23",
            target: "29",
          },
          {
            source: "23",
            target: "30",
          },
          {
            source: "23",
            target: "31",
          },
          {
            source: "23",
            target: "33",
          },
          {
            source: "32",
            target: "33",
          },
        ],
      },
      data: {
        nodes: [
          {
            id: "0",
            label: "0",
          },
          {
            id: "1",
            label: "1",
          },
          {
            id: "2",
            label: "2",
          },
          {
            id: "3",
            label: "3",
          },
          {
            id: "4",
            label: "4",
          },
          {
            id: "5",
            label: "5",
          },
          {
            id: "6",
            label: "6",
          },
          {
            id: "7",
            label: "7",
          },
          {
            id: "8",
            label: "8",
          },
          {
            id: "9",
            label: "9",
          },
          {
            id: "10",
            label: "10",
          },
          {
            id: "11",
            label: "11",
          },
          {
            id: "12",
            label: "12",
          },
          {
            id: "13",
            label: "13",
          },
          {
            id: "14",
            label: "14",
          },
          {
            id: "15",
            label: "15",
          },
          {
            id: "16",
            label: "16",
          },
          {
            id: "17",
            label: "17",
          },
          {
            id: "18",
            label: "18",
          },
          {
            id: "19",
            label: "19",
          },
          {
            id: "20",
            label: "20",
          },
          {
            id: "21",
            label: "21",
          },
          {
            id: "22",
            label: "22",
          },
          {
            id: "23",
            label: "23",
          },
          {
            id: "24",
            label: "24",
          },
          {
            id: "25",
            label: "25",
          },
          {
            id: "26",
            label: "26",
          },
          {
            id: "27",
            label: "27",
          },
          {
            id: "28",
            label: "28",
          },
          {
            id: "29",
            label: "29",
          },
          {
            id: "30",
            label: "30",
          },
          {
            id: "31",
            label: "31",
          },
          {
            id: "32",
            label: "32",
          },
          {
            id: "33",
            label: "33",
          },
        ],
        edges: [
          {
            source: "0",
            target: "1",
            label: "a",
          },
          {
            source: "0",
            target: "1",
            label: "b",
          },
          {
            source: "0",
            target: "1",
            label: "c",
          },
          {
            source: "0",
            target: "2",
            label: "a",
          },
          {
            source: "2",
            target: "0",
            label: "b",
          },
          {
            source: "2",
            target: "0",
            label: "c",
          },
          {
            source: "0",
            target: "3",
          },
          {
            source: "0",
            target: "4",
          },
          {
            source: "0",
            target: "5",
          },
          {
            source: "0",
            target: "7",
          },
          {
            source: "0",
            target: "8",
          },
          {
            source: "0",
            target: "9",
          },
          {
            source: "0",
            target: "10",
          },
          {
            source: "0",
            target: "11",
          },
          {
            source: "0",
            target: "13",
          },
          {
            source: "0",
            target: "14",
          },
          {
            source: "0",
            target: "15",
          },
          {
            source: "0",
            target: "16",
          },
          {
            source: "2",
            target: "3",
          },
          {
            source: "4",
            target: "5",
          },
          {
            source: "4",
            target: "6",
          },
          {
            source: "5",
            target: "6",
          },
          {
            source: "7",
            target: "13",
          },
          {
            source: "8",
            target: "14",
          },
          {
            source: "9",
            target: "10",
          },
          {
            source: "10",
            target: "22",
          },
          {
            source: "10",
            target: "14",
          },
          {
            source: "10",
            target: "12",
          },
          {
            source: "10",
            target: "24",
          },
          {
            source: "10",
            target: "21",
          },
          {
            source: "10",
            target: "20",
          },
          {
            source: "11",
            target: "24",
          },
          {
            source: "11",
            target: "22",
          },
          {
            source: "11",
            target: "14",
          },
          {
            source: "12",
            target: "13",
          },
          {
            source: "16",
            target: "17",
          },
          {
            source: "16",
            target: "18",
          },
          {
            source: "16",
            target: "21",
          },
          {
            source: "16",
            target: "22",
          },
          {
            source: "17",
            target: "18",
          },
          {
            source: "17",
            target: "20",
          },
          {
            source: "18",
            target: "19",
          },
          {
            source: "19",
            target: "20",
          },
          {
            source: "19",
            target: "33",
          },
          {
            source: "19",
            target: "22",
          },
          {
            source: "19",
            target: "23",
          },
          {
            source: "20",
            target: "21",
          },
          {
            source: "21",
            target: "22",
          },
          {
            source: "22",
            target: "24",
          },
          {
            source: "22",
            target: "25",
          },
          {
            source: "22",
            target: "26",
          },
          {
            source: "22",
            target: "23",
          },
          {
            source: "22",
            target: "28",
          },
          {
            source: "22",
            target: "30",
          },
          {
            source: "22",
            target: "31",
          },
          {
            source: "22",
            target: "32",
          },
          {
            source: "22",
            target: "33",
          },
          {
            source: "23",
            target: "28",
          },
          {
            source: "23",
            target: "27",
          },
          {
            source: "23",
            target: "29",
          },
          {
            source: "23",
            target: "30",
          },
          {
            source: "23",
            target: "31",
          },
          {
            source: "23",
            target: "33",
          },
          {
            source: "32",
            target: "33",
          },
        ],
      },
      types: [
        {
          color: "#BDD2FD",
          type: "a",
        },
        {
          color: "#BDEFDB",
          type: "b",
        },
        {
          color: "#C2C8D5",
          type: "c",
        },
        {
          color: "#FBE5A2",
          type: "d",
        },
      ],
      colors: [
        "#BDD2FD",
        "#BDEFDB",
        "#C2C8D5",
        "#FBE5A2",
        "#F6C3B7",
        "#B6E3F5",
        "#D3C6EA",
        "#FFD8B8",
        "#AAD8D8",
        "#FFD6E7",
      ],
      x: null,
      y: null,

      //对话框：编辑节点属性
      editNodeVisible: false,
      nodeLabel: "",
      curNode: null,

      nodeDetail: false,
      curTitle: null,
      curEdges: [],
      type: null,

      a: "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
    };
  },
  mounted() {
    this.initG6();
  },
  methods: {
    //节点属性编辑
    handlerNodeEdit(node) {
      console.log(node);
      this.editNodeVisible = true;
      this.curNode = node; //更新当前节点对象

      // this.nodeLabel = this.curNode.getModel().label; //default

      console.log("edit node handler");
    },

    initG6() {
      const container = document.getElementById("container");
      // const width = container.scrollWidth;
      // const height = container.scrollHeight || 500;
      let colors = this.colors;
      let that = this;
      // let strokes = this.strokes;
      // let types = this.types;

      const clusterMap = new Map();
      let clusterId = 0;

      this.chartData.nodes.forEach(function (node) {
        // cluster
        if (node.cluster && clusterMap.get(node.cluster) === undefined) {
          clusterMap.set(node.cluster, clusterId);
          clusterId++;
        }
        const cid = clusterMap.get(node.cluster);
        // if (!node.style) {
        //   node.style = {};
        // }
        // node.style.fill = "#fff";
        // node.style.stroke = "#fff";
      });

      const Menu = new G6.Menu({
        getContent(evt) {
          // console.log(evt);
          const item = evt.item;
          if (item.getType() === "node") {
            const contextMenuContainer = document.createElement("div");
            contextMenuContainer.id = "contextMenu";
            contextMenuContainer.style.width = "80px";

            //扩展节点
            const nodeExtension = document.createElement("li");
            nodeExtension.innerHTML = "扩展节点";
            contextMenuContainer.appendChild(nodeExtension);

            //编辑节点
            const nodeEdit = document.createElement("li");
            nodeEdit.innerHTML = "编辑节点";
            contextMenuContainer.appendChild(nodeEdit);

            //添加关系
            const nodeExtendLink = document.createElement("li");
            nodeExtendLink.innerHTML = "添加关系";
            contextMenuContainer.appendChild(nodeExtendLink);

            //删除节点
            const nodeDelete = document.createElement("li");
            nodeDelete.innerHTML = "删除节点";
            contextMenuContainer.appendChild(nodeDelete);

            return contextMenuContainer;
          } else if (item.getType() === "edge") {
            const contextMenuContainer = document.createElement("div");
            contextMenuContainer.id = "contextMenu";
            contextMenuContainer.style.width = "80px";

            //编辑关系
            const edgeEdit = document.createElement("li");
            edgeEdit.innerHTML = "编辑关系";
            contextMenuContainer.appendChild(edgeEdit);

            //删除关系
            const edgeDelete = document.createElement("li");
            edgeDelete.innerHTML = "删除关系";
            contextMenuContainer.appendChild(edgeDelete);

            return contextMenuContainer;
          }
        },
        handleMenuClick: (target, item) => {
          /**
           * 响应菜单的点击事件
           * target：DOM element <li></li>
           * item：node | edge
           */
          // console.log(target, item);
          const label = target.innerHTML;

          switch (label) {
            case "扩展节点":
              that.handlerNodeExtension(item);
              console.log("扩展节点");
              break;

            case "编辑节点":
              that.handlerNodeEdit(item);
              console.log("编辑节点");
              break;

            case "添加关系":
              that.handlerNodeExtendLink(item);
              console.log("添加关系");
              break;

            case "删除节点":
              that.handlerNodeDelete(item);
              console.log("删除节点");
              break;

            case "编辑关系":
              that.handlerEdgeEdit(item);
              console.log("编辑关系");
              break;

            case "删除关系":
              that.handlerEdgeEdit(item);
              console.log("删除关系");
              break;
          }
        },
        // offsetX and offsetY include the padding of the parent container
        // 需要加上父级容器的 padding-left 16 与自身偏移量 10
        offsetX: 10,
        // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
        offsetY: 0,
        // the types of items that allow the menu show up
        // 在哪些类型的元素上响应
        itemTypes: ["node", "edge"],
      });

      //两个节点存在多条边
      const multiEdgeType = "quadratic";
      const singleEdgeType = "line";
      G6.Util.processParallelEdges(
        this.data.edges,
        10,
        multiEdgeType,
        singleEdgeType
      );

      G6.registerNode("dom-node", {
        draw: (cfg, group) => {
          let stroke = cfg.style ? cfg.style.stroke || "#5B8FF9" : "#5B8FF9";
          // let shape = group.addShape("image", {
          //   attrs: {
          //     width: cfg.size,
          //     height: cfg.size,
          //     labelCfg: {
          //       position: "bottom",
          //     },
          //     img: "https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png",
          //   },
          //   // name: "image-shape",
          // });

          let shape = group.addShape("dom", {
            attrs: {
              width: cfg.size,
              height: cfg.size,
              html: `
          <div id=${cfg.id} class='dom-node' style="
          width: ${cfg.size - 5}px; height: ${cfg.size}px; ">
            <div>
              <img alt="" style="line-height: 100%; padding:2px;margin-top: 1px ;border: 2px solid ${stroke}; border-radius: 5px; "" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />

            </div>
            <span style="color: #5B8FF9">${cfg.label}</span>
          </div>
            `,
            },
            draggable: true,
          });
          return shape;
        },
      });

      const graph = new G6.Graph({
        container: "container",
        width: 1600,
        height: 1000,
        fitView: true,
        renderer: "svg",
        enabledStack: true,
        layout: {
          type: "radial",
          linkDistance: 100, //边长
          maxIteration: 1000, // 停止迭代到最大迭代数
          strictRadial: true, // 当 preventOverlap 为 true，且 strictRadial 为 true  时，允许同环上重叠的节点不严格沿着该环布局，可以在该环的前后偏移以避免重叠。
          nodeSpacing: 30, //同一环节点间的距离
          unitRadius: 100, //每一圈距离上一圈的距离。默认填充整个画布，即根据图的大小决定
          nodeSize: 70,
          preventOverlap: true, //是否防止重叠，必须配合下面属性 nodeSize，只有设置了与当前图节点大小相同的 nodeSize 值，才能够进行节点重叠的碰撞检测
          maxPreventOverlapIteration: 200, //防止重叠步骤的最大迭代次数
        },
        defaultNode: {
          // type: "dom-node",
          // size: [120, 40],
          size: 30,
          style: {
            lineWidth: 2,
          },
          labelCfg: {
            position: "bottom",
            // style: {
            //   stroke: "#fff",
            //   lineWidth: 4,
            // },
          },
          //节点内置图标
          icon: {
            show: true,
            /* icon's img address, string type */
            img: this.a,
            /* icon's size, 20 * 20 by default: */
            //   width: 40,
            //   height: 40
          },
        },
        defaultEdge: {
          type: "quadratic",
          // size: 1,
          color: "#e2e2e2",
          style: {
            endArrow: {
              path: "M -8,0 L -8,4 L 0,0 L -8,-4 Z",
              // path: G6.Arrow.triangle(),
              fill: "#e2e2e2",
            },
          },
          labelCfg: {
            autoRotate: true,
          },
        },
        nodeStateStyles: {
          highlight: {
            opacity: 1,
          },
          dark: {
            opacity: 0.2,
          },
        },
        edgeStateStyles: {
          highlight: {
            stroke: "#999",
          },
        },
        modes: {
          default: ["drag-canvas", "drag-node"],
        },
        plugins: [Menu],
        animate: true,
      });

      //判断类型给节点赋予不同的icon
      this.data.nodes.forEach(function (node) {
        if (!node.icon) {
          // console.log("123");
          node.icon = {};
          switch (node.id) {
            case "1": {
              node.icon.img =
                "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ";
              break;
            }
            case "2": {
              node.icon.img =
                "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg";
              break;
            }
          }
        }
      });

      graph.data(this.data);
      graph.render();

      //清空所有状态
      function clearAllStats() {
        graph.setAutoPaint(false);
        graph.getNodes().forEach(function (node) {
          graph.clearItemStates(node);
        });
        graph.getEdges().forEach(function (edge) {
          graph.clearItemStates(edge);
        });
        graph.paint();
        graph.setAutoPaint(true);
      }

      //鼠标进入节点，高亮相邻节点与边
      graph.on("node:mouseenter", function (e) {
        const item = e.item;
        graph.setAutoPaint(false);
        graph.getNodes().forEach(function (node) {
          graph.clearItemStates(node);
          graph.setItemState(node, "dark", true);
        });
        graph.setItemState(item, "dark", false);
        graph.setItemState(item, "highlight", true);
        graph.getEdges().forEach(function (edge) {
          if (edge.getSource() === item) {
            graph.setItemState(edge.getTarget(), "dark", false);
            graph.setItemState(edge.getTarget(), "highlight", true);
            graph.setItemState(edge, "highlight", true);
            edge.toFront();
          } else if (edge.getTarget() === item) {
            graph.setItemState(edge.getSource(), "dark", false);
            graph.setItemState(edge.getSource(), "highlight", true);
            graph.setItemState(edge, "highlight", true);
            edge.toFront();
          } else {
            graph.setItemState(edge, "highlight", false);
          }
        });
        graph.paint();
        graph.setAutoPaint(true);
      });
      graph.on("node:mouseleave", clearAllStats);
      graph.on("canvas:click", clearAllStats);

      //双击获取节点相关信息
      graph.on("node:dblclick", (node) => {
        this.curEdges = [];
        let item = node.item;
        this.type = item.getType();
        let curModel = item.getModel();
        let edges = item.getEdges();
        edges.forEach((edge) => {
          let curEdge = {
            label: edge._cfg.model.label,
            source: edge._cfg.model.source,
            target: edge._cfg.model.target,
          };
          this.curEdges.push(curEdge);
        });
        console.log(this.curEdges);
        this.nodeDetail = true;
        this.curTitle = curModel.label;
      });

      if (this.selectedWay == "muti") {
        graph.addBehaviors("click-select", "default");

        // graph.on("node:dragstart", function (e) {
        //   graph.layout();
        //   refreshDragedNodePosition(e);
        // });
        // graph.on("node:drag", function (e) {
        //   refreshDragedNodePosition(e);
        // });
        // graph.on("node:dragend", function (e) {
        //   e.item.get("model").fx = null;
        //   e.item.get("model").fy = null;
        // });

        if (typeof window !== "undefined")
          window.onresize = () => {
            if (!graph || graph.get("destroyed")) return;
            if (!container || !container.scrollWidth || !container.scrollHeight)
              return;
            graph.changeSize(container.scrollWidth, container.scrollHeight);
          };

        // function refreshDragedNodePosition(e) {
        //   const model = e.item.get("model");
        //   model.fx = e.x;
        //   model.fy = e.y;
        // }
      }
    },
    selectWay(item) {
      console.log(item);
      switch (item) {
        case "多选":
          this.selectedWay = "muti";
          console.log(this.selectedWay);
          break;
        case "框选":
          this.selectedWay = "frame";
          console.log(this.selectedWay);
          break;
        case "拉索":
          this.selectedWay = "drag";
          console.log(this.selectedWay);
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.antv-g6 {
  display: flex;
  width: 1920px;
  .node-description {
    width: 200px;
    background: #bcb9b9;
    .title {
      height: 40px;
      line-height: 40px;
      padding: 10px;
      font-size: 18px;
      // background: #8f8a8a;
      display: flex;
      border-bottom: 5px solid #e2e2e2;
    }
    .description {
      height: 200px;
      border-bottom: 5px solid #e2e2e2;
    }
    .detail {
      span {
        margin-right: 10px;
        width: 50px;
        display: inline-block;
      }
    }
  }
}
.box {
  width: 300px;
  background-color: aquamarine;
  margin: auto;
  .button {
    cursor: pointer;
    width: 100px;
    display: inline-block;
  }
  .button:hover {
    background-color: rgb(178, 185, 185);
  }
}
</style>
<style lang="scss">
.g6-component-contextmenu {
  padding: 0;
  border: none;
}
#contextMenu {
  position: absolute;
  padding: 10px 8px;
  background-color: rgb(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 14px;
  color: #545454;
  z-index: 2;
  li {
    cursor: pointer;
    list-style: none;
    margin-left: 0px;
    margin-top: 5px;
    &:hover {
      color: #aaa;
    }
  }
}
</style>
