import axios from 'axios';
import { setResponseInterceptor, setRequestInterceptor } from './interceptors';

// 默认超时时间
axios.defaults.timeout = 150000;
// 返回其他状态码
axios.defaults.validateStatus = status => status >= 200 && status < 400;

axios.defaults.withCredentials = true; // 发送凭据
axios.defaults.xsrfCookieName = 'session:'; // 以‘session:’识别会话

axios.defaults.responseType = 'json';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

export const pureFetch = axios.create({
    baseURL: 'http://localhost:3000',
  },
);
setResponseInterceptor(pureFetch);
setRequestInterceptor(pureFetch);

export const userFetch = axios.create({
  baseURL: 'http://localhost:3000/user',
},
);
setResponseInterceptor(userFetch);
setRequestInterceptor(userFetch);

export const groupFetch = axios.create({
  baseURL: 'http://localhost:3000/group',
},
);
setResponseInterceptor(groupFetch);
setRequestInterceptor(groupFetch);

export const commentFetch = axios.create({
  baseURL: 'http://localhost:3000/comment',
},
);
setResponseInterceptor(commentFetch);
setRequestInterceptor(commentFetch);