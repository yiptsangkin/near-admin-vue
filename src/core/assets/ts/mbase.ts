// @ts-nocheck
import utils from './utils'
import { mapGetters, mapActions } from 'vuex'
import Bus from '@corets/eventbus';
import hotKeyConfig from '@custom/hotkeyconfig';

export default {
    created () {
        // global log tool
        window.Logline = utils.loglineObj
    },
    computed: {
        ...mapGetters([
            'locale',
            'gloablLocale',
            'comConfig'
        ])
    },
    methods: {
        bindHotKeyEvent (): void {
            const self = this as any
            if (self.comConfig.buildSwitch.isHotKey) {
                window.onkeyup = (e: Event) => {
                    e.preventDefault()
                    Bus.$emit('windowKeyup', e)
                }
                self.initBusListener()
            }
        },
        initBusListener (): void {
            const self = this as any
            Bus.$off('windowKeyup').$on('windowKeyup', (e: KeyboardEvent) => {
                const hotKey = utils.getHotKeyStringList(e)
                const hotKeyPathObj = hotKeyConfig[hotKey]
                const activeCp = self.$refs['active-cp']
                if (hotKeyPathObj) {
                    const hotKeyWildcardList = hotKeyPathObj['*'] || []
                    const hotKeyPageList = hotKeyPathObj[activeCp.pagePath] || []
                    const allHotKeyList = hotKeyWildcardList.concat(hotKeyPageList)
                    allHotKeyList.forEach((item) => {
                        activeCp.triggerEvent(item.method, item.params, hotKey)
                    })
                }
            })
        }
    },
    mounted () {
        const self = this as any
        self.bindHotKeyEvent()
    }
}
