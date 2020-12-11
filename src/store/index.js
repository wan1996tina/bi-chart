import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sports: {
      爬山: 1,
      慢跑: 5,
      游泳: 3,
      羽球: 7,
      快走: 9,
      排球: 6,
      健身: 15
    },
    entertainment: {
      看書: 5,
      滑手機: 15,
      聚餐: 6,
      購物: 3,
      聽音樂: 22,
      逛夜市: 2,
      遛狗: 28
    },
    breakfast: {
      蛋餅: 12,
      三明治: 8,
      漢堡: 7,
      鐵板麵: 2,
      飯糰: 6,
      麵包: 4,
      饅頭: 9
    }
  },
  mutations: {
    addData (state, data) {
      state.sports = data
    },
    editData (state, data) {
      state.sports[data[1]] = parseInt(data[0])
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getChartData (state) {
      return state.sports
    },
    get2 (state) {
      return state.entertainment
    },
    getBreakfast (state) {
      return state.breakfast
    }
  }
})
