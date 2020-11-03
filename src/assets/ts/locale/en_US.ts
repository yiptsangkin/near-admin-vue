export default {
    locale: 'en',
    country: 'US',
    loginForm: {
        byAccountBtn: 'Account password login',
        byPhoneBtn: 'Mobile number login',
        accountPlaceholder: 'Please input Username',
        passwordPlaceholder: 'Please enter password',
        autoLogin: 'automatic log-in',
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
            success: 'Successful',
            codeTip: 'Your verification code is'
        },
        phonePlaceholder: 'Please enter phone number',
        validPlaceholder: 'Verification code',
        validBtn: 'get verification code',
        loginSuccess: 'login successful'
    },
    menuObj: {
        basicFeature: 'Basic ability',
        cpUse: 'Component usage',
        childMenu: {
            0: 'Basic framework',
            1: 'Basic ability',
            '0-0': 'Vue',
            '0-1': 'Ant Design',
            '0-2': 'Near Admin Vue',
            '1-0': 'Framework function',
            '1-0-0': 'Project configuration',
            '1-0-1': 'Frontend log',
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
            '1-1-3': '404 page'
        },
        errorTip: {
            notfoundTip: 'The component under this path was not found',
            emptyErr: 'Unconfigured component path'
        }
    },
    coreMenuObj: {
        defaultMenu: {
            home: 'Home'
        }
    },
    sysInfo: {
        sysIntro: 'A useful middle and back-end front-end development framework based on Vue and Ant Design'
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
    tagObj: {
        closeAll: 'Close all tabs',
        closeCur: 'Close current tab',
        closeOther: 'Close other tabs',
        closeRight: 'Close right label',
        singlePage: 'Independent page',
        refreshPage: 'refresh page',
        affixPage: 'Pin page',
        cancelAffixPage: 'Unpin',
        errorTip: {
            homePageCloseError: 'Homepage is not allowed to close',
            affixPageCloseError: 'Fixed page is not allowed to close',
            homePageAffixError: 'Homepage cannot be unpinned'
        },
        checkSave: 'Do you want to close the page?(Please make sure that the content of the page marked in red has been saved)',
        cancelClose: 'Close operation canceled'
    },
    personalCenter: {
        frontendLog: 'Frontend log',
        customSetting: 'Personalization',
        customClean: 'Clear configuration',
        cacheClean: 'Empty the cache',
        logout: 'sign out',
        errorTip: {
            cleanSuccess: 'Empty successfully'
        }
    },
    errorPage: {
        errorTip: {
            notfoundTip: 'Sorry, the page you visited does not exist',
            notrightTip: 'Sorry, you do not have permission to access this page',
            noserviceTip: 'Sorry, there was a problem with the server, please try again later'
        },
        btnText: 'Close page'
    },
    searchPanel: {
        btn: {
            search: 'Inquire',
            shrink: 'Put away',
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
            plh: 'Please select a time range',
            range: 'time limit',
            halfDay: 'Half a day',
            oneDay: 'in one day',
            weekDay: 'within a week',
            monthDay: 'Within a month'
        },
        type: {
            logType: 'Log type',
            plh: 'Please select log type'
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
            cancel: 'Empty operation cancelled',
            confirm: 'Do you want to clear the log?(If the log is emptied, it cannot be retrieved)'
        },
        success: 'Log has been emptied'
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
    },
    setting: {
        customEntry: 'Quick entry',
        systemSwitch: 'System Configuration',
        isMock: 'Whether Mock',
        isHotKey: 'Whether shortcut key',
        isBreadCrumb: 'Whether bread crumbs',
        isCache: 'Whether to cache',
        isI18n: 'Whether to internationalize'
    },
    pagingInfo: {
        total: 'In total',
        uint: 'Article',
        items: 'recording'
    }
}
