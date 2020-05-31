import store from '@store/index'
import {CpInfo, ClosePageOpt} from '@corets/type'
import {mapActions} from 'vuex'
import utils from '@corets/utils';

const pluginObj = {
    install (Vue: any) {
        const self = new Vue({
            store,
            methods: {
                ...mapActions([
                    'changeTag'
                ])
            }
        })
        Vue.prototype.$newpage = (cpInfo: CpInfo) => {
            // set apiNew to true
            if (cpInfo.params) {
                cpInfo.params.apiNew = true
            } else {
                cpInfo.params = {
                    apiNew: true
                }
            }
            // check if have component pk, if not, create a pk for component
            if (!cpInfo.pk) {
                cpInfo.pk = utils.randomCharacter(6)
            }
            self.changeTag({
                op: 'add',
                cpInfo
            })
        }
        Vue.prototype.$closepage = (closeOpt: ClosePageOpt) => {
            self.changeTag({
                op: 'remove',
                closeOpt
            })
        }
    }
}

export default pluginObj
