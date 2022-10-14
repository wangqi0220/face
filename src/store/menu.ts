import { defineStore } from 'pinia'
import { getMenuListApi } from "@/api/menu/menu";
import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/Index.vue'
import Center from '@/layout/center/center.vue'
const modules = import.meta.glob('../views/**/*.vue')
//定义state类型
export type MenuState = {
    count: number,
    collapse: boolean,
    //菜单
    menuList: any;
}
//定义store
export const menuStore = defineStore('menuStore', {
    state: (): MenuState => {
        return {
            count: 0,
            collapse: false,
            menuList: [
                {
                    path: '/dashboard',
                    component: "Layout",
                    meta: {
                        title: "首页",
                        icon: "HomeFilled",
                        roles: ["sys:manage"]
                    },
                    children: []
                }
            ]
        }
    },
    actions: {
        setCount(count: number) {
            this.count = count;
        },
        setCollapse(collapse: boolean) {
            this.collapse = collapse;
        },
        getMenuList(router: any) {
            return new Promise((resolve, reject) => {
                getMenuListApi().then(res => {
                    let accessedRoutes;
                    if (res.code == 200) {
                        //动态生成路由
                        accessedRoutes = filterAsyncRoutes(res.data, router);
                        //设置到menuList
                        this.menuList = this.menuList.concat(accessedRoutes)
                    }
                    //返回
                    resolve(accessedRoutes);
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    getters: {
        getCount(state) {
            return state.count
        },
        getCollapse(state) {
            return state.collapse
        }
    }
})
export function filterAsyncRoutes(routes: RouteRecordRaw[], router: any) {
    const res: Array<RouteRecordRaw> = [];
    routes.forEach((route: any) => {
        const tmp = { ...route }
        const component = tmp.component;
        if (route.component) {
            if (component == 'Layout') {
                tmp.component = Layout;
            } else {
                tmp.component = modules[`../views${component}.vue`]
            }
        }
        if (tmp.children && tmp.children.length > 0) {
            //如果有下级，并且component != 'Layout'
            if (route.component != 'Layout') {
                tmp.component = Center
            }
            //递归
            tmp.children = filterAsyncRoutes(tmp.children, router)
        }
        router.addRoute(tmp)
        res.push(tmp)
    })
    return res;
}