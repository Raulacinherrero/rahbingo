import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import './navbar.scss';

function Navbar() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedLink] = useState('');

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
                        <div className="title">RAH Bingo Offline</div>
                    </a>
                </div>
                <ul>
                    <li>
                        <a className="link" href="#">
                            Reglas
                        </a>
                    </li>
                    <li>
                        <a className="link" href="#">
                            Opciones
                        </a>
                    </li>
                    <li>
                        <span className="tercer-link" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                            Jugar al BINGO
                        </span>
                        <div className={`dropdown ${isDropdownVisible ? '' : 'dropdown-hidden'}`}>
                            <a className="dropdown-link" href="#">
                                Nueva Partida
                            </a>
                            <a className="dropdown-link" href="#">
                                Cargar Partida
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            <button className="toggle-button" onClick={handleToggleNavbar}>
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className={`arrow-icon ${isNavbarVisible ? 'up' : ''}`}
                />
            </button>
            {selectedLink && <div className="selected-link">{selectedLink}</div>}
        </>
    );
}

export default Navbar;
