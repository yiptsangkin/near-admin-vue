import {UserInfo} from '@js/core/type'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

const DEFAULT_MALE_AVATAR = `/static/images/common/default_handsome.jpg`
const DEFAULT_FEMALE_AVATAR = `/static/images/common/default_beauty.jpg`

interface State {
    userInfo: UserInfo,
    lang: string
}

interface Getter {
    [key: string]: any
}

const state: State = {
    userInfo: {
        avatar: DEFAULT_MALE_AVATAR,
        userName: '',
        role: '',
        roleName: '',
        gender: 0
    },
    lang: zhCN
}

const getters: Getter = {
    userInfo: (getterState: State) => {
        return getterState.userInfo
    },
    lang: (getterState: State) => {
        return getterState.lang
    }
}

export default {
    state,
    getters
}
