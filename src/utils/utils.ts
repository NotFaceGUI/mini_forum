
import axios from "../request";
import useStore from "../store";


// 将token存入localStorage
export function setToken(tokenKey: string, token: string) {
    return localStorage.setItem(tokenKey, token)
}

//拿到localStorage中的token
export function getToken(tokenKey: string): string {
    return <string>localStorage.getItem(tokenKey)
}

//退出登录时调用销毁token
export function removeToken(tokenKey: string) {
    return localStorage.removeItem(tokenKey)
}

export function infoRequest() {
    const store = useStore();
    axios.get('user/info')
        .then((response) => {
            console.log(response);
            if (response.data.code == 1) {
                store.setIsLogin(true);
                store.setUserInfo(response.data.data);
            } else {
                store.setIsLogin(false);
            }
        });
}

export function checkToken(callback: any) {
    axios.get('user/check').then(callback);
}

