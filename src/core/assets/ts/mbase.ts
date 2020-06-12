// @ts-nocheck
import utils from './utils'
import { mapGetters } from 'vuex'
import Bus from '@corets/eventbus';
import HotKeyConfig from '@corets/type';

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
        triggerEvent (methodName, params, hotKey): void {
            const self = this as any
            if (self[methodName]) {
                self[methodName](params, hotKey)
            }
        },
        initBusListener (): void {
            const self = this as any
            Bus.$off('windowKeyup').$on('windowKeyup', (e: KeyboardEvent) => {
                console.log(e)
                const hotKey = utils.getHotKeyStringList(e)
                const hotKeyPathObj = HotKeyConfig[hotKey]
                if (hotKeyPathObj) {
                    const hotKeyWildcardList = hotKeyPathObj['*'] || []
                    const hotKeyEventList = hotKeyWildcardList.concat(hotKeyPathObj[self.pagePath] || [])
                    hotKeyEventList.forEach((item) => {
                        self.triggerEvent(item.method, item.params, hotKey)
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
