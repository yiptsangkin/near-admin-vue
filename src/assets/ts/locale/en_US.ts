export default {
    locale: 'en',
    country: 'US',
    sysInfo: {
        sysIntro: 'An easy-to-use front-end development framework based on Vue and Ant Design'
    },
    loginForm: {
        byAccountBtn: 'Account password login',
        byPhoneBtn: 'Phone number login',
        accountPlaceholder: 'please enter account',
        passwordPlaceholder: 'Please enter the password',
        autoLogin: 'auto login',
        forgetBtn: 'forget password',
        loginBtn: 'log in',
        byAccountTip: {
            emptyErr: 'Account cannot be empty'
        },
        byPasswordTip: {
            emptyErr: 'password can not be blank'
        },
        byValidTip: {
            emptyErr: 'verification code must be filled'
        },
        sendMsg: {
            repeatErr: 'Do not send repeatedly',
            success: 'Get success',
            codeTip: 'Your verification code is'
        },
        phonePlaceholder: 'Please enter phone number',
        validPlaceholder: 'Captcha',
        validBtn: 'get verification code',
        loginSuccess: 'login successful'
    },
    requestInfo: {
        withoutUrl: 'Request address cannot be empty',
        networkErr: 'Network request failed, please try again later'
    },
    localeMap: {
        ar: 'Arabic',
        bg: 'Bulgarian',
        ca: 'Catalan',
        cs: 'Czech',
        da: 'Danish',
        de: 'German',
        el: 'Greek',
        'en-gb': 'English',
        en: 'English',
        es: 'Spanish',
        et: 'Estonian',
        fa: 'Persian',
        fi: 'Finnish',
        fr: 'French',
        he: 'Hebrew',
        hi: 'Hindi',
        hr: 'Croatian',
        hu: 'Hungarian',
        hy: 'Armenian',
        id: 'Indonesian',
        is: 'Icelandic',
        it: 'Italian ',
        ja: 'Japanese',
        kn: 'Kannada',
        ko: 'Korean',
        'ku-iq': 'Central Kurdish',
        lv: 'Central Kurdish',
        mk: 'Macedonian',
        'mn-mn': 'Mongolian',
        'ms-my': 'Malay',
        nb: 'Norwegian',
        'ne-np': 'Nepali',
        'nl-be': 'Flemish',
        nl: 'Dutch',
        pl: 'Polish',
        'pt-br': 'Brazilian Portuguese',
        pt: 'European Portuguese',
        ro: 'Romanian',
        ru: 'Russian language',
        sk: 'Slovak',
        sl: 'Slovenian',
        sr: 'Serbian',
        sv: 'Swedish',
        ta: 'Tamil',
        th: 'Thai',
        tr: 'Turkish',
        uk: 'Ukrainian',
        vi: 'Vietnamese',
        'zh-cn': 'Simplified Chinese',
        'zh-tw': 'traditional Chinese'
    },
    menuObj: {
        basicFeature: 'Basic ability',
        cpUse: 'Component use',
        childMenu: {
            0: 'Basic framework',
            1: 'Basic ability',
            '0-0': 'Vue',
            '0-1': 'Ant Design',
            '1-0': 'Frame function',
            '1-0-0': 'Project configuration',
            '1-0-1': 'Front-end log',
            '1-0-2': 'Local mock',
            '1-0-3': 'globalization',
            '1-0-4': 'Data Dictionary',
            '1-0-5': 'EventBus',
            '1-0-6': 'Toolset',
            '1-0-7': 'Access control',
            '1-0-8': 'hot key',
            '1-1': 'Page function',
            '1-1-0': 'Component page',
            '1-1-1': 'url page',
            '1-1-2': 'No permission page',
            '1-1-3': '404 pages'
        },
        defaultMenu: {
            home: 'Home'
        },
        errorTip: {
            notfoundTip: 'No component found under this path',
            emptyErr: 'Component path not configured'
        }
    },
    tagObj: {
        closeAll: 'Close all tabs',
        closeCur: 'Close the current tab',
        closeOther: 'Close other tags',
        closeRight: 'Close right label',
        singlePage: 'Independent page',
        refreshPage: 'refresh page',
        affixPage: 'Fixed page',
        cancelAffixPage: 'Unpin',
        errorTip: {
            homePageCloseError: 'Homepage is not allowed to close',
            affixPageCloseError: 'Fixed page is not allowed to close',
            homePageAffixError: 'Homepage cannot be unpinned'
        },
        checkSave: 'Do you want to close the page?(Please make sure that the content of the red label page has been saved)',
        cancelClose: 'Closed operation canceled'
    },
    personalCenter: {
        frontendLog: 'Front-end log',
        customSetting: 'Personalized settings',
        logout: 'sign out'
    },
    errorPage: {
        errorTip: {
            notfoundTip: 'Sorry, the page you visited does not exist',
            notrightTip: 'Sorry, you do not have permission to access this page',
            noserviceTip: 'Sorry, something went wrong with the server, please try again later'
        },
        btnText: 'Close page'
    },
    searchPanel: {
        btn: {
            search: 'Inquire',
            shrink: 'Collapse',
            reset: 'Reset',
            unshrink: 'Unfold'
        }
    },
    logline: {
        list: 'Log list',
        detail: 'Log details',
        btnList: {
            export: 'Export',
            remove: 'Empty'
        },
        time: {
            plh: 'Please select a time frame',
            range: 'time limit',
            halfDay: 'Within half a day',
            oneDay: 'in one day',
            weekDay: 'within a week',
            monthDay: 'Within one month'
        },
        type: {
            logType: 'Log type',
            plh: 'Please select a log type'
        },
        tableColumns: {
            index: 'Serial number',
            desc: 'Log description',
            type: 'Log type',
            time: 'time',
            op: 'operating'
        },
        request: 'Request data',
        error: {
            cancel: 'Empty operation canceled',
            confirm: 'Do you want to clear the log?(The log will be emptied and cannot be retrieved)'
        },
        success: 'The log has been emptied'
    },
    comTable: {
        columns: {
            title: 'Column settings',
            all: 'select all',
            reset: 'Reset',
            fixedLeft: 'Fixed left',
            fixedRight: 'Fixed right',
            cancelFixed: 'Unpin'
        },
        size: {
            title: 'Row height',
            small: 'narrow',
            normal: 'in',
            large: 'width'
        },
        fullscreen: 'full screen',
        unFullscreen: 'Cancel full screen'
    },
    normalBtn: {
        detail: 'View'
    }
}
