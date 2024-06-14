import React, { useEffect, useState } from 'react';

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

    const imageUrls = [
        '4e665c9f5cf7c3c0f012.webp',
        '205f0a7dc454968f7bb2.webp',
        'b85d140a455a90bb7265.webp',
        'fe738ed61d08c3612abf.webp',
        '63d31799f5f6b6a6ff98.webp' 
    ];

    const [currentBG, setCurrentBG] = useState(backgroundDictionary.indexOf(background_page_theme));

    useEffect(() => {
        preloadImages(imageUrls, (images: any) => {
            console.log('All images were loaded!');
        });
    }, []);

    // Function of pre-load images 
    function preloadImages(urls: string[], allImagesLoadedCallback: any ) {
        let loadedCounter = 0;
        const toBeLoadedNumber = urls.length;
        const images: any[] = [];
    
        urls.forEach((url: string, index: number) => {
            images[index] = new Image();
            images[index].src = url;
            images[index].onload = () => {
                loadedCounter++;
                if (loadedCounter === toBeLoadedNumber) {
                    allImagesLoadedCallback(images);
                }
            };
            images[index].onerror = () => {
                loadedCounter++;
                if (loadedCounter === toBeLoadedNumber) {
                    allImagesLoadedCallback(images);
                }
            };
        });
    }
    
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