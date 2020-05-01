import utils from '@js/utils'

export default {
    name: 'Root',
    data () {
        return {}
    },
    created () {
        // global log tool
        window.Logline = utils.loglineObj
    }
}
