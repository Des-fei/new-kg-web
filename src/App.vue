<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/plugins">Plugins</router-link> |
      <router-link to="/cloud-music">cloud-music</router-link> |
      <router-link to="/antvx6">AntvX6</router-link> |
      <router-link to="/antvx6demo">AntvX6demo</router-link> |
      <router-link to="/echarts/chart1">Echarts-Chart1</router-link> |
      <router-link to="/antvg6">AntvG6</router-link> |
      <router-link to="/antvg6demo">AntvG6demo</router-link> |
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  destroyed() {},
  computed: {},
  methods: {},
  watch: {},
  filters: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
