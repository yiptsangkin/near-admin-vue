export default {
    locale: 'hu',
    country: 'HU',
    loginForm: {
        byAccountBtn: 'Jelszó bejelentkezés',
        byPhoneBtn: 'Mobilszám bejelentkezés',
        accountPlaceholder: 'kérjük, adja meg a fiókot',
        passwordPlaceholder: 'Kérlek írd be a jelszót',
        autoLogin: 'automatikus bejelentkezés',
        forgetBtn: 'elfelejtett jelszo',
        loginBtn: 'Belépés',
        byAccountTip: {
            emptyErr: 'A fiók nem lehet üres'
        },
        byPasswordTip: {
            emptyErr: 'a jelszó nem lehet üres'
        },
        byValidTip: {
            emptyErr: 'az ellenőrző kódot ki kell tölteni'
        },
        sendMsg: {
            repeatErr: 'Ne küldjön többször',
            success: 'Sikeres',
            codeTip: 'Ellenőrző kódja:'
        },
        phonePlaceholder: 'Írja be a telefonszámot',
        validPlaceholder: 'Ellenőrző kód',
        validBtn: 'kérjen ellenőrző kódot',
        loginSuccess: 'sikeres bejelentkezés'
    },
    menuObj: {
        basicFeature: 'Alapképesség',
        cpUse: 'Alkatrészhasználat',
        childMenu: {
            0: 'Alapvető keret',
            1: 'Alapképesség',
            '0-0': 'Vue',
            '0-1': 'Hangya tervezés',
            '1-0': 'Keretfunkció',
            '1-0-0': 'Projekt konfigurálása',
            '1-0-1': 'Frontend napló',
            '1-0-2': 'Helyi gúny',
            '1-0-3': 'globalizáció',
            '1-0-4': 'Adatszótár',
            '1-0-5': 'EventBus',
            '1-0-6': 'Eszköztár',
            '1-0-7': 'Hozzáférés-szabályozás',
            '1-0-8': 'gyorsgomb',
            '1-1': 'Oldal funkció',
            '1-1-0': 'Komponens oldal',
            '1-1-1': 'url oldal',
            '1-1-2': 'Nincs engedélyoldal',
            '1-1-3': '404 oldal'
        },
        defaultMenu: {
            home: 'itthon'
        },
        errorTip: {
            notfoundTip: 'Az ezen az útvonalon található komponens nem található',
            emptyErr: 'Konfigurálatlan komponens elérési útja'
        }
    },
    sysInfo: {
        sysIntro: 'Könnyen használható középső és back-end front-end fejlesztési keretrendszer, amely a Vue and Ant Design alapján készült'
    },
    requestInfo: {
        withoutUrl: 'A kérelem címe nem lehet üres',
        networkErr: 'A hálózati kérés nem sikerült, próbálkozzon újra később'
    },
    localeMap: {
        ar: 'arab',
        bg: 'bolgár',
        ca: 'katalán',
        cs: 'cseh',
        da: 'dán',
        de: 'német',
        el: 'görög',
        'en-gb': 'angol',
        en: 'angol',
        es: 'spanyol',
        et: 'észt',
        fa: 'perzsa',
        fi: 'finn',
        fr: 'Francia',
        he: 'héber',
        hi: 'hindi',
        hr: 'horvát',
        hu: 'Magyar',
        hy: 'örmény',
        id: 'indonéz',
        is: 'izlandi',
        it: 'olasz ',
        ja: 'japán',
        kn: 'Kannada',
        ko: 'koreai',
        'ku-iq': 'Közép-kurd',
        lv: 'Közép-kurd',
        mk: 'Macedón',
        'mn-mn': 'mongol',
        'ms-my': 'maláj',
        nb: 'norvég',
        'ne-np': 'nepáli',
        'nl-be': 'flamand',
        nl: 'holland',
        pl: 'fényesít',
        'pt-br': 'Brazil-Portugál',
        pt: 'Európai portugál',
        ro: 'román',
        ru: 'orosz nyelv',
        sk: 'szlovák',
        sl: 'szlovén',
        sr: 'szerb',
        sv: 'svéd',
        ta: 'tamil',
        th: 'Thai',
        tr: 'török',
        uk: 'ukrán',
        vi: 'vietnami',
        'zh-cn': 'Egyszerűsített kínai',
        'zh-tw': 'tradicionális kínai'
    },
    tagObj: {
        closeAll: 'Zárjon be minden lapot',
        closeCur: 'Az aktuális fül bezárása',
        closeOther: 'Zárjon be más lapokat',
        closeRight: 'Zárja be a jobb oldali címkét',
        singlePage: 'Független oldal',
        refreshPage: 'frisssítsd az oldalt',
        affixPage: 'Oldal rögzítése',
        cancelAffixPage: 'Kibont',
        errorTip: {
            homePageCloseError: 'A honlap nem zárható be',
            affixPageCloseError: 'A javított oldal nem zárható be',
            homePageAffixError: 'A kezdőlap nem rögzíthető'
        },
        checkSave: 'Bezárja az oldalt?(Kérjük, ellenőrizze, hogy a piros színnel jelölt oldal tartalma mentve van-e)',
        cancelClose: 'A bezárás megszakítva'
    },
    personalCenter: {
        frontendLog: 'Frontend napló',
        customSetting: 'Személyre szabás',
        customClean: 'Konfiguráció törlése',
        logout: 'kijelentkezés',
        errorTip: {
            cleanSuccess: 'Sikeresen üres'
        }
    },
    errorPage: {
        errorTip: {
            notfoundTip: 'Sajnáljuk, a meglátogatott oldal nem létezik',
            notrightTip: 'Sajnos nincs engedélye az oldal elérésére',
            noserviceTip: 'Sajnos hiba történt a szerverrel. Kérjük, próbálkozzon újra később'
        },
        btnText: 'Oldal bezárása'
    },
    searchPanel: {
        btn: {
            search: 'Érdeklődik',
            shrink: 'ELRAK',
            reset: 'Visszaállítás',
            unshrink: 'Nyisd ki'
        }
    },
    logline: {
        list: 'Napló lista',
        detail: 'Napló részletei',
        btnList: {
            export: 'Export',
            remove: 'Üres'
        },
        time: {
            plh: 'Válasszon egy időtartományt',
            range: 'határidő',
            halfDay: 'Fél nap',
            oneDay: 'egy nap alatt',
            weekDay: 'egy héten belül',
            monthDay: 'Egy hónapon belül'
        },
        type: {
            logType: 'Napló típusa',
            plh: 'Kérjük, válassza ki a napló típusát'
        },
        tableColumns: {
            index: 'Sorozatszám',
            desc: 'Napló leírása',
            type: 'Napló típusa',
            time: 'idő',
            op: 'üzemeltetési'
        },
        request: 'Kérjen adatokat',
        error: {
            cancel: 'Üres művelet törölve',
            confirm: 'Törli a naplót?(Ha a napló kiürül, nem lehet lekérni)'
        },
        success: 'A napló kiürült'
    },
    comTable: {
        columns: {
            title: 'Oszlopbeállítások',
            all: 'mindet kiválaszt',
            reset: 'Visszaállítás',
            fixedLeft: 'Javítva balra',
            fixedRight: 'Javítva jobbra',
            cancelFixed: 'Kibont'
        },
        size: {
            title: 'Sor magasság',
            small: 'keskeny',
            normal: 'ban ben',
            large: 'szélesség'
        },
        fullscreen: 'Teljes képernyő',
        unFullscreen: 'A teljes képernyő visszavonása'
    },
    normalBtn: {
        detail: 'Kilátás'
    },
    setting: {
        customEntry: 'Gyors belépés',
        systemSwitch: 'Rendszerbeállítások',
        isMock: 'Gúnyolódni',
        isHotKey: 'A gyorsbillentyű',
        isBreadCrumb: 'Hogy morzsolódik-e a kenyér',
        isCache: 'Gyorsítótár-e',
        isI18n: 'Hogy nemzetközivé váljon-e'
    },
    pagingInfo: {
        total: 'Összesen',
        uint: 'Cikk',
        items: 'felvétel'
    }
}
