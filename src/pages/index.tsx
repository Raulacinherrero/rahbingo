import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import HowManyPlayers from '../components/HowManyPlayers/HowManyPlayers';
import { Link } from 'gatsby';

const IndexPage = () => {
  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      <Navbar />
      <HowManyPlayers />
      <Link to="/about">Ir a la página Acerca de</Link>
    </>
  );
};

export default IndexPage;
