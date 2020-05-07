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
    buildSwitch: BuildSwitch
}

// I18N
export interface GlobalLocale {
    [key: string]: any
}

export interface I18nOption {
    locale: string,
    messages: any
}
