import axios from "axios";

export function request(config) {

    //创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    //拦截器
    //请求拦截的作用
    instance.interceptors.request.use(res => {

        // console.log(config);
        //1.比如config中的一些信息不符合服务器的要求
        //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
        //3.某些网络请求（比如登录（token）），必须携带一些特殊信息
        return res //一定要记得返回
    }, err => {
        console.log(err);
    })
    //响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        console.log(err);
    }
    )


    //发送真正的网络请求
    return instance(config)
    // 这个函数返回promise

}




// export function request(config) {
//     return new Promise((resolve, reject) => {
//         //创建axios的实例
//         const instance = axios.create({
//             baseURL: 'http://123.207.32.32:8000',
//             timeout: 5000
//         })
//         //发送真正的网络请求
//         instance(config)
//             .then(res => {
//                 resolve(res)
//             })
//             .catch(err => {
//                 reject(err)
//             })
//     })

// }



// instance(config)
// .then(res => {
//     success(res);
// })
// .catch(err => {
//     failure(err)
// })