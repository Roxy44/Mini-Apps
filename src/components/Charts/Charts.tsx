import React from 'react';

import { Tabs, TabsProps } from 'antd';

import ChartsTab from './components/ChartsTab';
import GraphsTab from './components/GraphsTab';

import './Charts.less';

const Charts = () => {

    const tabsItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Charts',
            children: <ChartsTab />,
        },
        {
            key: '2',
            label: 'Graphs',
            children: <GraphsTab />,
        },
    ];

    return (
        <div className='charts-container'>
            <Tabs className='charts-tabs' defaultActiveKey='1' items={tabsItems} />
        </div>
    );
};

export default Charts;
