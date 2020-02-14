import React from 'react';
import ReactTooltip from 'react-tooltip';

function Header() {
  return (
    <header>
      <img src="https://core.opentext.com/img/app/profile-default-lrg.png" alt="" data-tip="Andrii Maruniak" />
      <ReactTooltip />
    </header>
  );
}
export default Header;
