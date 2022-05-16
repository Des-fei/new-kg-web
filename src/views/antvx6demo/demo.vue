<template>
  <div class="antv-x6">
    <div id="stencil" class="stencil"></div>
    <div id="container" class="container"></div>
    <div id="save" class="save">
      <button @click="handlerSave()">保存布局</button>
    </div>
    <el-dialog
      title="组件信息"
      :visible.sync="dialogVisible"
      :show-close="true"
    >
      <div>
        <span
          >组件名称：
          <input type="text" v-model="componentName" />
        </span>
      </div>
      <div>
        <span
          >组件ID：
          <input type="text" v-model="componentId" />
        </span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeCurrentNodeData()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Graph, Addon, ToolsView, NodeView } from "@antv/x6";
import { Menu, Dropdown } from "antd";
import React from "react";
import ReactDom from "react-dom";

export default {
  name: "AntvX6",
  data() {
    return {
      chartData1: {
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
      chartData: {
        nodes: [],
        edges: [],
      },
      graph: null,
      stencil: null,
      menu: null,

      dialogVisible: false,

      currentNode: null,
      selectedNode: null,
      componentName: null,
      componentId: null,
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
        background: {
          color: "#fffbe6", // 设置画布背景颜色
        },
        // scroller: true, //滚动画布
        // history: true, //撤消重做
        clipboard: true, //剪切板
        keyboard: true, //键盘快捷键
        snapline: true, //对齐线
        // mousewheel: {
        //   enabled: true,
        //   zoomAtMousePosition: true, //是否将鼠标位置作为中心缩放
        //   modifiers: "ctrl", //设置修饰键
        //   minScale: 0.5,
        //   maxScale: 3,
        // }, //鼠标滚轮缩放
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
      });
      graph.fromJSON(this.chartData1);
      // graph.zoom(-0.5);
      // graph.translate(80, 40);

      const stencil = new Addon.Stencil({
        title: "组件库",
        target: graph, //目标画布
        collapsable: true, // 分组是否可折叠，默认为 true
        collapsed: true, // 初始状态是否为折叠状态，true为不折叠
        stencilGraphWidth: 200, //模板画布宽度
        stencilGraphHeight: 180, //模板画布高度
        // graphPadding: 50, // 模板画布边距
        search: true, //搜索选项
        placeholder: "Search", //搜索文本框的 placeholder 文本
        notFoundText: "No matches found", //未匹配到搜索结果时的提示文本
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

      //将模板节点添加到指定的群组中
      stencil.load([r1, r2], "group1");
      stencil.load([r3, r4], "group2");

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
      this.stencil = stencil;
      // this.menu = menu;
      this.getData();
    },

    getData() {
      let graph = this.graph;
      let stencil = this.stencil;
      let menu = this.menu;

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

      graph.on("node:dblclick", ({ node }) => {
        console.log(node);
        this.getCurrentNodeData(node);
        this.dialogVisible = true;
        if (this.componentName) {
          this.componentName = "";
        }
        if (this.componentId) {
          this.componentId = "";
        }
      });
    },

    //获取组件基本信息
    getCurrentNodeData(node) {
      this.selectedNode = node;
      // console.log(this.selectedNode);
      let currentNode = {
        currentId: node.id,
        currentLabel: node.label,
        currentPosition: node.store.data.position,
        currentSize: node.store.data.size,
      };
      console.log(currentNode);
      this.currentNode = currentNode;
    },

    //更改组件信息
    changeCurrentNodeData() {
      this.dialogVisible = false;
      // console.log(this.componentName);
      // console.log(this.componentId);
      this.selectedNode.label = this.componentName;
      this.selectedNode.id = this.componentId;
      console.log(this.selectedNode.label);
      console.log(this.selectedNode.id);
    },

    //导出布局
    handlerSave() {
      let graph = this.graph;
      console.log(graph);
      console.log(graph.toJSON());
    },
  },
};
</script>

<style lang="scss" scoped>
.antv-x6 {
  display: flex;
  .stencil {
    width: 500px;
    height: 1080px;
    position: relative;
  }
  ::v-deep .el-dialog {
    display: flex;
    flex-direction: column;
    margin-top: 200px;
    margin-left: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-100px, -100px);
    height: 500px;
    width: 500px;
    background-color: #d3d9ddee;
    border: 1px solid rgb(13, 210, 236);
    .el-dialog__title {
      height: 50px;
      line-height: 50px;
      color: white;
      caret-color: transparent;
    }
    .el-dialog__body {
      font-size: 18px;
      height: 400px;
      padding: 10px 10px;
    }
  }
}
</style>
