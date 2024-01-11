import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactFlagsSelect from 'react-flags-select';
import './style.css'

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [defaultLanguage, setDefaultLanguage] = useState("en");

    const changeLanguage = (countryCode) => {
        const selectedLanguage = countryCode === "US" ? "en" : "ru";
        setDefaultLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <ReactFlagsSelect
            selected={defaultLanguage === "en" ? "US" : "RU"}
            onSelect={changeLanguage}
            countries={["US", "RU"]}
            customLabels={{ US: '', RU: '' }}
            showSelectedLabel={false}
            showOptionLabel={false}
            fullWidth={false}
            className='react-flag-style'
        />
    );
};

export default LanguageSelector;
