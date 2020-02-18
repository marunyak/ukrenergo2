import React from 'react';
import ReactTooltip from 'react-tooltip';

function Header({ table }) {
  const save = () => {
    fetch('https://pacific-atoll-17322.herokuapp.com', {
      method: 'POST',
      body: JSON.stringify(table),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        console.log('Table was Saved');
      })
      .catch(err => console.error(err));
  };

  return (
    <header>
      <div className="save" onClick={save}>Save</div>
      <div>
        <img src="https://core.opentext.com/img/app/profile-default-lrg.png" alt="" data-tip="Andrii Maruniak" />
      </div>
      <ReactTooltip />
    </header>
  );
}
export default Header;
