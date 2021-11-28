import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

//  1.安装插件
Vue.use(Vuex)

// 2.创建Store 对象
const store = new Vuex.Store({
    getters,
    state: {
        cartList: []
    },
    mutations: {
        addCounter(state, payload) {
            payload.count++
        },
        addToCart(state, payload) {
            state.cartList.push(payload)
        }

    },
    actions: {
        addCart(context, payload) {
            // 1.查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //  2.判断oldproduct
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit('addCounter', oldProduct)
            } else {
                payload.count = 1
                context.commit('addToCart', payload)


            }
        }

    }
})

// 3.挂载Vue实例上
export default store
