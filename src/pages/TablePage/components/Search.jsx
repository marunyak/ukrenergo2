/* eslint-disable react/prop-types */
import React from 'react';

function Search({
  table, search, setRowsSearch, setSearch
}) {
  const dataSearch = e => {
    const arr = [];
    let { value } = e.target;
    value = value.replace(/[.*+?^${}()|[\]\\]/g, '').trimStart().trimEnd();
    table.filter(({ row, data, type }) => {
      if (type === 'string' || type === 'number') {
        if (value !== '' && String(data).toLocaleLowerCase().search(new RegExp(`^${value.toLocaleLowerCase()}`, 'g')) !== -1) {
          arr.push(parseInt(row));
          return true;
        }
      }
      return false;
    });
    setRowsSearch(arr ? [...new Set(arr)] : []);
    setSearch(value);
  };

  return (
    <div className="search">
      <input type="text" name="search" placeholder="Search..." value={search} onChange={dataSearch} />
    </div>
  );
}
export default Search;
