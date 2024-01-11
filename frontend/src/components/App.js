import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../../static/css/output.css';
import '../input.css';
import { Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './tools/LanguageSelector';
import Page from './page/Page';


const App = ({ username, profile }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    //const [themeMode, setThemeMode] = useState(prefersDarkMode ? 'dark' : 'light');
    const [themeMode, setThemeMode] = useState('light');

    const toggleTheme = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };
    const muiTheme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#556cd6',
            },
            secondary: {
                main: '#19857b',
                var1: '#1aa397'
            },
            third: {
                main: '#f9a682',
            },
            background: {
                default: themeMode === 'light' ? '#fff' : '#1f1f1f',
                sidebar: themeMode === 'light' ? '#F5F7F9' : '#181818',
            },

        },
    });

    useEffect(() => {
        document.body.style.backgroundColor = muiTheme.palette.background.default;
    }, [muiTheme]);

    return (
        <ThemeProvider theme={muiTheme}>
            <div className=''>
                <Router>
                    <Routes>
                        <Route path='/home' element={<Home muiTheme={muiTheme} data={username} profile={profile} toggleTheme={toggleTheme} />} />
                        <Route path='/' element={<Page muiTheme={muiTheme} toggleTheme={toggleTheme} data={username} profile={profile} />} />
                        <Route path='/login' element={<Login muiTheme={muiTheme} toggleTheme={toggleTheme} data={username} profile={profile} />} />
                        <Route path='/register' element={<Signup muiTheme={muiTheme} toggleTheme={toggleTheme} />} />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
};

const Home = ({ toggleTheme, muiTheme }) => {

    const { t } = useTranslation();
    return (
        <div style={{ minHeight: '100vh' }}>
            <Typography variant='h3' color='primary'>
                {t("welcome_on_my_app")}
            </Typography>
            <Typography variant='body1' color='secondary'>
                {t("lorem_text")}
            </Typography>
            <Button variant='contained' color='primary' onClick={toggleTheme}>
                {muiTheme === 'dark' ? t('switch_to_light') : t('switch_to_dark')}
            </Button>
            <div><LanguageSelector /></div>
        </div>
    );
};

export default App;
