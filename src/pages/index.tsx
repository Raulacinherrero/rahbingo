import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import InfoPage from '../components/InfoPage/InfoPage';

const IndexPage = () => {
  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      <Navbar initialVisible={true} />
      <InfoPage page={1} />
    </>
  );
};

export default IndexPage;
