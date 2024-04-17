import React, { useState } from 'react';

import { Input } from 'antd';

import './Randomizer.less';

const Randomizer = () => {
    const { TextArea } = Input;

    const [textString, setTextString] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');

    const onChangeHandler = (textAreaString: string) => {
        if (textAreaString[textAreaString.length - 1] !== ',' && textAreaString[textAreaString.length - 1] !== ' ') {
            setTextString(textAreaString);
        }
        setTextAreaValue(textAreaString);
    };

    const onPressEnterHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();

        setTextAreaValue('');

        if (textString === '') {
            return;
        }

        document.querySelector('.highlight')?.classList.remove('highlight');
        
        const times = 10;
        const textarea = document.querySelector('textarea');

        if (textarea) {
            textarea.disabled = true;
        }

        const interval = setInterval(() => {
            const randomItem = pickRandomItem();

            highlightItem(randomItem);

            setTimeout(() => {
                unHighlightItem(randomItem);
            }, 100);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);

            setTimeout(() => {
                const randomItem = pickRandomItem();

                highlightItem(randomItem);
            }, 100);

            if (textarea) {
                textarea.disabled = false;
                textarea.focus();
            }

        }, times * 100);
    };

    const pickRandomItem = () => {
        const item = document.querySelectorAll('.random-item');

        return item[Math.floor(Math.random() * item.length)];
    };
    
    const highlightItem = (item: { classList: { add: (className: string) => void } }) => {
        item.classList.add('highlight');
    };
    
    const unHighlightItem = (item: { classList: { remove: (className: string) => void } }) => {
        item.classList.remove('highlight');
    };

    return (
        <div className='random_org-container'>
            <div className='random_org-title'>
                <span>Enter all of the choices divided by a comma (',').
                Press enter when you're done (also to repeat)</span>
            </div>

            <TextArea 
                className='random_org-input' 
                placeholder='Enter choices here...' 
                value={textAreaValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeHandler(e.target.value)} 
                onPressEnter={(e: React.KeyboardEvent<HTMLTextAreaElement>) => onPressEnterHandler(e)}
            />

            {textString !== '' &&
                <div className='random_org-block'>
                    {textString.split(',').map((item: string, index: number) => (
                        <span key={`random-item-${index}`} className='random-item'>{item}</span>
                    ))}
                </div>
            }
        </div>
    );
};

export default Randomizer;