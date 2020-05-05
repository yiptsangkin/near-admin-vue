// @ts-nocheck
import utils from './utils'
import { mapGetters } from 'vuex'

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
    },
    computed: {
        ...mapGetters([
            'locale',
            'gloablLocale'
        ])
    }
}
