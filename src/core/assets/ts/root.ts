// @ts-nocheck
import utils from './utils'
import { mapGetters } from 'vuex'
import Bus from '@corets/eventbus';
import HotKeyConfig from '@corets/type';

export default {
    data () {
        return {}
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
