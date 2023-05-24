import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import HowManyPlayers from '../components/HowManyPlayers/HowManyPlayers';
import { Link } from 'gatsby';

const Players = () => {
  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      <Navbar />
      <HowManyPlayers />
      <Link to="/prematch" >Nueva Partida</Link>
    </>
  );
};

export default Players;
