/* eslint-disable react/prop-types */
import React from 'react';

function TableCellBody({
  item: {
    row, column, data, is_mutable: isMutable, type
  }, onChangeHandler, onBlur, autoFocus
}) {
  let newData;

  if (isMutable) {
    if (type === 'boolean') {
      if (data) {
        newData = <input type="checkbox" onChange={onChangeHandler.bind(null)} defaultChecked />;
      } else {
        newData = <input type="checkbox" onChange={onChangeHandler.bind(null)} />;
      }
    } else {
      newData = (
        <input
          type={type === 'string' ? 'text' : 'number'}
          onChange={onChangeHandler.bind(null)}
          ref={input => (input && Object.keys(autoFocus).length > 0 && parseInt(autoFocus.autofocus_row) === row && parseInt(autoFocus.autofocus_column) === column ? input.focus() : '')}
          onBlur={onBlur.bind(null)}
          value={data}
        />
      );
    }
  } else newData = data;

  return (
    <td column={column} type={type} key={Date.now().toString()}>{newData}</td>
  );
}
export default TableCellBody;
