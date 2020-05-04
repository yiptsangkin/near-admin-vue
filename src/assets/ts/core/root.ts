import utils from './utils'

export default {
    name: 'Root',
    data () {
        return {}
    },
    methods: {
    },
    created () {
        // global log tool
        window.Logline = utils.loglineObj
    }
}
