import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import '../static/css/index.css'
import '../static/css/output.css'
import '../static/css/input.css'
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n.js';


const root = ReactDOM.createRoot(document.getElementById('app'));
const username = document.getElementById('main').getAttribute('data-username');
const profile = document.getElementById('main').getAttribute('data-profile');

root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <App username={username} profile={profile} />
        </I18nextProvider>
    </React.StrictMode>
);

