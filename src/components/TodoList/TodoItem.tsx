import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  isLoading: boolean,
  handleDeleteTodo?: (id: number) => void,
  handleCompleteTodo?: (
    id: number,
    completed: boolean,
  ) => void,
  handleChangeTodoTitle?: (
    id: number,
    newTitle: string,
  ) => Promise<void>,
  setErrorMessage?: (value: string) => void
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isLoading,
  handleDeleteTodo,
  handleCompleteTodo,
  handleChangeTodoTitle,
  setErrorMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const editTodo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editTodo.current) {
      editTodo.current.focus();
    }
  }, [isEditing]);

  // const handleEditedTitleSubmit = () => {
  //   const trimmedTodoTitle = editedTitle.trim();

  //   if (trimmedTodoTitle === todo.title) {
  //     setEditedTitle(trimmedTodoTitle);
  //   } else if (!trimmedTodoTitle) {
  //     handleDeleteTodo(todo.id);
  //   } else {
  //     handleChangeTodoTitle(todo.id, trimmedTodoTitle);
  //   }

  //   setIsEditing(false);
  // };

  const handleEditedTitleSubmit = async () => {
    const trimmedTodoTitle = editedTitle.trim();

    if (!trimmedTodoTitle.length) {
      handleDeleteTodo?.(todo.id);

      return;
    }

    if (trimmedTodoTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    try {
      await handleChangeTodoTitle?.(
        todo.id,
        trimmedTodoTitle,
      );
      setIsEditing(false);
    } catch (e) {
      setErrorMessage?.('Unable to update a todo');
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleEditedTitleSubmit();
  };

  return (
    <>
      <div
        data-cy="Todo"
        className={cn('todo',
          {
            completed: todo.completed,
          })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            defaultChecked={todo.completed}
            onClick={() => handleCompleteTodo?.(todo.id, !todo.completed)}
          />
        </label>

        {isEditing ? (
          <form onSubmit={onSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="What needs to be done? Deleted if empty"
              value={editedTitle}
              ref={editTodo}
              onChange={(event) => setEditedTitle(event.target.value)}
              onKeyUp={event => {
                if (event.key === 'Escape') {
                  setIsEditing(false);
                }
              }}
              onBlur={handleEditedTitleSubmit}
            />
          </form>
        ) : (
          <>
            <span
              onDoubleClick={() => setIsEditing(true)}
              data-cy="TodoTitle"
              className="todo__title"
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => handleDeleteTodo?.(todo.id)}
            >
              ×
            </button>
          </>

        )}

        {/* overlay will cover the todo while it is being updated */}
        <div
          data-cy="TodoLoader"
          className={cn('modal overlay',
            {
              'is-active': isLoading,
            })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </>
  );
};
