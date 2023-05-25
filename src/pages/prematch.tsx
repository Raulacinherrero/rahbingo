import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ShowBoards from '../components/ShowBoards/ShowBoards';
import SliderBoards from '../components/SliderBoards/SliderBoards';

const PreMatch = () => {
  const [jugadorObjects, setJugadorObjects] = useState([]);

  useEffect(() => {
    const fetchJugadorObjects = () => {
      try {
        const jugadorObjectsString = localStorage.getItem('jugadorObjects');
        const jugadorObjects = jugadorObjectsString ? JSON.parse(jugadorObjectsString) : [];
        setJugadorObjects(jugadorObjects);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchJugadorObjects();
  }, []);

  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      <Navbar />
      {/* <SliderBoards jugadorObjects={jugadorObjects} /> */}
      <ShowBoards jugadorObjects={jugadorObjects} />
    </>
  );
};

export default PreMatch;
