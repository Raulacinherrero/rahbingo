import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import InfoPage from '../components/InfoPage/InfoPage';

const Rules = () => {
  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      <Navbar initialVisible={true} />
      <InfoPage page={2} />
    </>
  );
};

export default Rules;
