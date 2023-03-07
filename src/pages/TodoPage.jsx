import { createTodo, deleteTodo, getTodos, patchTodo } from '../api/todos';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPermission } from 'api/auth';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = async () => {
    // 檢查輸入長度不為0
    if (inputValue.length === 0) return;

    try {
      // create後會更新inputValue和isDone狀態給後端料庫
      const data = await createTodo({ title: inputValue, isDone: false });
      setTodos((preTodos) => {
        return [
          ...preTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = async () => {
    // 檢查輸入長度不為0
    if (inputValue.length === 0) return;

    try {
      const data = await createTodo({ title: inputValue, isDone: false });
      setTodos((preTodos) => {
        return [
          ...preTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  //編輯狀態更新
  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    // 可以用data變數，如createTodo，也可以不用，因為只是更新該item的toggle狀態
    try {
      await patchTodo({ id, isDone: !currentTodo.isDone });
      setTodos((preTodos) => {
        return preTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              // 若用data接住，則此部分改為!data.isDone
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((preTodos) => {
      return preTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
  };
  // 編輯狀態更新
  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({ id, title });
      setTodos((preTodos) => {
        return preTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              id,
              title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((preTodos) => {
        return preTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  //把驗證 authToken 的流程放在 useEffect 裡，這樣在進入頁面時，就會直接觸發authToken 的檢查
  //確保使用者只有在擁有有效 token 時才能進入 todos 頁面，提高了安全性。
  useEffect(() => {
    const checkTokenIsValid = async () => {
      //先確認authToken是否存在
      // 取得authToken
      const authToken = localStorage.getItem('authToken');
      //若不存在，則return
      if (!authToken) {
        navigate('/login');
      }
      //若authToken存在，驗證是否有效，才能進入todos page
      const result = await checkPermission(authToken);
      //若有效則進入 todos 頁面
      if (!result) {
        navigate('/login');
      }
    };
    checkTokenIsValid();
    // 因為有使用到navigate變數，所以須放入（表示有改變時執行）
  }, [navigate]);

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
