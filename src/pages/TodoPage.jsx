import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(dummyTodos);

  const handleInput = (value) => {
    setInputValue(value);
  };

  const handleTodo = () => {
    // 檢查輸入長度不為0
    if(inputValue.length === 0) return
    setTodos((preTodos) => {
      return [
        ...preTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });
    setInputValue('');
  };

  const handleKeyDown = () => {
    // 檢查輸入長度不為0
    if (inputValue.length === 0) return;
    setTodos((preTodos) => {
      return [
        ...preTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });
    setInputValue('');
  }



  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleInput}
        onAddTodo={handleTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection todos={todos} />
      <Footer />
    </div>
  );
};

export default TodoPage;
