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
    isBreadCrumb: boolean    // if show bread crumb
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
interface NavList {
    name: string,
    path?: string,
    icon?: string,
    groupName?: string,
    params?: any,
    child?: NavList[]
}

export interface MenuList {
    menuList: NavList[]
}

export interface CpInfo {
    idx?: number,
    component: string,
    title: string,
    navIndex: string,
    params?: any,
    cacheName?: string,
    pk?: string | number | boolean
}
