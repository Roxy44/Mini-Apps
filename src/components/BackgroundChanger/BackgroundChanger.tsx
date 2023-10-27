import React, { useState } from 'react';

import { LeftOutlined, RightOutlined}  from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';

import { RootState } from '../../types';

import './BackgroundChanger.less';

const BackgroundChanger = () => {

    const dispatch = useDispatch();

    const { background_color_theme } = useSelector((state: RootState) => state.settings);

    const backgroundDictionary: string[] = [
        'menu-content-night',
        'menu-content-water',
        'menu-content-city',
        'menu-content-lightning',
        'menu-content-leaves',
    ];

    const [currentBG, setCurrentBG] = useState(backgroundDictionary.indexOf(background_color_theme));

    const onLeftArrowClick = () => {
        let background = '';
        if (backgroundDictionary[currentBG - 1]) {
            background = backgroundDictionary[currentBG - 1];
            setCurrentBG(currentBG - 1);
        } else {
            background = backgroundDictionary[backgroundDictionary.length - 1];
            setCurrentBG(backgroundDictionary.length - 1);
        }
        dispatch({ type: 'SET_BACKGROUND_COLOR_THEME', payload: background });
    };

    const onRightArrowClick = () => {
        let background = '';
        if (backgroundDictionary[currentBG + 1]) {
            background = backgroundDictionary[currentBG + 1];
            setCurrentBG(currentBG + 1);
        } else {
            background = backgroundDictionary[0];
            setCurrentBG(0);
        }
        dispatch({ type: 'SET_BACKGROUND_COLOR_THEME', payload: background });
    };


    return (
        <div className='bg-changer-container'>
            <div className='background-block'>
                <div className='background-button left-arrow'>
                    <Button icon={<LeftOutlined />} onClick={onLeftArrowClick} />
                </div>
                <div className={`background-image ${background_color_theme}`} />
                <div className='background-button right-arrow'>
                    <Button icon={<RightOutlined />} onClick={onRightArrowClick} />
                </div>
            </div>
            <div className='background-title'>{background_color_theme.split('-')[2]}</div>
        </div>
    );
};

export default BackgroundChanger;
