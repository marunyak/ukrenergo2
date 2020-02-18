/* eslint-disable react/prop-types */
import React from 'react';

function TableCellHead({ item: { row, column, data }, onSort }) {
  return (
    <th row={row} column={column} onClick={onSort.bind(null, column)}>{data}</th>
  );
}
export default TableCellHead;
