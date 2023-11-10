import React from 'react';
import { FilterType } from '../../types/FilterType';
import { TodoFilter } from './TodoFilter';

type FilterProps = {
  todosQty: number,
  filterTodo: (value: FilterType) => void,
  selectedTodoFilter: FilterType,
  handleClearCompleted: () => void,
  hasCompletedTodos: boolean,
};

export const Footer: React.FC<FilterProps> = ({
  todosQty,
  filterTodo,
  selectedTodoFilter,
  handleClearCompleted,
  hasCompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosQty} items left`}
      </span>
      {/* Hide the footer if there are no todos */}

      <TodoFilter
        filterTodo={filterTodo}
        selectedTodoFilter={selectedTodoFilter}
      />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
