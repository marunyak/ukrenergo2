import React from 'react';

function TableCellBody({item: {
    row, column, data, is_mutable, type
  }}) {
    let newData;
    if (type === 'boolean') {
      newData = data ? <input type="checkbox" defaultChecked /> : <input type="checkbox" />;
    } else newData = data;
    return(
        <td column={column} type={type} is_mutable={is_mutable.toString()} key={Date.now().toString()}>{newData}</td>
    );
}
export default TableCellBody;
