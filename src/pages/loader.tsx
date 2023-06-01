import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import LoaderForm from '../components/LoaderForm/LoaderForm';

const Loader = () => {
  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      <Navbar initialVisible={true} />
      <LoaderForm />
    </>
  );
};

export default Loader;
