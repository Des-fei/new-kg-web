<template>
  <div>
    <!-- <div id="playlist">
      <button @click="getListHot">热门歌单分类</button>
    </div> -->
    <div id="search">
      <div id="box">
        <input
          @input="handlerInput"
          v-model="keywords"
          id="searchInput"
          value=""
          type="text"
        />
        <button @click="handlerKeywords">搜索</button>
      </div>

      <!-- <button @click="handlerMultimatch" >多重搜索</button> -->
    </div>
    <!-- <div id="showhotList">
      <HotList />
    </div> -->
    <div id="antvG6">
      <TestG6 />
    </div>
    <div id="mountNode"></div>
  </div>
</template>

<script>
// import { playList , playListHot } from "@/api/neteaseCloudMusicApi";
import G6 from "@antv/g6";
import store from "./store";
// import HotList from "./wangyiyun/HotList.vue";
import TestG6 from "./wangyiyun/TestG6.vue";
import {
  keySearch,
  keyDefault,
  hotList,
  hotListDetail,
  keySearchSuggest,
  searchMultimatch,
} from "@/api/neteaseCloudMusicApi";

var showKeyword;
var hotSong = new Array();

export default {
  components: {
    // HotList,
    TestG6,
  },
  data() {
    return {
      store: store,
      keywords: "",
      chartData: {
        nodes: [
          {
            id: "node1",
            x: 100,
            y: 100,
            label: "服务器1",
            size: 50,
            type: "circle",
            anchorPoints: [],
            style: {
              fill: "#00FFFF",
              stroke: "#FFFF00",
              lineWidth: 5,
            },
            labelCfg: {
              position: "bottom",
              offset: 10,
              style: {
                fill: "red",
              },
            },
          },
          {
            id: "node2",
            x: 300,
            y: 100,
            label: "服务器2",
            size: 50,
            type: "circle",
            anchorPoints: [],
            style: {
              fill: "#00FFFF",
              stroke: "#FFFF00",
              lineWidth: 5,
            },
            labelCfg: {
              position: "bottom",
              offset: 10,
              style: {
                fill: "red",
              },
            },
          },
          {
            id: "node3",
            x: 500,
            y: 100,
            label: "服务器3",
            size: 50,
            type: "circle",
            anchorPoints: [],
            style: {
              fill: "#00FFFF",
              stroke: "#FFFF00",
              lineWidth: 5,
            },
            labelCfg: {
              position: "bottom",
              offset: 10,
              style: {
                fill: "red",
              },
            },
          },
        ],
        edges: [
          {
            source: "node1",
            target: "node2",
            style: {
              stroke: "#7CD13B",
            },
          },
          {
            source: "node2",
            target: "node3",
            style: {
              stroke: "#FF0000",
            },
          },
        ],
      },
    };
  },

  mounted() {
    // playList().then((res) => {
    //     console.log(res);
    // });

    const graph = new G6.Graph({
      container: "mountNode",
      width: 800,
      height: 500,
      defaultEdge: {
        type: "circle-running",
        style: {
          lineWidth: 2,
          stroke: "#bae7ff",
        },
      },
    });

    let edgeCircleColorIndex = 0;
    let edgeCircleColorArr = ["#7CD13B", "#FF0000"];

    G6.registerEdge(
      "circle-running",
      {
        afterDraw(cfg, group) {
          const shape = group.get("children")[0];
          const startPoint = shape.getPoint(0);
          //创建节点之间的圆圈，并为每一个设置样式
          const circle = group.addShape("circle", {
            attrs: {
              x: startPoint.x,
              y: startPoint.y,
              fill: edgeCircleColorArr[edgeCircleColorIndex++],
              r: 6, //圆圈大小
            },
            name: "circle-shape",
          });

          // 实现动态效果
          circle.animate(
            (ratio) => {
              const tmpPoint = shape.getPoint(ratio);
              return {
                x: tmpPoint.x,
                y: tmpPoint.y,
              };
            },
            {
              repeat: true, //动画是否重复
              duration: 3000, //一次动画持续时长
            }
          );
        },
      },
      "cubic"
    );

    graph.data(this.chartData);
    graph.render();

    let arr = ["小明", "小花", "小鱼", "小猪"];
    let [, , one] = arr;
    console.log(one);

    // 解构整个数组
    let strArr = [...arr];
    // 得到整个数组
    console.log(strArr);

    let obj = {
      className: "卡西诺",
      age: 18,
    };
    let { className } = obj; // 得到卡西诺
    console.log(className);
    let { age } = obj; // 得到18
    console.log(age);

    keyDefault().then((res) => {
      let searchInput = document.getElementById("searchInput");
      showKeyword = res.data.data.showKeyword;
      searchInput.value = showKeyword;
      console.log(showKeyword);
    });

    var seInput = document.getElementById("searchInput");
    seInput.onfocus = function () {
      console.log("得到焦点");
      if (seInput.value === showKeyword) {
        this.value = "";
        seInput.style.color = "#000000";
      }
    };

    seInput.onblur = function () {
      console.log("失去焦点");
      if (seInput.value === "") {
        this.value = showKeyword;
        seInput.style.color = "#999999";
      }
    };

    hotList().then((res) => {
      // console.log("简略");
      // console.log(res);
    });

    // hotListDetail().then((res) => {
    //   for(var i = 0; i < 10; i++) {
    //         var x = document.getElementById("a"+(i+1));
    //         x.innerText = (i+1)+". "+res.data.data[i].searchWord;
    //         hotSong.push(res.data.data[i]);
    //         console.log(x.value)
    //   }
    //   // console.log(story)
    //   // console.log(hotSong);
    //   // console.log(res);
    // });
  },

  methods: {
    // getListHot() {
    //   playListHot().then((res) => {
    //     console.log(res);
    //   });
    // },

    // click(){
    //     this.$store.commit('saveCurrDbSource',this.db)
    // },

    // add(){
    //   store.commit('addCount',1)
    // },

    // del(){
    //   store.commit('delCount',1)
    // },

    // addClick(){
    //   store.commit('increment')
    //   console.log(store.state.count) // -> 1
    // },

    handlerKeywords() {
      if (this.keywords === "") {
        this.keywords = showKeyword;
      }
      let words = {
        keywords: this.keywords,
      };
      console.log(words);
      keySearch(words).then((res) => {
        console.log(res);
      });
    },

    // handlerMultimatch(){
    //   let words = {
    //     keywords: this.keywords,
    //   };
    //   searchMultimatch(words).then((res) => {
    //     console.log(res);
    //    });
    // },

    // handlerInput(){
    //   let words = {
    //     keywords: this.keywords,
    //   };
    //   keySearchSuggest(words).then((res) => {
    //     console.log(res);
    //    });
    // }
  },
};
</script>

<style lang="scss" scoped>
#search {
  text-align: center;
}

#searchInput {
  color: gray;
}

#box {
  position: relative;
  display: inline-block;
  width: 500px;
  height: auto;
}

#child {
  position: absolute;
  left: -10px;
  width: 500px;
  height: auto;
}

#child .left {
  float: left;
}

#child .right {
  position: absolute;
  left: 250px;
}

#mountNode {
  margin-top: 50px;
}

#antvG6 {
  height: 1000px;
  background-color: antiquewhite;
}

#showhotList {
  margin-top: 50px;
}
</style>
