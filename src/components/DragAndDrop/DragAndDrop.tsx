import React, { useState } from 'react';

import { Button, Modal } from 'antd';

import jumpSound from '../../resources/DragAndDrop/sound.mp3';

import './DragAndDrop.less';

const DragAndDrop = () => {

    const [isModalOpen, setIsModalOpen] = useState(true);

    const content = [...Array(5)].map((_, colIndex: number) => (
        <div key={`col-${colIndex}`} 
            id={colIndex === 0 ? 'the-first-one' : 'box'}
            className={colIndex === 0 ? 'drop-box slime' : 'drop-box'}
            draggable={colIndex === 0 ? true : false}
            onDragEnter={(e: any) => dragEnterHandler(e)} 
            onDragLeave={(e: any) => dragLeaveHandler(e)}    
            onDragOver={(e: any) => dragOverHandler(e)} 
            onDrop={(e: any) => dropHandler(e)}
        />
    ));

    const dragEnterHandler = (e: any) => {
        e.target.className += ' hovered';
    };

    const dragLeaveHandler = (e: any) => {
        e.target.className = 'drop-box';
        e.target.draggable = false;
    };

    const dragOverHandler = (e: any) => {
        e.preventDefault();
    };

    const dropHandler = (e: any) => {
        e.target.className = 'drop-box slime';
        e.target.draggable = true;      

        const sound = new Audio(jumpSound);
        sound.play(); 
    };

    const createHandler = () => {
        const firstBox = document.getElementById('the-first-one');

        if (firstBox && !firstBox?.className.includes('slime')) {
            firstBox.className += ' slime';
            firstBox.draggable = true;
        }
    }; 

    return (
        <div className='dad-container'>
            <Modal 
                title='Warning' 
                open={isModalOpen} 
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <Button type='primary' onClick={() => setIsModalOpen(false)}>OK</Button>
                } 
            > 
                <span>Be careful! Sound files are used on this page, make sure that the sound volume is not maximum</span>
            </Modal>
            <Button style={{border: '1px solid black'}} type='primary' onClick={createHandler}>Create</Button>
            <div className='boxes'>
                {content}
            </div>
        </div>
    );
};

export default DragAndDrop;
