import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Table from './components/Table';
import Spinner from '../../components/spinner/spinner';
import Search from './components/Search';

function TablePage() {
  const [loading, setLoading] = useState(true);
  const [dataTable, setTable] = useState({});
  const [search, setSearch] = useState('');
  const [rowsSearch, setRowsSearch] = useState([]);
  const [sortDirection, setSortDirection] = useState({});

  useEffect(() => {
    const setTypeSort = (num) => {
      const obj = {};
      for (let i = 0; i < num; i += 1) {
        obj[i] = 'none';
      }
      setSortDirection(obj);
    };
    fetch('https://pacific-atoll-17322.herokuapp.com/?do=get')
      .then(res => res.json())
      .then(data => {
        setTable(data);
        setTypeSort(data.header_cells.length);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Header table={dataTable} />
      <Main>
        <Search
          search={search}
          table={dataTable.cells}
          setSearch={setSearch}
          setTable={setTable}
          setRowsSearch={setRowsSearch}
        />
        {!loading ? (
          <Table
            table={dataTable}
            setTable={setTable}
            search={search}
            rowsSearch={rowsSearch}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        ) : <Spinner />}
      </Main>
    </>
  );
}
export default TablePage;
