import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';
import { LeftOutlined, RightOutlined}  from '@ant-design/icons';

import { RootState } from '../types';

import './BackgroundChanger.less';

const BackgroundChanger = () => {
    const dispatch = useDispatch();

    const { background_page_theme } = useSelector((state: RootState) => state.settings);

    const backgroundDictionary: string[] = [
        'page-content-night',
        'page-content-water',
        'page-content-city',
        'page-content-lightning',
        'page-content-leaves',
    ];

    const [currentBG, setCurrentBG] = useState(backgroundDictionary.indexOf(background_page_theme));

    const onLeftArrowClick = () => {
        const backgroundIndex = backgroundDictionary[currentBG - 1] ? (currentBG - 1) : (backgroundDictionary.length - 1);
        setCurrentBG(backgroundIndex);
        dispatch({ type: 'SET_BACKGROUND_PAGE_THEME', payload: backgroundDictionary[backgroundIndex] });
    };

    const onRightArrowClick = () => {
        const backgroundIndex = backgroundDictionary[currentBG + 1] ? (currentBG + 1) : 0;
        setCurrentBG(backgroundIndex);
        dispatch({ type: 'SET_BACKGROUND_PAGE_THEME', payload: backgroundDictionary[backgroundIndex] });
    };

    return (
        <div className='bg-changer-container'>
            <div className='background-block'>
                <div className='background-button left-arrow'>
                    <Button icon={<LeftOutlined />} onClick={onLeftArrowClick} />
                </div>
                <div className={`background-image ${background_page_theme}`} />
                <div className='background-button right-arrow'>
                    <Button icon={<RightOutlined />} onClick={onRightArrowClick} />
                </div>
            </div>
            <div className='background-title'>{background_page_theme.split('-')[2]}</div>
        </div>
    );
};

export default BackgroundChanger;