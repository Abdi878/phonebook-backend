const Filter = ({ filter, addFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={addFilter}></input>
    </div>
  );
};

export default Filter;
