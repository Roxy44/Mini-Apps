import React, { useEffect, useRef, useState } from 'react';

import { Button, Form, Input } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import Chart from 'chart.js/auto';

import './Tabs.less';

const ChartsTab = () => {

    const [dataSet, setDataSet] = useState([...Array(5)]);

    const [form] = Form.useForm();    

    const canvas = useRef<HTMLCanvasElement>(null);

    // useEffect(() => {
    //     const functionValue: any = [];

    //     for (let i = -10; i <= 10; i++) functionValue.push({x: i, y: i});
 
    //     setGraphData({
    //         labels: [...Array(21)].map((_, index: number) => index - 10),
    //         datasets: [
    //             {
    //                 label: 'Graph of the straight function',
    //                 data: functionValue,
    //                 borderColor: color,
    //                 tension
    //             },
    //         ]
    //     });
    // }, []);

    // useEffect(() => {
    //     if (canvas.current) {
    //         const chart = new Chart(canvas.current, {
    //             type: 'line',
    //             data: graphData,
    //         });
    //         return () => {
    //             chart.destroy();
    //         };
    //     }
    // }, [graphData]);
    
    // useEffect(() => {
    //     const functionValue: any = [];

    //     for (let i = -5; i <= 5; i++) {
    //         switch (graphType)  {
    //         case 'straight': 
    //             functionValue.push({x: i + horizontal, y: i + vertical});
    //             break;
    //         case 'parabola': 
    //             functionValue.push({x: i + horizontal, y: (i * i) + vertical});
    //             break;
    //         case 'hyperbola': 
    //             functionValue.push({x: i + horizontal, y: i ? 1 / i : 0 + vertical});
    //             break;
    //         case 'sinus': 
    //             functionValue.push({x: i + horizontal, y: Math.sin(i) + vertical});
    //             break;
    //         case 'cosinus': 
    //             functionValue.push({x: i + horizontal, y: Math.cos(i) + vertical});
    //             break;
    //         default: message.error('Something went wrong'); break;
    //         }
    //     }

    //     setGraphData({
    //         labels: [...Array(21)].map((_, index: number) => index - 10),
    //         datasets: [
    //             {
    //                 label: `Graph of the ${graphType} function`,
    //                 data: functionValue,
    //                 fill: filled,
    //                 borderColor: color,
    //                 tension
    //             },
    //             {
    //                 label: 'X',
    //                 data: [ {x: -10, y: 0}, {x: 10, y: 0} ],
    //                 borderColor: 'orange',
    //             },
    //             {
    //                 label: 'Y',
    //                 data: [ {x: 0, y: -10}, {x: 0, y: 10} ],
    //                 borderColor: 'red',
    //             },
    //         ]
    //     });
    // }, [graphType, color, tension, filled, vertical, horizontal]);

    const onFinish = (data: any) => {
        console.log(data);
    };

    return (
        <div className='charts-tab-container'>
            <div className='charts-data-block'>
                <div className='chart-data'>
                    <Button type='primary' icon={<PlusOutlined />} onClick={() => setDataSet([...dataSet, undefined])} />
                    
                    <Form
                        className='chart-data-set'
                        form={form}
                        autoComplete='off'
                        onFinish={onFinish}
                    >
                        {
                            ...dataSet.map((_, index: number) => (
                                <div>
                                    <Form.Item label={`Name${index}`}><Input /></Form.Item>
                                    <Form.Item label={`Value${index}`}><Input /></Form.Item>
                                </div> 
                            ))
                        }
                    </Form>
                </div>

                <Button type='primary' htmlType='submit'>Calculate</Button>
            </div>
            <div className='charts-block'>
                <canvas ref={canvas} />
            </div>
        </div>
    );
};

export default ChartsTab;
