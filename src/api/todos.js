import axios from "axios";

const baseURL = 'http://locaolhost:3001'

export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseURL}/todos`);
    return res.data;
  } catch (error) {
    console.error(`[Get Todos failed]:`, error);
  }
};

export const createTodo = async (payload) => {
  try {
    const { title, isEdit} = payload
    const res = await axios.post(`${baseURL}/todos`, { title, isEdit });
    return res.data;
  } catch (error) {
    console.error(`[Create Todo failed]:`, error);
  }
};

const patchTodo = () => {}
const deleteTodo = () => {}