// @ts-nocheck

import Bus from '@ts/core/eventbus'
import { mapGetters } from 'vuex'
import HotKeyConfig from '@ts/custom/hotkeyconfig'
import utils from '@ts/core/utils'

export default {
    name: 'CoreBase',
    props: {
        pagePath: {
            type: String
        }
    },
    components: {},
    data () {
        return {
            dict
        }
    },
    computed: {
        ...mapGetters([
            'comConfig'
        ])
    },
    methods: {
        bindHotKeyEvent (): void {
            const self = this
            if (self.comConfig.buildSwitch.isHotKey) {
                window.onkeyup = (e: Event) => {
                    e.preventDefault()
                    Bus.$emit('windowKeyup', e)
                }
                self.initBusListener()
            }
        },
        triggerEvent (methodName, params, hotKey): void {
            const self = this
            if (self[methodName]) {
                self[methodName](params, hotKey)
            }
        },
        initBusListener (): void {
            const self = this
            Bus.$off('windowKeyup').$on('windowKeyup', (e: KeyboardEvent) => {
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
    created () {
        const self = this
        self.bindHotKeyEvent()
    }
}
