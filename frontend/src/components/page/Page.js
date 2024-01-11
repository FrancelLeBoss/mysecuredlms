import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import CenterPage from './Centerpage';
import { LightModeOutlined, Brightness2Outlined, AssignmentOutlined, HomeOutlined, BookOutlined, SettingsOutlined, PersonOutlined, LogoutOutlined } from '@mui/icons-material';


const Page = ({ toggleTheme, muiTheme, data }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ background: muiTheme.palette.secondary.var1, display: 'flex', flexDirection: 'column', flex: '18% 0 18%', width: '18%', }}>
                <div style={{ background: muiTheme.palette.secondary.main, alignItems: 'center', display: 'flex', justifyContent: 'space-around' }}>
                    {
                        muiTheme?.palette?.mode === 'dark' ? <img src="../../../static/image/logo-dark.png" alt="Logo" style={{ padding: "0.5rem", maxWidth: '65%' }} /> :
                            <img src="../../../static/image/logo.png" alt="Logo" style={{ padding: "0.5rem", maxWidth: '65%' }} />
                    }
                    <div onClick={toggleTheme}>
                        {muiTheme?.palette?.mode === 'dark' ? (
                            <LightModeOutlined color={'action'} style={{ fontSize: "medium" }} />
                        ) : (
                            <Brightness2Outlined color={'action'} style={{ fontSize: "medium" }} />
                        )}
                    </div>
                </div>
                <Sidebar muiTheme={muiTheme} data={data} toggleTheme={toggleTheme} style={{ flex: 1, background: muiTheme.palette.background.sidebar }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div id='topBar' style={{ background: muiTheme.palette.secondary.var1, padding: '1rem' }}></div>
                <CenterPage muiTheme={muiTheme} data={data} toggleTheme={toggleTheme} />
            </div>
        </div>

    )
}

export default Page