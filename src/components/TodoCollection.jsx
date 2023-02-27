import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onToggleDone,
  onChangeMode,
  onSave,
  onDelete,
}) => {
  return (
    <div>
      TodoCollection
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  );
};

export default TodoCollection;
