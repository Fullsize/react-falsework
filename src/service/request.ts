/*
 * @Date: 2023-07-03 10:13:19
 * @LastEditors: Fullsize
 * @LastEditTime: 2023-07-03 11:05:41
 * @FilePath: /economy-mobile/src/service/request.ts
 * @Author: Fullsize
 */
import axios from 'axios';
import qs from 'qs';
const baseURL = window['baseapi'];
const token = '';
// 用于存储pending的请求（处理多条相同请求）
const pendingRequest = new Map();

// 生成request的唯一key
const generateRequestKey = (config: any = {}) => {
  // 通过url，method，params，data生成唯一key，用于判断是否重复请求
  // params为get请求参数，data为post请求参数
  const { url, method, params, data } = config;
  return [url, method, qs.stringify(params), qs.stringify(data)].join('&');
};

// 将重复请求添加到pendingRequest中
const addPendingRequest = (config: any) => {
  const key = generateRequestKey(config);
  if (!pendingRequest.has(key)) {
    config.cancelToken = new axios.CancelToken((cancel) => {
      pendingRequest.set(key, cancel);
    });
  }
};

// 取消重复请求
const removePendingRequest = (config: any) => {
  const key = generateRequestKey(config);
  if (pendingRequest.has(key)) {
    const cancelToken = pendingRequest.get(key);
    cancelToken(key); // 取消之前发送的请求
    pendingRequest.delete(key); // 请求对象中删除requestKey
  }
};

const instance = axios.create({
  baseURL,
  timeout: 1000 * 30,
  headers: {
    // '	Cache-Control': 'max-age=0',
    Authorization: token,
    'x-auth-token': token,
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 处理重复请求
    removePendingRequest(config);
    addPendingRequest(config);

    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 移除重复请求
    removePendingRequest(response.config);

    return response;
  },
  (error) => {
    // 异常情况console，方便排查问题
    console.log('error', error);
    // 移除重复请求
    removePendingRequest(error.config || {});

    return Promise.reject(error);
  },
);
export default instance;
