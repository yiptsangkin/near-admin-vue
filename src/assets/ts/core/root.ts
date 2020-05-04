import utils from './utils'

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
