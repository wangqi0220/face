import { defineStore } from 'pinia'
import { loginApi, getInfoApi } from "@/api/user/user"
import { LoginParm } from "@/api/user/UserModel"
import { Result } from "@/http/request"
import { setUserId, setToken, setExpireTime } from "@/utils/auth"
//定义state类型
export type UserState = {
    token: string,
    userId: string | number,
    permissions: string[]
}
//定义store
export const userStore = defineStore('userStore', {
    state: (): UserState => {
        return {
            token: '',
            userId: '',
            permissions: []
        }
    },
    actions: {
        //获取用户信息
        getInfo() {
            return new Promise((resolve, reject) => {
                getInfoApi().then(res => {
                    //设置权限信息到vuex里面
                    if (res.code == 200) {
                        this.permissions = res.data.roles
                    }
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //登录
        login(loginParm: LoginParm) {
            return new Promise<Result>((resolve, reject) => {
                loginApi(loginParm).then(res => {
                    //把返回的token放到vuex里面 和 cookies(sessioStorage)
                    if (res.data.code == 200) {
                        this.token = res.data.token;
                        this.userId = res.data.id;
                        //存到cookies ==> sessioStorage
                        setUserId(res.data.id)
                        setToken(res.data.token)
                        setExpireTime(res.data.expireTime)
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    getters: {
        getPermissions(state) {
            return state.permissions
        }
    }
})