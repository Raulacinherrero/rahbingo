import React from 'react';

const ShowBoards = ({ serverData }: any) => {
  return (
    <div>
      {serverData.jugadorObjects}
    </div>
  );
};

export default ShowBoards;

export async function getServerData() {
    try {
        const jugadorObjects = localStorage.getItem('jugadorObjects');
      return {
        status: 200,
        props: {
            jugadorObjects: jugadorObjects,
        },
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        status: 500,
        props: {
          error: error,
        },
      };
    }
  }
  
