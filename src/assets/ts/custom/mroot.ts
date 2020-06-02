// @ts-nocheck

import api from '@api/manage/apiMethod'
import {mapActions} from 'vuex'

export default {
    methods: {
        ...mapActions([
            'changeMenu'
        ]),
        async getUserMenu () {
            const self = this as any
            await api.getUserMenu({
                success (res) {
                    self.changeMenu(res)
                }
            })
        }
    },
    created () {
        const self = this as any
        self.getUserMenu()
    }
}
