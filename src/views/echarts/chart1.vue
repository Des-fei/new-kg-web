<template>
  <div id="chart1"
       class="chart1"></div>
</template>

<script>
import chart1 from "./chart1.json";
import * as echarts from "echarts";
export default {
  data() {
    return {
      chart1,
      container: null,
      HEIGHT_RATIO: 0.6,
      DIM_CATEGORY_INDEX: 0,
      DIM_TIME_ARRIVAL: 1,
      DIM_TIME_DEPARTURE: 2,
      DATA_ZOOM_AUTO_MOVE_THROTTLE: 30,
      DATA_ZOOM_X_INSIDE_INDEX: 1,
      DATA_ZOOM_Y_INSIDE_INDEX: 3,
      DATA_ZOOM_AUTO_MOVE_SPEED: 0.2,
      DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH: 30,
      // _draggable,
      // _draggingEl,
      // _dropShadow,
      // _draggingCursorOffset: [0, 0],
      // _draggingTimeLength,
      // _draggingRecord,
      // _dropRecord,
      // cartesianXBounds: [],
      // cartesianYBounds: [],
      rawData: chart1,
      // _autoDataZoomAnimator,
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      let myChart = echarts.init(document.getElementById("chart1"));
      let options = {
        tooltip: {},
        animation: false,
        toolbox: {},
        title: {
          text: "Gantt of Airport Flight",
          left: "center",
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            filterMode: "weakFilter",
            height: 20,
            bottom: 0,
            start: 0,
            end: 26,
            handleIcon:
              "path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            showDetail: false,
          },
          {
            type: "inside",
            id: "insideX",
            xAxisIndex: 0,
            filterMode: "weakFilter",
            start: 0,
            end: 26,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
          },
          {
            type: "slider",
            yAxisIndex: 0,
            zoomLock: true,
            width: 10,
            right: 10,
            top: 70,
            bottom: 20,
            start: 95,
            end: 100,
            handleSize: 0,
            showDetail: false,
          },
          {
            type: "inside",
            id: "insideY",
            yAxisIndex: 0,
            start: 95,
            end: 100,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
          },
        ],
        grid: {
          show: true,
          top: 70,
          bottom: 20,
          left: 100,
          right: 20,
          backgroundColor: "#fff",
          borderWidth: 0,
        },
        xAxis: {
          type: "time",
          position: "top",
          splitLine: {
            lineStyle: {
              color: ["#E9EDFF"],
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            lineStyle: {
              color: "#929ABA",
            },
          },
          axisLabel: {
            color: "#929ABA",
            inside: false,
            align: "center",
          },
        },
        yAxis: {
          axisTick: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false },
          min: 0,
          max: this.rawData.parkingApron.data.length,
        },
        series: [
          {
            id: "flightData",
            type: "custom",
            renderItem: this.renderGanttItem,
            // dimensions: this.rawData.flight.dimensions,
            encode: {
              x: [1, 2],
              y: 0,
              tooltip: [0, 1, 2],
            },
            data: this.rawData.flight.data,
          },
          {
            type: "custom",
            renderItem: this.renderAxisLabelItem,
            // dimensions: this.rawData.parkingApron.dimensions,
            encode: {
              x: -1,
              y: 0,
            },
            data: this.rawData.parkingApron.data.map(function (item, index) {
              return [index].concat(item);
            }),
          },
        ],
      };

      myChart.setOption(options);
    },

    renderGanttItem(params, api) {
      // let cartesianXBounds = [];
      // let cartesianYBounds = [];
      var categoryIndex = api.value(0);
      var timeArrival = api.coord([api.value(1), categoryIndex]);
      var timeDeparture = api.coord([api.value(2), categoryIndex]);
      // var coordSys = params.coordSys;
      // cartesianXBounds[0] = coordSys.x;
      // cartesianXBounds[1] = coordSys.x + coordSys.width;
      // cartesianYBounds[0] = coordSys.y;
      // cartesianYBounds[1] = coordSys.y + coordSys.height;
      var barLength = timeDeparture[0] - timeArrival[0];
      // Get the heigth corresponds to length 1 on y axis.
      var barHeight = api.size([0, 1])[1] * this.HEIGHT_RATIO;
      var x = timeArrival[0];
      var y = timeArrival[1] - barHeight;
      // var flightNumber = api.value(3) + "";
      // var flightNumberWidth = echarts.format.getTextRect(flightNumber).width;
      // var text =
      //   barLength > flightNumberWidth + 40 && x + barLength >= 180
      //     ? flightNumber
      //     : "";
      var rectNormal = this.clipRectByRect(params, {
        x: x,
        y: y,
        width: barLength,
        height: barHeight,
      });
      // var rectVIP = this.clipRectByRect(params, {
      //   x: x,
      //   y: y,
      //   width: barLength / 2,
      //   height: barHeight,
      // });
      // var rectText = this.clipRectByRect(params, {
      //   x: x,
      //   y: y,
      //   width: barLength,
      //   height: barHeight,
      // });
      return {
        type: "group",
        children: [
          {
            type: "rect",
            ignore: !rectNormal,
            shape: rectNormal,
            style: api.style(),
          },
          // {
          //   type: "rect",
          //   ignore: !rectVIP && !api.value(4),
          //   shape: rectVIP,
          //   style: api.style({ fill: "#ddb30b" }),
          // },
          // {
          //   type: "rect",
          //   ignore: !rectText,
          //   shape: rectText,
          //   style: api.style({
          //     fill: "transparent",
          //     stroke: "transparent",
          //     text: text,
          //     textFill: "#fff",
          //   }),
          // },
        ],
      };
    },
    renderAxisLabelItem(params, api) {
      var y = api.coord([0, api.value(0)])[1];

      return {
        type: "group",
        position: [10, y],
        children: [
          {
            type: "path",
            shape: {
              d: "M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z",
              x: 0,
              y: -20,
              width: 90,
              height: 20,
              layout: "cover",
            },
            style: {
              fill: "#368c6c",
            },
          },
          {
            type: "text",
            style: {
              x: 24,
              y: -3,
              text: api.value(1),
              textVerticalAlign: "bottom",
              textAlign: "center",
              textFill: "#fff",
            },
          },
          {
            type: "text",
            style: {
              x: 75,
              y: -2,
              textVerticalAlign: "bottom",
              textAlign: "center",
              text: api.value(2),
              textFill: "#000",
            },
          },
        ],
      };
    },
    clipRectByRect(params, rect) {
      return echarts.graphic.clipRectByRect(rect, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chart1 {
  width: 800px;
  height: 600px;
  background: turquoise;
}
</style>