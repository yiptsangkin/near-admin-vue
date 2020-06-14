import {ComRespone} from '@corets/type'

const DEFAULT_MALE_AVATAR = `/static/images/common/default_handsome.jpg`
const DEFAULT_FEMALE_AVATAR = `/static/images/common/default_beauty.jpg`

export const getSendMsg = (req: any): ComRespone => {
    console.log(
        `%c near-admin %c here mock request %c`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#dbaf05 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
    )
    console.log(`%c${JSON.stringify(req, null, 4)}`, 'color: #dbaf05')
    return {
        code: 0,
        message: '获取成功',
        data: {
            msgCode: (1000 + parseInt((Math.random() * 8999).toString(), 10)).toString()
        },
        timestamp: new Date().getTime()
    }
}

export const checkLoginByAccount = (req: any): ComRespone => {
    console.log(
        `%c near-admin %c here mock request %c`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#dbaf05 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
    )
    console.log(`%c${JSON.stringify(req, null, 4)}`, 'color: #dbaf05')
    const body = JSON.parse(req.body || '{}')
    if (body.username === 'admin' && body.password === '123456') {
        return {
            code: 0,
            data: {},
            message: 'login successfully',
            timestamp: new Date().getTime()
        }
    } else {
        return {
            code: -1,
            data: {},
            message: 'wrong username or password',
            timestamp: new Date().getTime()
        }
    }
}

export const checkLoginByPhone = (req: any): ComRespone => {
    console.log(
        `%c near-admin %c here mock request %c`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#dbaf05 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
    )
    console.log(`%c${JSON.stringify(req, null, 4)}`, 'color: #dbaf05')
    const body = JSON.parse(req.body || '{}')
    if (body.inputCode === body.validCode) {
        return {
            code: 0,
            data: {},
            message: 'login successfully',
            timestamp: new Date().getTime()
        }
    } else {
        return {
            code: -1,
            data: {},
            message: 'wrong valid code',
            timestamp: new Date().getTime()
        }
    }
}

export const getUserMenu = (req: any): ComRespone => {
    console.log(
        `%c near-admin %c here mock request %c`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#dbaf05 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
    )
    console.log(`%c${JSON.stringify(req, null, 4)}`,
        'color: #dbaf05;')
    return {
        code: 0,
        data: {
            menuList: [
                {
                    name: 'menuObj.basicFeature',
                    path: '',
                    icon: '',
                    child: [
                        {
                            name: 'menuObj.childMenu.0',
                            path: '',
                            icon: 'appstore',
                            child: [
                                {
                                    name: 'menuObj.childMenu.0-0',
                                    path: 'https://vuejs.org',
                                    icon: ''
                                },
                                {
                                    name: 'menuObj.childMenu.0-1',
                                    path: 'https://antdv.com',
                                    icon: ''
                                }
                            ]
                        },
                        {
                            name: 'menuObj.childMenu.1',
                            path: '',
                            icon: 'calculator',
                            child: [
                                {
                                    name: 'menuObj.childMenu.1-0',
                                    path: '',
                                    icon: '',
                                    child: [
                                        {
                                            name: 'menuObj.childMenu.1-0-0',
                                            path: 'home/HomePage',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-0-1',
                                            path: '',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-0-2',
                                            path: '',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-0-3',
                                            path: '',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-0-4',
                                            path: '',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-0-5',
                                            path: '',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-0-6',
                                            path: '',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-0-7',
                                            path: '',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-0-8',
                                            path: '',
                                            icon: ''
                                        }
                                    ]
                                },
                                {
                                    name: 'menuObj.childMenu.1-1',
                                    path: '',
                                    icon: '',
                                    child: [
                                        {
                                            name: 'menuObj.childMenu.1-1-0',
                                            path: '',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-1-1',
                                            path: '',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-1-2',
                                            path: '',
                                            icon: ''
                                        },
                                        {
                                            name: 'menuObj.childMenu.1-1-3',
                                            path: '',
                                            icon: ''
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'menuObj.cpUse',
                    path: '',
                    icon: '',
                    child: [
                    ]
                }
            ]
        },
        message: 'get menu list successful',
        timestamp: new Date().getTime()
    }
}

export const getUserInfo = (req: any): ComRespone => {
    console.log(
        `%c near-admin %c here mock request %c`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#dbaf05 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
    )
    console.log(`%c${JSON.stringify(req, null, 4)}`,
        'color: #dbaf05;')
    return {
        code: 0,
        data: {
            avatar: DEFAULT_MALE_AVATAR,
            userName: 'nearyip',
            role: 'admin',
            roleName: 'Administrator',
            gender: 0
        },
        message: '获取成功',
        timestamp: new Date().getTime()
    }
}
