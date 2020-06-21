export default {
    locale: 'da',
    country: 'DK',
    sysInfo: {
        sysIntro: 'En brugervenlig front-end udviklingsramme, der er baseret på Vue og Ant Design'
    },
    loginForm: {
        byAccountBtn: 'Konto adgangskode login',
        byPhoneBtn: 'Telefonnummer login',
        accountPlaceholder: 'indtast venligst konto',
        passwordPlaceholder: 'Indtast adgangskoden',
        autoLogin: 'automatisk login',
        forgetBtn: 'glemme adgangskode',
        loginBtn: 'Log på',
        byAccountTip: {
            emptyErr: 'Kontoen kan ikke være tom'
        },
        byPasswordTip: {
            emptyErr: 'adgangskode kan ikke være tomt'
        },
        byValidTip: {
            emptyErr: 'verifikationskode skal udfyldes'
        },
        sendMsg: {
            repeatErr: 'Send ikke gentagne gange',
            success: 'Få succes',
            codeTip: 'Din bekræftelseskode er'
        },
        phonePlaceholder: 'Indtast venligst telefonnummer',
        validPlaceholder: 'Captcha',
        validBtn: 'få bekræftelseskode',
        loginSuccess: 'login er vellykket'
    },
    requestInfo: {
        withoutUrl: 'Anmodningsadressen kan ikke være tom',
        networkErr: 'Netværksanmodning mislykkedes. Prøv igen senere'
    },
    localeMap: {
        ar: 'arabisk',
        bg: 'bulgarsk',
        ca: 'catalan',
        cs: 'tjekkisk',
        da: 'dansk',
        de: 'tysk',
        el: 'græsk',
        'en-gb': 'engelsk',
        en: 'engelsk',
        es: 'spansk',
        et: 'estisk',
        fa: 'persisk',
        fi: 'Finsk',
        fr: 'fransk',
        he: 'Hebrew',
        hi: 'Hindi',
        hr: 'Kroatisk',
        hu: 'ungarsk',
        hy: 'armensk',
        id: 'Indonesisk',
        is: 'islandsk',
        it: 'italiensk ',
        ja: 'japansk',
        kn: 'kannaresisk',
        ko: 'Korean',
        'ku-iq': 'Central kurdisk',
        lv: 'Central kurdisk',
        mk: 'makedonsk',
        'mn-mn': 'Mongolsk',
        'ms-my': 'Malay',
        nb: 'Norsk',
        'ne-np': 'nepalesisk',
        'nl-be': 'Flamsk',
        nl: 'hollandske',
        pl: 'Polere',
        'pt-br': 'Brasiliansk portugisisk',
        pt: 'Europæisk portugisisk',
        ro: 'rumænsk',
        ru: 'russisk sprog',
        sk: 'slovakisk',
        sl: 'slovensk',
        sr: 'serbisk',
        sv: 'Svensk',
        ta: 'Tamil',
        th: 'Thai',
        tr: 'tyrkisk',
        uk: 'ukrainsk',
        vi: 'Vietnamesisk',
        'zh-cn': 'Forenklet kinesisk',
        'zh-tw': 'traditionelt kinesisk'
    },
    menuObj: {
        basicFeature: 'Grundlæggende evne',
        cpUse: 'Brug af komponenter',
        childMenu: {
            0: 'Grundlæggende rammer',
            1: 'Grundlæggende evne',
            '0-0': 'Vue',
            '0-1': 'Ant Design',
            '1-0': 'Rammefunktion',
            '1-0-0': 'Projektkonfiguration',
            '1-0-1': 'Front-end log',
            '1-0-2': 'Lokal hån',
            '1-0-3': 'globalisering',
            '1-0-4': 'Data ordbog',
            '1-0-5': 'EventBus',
            '1-0-6': 'Toolset',
            '1-0-7': 'Adgangskontrol',
            '1-0-8': 'genvejstast',
            '1-1': 'Sidefunktion',
            '1-1-0': 'Komponent side',
            '1-1-1': 'url-side',
            '1-1-2': 'Ingen tilladelsesside',
            '1-1-3': '404 sider'
        },
        defaultMenu: {
            home: 'Hjem'
        },
        errorTip: {
            notfoundTip: 'Der blev ikke fundet nogen komponent under denne sti',
            emptyErr: 'Komponentsti ikke konfigureret'
        }
    },
    tagObj: {
        closeAll: 'Luk alle faner',
        closeCur: 'Luk den aktuelle fane',
        closeOther: 'Luk andre tags',
        closeRight: 'Luk højre etiket',
        singlePage: 'Uafhængig side',
        refreshPage: 'opdater side',
        affixPage: 'Fast side',
        cancelAffixPage: 'Frigør',
        errorTip: {
            homePageCloseError: 'Hjemmesiden må ikke lukke',
            affixPageCloseError: 'Den faste side må ikke lukke',
            homePageAffixError: 'Hjemmesiden kan ikke afspændes'
        },
        checkSave: 'Vil du lukke siden?(Sørg for, at indholdet af siden med rød etiket er gemt)',
        cancelClose: 'Lukket operation annulleret'
    },
    personalCenter: {
        frontendLog: 'Front-end log',
        customSetting: 'Personlige indstillinger',
        logout: 'Log ud'
    },
    errorPage: {
        errorTip: {
            notfoundTip: 'Beklager, den side, du har besøgt, findes ikke',
            notrightTip: 'Beklager, du har ikke tilladelse til at få adgang til denne side',
            noserviceTip: 'Beklager, der gik noget galt med serveren. Prøv igen senere'
        },
        btnText: 'Luk side'
    }
}
