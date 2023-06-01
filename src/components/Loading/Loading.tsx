import React from 'react';
import logo from '../../images/icono-gris.svg';
import './loading.scss';

const Loading = () => {
    return (
        <div className="loading-container">
            <img src={logo} alt="Imagen" className="loading-imagen" />
            <p className="loading-parrafo">Se está cargando página, por favor espere...</p>
        </div>
    );
};

export default Loading;
