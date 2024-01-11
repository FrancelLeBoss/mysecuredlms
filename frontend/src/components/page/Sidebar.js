import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LightModeOutlined, Brightness2Outlined, AssignmentOutlined, HomeOutlined, BookOutlined, SettingsOutlined, PersonOutlined, LogoutOutlined } from '@mui/icons-material';

const Sidebar = ({ toggleTheme, muiTheme, data, profile }) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState("")
    const [active, setActive] = useState("home")

    const handleOnclickLogout = () => {
        fetch("/logout", {
            method: 'GET', // Méthode HTTP (GET dans ce cas)
            headers: {
                'Content-Type': 'application/json',
            },
        })
        window.location.href = window.location.origin
    }

    return (
        <div style={{ background: muiTheme.palette.background.sidebar, minHeight: '100vh', paddingLeft: '1rem', paddingRight: '1rem' }}>
            <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 1, alignItems: 'center', padding: '1rem 0 1rem 0' }}>
                    <Grid item alignItems='center'>
                        {
                            muiTheme?.palette?.mode === 'dark' ? <img src="../../../static/image/defaultpic.jpg" alt="Logo" style={{ padding: "1rem 0", width: '2rem', height: '2rem', borderRadius: '100%' }} /> :
                                <img src="../../../static/image/defaultpic.jpg" alt="Logo" style={{ padding: "1rem 0", width: '2rem', height: '2rem', borderRadius: '100%' }} />
                        }
                    </Grid>
                    <div style={{ color: muiTheme.palette.mode === 'dark' ? '#fff' : 'inherit', fontSize: '1rem', textTransform: 'capitalize', cursor: 'pointer' }}>{data}</div>
                    {console.log({ profile })}
                </div>
                <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'space-between' }}>
                    <Grid item xs={12} align='start'
                        onMouseEnter={() => setIsHovered('home')}
                        onMouseLeave={() => setIsHovered('')}
                        style={{
                            paddingTop: '0.35rem', paddingBottom: '0.4rem',
                            background: isHovered === 'home' || active == 'home' ? muiTheme?.palette?.secondary.main : 'initial',
                            color: isHovered === 'home' || active == 'home' ? '#fff' : 'inherit',
                            display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 8,
                            paddingLeft: '1.125rem', borderRadius: '3%',
                            cursor: 'pointer',
                        }}>
                        <HomeOutlined color={isHovered === 'home' || active == 'home' ? 'inherit' : 'secondary'} fontSize='medium' />
                        <span style={{ fontSize: "1.125em", color: muiTheme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>{t("sidebar_overview")}</span>
                    </Grid>
                    <Grid item xs={12} align='start'
                        onMouseEnter={() => setIsHovered('course')}
                        onMouseLeave={() => setIsHovered('')}
                        style={{
                            paddingTop: '0.35rem', paddingBottom: '0.4rem',
                            background: isHovered === 'course' || active == 'course' ? muiTheme?.palette?.secondary.main : 'initial',
                            color: isHovered === 'course' || active == 'course' ? '#fff' : 'inherit',
                            display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 8,
                            paddingLeft: '1.125rem', borderRadius: '3%',
                            cursor: 'pointer',
                        }}>
                        <BookOutlined color={isHovered === 'course' || active == 'course' ? 'inherit' : 'secondary'} fontSize='medium' />
                        <span style={{ fontSize: "1.125em", color: muiTheme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>{t("sidebar_courses")}</span>
                    </Grid>
                    <Grid item xs={12} align='start'
                        onMouseEnter={() => setIsHovered('assignment')}
                        onMouseLeave={() => setIsHovered('')}
                        style={{
                            paddingTop: '0.35rem', paddingBottom: '0.4rem',
                            background: isHovered === 'assignment' || active == 'assignment' ? muiTheme?.palette?.secondary.main : 'initial',
                            color: isHovered === 'assignment' || active == 'assignment' ? '#fff' : 'inherit',
                            display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 8,
                            paddingLeft: '1.125rem', borderRadius: '3%',
                            cursor: 'pointer',
                        }}>
                        <AssignmentOutlined color={isHovered === 'assignment' || active == 'assignment' ? 'inherit' : 'secondary'} fontSize='medium' />
                        <span style={{ fontSize: "1.125em", color: muiTheme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>{t("sidebar_assignments")}</span>
                    </Grid>
                    <Grid item xs={12} align='start'
                        onMouseEnter={() => setIsHovered('setting')}
                        onMouseLeave={() => setIsHovered('')}
                        style={{
                            paddingTop: '0.35rem', paddingBottom: '0.4rem',
                            background: isHovered === 'setting' || active == 'setting' ? muiTheme?.palette?.secondary.main : 'initial',
                            color: isHovered === 'setting' || active == 'setting' ? '#fff' : 'inherit',
                            display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 8,
                            paddingLeft: '1.125rem', borderRadius: '3%',
                            cursor: 'pointer',
                        }}>
                        <SettingsOutlined color={isHovered === 'setting' || active == 'setting' ? 'inherit' : 'secondary'} fontSize='medium' />
                        <span style={{ fontSize: "1.125em", color: muiTheme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>{t("sidebar_settings")}</span>
                    </Grid>
                    <Grid item xs={12} align='start'
                        onMouseEnter={() => setIsHovered('profile')}
                        onMouseLeave={() => setIsHovered('')}
                        style={{
                            paddingTop: '0.35rem', paddingBottom: '0.4rem',
                            background: isHovered === 'profile' || active == 'profile' ? muiTheme?.palette?.secondary.main : 'initial',
                            color: isHovered === 'profile' || active == 'profile' ? '#fff' : 'inherit',
                            display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 8,
                            paddingLeft: '1.125rem', borderRadius: '3%',
                            cursor: 'pointer',
                        }}>
                        <PersonOutlined color={isHovered === 'profile' || active == 'profile' ? 'inherit' : 'secondary'} fontSize='medium' />
                        <span style={{ fontSize: "1.125em", color: muiTheme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>{t("sidebar_profile")}</span>
                    </Grid>
                    <Grid item xs={12} align='end'
                        onMouseEnter={() => setIsHovered('logout')}
                        onMouseLeave={() => setIsHovered('')}
                        onClick={handleOnclickLogout}
                        style={{
                            paddingTop: '0.35rem', paddingBottom: '0.4rem',
                            background: isHovered === 'logout' || active == 'logout' ? muiTheme?.palette?.secondary.main : 'initial',
                            color: isHovered === 'logout' || active == 'logout' ? '#fff' : 'inherit',
                            display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 8,
                            paddingLeft: '1.125rem', borderRadius: '3%',
                            cursor: 'pointer',
                        }}>
                        <LogoutOutlined color={isHovered === 'logout' || active == 'logout' ? 'inherit' : 'secondary'} fontSize='medium' />
                        <span style={{ fontSize: "1.125em", color: muiTheme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>{t("sidebar_logout")}</span>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Sidebar;
