import React, { useEffect, useRef, useState } from 'react';

import { Button, Form, Input, InputNumber, Radio, message } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import Chart, { ChartType } from 'chart.js/auto';

import './Tabs.less';

const ChartsTab = () => {

    const colorDictionary = [
        'rgb(255, 99, 132, 0.2)',
        'rgb(255, 159, 64, 0.2)',
        'rgb(255, 205, 86, 0.2)',
        'rgb(75, 192, 192, 0.2)',
        'rgb(43, 202, 255, 0.2)',
        'rgb(54, 162, 235, 0.2)',
        'rgb(153, 102, 255, 0.2)',
        'rgb(201, 203, 207, 0.2)',
        'rgb(0, 0, 0, 0.4)',
        'rgb(139, 69, 19, 0.2)',
    ];

    const borderColorDictionary = [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(43, 202, 255)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(0, 0, 0)',
        'rgb(139, 69, 19)',
    ];

    const [dataSetCounter, changeDataSetCounter] = useState(1);
    const [dataSet, setDataSet] = useState([...Array(1)]);
    const [chartData, setChartData] = useState<any>([]);
    const [chartType, setChartType] = useState<ChartType>('bar');
    const [isConfigure, setIsConfigure] = useState(false);

    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvas.current) {
            const chart = new Chart(canvas.current, {
                type: chartType,
                data: chartData,
            });
            return () => {
                chart.destroy();
            };
        }
    }, [chartData, chartType]);

    const onFinish = (data: any) => {
        const labels: string[] = [];
        const values: number[] = [];
      
        for (const value in data) {
            if (value.includes('name')) {
                labels.push(data[value]);
            } else {
                values.push(data[value]); 
            }
        }
        
        setChartData({
            labels,
            datasets: [
                {
                    label: `Chart of the ${chartType} type`,
                    data: values,
                    backgroundColor: [...Array(dataSetCounter)].map((_, index: number) => colorDictionary[index]),
                    borderColor: [...Array(dataSetCounter)].map((_, index: number) => borderColorDictionary[index]),
                    borderWidth: 1
                },
            ]
        });
        
        setIsConfigure(true);
    };

    return (
        <div className='charts-tab-container'>
            <div className='charts-block' style={{display: isConfigure ? 'flex': 'none'}}>
                <div className='chart-data-type'>
                    <span>Chart type</span>
                    <Radio.Group 
                        options={
                            [
                                { label: 'Bar', value: 'bar' },
                                { label: 'Pie', value: 'doughnut' },
                                { label: 'Sector', value: 'polarArea' },
                                { label: 'Radar', value: 'radar' },
                            ]
                        } 
                        onChange={(e: any) => setChartType(e.target.value)
                        } 
                        value={chartType} 
                    />
                </div>
                <canvas ref={canvas} />
                <div className='return-button'>
                    <Button type='primary' onClick={() => setIsConfigure(false)}>Return</Button>
                </div>
            </div>
            <Form 
                style={{display: isConfigure ? 'none': 'block'}}
                className='chart-data-block' 
                autoComplete='off' 
                onFinish={onFinish}
            >
                <div className='chart-data-buttons'>
                    <Button type='primary' icon={<PlusOutlined />} onClick={() => {
                        if (dataSetCounter < 10) {
                            changeDataSetCounter(dataSetCounter + 1);
                            setDataSet([...dataSet, undefined]);
                        } else message.error('You reach the limit of data set (max 10)');
                    }}/>
                    <Button type='primary' htmlType='submit'>Calculate</Button>
                </div>
                <div className='chart-data-set'>
                    {
                        ...dataSet.map((_, index: number) => (
                            <div>
                                <Form.Item 
                                    label={`Name${index + 1}`} 
                                    name={`name${index + 1}`} 
                                    rules={[{ required: true, message: 'Please input field name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item 
                                    label={`Value${index + 1}`} 
                                    name={`value${index + 1}`} 
                                    rules={[{ required: true, type: 'number', message: 'Please input field value! (Only numbers)' }]}
                                >
                                    <InputNumber />
                                </Form.Item>
                            </div> 
                        ))
                    }
                </div>
            </Form>
        </div>
    );
};

export default ChartsTab;