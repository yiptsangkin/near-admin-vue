export default {
    locale: 'zh-tw',
    country: 'TW',
    loginForm: {
        byAccountBtn: '賬戶密碼登錄',
        byPhoneBtn: '手機號登錄',
        accountPlaceholder: '請輸入賬號（默認賬號ADMIN）',
        passwordPlaceholder: '請輸入密碼（默認密碼123456）',
        autoLogin: '自動登錄',
        forgetBtn: '忘記密碼',
        loginBtn: '登錄',
        byAccountTip: {
            emptyErr: '賬號不能為空'
        },
        byPasswordTip: {
            emptyErr: '密碼不能為空'
        },
        byValidTip: {
            emptyErr: '驗證碼不能為空'
        },
        sendMsg: {
            repeatErr: '請勿重複發送',
            success: '獲取成功',
            codeTip: '您的驗證碼為'
        },
        phonePlaceholder: '請輸入手機號',
        validPlaceholder: '驗證碼',
        validBtn: '獲取驗證碼',
        loginSuccess: '登錄成功'
    },
    menuObj: {
        basicFeature: '基礎能力',
        cpUse: '組件使用',
        childMenu: {
            0: '基礎框架',
            1: '基礎能力',
            '0-0': 'Vue',
            '0-1': 'Ant Design',
            '0-2': 'Near Admin Vue',
            '1-0': '框架功能',
            '1-0-0': '項目配置',
            '1-0-1': '前端日誌',
            '1-0-2': '本地mock',
            '1-0-3': '國際化',
            '1-0-4': '數據字典',
            '1-0-5': 'EventBus',
            '1-0-6': '工具集',
            '1-0-7': '權限控制',
            '1-0-8': '快捷鍵',
            '1-1': '頁面功能',
            '1-1-0': '組件頁面',
            '1-1-1': 'url頁面',
            '1-1-2': '無權限頁面',
            '1-1-3': '404頁面'
        },
        errorTip: {
            notfoundTip: '未找到該路徑下的組件',
            emptyErr: '未配置組件路徑'
        }
    },
    coreMenuObj: {
        defaultMenu: {
            home: '首頁'
        }
    },
    sysInfo: {
        sysIntro: '一款基於Vue和Ant Design的好用中後台前端開發框架'
    },
    requestInfo: {
        withoutUrl: '請求地址不能為空',
        networkErr: '網絡請求失敗，請稍後重試'
    },
    localeMap: {
        ar: '阿拉伯文',
        bg: '保加利亞文',
        ca: '加泰羅尼亞文',
        cs: '捷克文',
        da: '丹麥文',
        de: '德文',
        el: '希臘文',
        'en-gb': '英文',
        en: '英文',
        es: '西班牙文',
        et: '愛沙尼亞文',
        fa: '波斯語',
        fi: '芬蘭文',
        fr: '法文',
        he: '希伯來語',
        hi: '印地語',
        hr: '克羅地亞文',
        hu: '匈牙利文',
        hy: '亞美尼亞語',
        id: '印度尼西亞語',
        is: '冰島語',
        it: '意大利文',
        ja: '日文',
        kn: '卡納達語',
        ko: '韓語',
        'ku-iq': '中央庫爾德語',
        lv: '中央庫爾德語',
        mk: '馬其頓語',
        'mn-mn': '蒙古語',
        'ms-my': '馬來語',
        nb: '挪威語',
        'ne-np': '尼泊爾語',
        'nl-be': '弗拉芒語',
        nl: '荷蘭語',
        pl: '波蘭語',
        'pt-br': '巴西葡萄牙語',
        pt: '歐洲葡萄牙語',
        ro: '羅馬尼亞語',
        ru: '俄羅斯語',
        sk: '斯洛伐克語',
        sl: '斯洛文尼亞語',
        sr: '塞爾維亞語',
        sv: '瑞典語',
        ta: '泰米爾語',
        th: '泰語',
        tr: '土耳其語',
        uk: '烏克蘭語',
        vi: '越南語',
        'zh-cn': '簡體中文',
        'zh-tw': '繁體中文'
    },
    tagObj: {
        closeAll: '關閉全部標籤',
        closeCur: '關閉當前標籤',
        closeOther: '關閉其他標籤',
        closeRight: '關閉右側標籤',
        singlePage: '獨立頁面',
        refreshPage: '刷新頁面',
        affixPage: '固定頁面',
        cancelAffixPage: '取消固定',
        errorTip: {
            homePageCloseError: '首頁不允許關閉',
            affixPageCloseError: '固定頁不允許關閉',
            homePageAffixError: '首頁無法取消固定'
        },
        checkSave: '是否關閉頁面？ （請確保標紅標籤頁面內容已經保存）',
        cancelClose: '已取消關閉操作'
    },
    personalCenter: {
        frontendLog: '前端日誌',
        customSetting: '個性化設置',
        customClean: '清空配置',
        cacheClean: '清空緩存',
        logout: '退出登錄',
        errorTip: {
            cleanSuccess: '清空成功'
        }
    },
    errorPage: {
        errorTip: {
            notfoundTip: '抱歉，你訪問的頁面不存在',
            notrightTip: '抱歉，你沒有權限訪問該頁面',
            noserviceTip: '抱歉，服務器發生了問題，請稍後重試'
        },
        btnText: '關閉頁面'
    },
    searchPanel: {
        btn: {
            search: '查詢',
            shrink: '收起',
            reset: '重置',
            unshrink: '展開'
        }
    },
    logline: {
        list: '日誌列表',
        detail: '日誌詳情',
        btnList: {
            export: '導出',
            remove: '清空'
        },
        time: {
            plh: '請選擇時間範圍',
            range: '時間範圍',
            halfDay: '半天內',
            oneDay: '一天內',
            weekDay: '一周內',
            monthDay: '一個月內'
        },
        type: {
            logType: '日誌類型',
            plh: '請選擇日誌類型'
        },
        tableColumns: {
            index: '序號',
            desc: '日誌描述',
            type: '日誌類型',
            time: '時間',
            op: '操作'
        },
        request: '請求數據',
        error: {
            cancel: '已取消清空操作',
            confirm: '是否清空日誌？ （日誌清空將無法找回）'
        },
        success: '日誌已清空'
    },
    comTable: {
        delete: {
            title: '清除配置'
        },
        columns: {
            title: '列設置',
            all: '全選',
            reset: '重置',
            fixedLeft: '固定左邊',
            fixedRight: '固定右邊',
            cancelFixed: '取消固定'
        },
        size: {
            title: '行高',
            small: '窄',
            normal: '中',
            large: '寬'
        },
        fullscreen: '全屏',
        unFullscreen: '取消全屏'
    },
    normalBtn: {
        detail: '查看'
    },
    setting: {
        customEntry: '快捷入口',
        systemSwitch: '系統配置',
        isMock: '是否Mock',
        isHotKey: '是否快捷鍵',
        isBreadCrumb: '是否麵包屑',
        isCache: '是否緩存',
        isI18n: '是否國際化'
    },
    pagingInfo: {
        total: '總共',
        uint: '條',
        items: '記錄'
    }
}
