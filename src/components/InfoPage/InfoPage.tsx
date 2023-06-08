import React from 'react';
import logo from "../../images/logo.png";
import "./info-page.scss";

const InfoPage = ({ page }) => {
    let content;

    if (page === 1) {
        content = (
            <div>
                <img src={logo} alt="Bienvenido" className="index-imagen" />
                <div className="index-text">
                    <h2>¡¡¡Bienvenido a mi página de Bingo!!!</h2>
                    <p>
                        No dudes en disfrutar aquí tus partidas de Bingo en familia
                    </p>
                </div>
            </div>
        );
    } else if (page === 2) {
        content = (
            <div className="info-text">
                <h2>Reglas</h2>
                <h3>Reglas generales del Bingo</h3>
                <p>
                    El Bingo es un juego sencillo de azar y las reglas son bastante sencillas: cuentas con una lista de números entre todos tus cartones,
                    y el objetivo es conseguir tachar todos los números de una fila, o en caso de alguien ya haberlo conseguido, del cartón entero.
                </p>
                <h3>Como jugar al Bingo en la página</h3>
                <p>
                    Dirígete al lado derecho de la navbar y haz clic en <strong>Jugar al BINGO</strong> donde se te desplegarán dos opciones,
                    en caso de que dejaras una partida empezada deberás acceder a la opción de <strong>Cargar Partida</strong>, en caso contrario haz
                    clic en <strong>Nueva Partida</strong>, una vez allí seleccionaras el nombre de los jugadores que van a participar en la Partida junto con el
                    número de cartones que va a tener cada uno, una vez introducidos los datos nos llevará a una página con un <strong>código QR</strong> donde
                    podremos jugar con nuestros cartones desde el móvil. <br /><br />
                    La partida comenzará y se irán añadiendo números al bombo conforme se vaya avanzando, cuando se quiera
                    cantar <strong>Línea</strong> o <strong>Bingo</strong> se accederá al validador y se introducirá el cartón que se quiera validar, en caso
                    afirmativo el juego permitirála opción de seguir validando o continuar la partida hasta que esta termine.
                </p>
            </div>
        );
    } else if (page === 3) {
        content = (
            <div className="info-text">
                <h2>Información de la página</h2>
                <h3>Autoguardado</h3>
                <p>
                    Esta página lidia con muchos datos a la vez, por el bien de evitar problemas y malas experiencias si una página está cargandose se ruega
                    que se respeten los tiempos de carga necesarios, de este modo no habrá problemas y se podrá seguir disfrutando de la experiencia de RAH BINGO
                </p>
                <img src={logo} alt="Bienvenido" className="index-imagen" />
                <p>
                    <strong>Atentamente: el equipo RAH</strong> (Raúl Acín Herrero).
                </p>
            </div>
        );
    }

    return (
        <div>
            {content}
        </div>
    );
};

export default InfoPage;
