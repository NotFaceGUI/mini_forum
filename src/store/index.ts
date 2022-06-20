import { defineStore } from 'pinia'

const useStore = defineStore('main', {
    state: () => ({
        configMap: new Map<string, any>,
        isLogin: false,
        userInfo: {
            id: "",
            name: "",
            role: ""
        },
        curInfo: {
        }
    }),
    getters: {
        getConfigMap(state) {
            return state.configMap;
        },
        getIsLogin(state) {
            return state.isLogin;
        },
        getUserInfo(state) {
            return state.userInfo;
        },
        getCurInfo(state): any {
            return state.curInfo;
        }
    },
    actions: {
        setConfigMap(name: string, data: any) {
            this.configMap.set(name, data);
        },
        setIsLogin(login: boolean) {
            this.isLogin = login;
        },
        setUserInfo(user: any) {
            this.userInfo = user;
        },
        setCurInfo(data: any) {
            this.curInfo = data;
        }
    }
})

export default useStore