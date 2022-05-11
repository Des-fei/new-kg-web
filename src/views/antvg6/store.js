import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // count: 0,
    // ChangeShowCom: true,
    song_name:"李白",
    song_list: [],
    // pathName: "",// 路由
    // currDbSource: {},// 当前数据源
    // currJobData: {},// 当前元数据
    // DbSource: [], // 所有数据源，供元数据界面下拉列表使用
    // selectJobMeta: {}, // 当前选择的元数据（搜索后点击的单条数据）
    // specialSubject: [], // 专题数据（多条）
    // duplicateJobMeta: {}, // 复制的数据
  },
  getters: {//实时监听state值的变化（最新状态）
    getSongName: (state) => {
      return state.song_name;
    },
    getSongList: (state) =>{
      return state.song_list;
    }
    // getCount(state){//承载变化的count值
    //   return state.count
    // },
    // isShow(state){
    //   return state.ChangeShowCom//承载变化的showCom值
    // }
  },
  mutations: {
    changeSongName(state,song_name){
      state.song_name = song_name ;
    },
    changeSongList(state,song_list){
      state.song_list = song_list ;
    }
    // changeDemoLists(state, payload) {
    //   Vue.set(state.demoLists, 0, { id: payload.id, name: payload.name });
    // }
    // increment(state){
    //   state.count++
    // },
    // addCount(state,num){
    //   state.count = state.count + num
    // },
    // delCount(state,num){
    //   if(state.count > 0){
    //     state.count = state.count - num;
    //   } else{
    //     state.count = 0
    //   }
    // },
    // show(state){
    //   state.ChangeShowCom = true;
    // },
    // hide(state){
    //   state.ChangeShowCom = false;
    // },
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
  actions: {
    async handlerGetData(context, payload) {
      setTimeout(() => {
        context.commit("changeSongName", payload);
      }, 1000);
    }
    // getAddCount(context,num){
    //   context.commit('addCount',num)
    // },
    // getDelCount(context,num){
    //   context.commit('delCount',num)
    // },
    // hideCom(context){
    //   context.commit('hide')
    // },
    // showCom(context){
    //   context.commit('show')
    // }
  },
  modules: {}
});
