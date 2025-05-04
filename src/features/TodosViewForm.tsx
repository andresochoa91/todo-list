import React from 'react';

const TodosViewForm = ({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
}) => {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div>
        <label>Sort by</label>
        <select value={sortField} onChange={(event) => setSortField(event)}>
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>
        <label>Direction</label>
        <select>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </form>
  );
};

export default TodosViewForm;
