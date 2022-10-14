import { defineStore } from 'pinia'
import { ITabe } from './type/index'
//定义state类型
export type TabsState = {
    tabsList: Array<ITabe>
}
//定义store
export const tabStore = defineStore('tabStore', {
    state: (): TabsState => {
        return {
            tabsList: []
        }
    },
    actions: {
        addTabe(tab: ITabe) {
            //判断是否已经存在，如果不存在，才放入
            if (this.tabsList.some(item => item.path === tab.path)) return;
            this.tabsList.push(tab);
        }
    },
    getters: {
        getTabs(state) {
            return state.tabsList;
        }
    }
})