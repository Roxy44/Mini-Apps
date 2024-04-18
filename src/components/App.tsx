import React from 'react';

import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import { Button, Divider, Layout, Switch } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
// apps
import BackgroundChanger from '../components/BackgroundChanger/BackgroundChanger';
import Clocks from './Clocks/Clocks';
import KeysDictionary from './KeysDictionary/KeysDictionary';
import DragAndDrop from './DragAndDrop/DragAndDrop';
import Randomizer from './Randomizer/Randomizer';
import Paint from './Paint/Paint';
import Charts from './Charts/Charts';
// games
import HoverAndBlur from '../components/HoverAndBlur/HoverAndBlur';

import { RootState } from './types';

import './App.less';

const App = () => {
    const { Sider } = Layout;

    const dispatch = useDispatch();

    const { background_page_theme, site_theme } = useSelector((state: RootState) => state.settings);

    const appsLinkData = [
        { link: '/Mini-Apps/change-background', label: 'Change Background' },
        { link: '/clocks', label: 'Clocks' },
        { link: '/keys-dictionary', label: 'Keys Dictionary' },
        { link: '/drag-and-drop', label: 'Drag and Drop' },
        { link: '/random-org', label: 'Random.org' },
        { link: '/paint', label: 'Paint' },
        { link: '/charts', label: 'Charts' },
    ];

    const gamesLinkData = [
        { link: '/hover-and-blur', label: 'Hover And Blur'  },
        { link: '/', label: 'Not working!'  },
        { link: '/', label: 'Not working!'  },
        // { link: '/snake', label: 'Snake'},
        // { link: '/rocket-clicker', label: 'Rocket Clicker' },
    ];

    const changeTheme = (switcher: boolean) => {
        dispatch({ type: 'SET_SITE_THEME', payload: switcher ? 'light' : 'dark' });
    };

    const getLinks = (linksData: { link: string, label: string }[]) => {
        return linksData.map((item: { link: string, label: string }) => (
            <Link to={item.link} className='link'>
                <Button type={site_theme === 'light' ? 'primary' : 'default'}>{item.label}</Button>
            </Link>
        ));
    };

    return (
        <BrowserRouter>
            <Layout>
                <Sider className='side-menu' theme={site_theme}>
                    <Link to='/' className='menu-logo-container'>
                        <Button className={`menu-logo-button theme-logo-${site_theme}`}>Mini Apps</Button>
                    </Link>

                    <Divider className={`divider-${site_theme}`} />

                    <div className='menu-apps'>
                        <span className={site_theme}>Applications</span>
                        {...getLinks(appsLinkData)}
                        
                        <Divider className={`divider-${site_theme}`} />

                        <span className={site_theme}>Games</span>
                        {...getLinks(gamesLinkData)}
                    </div>

                    <Divider className={`divider-${site_theme}`} />

                    <div className='theme-block'>
                        <span className={`theme-title ${site_theme}`}>Theme</span>
                        <Switch className={`theme-switcher-${site_theme}`} checkedChildren='light' unCheckedChildren='dark' onChange={(value: boolean) => changeTheme(value)} />
                    </div>
                </Sider>
                <div className={`page-content ${background_page_theme}`}>
                    <Routes>
                        <Route path='/Mini-Apps/' element={<BackgroundChanger />} />
                        <Route path='/Mini-Apps/change-background' element={<BackgroundChanger />} />
                        <Route path='/clocks' element={<Clocks />} />
                        <Route path='/keys-dictionary' element={<KeysDictionary />} />
                        <Route path='/drag-and-drop' element={<DragAndDrop />} />
                        <Route path='/random-org' element={<Randomizer />} />
                        <Route path='/paint' element={<Paint />} />
                        <Route path='/charts' element={<Charts />} />
                        <Route path='/hover-and-blur' element={<HoverAndBlur />} />
                        <Route path='/snake' />
                        <Route path='/rocket-clicker' />
                    </Routes>
                </div>  
            </Layout>
        </BrowserRouter>
    );
};

export default App;