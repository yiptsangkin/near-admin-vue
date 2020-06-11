// @ts-nocheck

import api from '@api/manage/apiMethod'
import {mapActions} from 'vuex'

export default {
    methods: {
        ...mapActions([
            'changeMenu',
            'changeUserInfo'
        ]),
        getUserMenu () {
            const self = this as any
            api.getUserMenu({
                success (res) {
                    self.changeMenu(res)
                }
            })
        },
        getUserInfo () {
            const self = this as any
            api.getUserInfo({
                success (res) {
                    self.changeUserInfo(res)
                }
            })
        }
    },
    created () {
        const self = this as any
        self.getUserMenu()
        self.getUserInfo()
    }
}
