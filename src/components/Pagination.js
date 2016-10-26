import React from 'react';
import './Pagination.css';

const Pagination = ({offset, totalHits, clickHandler}) => {
  return (
    <div className='pagination'>
      <button 
        className='prevPage' 
        disabled={offset === 0}
        onClick={e => {clickHandler(-1)}}>
        Back
      </button>
      <p>{offset + 1} / {Math.ceil(totalHits / 10)}</p>
      <button 
        className='nextPage' 
        disabled={offset + 1 === Math.ceil(totalHits / 10)}
        onClick={e => {clickHandler(1)}}>
        More
      </button>
    </div>
  );
};

export default Pagination;
