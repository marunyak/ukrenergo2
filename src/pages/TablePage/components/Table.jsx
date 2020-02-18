/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-loop-func */
import React, { useState } from 'react';
import TableCellHead from './TableCellHead';
import TableCellBody from './TableCellBody';

function Table(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [autoFocus, setAutoFocus] = useState({});
  const {
    setSortDirection, sortDirection, rowsSearch, search, setTable
  } = props;
  const { table_name: tableName, header_cells: headerCells, cells } = props.table;
  const newCells = [];
  const indexLast = currentPage * perPage;
  const indexFirst = indexLast - perPage;
  const pageNumbers = [];
  let arr = [];

  const onSort = (sortField) => {
    if (cells.length <= 0) return;
    const funcSort = (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    };
    const ordered = {};
    const sortedArray = [];
    const finalArray = [];
    let array = [];
    let temp = '';
    let sortType = '';

    // First Sort where key = sortFiled and have array of objects

    for (let i = 0; i < cells.length; i += 1) {
      const j = i;
      const {
        row, column, data, type
      } = cells[i];
      array.push(cells[i]);

      if (column === parseInt(sortField)) {
        temp = data;
        sortType = type;
      }

      if (i === cells.length - 1 || row !== cells[1 + j].row) {
        if (finalArray[temp]) {
          array.forEach((item) => {
            finalArray[temp].push(item);
          });
        } else {
          finalArray[temp] = array;
        }

        if (i !== cells.length - 1) array = [];
      }
    }

    // Second Sort by keys

    const keys = [];
    if (sortType === 'number') {
      Object.keys(finalArray).forEach((key) => keys.push(parseInt(key)));
    } else Object.keys(finalArray).forEach((key) => keys.push(key));

    if (sortDirection[parseInt(sortField)] === 'asc') {
      keys.sort(funcSort).forEach((key) => {
        ordered[`${key}a`] = finalArray[key];
      });
      sortDirection[sortField] = 'desc';
      setSortDirection(sortDirection);
    } else {
      keys.sort(funcSort).reverse().forEach((key) => {
        ordered[`${key}a`] = finalArray[key];
      });
      sortDirection[sortField] = 'asc';
      setSortDirection(sortDirection);
    }

    // Added to cells array

    Object.values(ordered).forEach((item) => {
      item.forEach(item1 => sortedArray.push(item1));
    });
    setTable({ ...props.table, cells: sortedArray });
    setCurrentPage(1);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const type = e.target.parentElement.getAttribute('type');
    const column = e.target.parentElement.getAttribute('column');
    const row = e.target.parentElement.parentElement.getAttribute('row');
    const val = e.target.value;
    const tempCells = cells.slice();

    tempCells.forEach((item) => {
      if (item.row === parseInt(row) && item.column === parseInt(column)) {
        if (type === 'boolean') {
          item.data = !item.data;
        } else if (type === 'string') {
          item.data = val;
        } else item.data = parseInt(val);
      }
    });

    setAutoFocus({ autofocus_row: row, autofocus_column: column });
    setTable({ ...props.table, cells: tempCells });
  };

  const onBlur = () => {
    setAutoFocus({});
  };

  const addRow = () => {
    const rowCells = cells.slice();
    if (rowCells.length === 0) return;
    const lastRow = rowCells[rowCells.length - 1].row;
    const filteredCells = rowCells.filter((item) => item.row === lastRow);

    filteredCells.forEach((item) => {
      rowCells.push({
        ...item, row: lastRow + 1, data: '', is_mutable: true
      });
    });
    setTable({ ...props.table, cells: rowCells });
  };

  // Filter search with render items

  if (search && rowsSearch.length > 0) {
    for (let i = 0; i < cells.length; i += 1) {
      const j = i;
      const { row } = cells[i];

      if (rowsSearch.includes(parseInt(row))) {
        arr.push(<TableCellBody
          item={cells[i]}
          key={i}
          autoFocus={autoFocus}
          onChangeHandler={onChangeHandler}
          onBlur={onBlur}
        />);
        if (i === cells.length - 1) {
          newCells.push(<tr row={row} key={i}>{arr}</tr>);
        } else if (row !== cells[1 + j].row) {
          newCells.push(<tr row={row} key={i}>{arr}</tr>);
          arr = [];
        }
      }
    }
  } else if (!search && !rowsSearch.length) {
    for (let i = 0; i < cells.length; i += 1) {
      const j = i;
      const { row } = cells[i];

      arr.push(<TableCellBody
        item={cells[i]}
        key={i}
        autoFocus={autoFocus}
        onChangeHandler={onChangeHandler}
        onBlur={onBlur}
      />);
      if (i === cells.length - 1) {
        newCells.push(<tr row={row} key={i}>{arr}</tr>);
      } else if (row !== cells[1 + j].row) {
        newCells.push(<tr row={row} key={i}>{arr}</tr>);
        arr = [];
      }
    }
  }


  const currentList = newCells.slice(indexFirst, indexLast);

  for (let i = 1; i <= Math.ceil(newCells.length / perPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <>
      <h1>{tableName}</h1>
      <div id="container">
        <table id="info">
          <thead>
            <tr row="0">
              {headerCells.map((item, key) => <TableCellHead item={item} onSort={onSort} key={key} />)}
            </tr>
          </thead>
          <tbody>
            {currentList}
          </tbody>
        </table>
      </div>
      <div className="add-row" onClick={addRow}>Add row</div>

      <ul className="pagination">
        {pageNumbers.length > 1 ? pageNumbers.map((number) => (
          <li
            key={number}
            className={parseInt(currentPage) === number ? 'active' : null}
            id={number}
            onClick={({ target: { id } }) => setCurrentPage(id)}
          >
            {number}
          </li>
        )) : null}
      </ul>
    </>
  );
}
export default Table;
