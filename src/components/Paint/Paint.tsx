import React, { useState } from 'react';

import { Button } from 'antd';

import './Paint.less';

const Paint = () => {
    const [color, setColor] = useState('black');
    const [brushSize, setBrushSize] = useState(2);
    const [isPressed, setIsPressed] = useState(false);
    const [x, setX] = useState<any>();
    const [y, setY] = useState<any>();

    const canvas: any = document.getElementById('canvas');
    const ctx = canvas?.getContext('2d');

    const mouseDownHandler = (e: any) => {
        setIsPressed(true);
    };

    const mouseMoveHandler = (e: any) => {
        if (isPressed) {
            drawCircle();
            setX(e.nativeEvent.offsetX / (3.5 - (e.nativeEvent.offsetX / 4200)));
            setY(e.nativeEvent.offsetY / (3.5 - (e.nativeEvent.offsetY / 1200)));
        }
    };

    const mouseUpHandler = () => {
        setIsPressed(false);
        setX(undefined);
        setY(undefined);
    };

    const drawCircle = () => {
        if (ctx) {
            ctx.beginPath();
            ctx.arc(x, y, brushSize, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        };
    };
    
    return (
        <div className='paint-container'>
            <canvas 
                id='canvas'
                className='paint-drawing-block' 
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMoveHandler}
                onMouseUp={mouseUpHandler}
            />
            <div className='paint-menu-block'>
                <div className='block-items'>
                    <Button className='button-sub' title='decrease size' onClick={() => (brushSize !== 2 && setBrushSize(brushSize - 1))}>-</Button>
                    <span>{brushSize}</span>
                    <Button className='button-add' title='increase size' onClick={() => (brushSize !== 5 && setBrushSize(brushSize + 1))}>+</Button>
                    <input type='color' value={color} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)} />
                </div>
                <Button className='button-clear' title='clear' onClick={() => (ctx.clearRect(0,0, canvas.width, canvas.height))}>X</Button>
            </div>
        </div>
    );
};

export default Paint;
