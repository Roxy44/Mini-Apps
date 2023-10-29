import React from 'react';

import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import { Button, Divider, Layout, Switch } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import HoverAndBlur from '../components/HoverAndBlur/HoverAndBlur';
import BackgroundChanger from '../components/BackgroundChanger/BackgroundChanger';
import Clocks from './Clocks/Clocks';
import KeysDictionary from './KeysDictionary/KeysDictionary';

import { RootState } from '../types';

import './App.less';

const { Sider } = Layout;

const App = () => {
    const dispatch = useDispatch();

    const { background_color_theme, site_theme } = useSelector((state: RootState) => state.settings);

    const changeTheme = (switcher: boolean) => {
        dispatch({ type: 'SET_SITE_THEME', payload: switcher ? 'light' : 'dark' });
    };

    return (
        <BrowserRouter>
            <Layout>
                <Sider className='side-menu' theme={site_theme}>
                    <span className='menu-label'>Mini Apps</span>

                    <Divider className={`divider-${site_theme}`} />

                    <div className='menu-apps'>
                        <Link to='/hover-and-blur' className='first-app link'>
                            <Button type={site_theme === 'light' ? 'primary' : 'default'}>Hover And Blur</Button>
                        </Link>
                        <Link to='/change-background' className='second-app link'>
                            <Button type={site_theme === 'light' ? 'primary' : 'default'}>Change Background</Button>
                        </Link>
                        <Link to='/clocks' className='third-app link'>
                            <Button type={site_theme === 'light' ? 'primary' : 'default'}>Clocks</Button>
                        </Link>
                        <Link to='/keys-dictionary' className='fourth-app link'>
                            <Button type={site_theme === 'light' ? 'primary' : 'default'}>Keys Dictionary</Button>
                        </Link>
                    </div>

                    <Divider className={`divider-${site_theme}`} />

                    <div className='theme-block'>
                        <span className={`theme-title ${site_theme}`}>Theme</span>
                        <Switch className='theme-switcher' checkedChildren='light' unCheckedChildren='dark' onChange={(value: boolean) => changeTheme(value)} />
                    </div>
                </Sider>
                <div className={`menu-content ${background_color_theme}`}>
                    <Routes>
                        <Route path='/' element={<HoverAndBlur />} />
                        <Route path='/hover-and-blur' element={<HoverAndBlur />} />
                        <Route path='/change-background' element={<BackgroundChanger />} />
                        <Route path='/clocks' element={<Clocks />} />
                        <Route path='/keys-dictionary' element={<KeysDictionary />} />
                    </Routes>
                </div>  
            </Layout>
        </BrowserRouter>
    );
};

export default App;
