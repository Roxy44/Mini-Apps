import React from 'react';

import './HoverAndBlur.less';

const HoverAndBlur = () => {
    const board = [...Array(40)].map((_, rowIndex: number) => (
        <div key={`row-${rowIndex}`} className='square-row'>
            {[...Array(40)].map((_, colIndex: number) => (
                <div key={`col-${rowIndex-colIndex}`} className='square' />
            ))}
        </div>
    ));

    return (
        <div className='hab-container'>
            {board}
        </div>
    );  
};

export default HoverAndBlur;