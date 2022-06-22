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
        },
        page: {
            size: 1,
            current: 0
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
        },
        getPage(state) {
            return state.page;
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
        },
        setPage(cur: number) {
            this.page.current = cur;
        }
    }
})

export default useStore