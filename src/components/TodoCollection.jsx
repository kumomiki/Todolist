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
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleDone={(id) => onToggleDone?.(id)}
            onChangeMode={({id, isEdit}) => onChangeMode?.({ id, isEdit })}
          />
        );
      })}
    </div>
  );
};

export default TodoCollection;
