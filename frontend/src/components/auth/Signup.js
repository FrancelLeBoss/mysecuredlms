import React, { useState, useRef } from 'react';
import { Grid, TextField, Typography, Button, Link, Divider, IconButton, InputAdornment } from '@mui/material';
import { LightModeOutlined, Brightness2Outlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const Signup = ({ toggleTheme, muiTheme }) => {
    const { t } = useTranslation();
    const loginRef = useRef(null)
    const firstnameRef = useRef(null)
    const lastNameRef = useRef(null)
    const [email, setEmail] = useState("")
    const passwordRef = useRef(null)
    const repasswordRef = useRef(null)
    const [showPwd, setShowPwd] = useState(false)
    const [showRePwd, setShowRePwd] = useState(false)

    const [errorLogin, setErrorLogin] = useState("")
    const [errorFirstname, setErrorFirstName] = useState("")
    const [errorLastName, setErrorLastName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorRePassword, setErrorRePassword] = useState("")

    const handleTogglePassword = () => {
        setShowPwd(!showPwd);
    };

    const handleToggleRePassword = () => {
        setShowRePwd(!showRePwd);
    };

    const validateForm = (type, value) => {
        if (type == 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                setErrorEmail('Email invalide');
            } else {
                setErrorEmail('');
            }
        }
        if (type == 'password') {

        }
    };

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        validateForm('email', emailValue);
        setEmail(emailValue)
    };

    return (
        <div style={{ height: "100vh", overflowY: 'auto' }}>
            <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
                <Grid container spacing={1} style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", flexDirection: "column", minHeight: "100vh", gap: '1rem' }}>
                    <Grid item alignItems='center'>
                        <img src="../../../static/image/logo.png" alt="Logo" style={{ background: muiTheme?.palette?.mode === 'dark' ? "#fff" : "", padding: "1rem 0" }} />
                    </Grid>
                    <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column', gap: "1rem", padding: '1rem 0', alignItems: "center", justifyContent: "space-around", borderStyle: "solid", borderRadius: "1.5rem", maxWidth: '32rem', borderWidth: "1px" }}>
                        <Grid item xs={12} align='center' style={{ display: 'flex', flexDirection: 'row', gap: '0.4rem', alignItems: 'center', justifyContent: "center" }}>
                            <Typography variant="h5" color={muiTheme?.palette?.secondary.main}>{t('signup_page_title')}</Typography>
                            <div onClick={toggleTheme}>
                                {muiTheme?.palette?.mode === 'dark' ? (
                                    <LightModeOutlined color={'secondary'} style={{ fontSize: "medium" }} />
                                ) : (
                                    <Brightness2Outlined color={'secondary'} style={{ fontSize: "medium" }} />
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={10} align='center' style={{ display: "flex", flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
                            <TextField
                                label={t('firstname_field_label')}
                                placeholder={t('firstname_placeholder')}
                                ref={firstnameRef}
                                helperText={errorFirstname}
                                variant='outlined'
                                color='secondary'
                                size='small'
                            />
                            <TextField
                                label={t('lastname_field_label')}
                                placeholder={t('lastname_placeholder')}
                                ref={lastNameRef}
                                helperText={errorLastName}
                                variant='outlined'
                                color='secondary'
                                size='small'
                            />
                            <TextField
                                label={t('email_field_label')}
                                placeholder={t('email_placeholder')}
                                value={email}
                                onChange={handleEmailChange}
                                error={!!errorEmail}
                                helperText={errorEmail}
                                variant='outlined'
                                color='secondary'
                                size='small'
                            />
                            <TextField
                                label={t('login_field_label')}
                                placeholder={t('login_field_place_holder')}
                                ref={loginRef}
                                helperText={errorLogin}
                                variant='outlined'
                                color='secondary'
                                size='small'
                            />
                            <TextField
                                label={t('password_field_label')}
                                placeholder={t('password_field_place_holder')}
                                ref={passwordRef}
                                helperText={errorPassword}
                                variant='outlined'
                                color='secondary'
                                size='small'
                                type={showPwd ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePassword} edge="end">
                                                {showPwd ? <VisibilityOffOutlined color='secondary' /> : <VisibilityOutlined color='secondary' />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label={t('repassword_field_label')}
                                placeholder={t('repassword_field_place_holder')}
                                ref={repasswordRef}
                                helperText={errorRePassword}
                                variant='outlined'
                                color='secondary'
                                size='small'
                                type={showRePwd ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleToggleRePassword} edge="end">
                                                {showRePwd ? <VisibilityOffOutlined color='secondary' /> : <VisibilityOutlined color='secondary' />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button variant="contained" color="secondary" style={{ borderRadius: '1.5rem' }}>
                                {t('btn_signup_page')}
                            </Button>
                            <Typography variant="body2" color="textSecondary">{t('login_page_msg') + t('login_page_msg2') + t('login_page_msg3') + t('login_page_msg4')}</Typography>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} justifyContent="center" alignItems="center" style={{ maxWidth: '32rem' }}>
                        <Grid item xs={4}>
                            <Divider />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary">
                                {t('signup_page_msg_on_divider')}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" alignItems={'center'} style={{ maxWidth: '32rem' }}>
                        <Grid item xs={12}>
                            <Button variant='outlined' to='/login' component={RouterLink} color={'secondary'} fullWidth style={{ cursor: 'pointer', borderRadius: '1.5rem' }}>
                                {t('signup_page_login_btn')}
                            </Button>
                        </Grid>
                    </Grid>
                    <div>
                        {/* <div>
            <LanguageSelector />
        </div> */}
                    </div>
                </Grid >
                <Divider />
            </Grid>
        </div>
    )
}

export default Signup