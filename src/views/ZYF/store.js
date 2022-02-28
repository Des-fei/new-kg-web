import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    // pathName: "",// 路由
    // currDbSource: {},// 当前数据源
    // currJobData: {},// 当前元数据
    // DbSource: [], // 所有数据源，供元数据界面下拉列表使用
    // selectJobMeta: {}, // 当前选择的元数据（搜索后点击的单条数据）
    // specialSubject: [], // 专题数据（多条）
    // duplicateJobMeta: {}, // 复制的数据
  },
  mutations: {
    increment(state){
      state.count++
    },
    // // 保存当前菜单栏的路径
    // savePath(state,pathName){
    //   state.pathName = pathName;
    // },
    // // 保存当前点击的数据源
    // saveCurrDbSource(state,currDbSource){
    //   state.currDbSource = currDbSource;
    // },
    // // 保存当前点击的元数据
    // saveCurrJobData(state,currJobData){
    //   state.currJobData = null;
    //   state.currJobData = currJobData;
    // },
    // // 保存所有数据源
    // saveDbSource(state,DbSource){
    //   state.DbSource = DbSource;
    // },
    // // 保存搜索后选择的那一条元数据
    // saveSelectJobMeta(state, selectJobMeta){
    //   state.selectJobMeta = selectJobMeta;
    // },
    // // 保存搜索的那一类专题
    // saveSpecialSubject(state, specialSubject) {
    //   state.specialSubject = specialSubject;
    //   state.selectJobMeta = {};
    // },
    // // 保存复制的元数据（名称为空）
    // saveDuplicateJobMeta(state, duplicateJobMeta){
    //   state.duplicateJobMeta = duplicateJobMeta;
    // },
  },
  actions: {},
  modules: {}
});
