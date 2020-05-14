export const getSendMsg = (req: any): object => {
    console.log('%c here is mock request', 'color: yellow')
    console.log(`%c ${JSON.stringify(req, null, 4)}`, 'color: yellow')
    return {
        code: 0,
        data: {
            msgCode: (1000 + parseInt((Math.random() * 8999).toString(), 10)).toString()
        }
    }
}

export const checkLoginByAccount = (req: any): object => {
    console.log('%c here is mock request', 'color: yellow')
    console.log(`%c ${JSON.stringify(req, null, 4)}`, 'color: yellow')
    const body = JSON.parse(req.body || '{}')
    if (body.username === 'admin' && body.password === '123456') {
        return {
            code: 0,
            data: {},
            message: 'login successfully'
        }
    } else {
        return {
            code: -1,
            data: {},
            message: 'wrong username or password'
        }
    }
}

export const checkLoginByPhone = (req: any): object => {
    console.log('%c here is mock request', 'color: yellow')
    console.log(`%c ${JSON.stringify(req, null, 4)}`, 'color: yellow')
    const body = JSON.parse(req.body || '{}')
    if (body.inputCode === body.validCode) {
        return {
            code: 0,
            data: {},
            message: 'login successfully'
        }
    } else {
        return {
            code: -1,
            data: {},
            message: 'wrong valid code'
        }
    }
}
