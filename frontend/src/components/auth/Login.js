import React, { useState, useRef, useEffect, useReducer } from 'react';
import { Grid, TextField, Typography, Button, Link, Divider, InputAdornment, IconButton } from '@mui/material';
import { LightModeOutlined, Brightness2Outlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import LanguageSelector from '../tools/LanguageSelector';
import FullWidthButton from '../tools/FullWidthButton';

const Login = ({ toggleTheme, muiTheme }) => {
    const { t } = useTranslation();
    const [composant, setComposant] = useState("facerecognition") //login, facerecognition, reset 
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const loginRef = useRef(null)
    const passwordRef = useRef(null)
    const videoRef = useRef(null)
    const [imgElement, setImgElement] = useState(null)
    const [showVideo, setShowVideo] = useState(true)
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [, forceUpdate2] = useReducer(x => x + 1, 0);
    const captureBtnRef = useRef(null)
    const reloadBtnRef = useRef(null)
    const [stream, setStream] = useState(null)
    const [showCaptureBtn, setShowCaptureBtn] = useState(true)
    const [showReloadBtn, setShowReloadBtn] = useState(true)
    const [showPwd, setShowPwd] = useState(false)
    const [errorLogin, setErrorLogin] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    const getCookie = (name) => {
        let cookieValue = null
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(';')
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim()
                if (cookie.substring(0, name.length + 1) === name + '=') {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                    break;
                }
            }
        }
        return cookieValue
    }

    const csrftoken = getCookie('csrftoken')

    const handleOnClickCaptureBtn = async () => {
        if (captureBtnRef.current) {
            setShowCaptureBtn(false);
            const { height, width } = stream?.getTracks()[0].getSettings();
            const track = stream?.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);

            try {
                const blob = await imageCapture.takePhoto();
                const img = new Image(width, height);
                img.src = URL.createObjectURL(blob);
                setImgElement(img);
                setShowVideo(false);
                forceUpdate(); // Forcer le rendu du composant

                const reader = new FileReader();
                reader.readAsDataURL(blob);

                reader.onloadend = async () => {
                    const base64data = reader.result;

                    const fd = new FormData();
                    fd.append('csrfmiddlewaretoken', csrftoken);
                    fd.append('photo', base64data);

                    try {
                        const response = await fetch('classify', {
                            method: 'POST',
                            body: fd,
                            headers: {
                                'X-CSRFToken': csrftoken ? { 'X-CSRFToken': csrftoken } : {},
                            }
                        });

                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }

                        const rep = await response.json();
                        if (rep.success === "identified") {
                            window.location.href = window.location.origin
                        }
                        else {
                            setShowCaptureBtn(true)
                            setShowVideo(true)
                            setImgElement(false)
                            forceUpdate2();
                            window.location.href = window.location.origin
                        }
                    } catch (err) {
                        console.error(err);
                    }
                };
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleOnClickReloadBtn = () => {
        if (reloadBtnRef.current) {
        }
    };
    const handleTogglePassword = () => {
        setShowPwd(!showPwd);
    };

    useEffect(() => {
        let s;

        const accessCamera = async () => {  // Utilisation de la fonction fléchée ici
            try {
                s = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = s;  // Utilisation de current pour accéder à l'élément
                setStream(s)

            } catch (err) {
                console.error('Error accessing the camera:', err);
            }
        }
        composant === 'facerecognition' && accessCamera();  // Appel de la fonction
    }, [composant]);


    const signin = () => {
        return (
            <div style={{ height: "100vh", overflowY: 'auto' }}>
                <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
                    <Grid container spacing={1} style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", flexDirection: "column", minHeight: "100vh", gap: '1rem' }}>
                        <Grid item alignItems='center'>
                            {
                                muiTheme?.palette?.mode === 'dark' ? <img src="../../../static/image/logo-dark.png" alt="Logo" style={{ padding: "1rem 0" }} /> :
                                    <img src="../../../static/image/logo.png" alt="Logo" style={{ padding: "1rem 0" }} />
                            }
                        </Grid>
                        <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column', gap: "1rem", padding: '1rem 0', alignItems: "center", justifyContent: "space-around", borderStyle: "solid", borderRadius: "1.5rem", maxWidth: '32rem', borderWidth: "1px" }}>
                            <Grid item xs={12} align='center' style={{ display: 'flex', flexDirection: 'row', gap: '0.4rem', alignItems: 'center', justifyContent: "center" }}>
                                <Typography variant="h5" color={muiTheme?.palette?.secondary.main}>{t('login_page_title')}</Typography>
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
                                <Button variant="contained" color="secondary" style={{ borderRadius: '1.5rem' }}>
                                    {t('btn_login_page')}
                                </Button>
                                <Typography variant="body2" color="textSecondary">{t('login_page_msg') + t('login_page_msg2') + t('login_page_msg3') + t('login_page_msg4')}</Typography>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body2" color={muiTheme?.palette?.third?.main}>
                                        <Link style={{ cursor: 'pointer' }} onClick={() => { setComposant('facerecognition') }} color="inherit">{t('login_page_otherlogin_way_msg')}</Link>
                                    </Typography>
                                    <Typography variant="body2" color={muiTheme?.palette?.third?.main}>
                                        <Link style={{ cursor: 'pointer' }} onClick={() => { setComposant('reset') }} color="inherit">{t('login_page_pwd_forget')}</Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} justifyContent="center" alignItems="center" style={{ maxWidth: '32rem' }}>
                            <Grid item xs={4}>
                                <Divider />
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    {t('login_page_msg_on_divider')}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Divider />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" alignItems={'center'} style={{ maxWidth: '32rem' }}>
                            <Grid item xs={12}>
                                <Button variant='outlined' to='/register' component={RouterLink} color={'secondary'} fullWidth style={{ cursor: 'pointer', borderRadius: '1.5rem' }}>
                                    {t('login_page_create_account_btn')}
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

    const facial = () => {

        return (<div style={{ height: "110vh", overflowY: 'auto' }}>
            <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
                <Grid container spacing={1} style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", flexDirection: "column", gap: '1rem' }}>
                    <Grid item alignItems='center'>
                        {
                            muiTheme?.palette?.mode === 'dark' ? <img src="../../../static/image/logo-dark.png" alt="Logo" style={{ padding: "1rem 0" }} /> :
                                <img src="../../../static/image/logo.png" alt="Logo" style={{ padding: "1rem 0" }} />
                        }
                    </Grid>
                    <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column', gap: "1rem", padding: '1rem 0', alignItems: "center", justifyContent: "space-around", borderStyle: "solid", borderRadius: "1.5rem", maxWidth: '32rem', borderWidth: "1px" }}>
                        <Grid item xs={12} align='center' style={{ display: 'flex', flexDirection: 'row', gap: '0.4rem', alignItems: 'center', justifyContent: "center" }}>
                            <Typography variant="h5" color={muiTheme?.palette?.secondary.main}>{t('login_page_recognition')}</Typography>
                            <div onClick={toggleTheme}>
                                {muiTheme?.palette?.mode === 'dark' ? (
                                    <LightModeOutlined color={'secondary'} style={{ fontSize: "medium" }} />
                                ) : (
                                    <Brightness2Outlined color={'secondary'} style={{ fontSize: "medium" }} />
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={10} align='center' style={{ display: "flex", flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>

                            {showVideo && <video ref={videoRef} style={{ minHeight: '16rem', border: '1px #19857b solid', borderRadius: '0.5rem' }} autoPlay ></video>}
                            {imgElement && <img src={imgElement.src} width={imgElement.width} height={imgElement.height} style={{ border: '1px #19857b solid', borderRadius: '0.5rem' }} />}
                            {showCaptureBtn && <Button variant="contained" color="secondary" style={{ borderRadius: '1.5rem' }} ref={captureBtnRef} onClick={handleOnClickCaptureBtn}>
                                {t('btn_login_page')}
                            </Button>}
                            {showReloadBtn && <Button variant="contained" color="primary" style={{ borderRadius: '1.5rem' }} ref={reloadBtnRef} onClick={handleOnClickReloadBtn}>
                                {t('btn_reload_page')}
                            </Button>}
                            <Typography variant="body2" color="textSecondary">{t('login_page_msg') + t('login_page_msg2') + t('login_page_msg3') + t('login_page_msg4')}</Typography>

                            <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="body2" color={muiTheme?.palette?.third?.main}>
                                    <Link style={{ cursor: 'pointer' }} onClick={() => { setComposant('login') }} color="inherit">{t('login_page_otherlogin_way_msg')}</Link>
                                </Typography>
                                <Typography variant="body2" color={muiTheme?.palette?.third?.main}>
                                    <Link style={{ cursor: 'pointer' }} onClick={() => { setComposant('reset') }} color="inherit">{t('login_page_create_account_btn')}</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} justifyContent="center" alignItems="center" style={{ maxWidth: '32rem' }}>
                        <Grid item xs={4}>
                            <Divider />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary">
                                {t('login_page_msg_on_divider')}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" alignItems={'center'} style={{ maxWidth: '32rem' }}>
                        <Grid item xs={12}>
                            <Button variant='outlined' to='/register' component={RouterLink} color={'secondary'} fullWidth style={{ cursor: 'pointer', borderRadius: '1.5rem' }}>
                                {t('login_page_create_account_btn')}
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
        </div>)
    }
    const resetpassword = () => {
        return (<div>
            Bilai
        </div>)
    }

    return (
        <>
            {
                composant === 'login' && signin() || composant === 'facerecognition' && facial() || composant === 'reset' && resetpassword()
            }
        </>
    );
};

export default Login;
