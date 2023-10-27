import React, { useEffect, useState } from 'react';
import moment from 'moment';

import './Clocks.less';

const Clocks = () => {

    const [timeNow, setTime] = useState(''); 
    const [dateNow, setDate] = useState('');

    useEffect(() => {
        getData();
    }, []);    

    const scale = (num: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    };

    const getData = () => {
        setDate(moment().format('dddd,MMM,DD'));
        setTime(moment().format('h:mm'));

        const hoursHand = document.getElementById('hours-hand')?.style;
        const minutesHand = document.getElementById('minutes-hand')?.style;
        const secondsHand = document.getElementById('seconds-hand')?.style;

        setInterval(() => {
            const time = moment().format('h:mm:ss');
            
            if (hoursHand && minutesHand && secondsHand) {
                hoursHand.transform = `rotate(${scale(Number(time.split(':')[0]), 0, 11, 0, 360)}deg)`;
                minutesHand.transform = `rotate(${scale(Number(time.split(':')[1]), 0, 59, 0, 360)}deg)`;
                secondsHand.transform = `rotate(${scale(Number(time.split(':')[2]), 0, 59, 0, 360)}deg)`;
            }
            
            if (Number(time.split(':')[2]) >= 59) {
                setTimeout(() => setTime(moment().format('h:mm')), 2000);
            }
        }, 1000);
    };

    return (
        <div className='clocks-container'>
            <div className='clocks-block'>
                <div className='clocks'>
                    <div id='hours-hand'>
                        <div className='hours hands'></div>
                    </div>
                    <div id='minutes-hand'>
                        <div className='minutes hands'></div>
                    </div>
                    <div id='seconds-hand'>
                        <div className='seconds hands'></div>
                    </div>
                    <div className='center'>
                        <div className='small-circle'></div>
                    </div>
                </div> 
            </div>
            <div className='time-block'>
                {timeNow + (timeNow.split(':')[0] > '12' ? ' PM' : ' AM')}
            </div>
            <div className='date-block'>
                {(dateNow.split(',')[0]) + ', ' + (dateNow.split(',')[1])}
                <span>{dateNow.split(',')[2]}</span>
            </div>
        </div>
    );
};

export default Clocks;