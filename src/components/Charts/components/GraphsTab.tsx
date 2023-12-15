import React from 'react';

import { Button, Select, Table } from 'antd';

import './Tabs.less';

const GraphsTab = () => {
    return (
        <div className='graphs-tab-container'>
            <div className='graph-data-block'>
                <div className='graph-data'>
                    <div className='data-add-dot'>
                        <Button></Button>
                    </div>
                    <Table />
                </div>
                <div className='graph-type'>
                    <Select />
                </div>
                <div className='graph-calc-button'>
                    <Button></Button>
                </div>
            </div>
            <div className='graphs-block'></div>
        </div>
    );
};

export default GraphsTab;