import axios from 'axios'
// 方式四、方式三的简写，instance(config)返回的就是一个Promise对象
export function request(config) {
  //  1、创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  });

  // 2、axios拦截器
  // 配置请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 请求拦截的作用
    // 1、比如处理config中的一些信息不符合服务器的要求
    // 2、比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    // 3、某些网络请求（比如登录(token)），必须携带一些特殊的信息

    // 需要将拦截成功或者失败的结果返回
    return config;
  }, err => {
    // console.log(err);
    return err;
  });
  // 配置响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    // console.log(res.data);
    // 返回拦截结果
    return res.data;
  }, err => {
    // console.log(err);
    return err;
  });

  // 3、通过实例，以及网络请求参数config发送真正的网络请求
  return instance(config);
}
// 方式三、通过返回一个Promise对象来实现
// export function request(config) {
//   return new Promise((resolve,reject)=>{
//     // 1、创建axios实例
//     const instance = axios.create({
//       baseURL : 'http://123.207.32.32:8000',
//       timeout : 5000
//     });
//     // 通过实例，以及网络请求参数config发送真正的网络请求
//     instance(config)  
//     .then(res => {    
//       // console.log(res);
//       resolve(res);    
//       //这里要用.then 可以理解成链式Promise调用，
//       // main.js中的request(),请求到一个Promise对象，就是这里的返回的Promise(第一个)，
//       // main.js中的request().then()，就相当于这里返回的Promise的.then,使用的是这里传入的data
//     }).catch(err=>{
//       reject(err);
//     });
//   });
// }


// 方式二：传输一个包含url，回调函数的对象作为参数
// export function request(config) {
//   // 1、创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   // 通过实例，以及网络请求参数config发送真正的网络请求
//   instance(config.baseConfig).then(res => {
//     config.success(res);
//   }).catch(err=>{
//     config.failure(err);
//   });
// }

// 方式一：通过自定义回调函数
// export function request(config,success,failure) {
//   // 1、创建axios实例
//   const instance1 = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   // 通过实例，以及网络请求参数config发送真正的网络请求
//   instance1(config).then(res => {
//     // 通过传入两个函数作为参数用来回调
//     success(res);
//   }).catch(err=>{
//     failure(err);
//   });
// }

// 可以导出多个模块
export function request1() {

}