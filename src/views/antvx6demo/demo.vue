<template>
  <div class="antv-x6">
    <div class="content">
      <div id="container" class="container"></div>
      <div class="right">
        <div class="header">
          <span
            class="title"
            @click="showBox(1)"
            :style="{
              background: flag === true ? '#fff' : 'rgb(183, 180, 180)',
            }"
            >组件库</span
          ><span
            class="title"
            @click="showBox(0)"
            :style="{
              background: flag === false ? '#fff' : 'rgb(183, 180, 180)',
            }"
            >组件编辑</span
          >
        </div>
        <div id="stencil" class="stencil" v-show="flag === true"></div>
        <div class="editBox" v-show="flag === false">
          <div class="options">
            <div class="option">
              <span
                >组件名称:
                <input type="text" v-model="componentName" />
                <!-- <el-button @click="changeName(0)">撤 销</el-button> -->
                <el-button @click="changeName(1)">更 改</el-button>
              </span>
            </div>
            <div class="option">
              <span
                >组件ID:
                <input type="text" v-model="componentId" />
                <!-- <el-button>撤 销</el-button> -->
                <el-button @click="changeId()">更 改</el-button>
              </span>
            </div>
            <div class="option">
              <span
                >位置X:
                <input type="text" v-model="componentPositionX" />
                <!-- <el-button>撤 销</el-button> -->
                <el-button @click="changePosition()">更 改</el-button>
              </span>
            </div>
            <div class="option">
              <span
                >位置Y:
                <input type="text" v-model="componentPositionY" />
                <!-- <el-button>撤 销</el-button> -->
                <el-button @click="changePosition()">更 改</el-button>
              </span>
            </div>
            <div class="option">
              <span
                >宽度: <input type="text" v-model="componentWidth" />
                <!-- <el-button>撤 销</el-button> -->
                <el-button @click="changeSize()">更 改</el-button>
              </span>
            </div>
            <div class="option">
              <span
                >高度: <input type="text" v-model="componentHeight" />
                <!-- <el-button>撤 销</el-button> -->
                <el-button @click="changeSize()">更 改</el-button>
              </span>
            </div>
            <div class="option">
              <span
                >层级: <input type="text" v-model="componentIndex" />
                <!-- <el-button>撤 销</el-button> -->
                <el-button @click="changeIndex()">更 改</el-button>
                <el-button @click="changeIndex(0)">置于底层</el-button>
                <el-button @click="changeIndex(1)">置于顶层</el-button>
              </span>
            </div>
            <div class="option">
              <span
                >parent-ID:
                <input type="text" v-model="componentParentId" />
                <!-- <el-button>撤 销</el-button> -->
                <el-button @click="changeData()">保 存</el-button>
              </span>
            </div>
            <div class="option">
              <span
                >parent-位置X:
                <input type="text" v-model="componentParentX" />
                <!-- <el-button>撤 销</el-button> -->
                <!-- <el-button @click="changePosition()">更 改</el-button> -->
              </span>
            </div>
            <div class="option">
              <span
                >parent-位置Y:
                <input type="text" v-model="componentParentY" />
                <!-- <el-button>撤 销</el-button> -->
                <!-- <el-button @click="changePosition()">更 改</el-button> -->
              </span>
            </div>
            <!-- <div class="option" v-for="(item, index) in options" :key="index">
              <span
                >{{ item.name }}:
                <input type="text" v-model="options[index].data" />
              </span>
            </div> -->
          </div>
          <div class="button">
            <el-button @click="recoverCurrentNodeData()">取 消</el-button>
            <el-button @click="changeCurrentNodeData()">确 定</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div id="save" class="save">
        <button @click="handlerSave()">保存布局</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Graph, Addon, ToolsView, NodeView } from "@antv/x6";
import { Menu, Dropdown } from "antd";

