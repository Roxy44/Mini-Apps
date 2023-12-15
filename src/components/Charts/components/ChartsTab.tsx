import React from 'react';

import { Button, Table } from 'antd';

import './Tabs.less';

const ChartsTab = () => {
    return (
        <div className='charts-tab-container'>
            <div className='charts-data-block'>
                <div className='chart-data'>
                    <div className='data-add-row'>
                        <Button></Button>
                    </div>
                    <Table />
                    <div className='data-add-col'>
                        <Button></Button>
                    </div>
                </div>
                <div className='chart-calc-button'>
                    <Button></Button>
                </div>
            </div>
            <div className='diagram-block'></div>
            <div className='pie-chart-block'></div>
        </div>
    );
};

export default ChartsTab;
