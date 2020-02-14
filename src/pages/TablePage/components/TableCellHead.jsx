import React from 'react';

function TableCellHead(props) {
    const { row, column, data } = props.item;
    return(
        <th row={row} column={column} onClick={props.onSort.bind(null, `${column}`)}>{data}</th>
    );
}
export default TableCellHead;
