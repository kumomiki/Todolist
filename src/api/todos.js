import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseURL}/todos`);
    return res.data;
  } catch (error) {
    console.error(`[Get Todos failed]:`, error);
  }
};

export const createTodo = async (payload) => {
  const { title, isEdit } = payload;
  try {
    const res = await axios.post(`${baseURL}/todos`, { title, isEdit });
    return res.data;
  } catch (error) {
    console.error(`[Create Todo failed]:`, error);
  }
};

export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axios.patch(`${baseURL}/todos/${id}`, { title, isDone });

    return res.data;
  } catch (error) {
    console.error(`[Patch Todo failed]:`, error);
  }
};
export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error(`[Delete Todo failed]:`, error);
  }
};
