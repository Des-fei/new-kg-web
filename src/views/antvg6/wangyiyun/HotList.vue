<template>
<div id="container">
    <div id="content">
    <div id="title">热搜榜</div>
    <!-- <div>{{songName}}</div>
    <button @click="add()">修改</button> -->
    <div id="list" v-for="(item,index) in songList"
         :key="index">
         <span class="num">{{ index+1}}</span>
         <span class="name">{{ item.searchWord }}</span>
    </div>
    </div>
</div>
</template>

<script>
import store from "../store";
import { hotListDetail } from "@/api/neteaseCloudMusicApi";
import { mapGetters } from 'vuex';
export default {
  data(){
      return{
      }
  },
  computed:{
      songName: function() {
          console.log(store.getters.getSongName);
          return store.getters.getSongName;
      },
      songList: function () {
          return store.getters.getSongList;
      },
  },
  mounted(){
      hotListDetail().then((res) => {
    //   console.log(res);
      console.log(res.data.data);
      let song_list = res.data.data;
      console.log(song_list);
      store.commit('changeSongList',song_list)
    //   console.log(res.data.data[0].searchWord);
      let song_name = res.data.data[0].searchWord;
      console.log(song_name);
      store.commit('changeSongName',song_name)
    });   
  },
  methods:{
    //   handlerChangeContent() {
    //   let payload = {
    //     id: 1,
    //     text: Math.random().toString(),
    //   };
    //   store.commit("changeContent", payload);
    // },
  }
}
</script>

<style lang="scss" scoped>

#container {
    height: 300px;
    text-align:center;
    background-color: aquamarine;
}

#content{
    width: 500px;
    display:inline-block;
    background-color: bisque;
}

#list{
    width:250px;
    display: inline-block;
    
}

.name{
    margin-left: 10px;
}


</style>