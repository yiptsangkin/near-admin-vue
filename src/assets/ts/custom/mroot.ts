// @ts-nocheck

import api from '@api/manage/apiMethod'
import {mapActions} from 'vuex'
import {MenuList} from '@corets/type';
import utils from '@corets/utils';

export default {
    methods: {
        ...mapActions([
            'changeMenu',
            'changeUserInfo',
            'changeRightPathList'
        ]),
        getUserMenu () {
            const self = this as any
            api.getUserMenu({
                success (res) {
                    self.changeMenu(res)
                    self.setRightPath(res)
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
        },
        setRightPath (menuObj) {
            const self = this
            // to set right path for visitor, not in the right path will show 403 page
            const rightPathList = self.getRootCp(menuObj.menuList)
            const uniqueRightPathSet = new Set(rightPathList)
            self.changeRightPathList([...uniqueRightPathSet])
        },
        getRootCp (menuList: MenuList) {
            const self = this as any
            let rightPathList = []
            menuList.forEach((item) => {
                if (utils.isEmpty(item.child) && !utils.isEmpty(item.path)) {
                    if (utils.isUrl(item.path)) {
                        rightPathList.push(item.path)
                    }
                    rightPathList.push(item.path)
                } else if (!utils.isEmpty(item.child) && utils.isEmpty(item.path)) {
                    rightPathList = rightPathList.concat(self.getRootCp(item.child))
                }
            })
            return rightPathList
        }
    },
    created () {
        const self = this as any
        self.getUserMenu()
        self.getUserInfo()
    }
}
