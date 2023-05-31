import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import LoaderForm from '../components/LoaderForm/LoaderForm';

const LoadMatch = () => {
  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      <Navbar initialVisible={true} />
      <LoaderForm />
    </>
  );
};

export default LoadMatch;
