import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';

import './navbar.scss';

function Navbar({ initialVisible }) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(initialVisible);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedLink] = useState('');

  useEffect(() => {
    setIsNavbarVisible(initialVisible);
  }, [initialVisible]);

  const handleToggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
    setIsDropdownVisible(false);
  };

  return (
    <>
      <nav className={`navbar ${isNavbarVisible ? '' : 'navbar-hidden'}`}>
        <div className="logo-container">
          <a className="logo-link" href="/">
            <div className="logo" />
            <div className="title">RAH Bingo</div>
          </a>
        </div>
        <ul>
          <li>
            <Link to='/rules' className="link" >
              Reglas
            </Link>
          </li>
          <li>
            <Link to='/settings' className="link" >
              Opciones
            </Link>
          </li>
          <li>
            <span className="tercer-link" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
              Jugar al BINGO
            </span>
            <div className={`dropdown ${isDropdownVisible ? '' : 'dropdown-hidden'}`}>
              <Link to="/players" className="dropdown-link">
                Nueva Partida
              </Link>
              <Link to="/loader" className="dropdown-link">
                Cargar Partida
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <button className="toggle-button" onClick={handleToggleNavbar}>
        <FontAwesomeIcon icon={faArrowDown} className={`arrow-icon ${isNavbarVisible ? 'up' : ''}`} />
      </button>
      {selectedLink && <div className="selected-link">{selectedLink}</div>}
    </>
  );
}

export default Navbar;
