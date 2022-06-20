import axios from "../request"
import useStore from '../store'

/**
 * 请求配置数据
 * @param name 需要的配置内容
 * @param getall 是否获取全部配置
 */
const config = (name: string, getall?: boolean) => {
    let store = useStore();
    if (getall) {
        axios.get("config").then((res) => {
            // 存储配置数据
            res.data.forEach((element: any) => {
                store.setConfigMap(element.name, JSON.parse(element.data))
            });
        
        })
    } else {
        console.log("name");
    }
}

export default config