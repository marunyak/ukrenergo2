/* eslint-disable no-loop-func */
import React, {useState} from 'react';
import TableCellHead from './TableCellHead';
import TableCellBody from './TableCellBody';

function Table(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(3);
  const setSortDirection = props.setSortDirection;
  const sortDirection  = props.sortDirection;
  const rowsSearch = props.rowsSearch;
  const search = props.search;
  const setTable = props.setTable;
  const newCells = [];
  const indexLast = currentPage * perPage;
  const indexFirst = indexLast - perPage;
  const pageNumbers = [];

  let arr = [];
  let { table_name, header_cells, cells } = props.table;

  // Sort cells

  const onSort = sortField => {
    if (cells.length <= 0) return;
    let ordered = {};
    let sortedArray = [];
    let finalArray = [];
    let array = [];
    let temp = '';

    // First Sort where key = sortFiled and have array of objects

    for (let i = 0; i < cells.length; i += 1) {
      const j = i;
      const { row, column, data } = cells[i];
      array.push(cells[i]);

      if (column === parseInt(sortField)) temp = data;

      if (i === cells.length - 1 || row !== cells[1 + j].row) {
        if (finalArray[temp]) {
          array.forEach((item) => {
            finalArray[temp].push(item);
            return;
          });
        } else finalArray[temp] = array;

        if(i !== cells.length - 1) array = [];
      }
    }

    // Second Sort by keys

    if(sortDirection[parseInt(sortField)] === 'asc') {
      Object.keys(finalArray).sort().forEach(function(key) {
        ordered[key] = finalArray[key];
      });
      sortDirection[sortField] = 'desc';
      setSortDirection(sortDirection);
    } else {
      Object.keys(finalArray).sort().reverse().forEach(function(key) {
        ordered[`${key}a`] = finalArray[key];
      });
      sortDirection[sortField] = 'asc';
      setSortDirection(sortDirection);
    }

    // Added to cells array

    Object.values(ordered).forEach((item) => {
        item.forEach(item1 => sortedArray.push(item1));
    })
    // console.log(sortedArray);

    setTable({...props.table , cells: sortedArray})
  }

  // Filter search with render items

  if (search && rowsSearch.length > 0) {
    for (let i = 0; i < cells.length; i += 1) {
      const j = i;
      const { row } = cells[i];

      if (rowsSearch.includes(parseInt(row))) {
        arr.push(<TableCellBody item={cells[i]} key={i}/>);
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

        arr.push(<TableCellBody item={cells[i]} key={i}/>);
        if (i === cells.length - 1) {
          newCells.push(<tr row={row} key={i}>{arr}</tr>);
        } else if (row !== cells[1 + j].row) {
          newCells.push(<tr row={row} key={i}>{arr}</tr>);
          arr = [];
        }
      }
  }

  const currentList = newCells.slice(indexFirst, indexLast);

  for(let i = 1; i <= Math.ceil(newCells.length/perPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={parseInt(currentPage) === number ? 'active' : null}
      id={number}
      onClick={({ target: { id } }) => setCurrentPage(id)}
    >
      {number}
    </li>
  ));

  return (
    <>
    <h1>{table_name}</h1>
    <table id="info">
      <thead>
        <tr row="0">
          {header_cells.map((item,key) => <TableCellHead item={item} onSort={onSort} key={key}/>)}
        </tr>
      </thead>
      <tbody>
        {currentList}
      </tbody>
    </table>
    <ul className="pagination">
      {renderPageNumbers || null}
    </ul>
    </>
  );
}
export default Table;
