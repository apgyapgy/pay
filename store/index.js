/**
 * Created by user on 2017/9/14.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
// 需要维护的状态
const store = new Vuex.Store({
  state: {
    // 放置初始状态 app启动的时候的全局的初始值
    fansInfo:'',
    fansItems:'',
  },
  mutations: {
    NEWUSER (state,info){
      state.fansInfo = info;
      localStorage.setItem("fansInfo",info);
      //localStorage['fansInfo'] = info;
    },
    NEWFANSITEM (state,item) {
      state.fansItems = item;
      localStorage.setItem("fansItems",item);
    },
  },
  actions: {
    newUser({commit}){
      commit("NEWUSER")
    },
    newFansitem({commit}){
      commit("NEWFANSITEM")
    },
  }
})
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default store








