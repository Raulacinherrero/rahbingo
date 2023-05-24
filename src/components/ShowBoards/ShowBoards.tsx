import React from 'react';

const ShowBoards = ({ jugadorObjects }: any) => {
  return (
    <div>
      {JSON.stringify(jugadorObjects, null, 2)}
    </div>
  );
};

export default ShowBoards;
