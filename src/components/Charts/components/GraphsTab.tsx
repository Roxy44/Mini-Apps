import React, { useEffect, useRef, useState } from 'react';

import { Button, Input, Select, message } from 'antd';

import Chart from 'chart.js/auto';

import './Tabs.less';

const GraphsTab = () => {

    const [graphType, setGraphType] = useState('straight');
    const [graphData, setGraphData] = useState<any>([{}]);

    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const functionValue: any = [];

        for (let i = -5; i <= 5; i++) functionValue.push({x: i, y: i});

        setGraphData({
            labels: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
            datasets: [{
                label: 'Graph of the straight function',
                data: functionValue,
                fill: false, // заполнить площадь под графиком
                borderColor: 'rgb(75, 192, 192)',
                tension: 0 // прямота линий
            }]
        });
    }, []);

    useEffect(() => {
        if (canvas.current) {
            const chart = new Chart(canvas.current, {
                type: 'line',
                data: graphData,
            });
            return () => {
                chart.destroy();
            };
        }
    }, [graphData]);

    useEffect(() => {
        const functionValue: any = [];
        let tension = -1;

        switch (graphType) 
        {
        case 'straight': 
            for (let i = -5; i <= 5; i++) functionValue.push({x: i, y: i});
            tension = 0;
            break;
        case 'parabola': 
            for (let i = -5; i <= 5; i++) functionValue.push({x: i, y: i * i});
            tension = 0.5;
            break;
        case 'hyperbola': 
            for (let i = -5; i <= 5; i++) functionValue.push({x: i, y: i ? 1 / i : 0});
            tension = 0.3;
            break;
        default: message.error('Something went wrong'); break;
        }

        setGraphData({
            labels: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
            datasets: [{
                label: `Graph of the ${graphType} function`,
                data: functionValue,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension
            }]
        });
    }, [graphType]);
 
    return (
        <div className='graphs-tab-container'>
            <div className='graph-data-block'>
                <div className='graph-data'></div>
                <div className='graph-type'>
                    <Select 
                        defaultValue='straight'
                        onChange={(value: string) => setGraphType(value)}
                        options={[
                            { value: 'straight', label: 'Straight' },
                            { value: 'parabola', label: 'Parabola' },
                            { value: 'hyperbola', label: 'Hyperbola' },
                        ]}
                    />
                </div>
            </div>
            <div className='graphs-block'>
                <canvas ref={canvas} />
            </div>
        </div>
    );
};

export default GraphsTab;