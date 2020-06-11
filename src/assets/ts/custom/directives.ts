import store from '@/store'

const permitCtl = (el: any, binding: any) => {
    const userRole = store.getters.userInfo.role
    let flag = 0
    // get user role
    if (binding.value instanceof Array) {
        for (const item of binding.value) {
            if (item[0] && item[0] === '!') {
                // oppose
                if (userRole !== item.substr(1, item.length - 1)) {
                    flag++
                } else {
                    if (el.parentNode) {
                        el.parentNode.removeChild(el)
                    }
                    return false
                }
            } else {
                // equal
                if (userRole === item) {
                    return true
                }
            }
        }
        if (flag === binding.value.length) {
            return true
        } else {
            if (el.parentNode) {
                el.parentNode.removeChild(el)
            }
            return false
        }
    } else {
        if (el.parentNode) {
            el.parentNode.removeChild(el)
        }
        return false
    }
}

export default {
    permit: {
        inserted: permitCtl,
        update: permitCtl
    }
}
