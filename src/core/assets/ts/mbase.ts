// @ts-nocheck
import utils from './utils'
import { mapGetters, mapActions } from 'vuex'
import Bus from '@corets/eventbus';
import hotKeyConfig from '@custom/hotkeyconfig';
import dict from '@custom/dict';

export default {
    created () {
        // global log tool
        window.Logline = utils.loglineObj
    },
    computed: {
        ...mapGetters([
            'locale',
            'gloablLocale',
            'comConfig',
            'isFullScreen',
            'shrinkLeftMenu'
        ])
    },
    methods: {
        ...mapActions([
            'changeFullScreen',
            'changeShrinkLeftMenu'
        ]),
        bindHotKeyEvent (): void {
            const self = this as any
            if (self.comConfig.buildSwitch.isHotKey) {
                window.onkeyup = (e: Event) => {
                    e.preventDefault()
                    Bus.$emit('windowKeyup', e)
                }
            }
        },
        bindResizeEvent (): void {
          window.onresize = (e: Event) => {
              Bus.$emit('windowResize')
          }
        },
        bindScreenEvent (): void {
            document.onfullscreenchange = (e) => {
                Bus.$emit('windowFullScreen')
            }
        },
        initBusListener (): void {
            const self = this as any
            // listen key up event
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
            // listen screen event
            Bus.$off('windowFullScreen').$on('windowFullScreen', (e: KeyboardEvent) => {
                self.changeFullScreen(!self.isFullScreen)
            })
            // listen window resize
            Bus.$off('windowResize').$on('windowResize', (e: KeyboardEvent) => {
                self.shrinkCtl()
            })
        },
        shrinkCtl () {
            const self = this as any
            const curWidth = window.document.body.clientWidth
            if (!self.shrinkLeftMenu && curWidth < dict.commonObj.shrinkThresholdValue) {
                self.changeShrinkLeftMenu(true)
            } else if (self.shrinkLeftMenu && curWidth >= dict.commonObj.shrinkThresholdValue) {
                self.changeShrinkLeftMenu(false)
            }
        }
    },
    mounted () {
        const self = this as any
        self.bindHotKeyEvent()
        self.bindResizeEvent()
        self.bindScreenEvent()
        self.shrinkCtl()
        self.initBusListener()
    }
}
