// Cache Route
export interface CacheRouteConfig {
    path: string,
    name: string,
    props: string,
    component: any,
    componentPath: string
}

// User Info
export interface UserInfo {
    avatar: string,
    userName: string,
    role: string,
    roleName: string,
    gender: number
}

// Hot Key
interface HotKeyDetailConfig {
    name: string,
    method: any,
    params?: any
}

interface HotKeyEffectPath {
    [key: string]: HotKeyDetailConfig[]
}

export interface HotKeyConfig {
    [key: string]: HotKeyEffectPath
}

export interface HadKey {
    isKey: boolean,
    name: string
}

// Config
interface SysInfo {
    name: string,          // system name
    logo?: string,         // system logo
    description?: string,  // system description
    appId?: string,        // system app id
    appSecret?: string,    // system app secret
    apiHost: string,       // system api host
    noNeedCheckRightPath: string[]   // no need to check if user have rigth to visit
}

interface BuildSwitch {
    isMock: boolean,    // if use local mock
    isHotKey: boolean,  // if use global hot key
    isBreadCrumb: boolean,    // if show bread crumb
    isCache: boolean
}

export interface ComConfig {
    sysInfo: SysInfo,
    buildSwitch: BuildSwitch,
    apiHost: string
}

// I18N
export interface GlobalLocale {
    [key: string]: any
}

export interface I18nOption {
    locale: string,
    messages: any
}

// Request
export interface ReqType {
    headers?: any,
    responseType?: | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream',
    method?: string,
    timeout?: number,
    data?: any,
    url?: string,
    success?: any,
    fail?: any,
    error?: any
}

// Response
export interface ResType {
    code: number,
    data: any,
    message: string,
    timestamp: number
}

// Logline
export interface LoglineParams {
    module?: string,
    logType: string,
    desc: string,
    data: any
}

// Common Response
export interface ComRespone {
    code: number,
    message: string,
    timestamp: number,
    data: any
}

// Menu List
export interface NavList {
    name: string,
    path?: string,
    icon?: string | {
        value: string,
        type: 'common' | 'aicon'
    },
    groupName?: string,
    params?: any,
    child?: NavList[]
}

export interface MenuList {
    menuList: NavList[]
}

interface CpParams {
    apiNew?: boolean,
    withoutCache?: boolean,
    isAffix?: boolean,
    checkSave?: boolean,
    dataUrl?: string
}

export interface CpInfo {
    component: string,
    title: string,
    navIndex?: string,
    params?: CpParams,
    isUrl?: boolean,
    pk?: string | number | boolean,
    breadList?: any[]
}

export interface ClosePageOpt {
    // close page type
    // 1. 'cur': close current tag;
    // 2. 'right': close right tag;
    // 3. 'other': close other tag;
    // 4. 'all': close all tag
    type?: string,
    // current tag index
    idx: number,
    // after close tag, where it will go, enter the target index
    target?: number
}

export interface UpdatePageOpt {
    idx: number,
    updateCpInfo: CpInfo
}
