import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ShowWinners from '../components/ShowWinners/ShowWinners';
import Loading from '../components/Loading/Loading';
import { obtenerDatosDocumento } from '../firebase';

const Winners = () => {
    const [idPartida, setIdPartida] = useState('');
    const [DatosPartida, setDatosPartida] = useState(null);
    const [ListaJugadores, setListaJugadores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idPartida = localStorage.getItem('idPartida') || '';
                setIdPartida(idPartida);

                const datosPartida = await obtenerDatosDocumento('DatosPartida', idPartida);
                if (datosPartida !== null) {
                    const { ListaJugadores, ...rest } = datosPartida;

                    if (ListaJugadores) {
                        const jugadoresData = [];
                        for (const idJugador of ListaJugadores) {
                            const datosJugador = await obtenerDatosDocumento('ListaJugadores', idJugador);
                            if (datosJugador && datosJugador.CartonesJugador) {
                                const idCartones = datosJugador.CartonesJugador;
                                const cartonesJugador = await Promise.all(
                                    idCartones.map(async (idCarton) => {
                                        return await obtenerDatosDocumento('CartonesJugador', idCarton);
                                    })
                                );
                                jugadoresData.push({ ...datosJugador, CartonesJugador: cartonesJugador });
                            }
                        }
                        setListaJugadores(jugadoresData);
                        setDatosPartida({ ...rest, ListaJugadores: jugadoresData });
                    } else {
                        setDatosPartida({ ...rest });
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <title>Bingo Offline | RAH Final 2ºDAW</title>
            <Navbar initialVisible={false} />
            {DatosPartida && DatosPartida.ListaJugadores ? (
                <ShowWinners DatosPartida={DatosPartida} />
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Winners;
