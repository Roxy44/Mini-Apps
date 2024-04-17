import React, { useEffect, useRef, useState } from 'react';

import { Button, Checkbox, Select, Slider, message } from 'antd';
import { DownOutlined, LeftOutlined, RightOutlined, SettingOutlined, UpOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import Chart from 'chart.js/auto';

import { GraphDataType } from '../../types';

import './Tabs.less';

const GraphsTab = () => {
    const [graphType, setGraphType] = useState('straight');
    const [graphData, setGraphData] = useState<GraphDataType>({} as GraphDataType);
    const [isConfigure, setIsConfigure] = useState(false);

    const [color, setColor] = useState('black');
    const [tension, setTension] = useState(0);
    const [filled, setFilled] = useState(false);
    const [vertical, setVertical] = useState(0);
    const [horizontal, setHorizontal] = useState(0);
 
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const functionValue: { x: number, y: number }[] = [];

        for (let i = -10; i <= 10; i++) functionValue.push({x: i, y: i});
 
        setGraphData({
            labels: [...Array(21)].map((_, index: number) => index - 10),
            datasets: [
                {
                    label: 'Graph of the straight function',
                    data: functionValue,
                    borderColor: color,
                    tension
                },
                {
                    label: 'X',
                    data: [ {x: -10, y: 0}, {x: 10, y: 0} ],
                    borderColor: 'orange',
                },
                {
                    label: 'Y',
                    data: [ {x: 0, y: -10}, {x: 0, y: 10} ],
                    borderColor: 'red',
                },
            ]
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
        const functionValue: { x: number, y: number }[] = [];

        for (let i = -5; i <= 5; i++) {
            let y = 0;
            switch (graphType)  {
            case 'straight': y = i + vertical; break;
            case 'parabola': y = (i * i) + vertical; break;
            case 'hyperbola': y = i ? 1 / i : 0 + vertical; break;
            case 'sinus': y = Math.sin(i) + vertical; break;
            case 'cosinus': y = Math.cos(i) + vertical; break;
            default: message.error('Something went wrong'); break;
            }

            functionValue.push({x: i + horizontal, y});
        }

        setGraphData({
            labels: [...Array(21)].map((_, index: number) => index - 10),
            datasets: [
                {
                    label: `Graph of the ${graphType} function`,
                    data: functionValue,
                    fill: filled,
                    borderColor: color,
                    tension
                },
                {
                    label: 'X',
                    data: [ {x: -10, y: 0}, {x: 10, y: 0} ],
                    borderColor: 'orange',
                },
                {
                    label: 'Y',
                    data: [ {x: 0, y: -10}, {x: 0, y: 10} ],
                    borderColor: 'red',
                },
            ]
        });
    }, [graphType, color, tension, filled, vertical, horizontal]);

    return (
        <div className='graphs-tab-container'>
            <div className='graph-data-buttons'>
                <div className='graph-type-select'>
                    <Select 
                        defaultValue='straight'
                        onChange={(value: string) => setGraphType(value)}
                        options={[
                            { value: 'straight', label: 'Straight' },
                            { value: 'parabola', label: 'Parabola' },
                            { value: 'hyperbola', label: 'Hyperbola' },
                            { value: 'sinus', label: 'Sinus' },
                            { value: 'cosinus', label: 'Cosinus' },
                        ]}
                    />
                </div>
                <div className='graph-configure-button'>
                    <Button icon={<SettingOutlined />} onClick={() => setIsConfigure(!isConfigure)} />
                </div>
            </div>
            <div className='graph-data-block' style={{display: isConfigure ? 'flex' : 'none'}}>
                <div className='graph-data-coniguration'>
                    <div>
                        <span>Color</span>
                        <input type='color' value={color} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)} />
                    </div>
                    <div>
                        <span>Tension</span>
                        <Slider className='slider' defaultValue={3} min={1} max={100} onChange={(value: number) => setTension(value / 100)} />
                    </div>
                    <div>
                        <span>Fill graph</span>
                        <Checkbox onChange={(e: CheckboxChangeEvent) => setFilled(e.target.checked)} />
                    </div>
                </div>
                <div className='graph-movement'>
                    <span>Movement</span>
                    <div>
                        <div className='up'>
                            <Button icon={<UpOutlined />} onClick={() => setVertical(vertical + 1)} />
                        </div>
                        <div className='left_right'>
                            <Button icon={<LeftOutlined />} onClick={() => setHorizontal(horizontal - 1)} />
                            <div />
                            <Button icon={<RightOutlined />} onClick={() => setHorizontal(horizontal + 1)}/>
                        </div>
                        <div className='down'>
                            <Button icon={<DownOutlined />} onClick={() => setVertical(vertical - 1)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='graphs-block'>
                <canvas ref={canvas} />
            </div>
        </div>
    );
};

export default GraphsTab;