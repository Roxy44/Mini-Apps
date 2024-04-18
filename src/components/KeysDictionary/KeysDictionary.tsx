import React, { useEffect, useState } from 'react';

import './KeysDictionary.less';

const KeysDictionary = () => {
    const [eventKey, setEventKey] = useState('');
    const [eventKeyCode, setEventKeyCode] = useState('');
    const [eventCode, setEventCode] = useState('');

    useEffect(() => {
        document.getElementById('wonna-get-focus')?.focus();
    }, []);
    
    const keyPressHandler = (event: any) => {        
        setEventKey(event.key === ' ' ? 'Space' : event.key);
        setEventKeyCode(event.keyCode);
        setEventCode(event.code);
    };

    return (
        <div id='wonna-get-focus' className='keys-dictionary-container' tabIndex={-1} onKeyDown={keyPressHandler}>
            <span className='events-title'>Press any key on your keyboard</span>
            <div className='events-container'>
                <div className='event-key'>
                    <span className='event-label'>Key</span>
                    <div className='event-content'>{eventKey}</div>
                </div>
                <div className='event-key-code'>
                    <span className='event-label'>KeyCode</span>
                    <div className='event-content'>{eventKeyCode}</div>
                </div>
                <div className='event-code'>
                    <span className='event-label'>Code</span>
                    <div className='event-content'>{eventCode}</div>
                </div>
            </div>
        </div>
    );
};

export default KeysDictionary;