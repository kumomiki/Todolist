import axios from 'axios';

const baseURL = 'https://todo-list.alphacamp.io/api';

//創建一個新的 Axios 實例
const axiosInstance = axios.create({ baseURL: baseURL });

// axios 提供的 Interceptors 方法，在發出 request 前、收到 response 後產生一些時間差，讓我們可以設定 Auth Token
axiosInstance.interceptors.request.use(
  (config) => {
    // 要在Header加上token，而token存在localStorage，因此要取得token
    const token = localStorage.getItem('authToken');
    // 若token存在的話，就設立Header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // 然後回傳config
    return config;
  },
  (error) => {
    // Do something with request error
    console.error(error);
  },
);

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/todos`);
    return res.data.data;
  } catch (error) {
    console.error(`[Get Todos failed]:`, error);
  }
};

export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axiosInstance.post(`${baseURL}/todos`, { title, isDone });
    return res.data;
  } catch (error) {
    console.error(`[Create Todo failed]:`, error);
  }
};

export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axiosInstance.patch(`${baseURL}/todos/${id}`, {
      title,
      isDone,
    });

    return res.data;
  } catch (error) {
    console.error(`[Patch Todo failed]:`, error);
  }
};
export const deleteTodo = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseURL}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error(`[Delete Todo failed]:`, error);
  }
};