export default {
  name: "AntvX6",
  data() {
    return {
      chartData1: {
        nodes: [
          {
            id: "node1", // String，可选，节点的唯一标识
            x: 200, // Number，必选，节点位置的 x 值
            y: 80, // Number，必选，节点位置的 y 值
            width: 240, // Number，可选，节点大小的 width 值
            height: 160, // Number，可选，节点大小的 height 值
            label: "parent", // String，节点标签
            zIndex: 1,
            data: {
              parent: true,
            },
          },
          {
            id: "node2", // String，节点的唯一标识
            x: 40, // Number，必选，节点位置的 x 值
            y: 140, // Number，必选，节点位置的 y 值
            width: 100, // Number，可选，节点大小的 width 值
            height: 50, // Number，可选，节点大小的 height 值
            label: "child", // String，节点标签
            zIndex: 10,
          },
        ],
      },
      chartData: {
        nodes: [],
        edges: [],
      },
      graph: null,
      stencil: null,
      menu: null,

      flag: true,
      options: [
        {
          id: "1",
          name: "组件名称",
          data: "",
        },
        {
          id: "2",
          name: "组件ID",
          value: "1",
        },
        {
          id: "3",
          name: "位置X",
          value: "1",
        },
        {
          id: "4",
          name: "位置Y",
          value: "1",
        },
        {
          id: "5",
          name: "宽度",
          value: "1",
        },
        {
          id: "6",
          name: "高度",
          value: "1",
        },
      ],

      currentNode: null,
      selectedNode: null,

      //初始化组件数据
      componentName: null,
      componentId: null,
      componentPositionX: null,
      componentPositionY: null,
      componentWidth: null,
      componentHeight: null,
      componentIndex: null,
      componentParentId: null,
      componentParentX: null,
      componentParentY: null,

      childToParentPosition: null,
    };
  },
  mounted() {
    this.initX6();
  },
  methods: {
    initX6() {
      //初始化画布
      const graph = new Graph({
        container: document.getElementById("container"),
        width: 1920,
        height: 1080,
        // autoResize: true,
        background: {
          color: "#fffbe6", // 设置画布背景颜色
        },
        scroller: {
          enabled: true,
          width: 1100, //滚轮显示大小
          pageVisible: true, // 是否分页，默认为 false。
          pageBreak: true, // 是否显示分页符，默认为 false。
          pannable: true, // 启用画布平移
          minVisibleWidth: 1920,
          minVisibleHeight: 1080,
          autoResize: {
            mixWidth: 1920,
            maxWidth: 1920,
            minHeight: 1080,
          },
          // background: {
          //   // color: "grey",
          //   position: {
          //     x: 0,
          //     y: 0,
          //   },
          //   size: {
          //     width: 1980,
          //     height: 1080,
          //   },
          // },
        },
        //滚动画布
        // history: true, //撤消重做
        clipboard: true, //剪切板
        keyboard: true, //键盘快捷键
        snapline: true, //对齐线
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true, //是否将鼠标位置作为中心缩放
          modifiers: "ctrl", //设置修饰键
          minScale: 1,
          maxScale: 3,
        }, //鼠标滚轮缩放
        selecting: {
          enabled: true, //启用点选
          rubberband: true, // 启用框选
          showNodeSelectionBox: true, //是否显示节点的选择框
        },
        resizing: true, //缩放节点
        // translating: true, //平移节点
        // transforming:true,//平移和缩放节点的基础选项
        grid: {
          size: 10, // 网格大小 10px
          visible: true, // 渲染网格背景
        },
        embedding: {
          enabled: true, //允许节点之间嵌套
          findParent({ node }) {
            const bbox = node.getBBox();
            return this.getNodes().filter((node) => {
              const data = node.getData();
              if (data && data.parent) {
                const targetBBox = node.getBBox();
                return bbox.isIntersectWithRect(targetBBox);
              }
              return false;
            });
          },
        },
      });
      graph.fromJSON(this.chartData1);
      // graph.zoom(-0.5);
      // graph.translate(80, 40);

      //创建menu

      // class ContextMenuTool extends ToolsView.ToolItem< ContextMenuToolOptions >{
      // }

      // Graph.registerNodeTool("contextmenu", ContextMenuTool, true);

      // const menu = (
      //   <Menu>
      //     <Menu.Item>1st menu item</Menu.Item>
      //     <Menu.Item>2nd menu item</Menu.Item>
      //     <Menu.Item>3rd menu item</Menu.Item>
      //     <Menu.Item danger>a danger item</Menu.Item>
      //   </Menu>
      // );

      this.graph = graph;
      this.initStencil();
      // this.stencil = stencil;
      // this.menu = menu;
      this.getData();
    },

    //初始化stencil
    initStencil() {
      let graph = this.graph;
      const stencil = new Addon.Stencil({
        title: "组件库",
        target: graph, //目标画布
        collapsable: true, // 分组是否可折叠，默认为 true
        collapsed: true, // 初始状态是否为折叠状态，true为不折叠
        stencilGraphWidth: 200, //模板画布宽度
        stencilGraphHeight: 180, //模板画布高度
        // graphPadding: 50, // 模板画布边距
        // search: true, //搜索选项
        // placeholder: "Search", //搜索文本框的 placeholder 文本
        // notFoundText: "No matches found", //未匹配到搜索结果时的提示文本
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
          {
            title: "C类容器",
            name: "group3",
            graphHeight: 250,
            layoutOptions: {
              rowHeight: 70,
            },
          },
        ],
        layoutOptions: {
          columns: 2, //网格布局的列数，默认为 2。行数根据节点数自动计算
          columnWidth: 80, //列宽
          rowHeight: 55, //行高
          // dx:10,//单元格在 X 轴的偏移量
          // dy:10,//单元格在 Y 轴的偏移量
          // marginX:0,//单元格在 X 轴的边距
          // marginY:0,//单元格在 Y 轴的边距
          center: true, //节点是否与网格居中对齐
          resizeToFit: false, //是否自动调整节点的大小来适应网格大小
        },
        validateNode(getDragNode) {
          console.log(getDragNode);
          if (getDragNode.position.x < 0 || getDragNode.position.x > 1920) {
            return false;
          }
        },
      });
      //挂载到页面
      document.getElementById("stencil").appendChild(stencil.container);

      //自定义节点（组件）
      Graph.registerNode(
        "custom-rect",
        {
          inherit: "rect",
          width: 66, // 默认宽度
          height: 36, // 默认高度
          attrs: {
            body: {
              rx: 10, // 圆角矩形
              ry: 10,
              strokeWidth: 1, //边框宽度
              stroke: "#5F95FF", //边框颜色
              fill: "#EFF4FF", //填充颜色
            },
            text: {
              fontSize: 12,
              fill: "#262626",
              // refX: 10, // x 轴偏移，类似 css 中的 margin-left
              // textAnchor: "left", // 左对齐
            },
          },
        },
        true
      );
      Graph.registerNode(
        "custom-circle",
        {
          inherit: "circle",
          width: 45, // 默认宽度
          height: 45, // 默认高度
          attrs: {
            body: {
              strokeWidth: 1, //边框宽度
              stroke: "#5F95FF", //边框颜色
              fill: "#EFF4FF", //填充颜色
            },
            text: {
              fontSize: 12,
              fill: "#262626",
              // refX: 10, // x 轴偏移，类似 css 中的 margin-left
              // textAnchor: "left", // 左对齐
            },
          },
        },
        true
      );
      Graph.registerNode(
        "container-rect",
        {
          inherit: "rect",
          width: 66, // 默认宽度
          height: 36, // 默认高度
          attrs: {
            body: {
              strokeWidth: 1, //边框宽度
              stroke: "#5F95FF", //边框颜色
              // fill: "#EFF4FF", //填充颜色
            },
            text: {
              fontSize: 12,
              fill: "#262626",
              refX: 10,
              refY: -10,
            },
          },
          zIndex: 1,
          data: {
            parent: true,
          },
        },
        true
      );

      //创建模板节点
      const r1 = graph.createNode({
        shape: "custom-rect",
        label: "a1",
      });
      const r2 = graph.createNode({
        shape: "custom-rect",
        label: "a2",
      });
      const r3 = graph.createNode({
        shape: "custom-circle",
        label: "b1",
      });
      const r4 = graph.createNode({
        shape: "custom-circle",
        label: "b2",
      });
      const r5 = graph.createNode({
        shape: "container-rect",
        label: "c1",
      });

      //将模板节点添加到指定的群组中
      stencil.load([r1, r2], "group1");
      stencil.load([r3, r4], "group2");
      stencil.load([r5], "group3");

      this.stencil = stencil;
    },

    getData() {
      let graph = this.graph;

      //复制、粘贴和剪切
      graph.bindKey(["meta+c", "ctrl+c"], () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
          graph.copy(cells);
        }
        return false;
      });
      graph.bindKey(["meta+v", "ctrl+v"], () => {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 });
          graph.cleanSelection();
          graph.select(cells);
        }
        return false;
      });
      graph.bindKey(["meta+x", "ctrl+x"], () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
          graph.cut(cells);
        }
        return false;
      });

      //删除
      graph.bindKey("backspace", () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
          graph.removeCells(cells);
        }
      });

      graph.on("node:mouseenter", ({ node }) => {
        node.addTools({
          name: "button-remove",
          args: {
            x: "100%",
            y: 0,
            offset: { x: -10, y: 10 },
          },
        });
      });

      graph.on("node:mouseleave", ({ node }) => {
        node.removeTools();
      });

      // graph.on("node:contextmenu", ({ node }) => {
      //   node.addTools({
      //     name: "contextmenu",
      //     args: {
      //       menu,
      //     },
      //   });
      // });

      //实时监听大小
      graph.on("node:change:size", ({ node }) => {
        // console.log(node);
        this.getCurrentNodeData(node);
        this.flag = false;
      });

      //实时监听位置
      graph.on("node:change:position", ({ node }) => {
        let x = node.position().x;
        let y = node.position().y;
        let size = node.size().width;
        //限制组件在画布的位置
        if (x < 0) {
          node.position(0, y);
        } else if (x > 1920 - size) {
          node.position(1920 - size, y);
        } else if (y < 0) {
          node.position(x, 0);
        }
        // console.log(node);
        this.getCurrentNodeData(node);
        this.flag = false;
      });

      //触发编辑
      graph.on("node:dblclick", ({ node }) => {
        console.log(node);
        this.getCurrentNodeData(node);
        this.flag = false;
      });
    },

    //获取组件基本信息
    getCurrentNodeData(node) {
      // console.log(node.store.data.parent);
      let childToParentPosition;
      let currentNode;
      this.selectedNode = node;
      // console.log(this.selectedNode);
      if (node.store.data.parent) {
        let relativePos = node.position({ relative: true });
        console.log(relativePos);
        // childToParentPosition = this.calculateParentPosition(node);
        currentNode = {
          currentLabel: node.label,
          currentId: node.id,
          currentPositionX: node.store.data.position.x,
          currentPositionY: node.store.data.position.y,
          currentSizeWidth: node.store.data.size.width,
          currentSizeHeight: node.store.data.size.height,
          currentIndex: node.store.data.zIndex,
          currentParentId: node.store.data.parent,
          currentParentX: relativePos.x,
          currentParentY: relativePos.y,
        };
      } else {
        currentNode = {
          currentLabel: node.label,
          currentId: node.id,
          currentPositionX: node.store.data.position.x,
          currentPositionY: node.store.data.position.y,
          currentSizeWidth: node.store.data.size.width,
          currentSizeHeight: node.store.data.size.height,
          currentIndex: node.store.data.zIndex,
          currentParentId: null,
          currentParentX: null,
          currentParentY: null,
        };
      }

      // console.log(currentNode);
      this.currentNode = currentNode;

      this.componentName = currentNode.currentLabel;
      this.componentId = currentNode.currentId;
      this.componentPositionX = currentNode.currentPositionX;
      this.componentPositionY = currentNode.currentPositionY;
      this.componentWidth = currentNode.currentSizeWidth;
      this.componentHeight = currentNode.currentSizeHeight;
      this.componentIndex = currentNode.currentIndex;
      this.componentParentId = currentNode.currentParentId;
      this.componentParentX = currentNode.currentParentX;
      this.componentParentY = currentNode.currentParentY;
    },

    //更改组件信息
    changeName(index) {
      let temp;
      if (index === 1) {
        temp = this.componentName;
      }
      if (index === 0) {
        temp = this.currentNode.currentLabel;
        this.componentName = this.currentNode.currentLabel;
      }
      this.selectedNode.label = temp;
    },

    changeId() {
      let graph = this.graph;
      graph.updateCellId(this.selectedNode, this.componentId);
      this.selectedNode = graph.getCellById(this.componentId);
    },

    changePosition() {
      let componentPositionX = this.componentPositionX - 0;
      let componentPositionY = this.componentPositionY - 0;
      this.selectedNode.position(componentPositionX, componentPositionY);
    },

    changeSize() {
      this.selectedNode.resize(this.componentWidth, this.componentHeight);
    },

    changeIndex(index) {
      if (index === 0) {
        this.selectedNode.toBack();
      } else if (index === 1) {
        this.selectedNode.toFront();
      } else {
        let componentIndex = this.componentIndex - 0;
        this.selectedNode.setZIndex(componentIndex);
      }
    },

    changeData() {
      let graph = this.graph;
      this.selectedNode = graph.getCellById(this.componentId);
      this.selectedNode.setData({
        childToParentX: this.componentParentX,
        childToParentY: this.componentParentY,
      });
      console.log(this.selectedNode);
    },

    changeCurrentNodeData() {
      if (this.componentName !== this.currentNode.currentLabel) {
        this.changeName(1);
      }
      if (this.componentId !== this.currentNode.currentId) {
        this.changeId();
      }
      if (
        this.componentPositionX !== this.currentNode.currentPositionX ||
        this.componentPositionY !== this.currentNode.currentPositionY
      ) {
        this.changePosition();
      }
      if (
        this.componentWidth !== this.currentNode.currentSizeWidth ||
        this.componentHeight !== this.currentNode.currentSizeHeight
      ) {
        this.changeSize();
      }
      if (this.componentIndex !== this.currentNode.currentIndex) {
        this.changeIndex();
      }
    },

    //计算子组件相对父组件位置
    calculateParentPosition(node) {
      let parentId = node.store.data.parent;
      let graph = this.graph;
      let parentPositionX = graph.getCellById(parentId).store.data.position.x;
      let parentPositionY = graph.getCellById(parentId).store.data.position.y;
      let childToParentX = node.store.data.position.x - parentPositionX;
      let childToParentY = node.store.data.position.y - parentPositionY;
      let childToParentPosition = {
        X: childToParentX,
        Y: childToParentY,
      };
      return childToParentPosition;
    },
    //恢复组件信息
    recoverCurrentNodeData() {},

    //导出布局
    handlerSave() {
      let graph = this.graph;
      console.log(graph);
      console.log(graph.toJSON());
    },

    //切换右栏
    showBox(index) {
      if (index === 1) {
        this.flag = true;
        this.initStencil();
      } else if (index === 0) {
        this.flag = false;
        this.stencil.unmount();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.antv-x6 {
  display: flex;
  .content {
    display: flex;
    .right {
      width: 500px;
      .header {
        background: rgb(183, 180, 180);
        display: flex;
        border: 1px solid #555;
        border-bottom: 0px;
        justify-content: space-between;
        .title {
          width: 250px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          cursor: pointer;
          &:hover {
            background: rgb(238, 238, 238);
          }
        }
      }
      .stencil {
        width: 500px;
        height: 1030px;
        position: relative;
      }
      .editBox {
        .options {
          height: 400px;
          margin: 20px;
          .option {
            margin-bottom: 20px;
            button {
              margin-left: 10px;
            }
          }
        }
        .button {
          display: flex;
          justify-content: space-between;
          width: 300px;
          margin-left: 100px;
          button {
            width: 100px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
