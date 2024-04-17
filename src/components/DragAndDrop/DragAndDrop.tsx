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
            onDragEnter={(e: React.DragEvent) => dragEnterHandler(e)} 
            onDragLeave={(e: React.DragEvent) => dragLeaveHandler(e)}    
            onDragOver={(e: React.DragEvent) => dragOverHandler(e)} 
            onDrop={(e: React.DragEvent) => dropHandler(e)}
        />
    ));

    const dragEnterHandler = (e: React.DragEvent) => {
        const target = e.target as HTMLElement;
        target.className += ' hovered';
    };

    const dragLeaveHandler = (e: React.DragEvent) => {
        const target = e.target as HTMLElement;
        target.className = 'drop-box';
        target.draggable = false;
    };

    const dragOverHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    };

    const dropHandler = (e: React.DragEvent) => {
        const target = e.target as HTMLElement;
        target.className = 'drop-box slime';
        target.draggable = true;      

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
        <div className='dragAndDrop-container'>
            <Modal 
                title='Warning' 
                open={isModalOpen} 
                onCancel={() => setIsModalOpen(false)}
                footer={null} 
            > 
                <span>Be careful! Sound files are used on this page, make sure that the sound volume is not maximum</span>
            </Modal>
            <Button type='primary' onClick={createHandler}>Create</Button>
            <div className='boxes'>
                {content}
            </div>
        </div>
    );
};

export default DragAndDrop;