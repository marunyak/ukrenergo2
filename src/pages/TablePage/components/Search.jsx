import React from "react";

function Search(props) {
    const dataSearch = e => {
        const arr = [];
        const value = e.target.value.toLocaleLowerCase();
        props.table.filter(({ row, data, type }) => {
            if (type === 'string') {
                if (value !== '' && data.toLocaleLowerCase().search(new RegExp(`^${value}`,'g'))!== -1) {
                  arr.push(parseInt(row));
                  return true;
                }
            } else if (type === 'number' && parseInt(data) === parseInt(value)) {
                arr.push(parseInt(row));
                return true;
            }
            return false;
        });
        props.setRowsSearch(arr ? [...new Set(arr)] : []);
        props.setSearch(value);
    }

    return(
        <div className="search">
            <input type="text" name="search" placeholder="Search..." value={props.search} onChange={dataSearch}/>
        </div>
    );
}
export default Search;
