<template>
    <div class="setting-wrp">
        <n-common-title :title="dict.localeObj.setting.systemSwitch" no-top></n-common-title>
        <div class="setting-form">
            <a-form-model class="n-form" ref="n-form" :colon="false" layout="inline" :model="comConfig.buildSwitch">
                <a-row>
                    <a-col :xs="24" :sm="12" :md="6" :lg="4">
                        <a-form-model-item :label="$t(dict.localeObj.setting.isMock)" prop="dateRange">
                            <a-switch v-model="comConfig.buildSwitch.isMock"></a-switch>
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6" :lg="4">
                        <a-form-model-item :label="$t(dict.localeObj.setting.isCache)" prop="dateRange">
                            <a-switch v-model="comConfig.buildSwitch.isCache"></a-switch>
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6" :lg="4">
                        <a-form-model-item :label="$t(dict.localeObj.setting.isBreadCrumb)" prop="dateRange">
                            <a-switch v-model="comConfig.buildSwitch.isBreadCrumb"></a-switch>
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6" :lg="4">
                        <a-form-model-item :label="$t(dict.localeObj.setting.isHotKey)" prop="dateRange">
                            <a-switch v-model="comConfig.buildSwitch.isHotKey"></a-switch>
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6" :lg="4">
                        <a-form-model-item :label="$t(dict.localeObj.setting.isI18n)" prop="dateRange">
                            <a-switch v-model="comConfig.buildSwitch.isI18n"></a-switch>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </div>
        <n-common-title :title="dict.localeObj.setting.customEntry" no-top></n-common-title>
        <a-transfer
                :data-source="sourceData"
                show-search
                :target-keys="targetData"
                :render="item => `${$t(item.title)}`"
                @change="handlerChange"
        >
        </a-transfer>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import {mapGetters, mapActions} from 'vuex'
    import Base from '@custom/base'
    import utils from '@corets/utils'
    import NCommonTitle from '@corecp/NCommonTitle.vue'

    export default Vue.extend({
        name: 'Setting',
        mixins: [CoreBase, Base],
        components: {
            NCommonTitle
        },
        data () {
            return {
                sourceData: [],
                targetData: []
            }
        },
        computed: {
            ...mapGetters([
                'menuObj',
                'comConfig'
            ])
        },
        created () {
            const self = this as any
            self.init()
        },
        watch: {
            'comConfig.buildSwitch': {
                deep: true,
                handler (val, oldval) {
                    localStorage.setItem('nearAdminCacheConfig', JSON.stringify(val))
                }
            },
            'comConfig.buildSwitch.isI18n' () {
                // if isI18n change, refresh page
                window.location.reload()
            }
        },
        methods: {
            ...mapActions([
                'changeCacheEntry'
            ]),
            init () {
                const self = this as any
                self.sourceData = utils.getMenuRootCp(self.menuObj.menuList, true)
                if (self.comConfig.buildSwitch.isCache) {
                    // get cache entry
                    const cacheEntry = localStorage.getItem('nearAdminCustomerEntry')
                    self.targetData = cacheEntry ? JSON.parse(cacheEntry) : []
                }
            },
            handlerChange(targetKeys: any) {
                const self = this as any
                self.targetData = targetKeys
                if (self.comConfig.buildSwitch.isCache) {
                    localStorage.setItem('nearAdminCustomerEntry', JSON.stringify(targetKeys))
                    const cacheEntry = utils.getMenuRootCp(self.menuObj.menuList, true, undefined, targetKeys)
                    self.changeCacheEntry(cacheEntry)
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/setting.scss'
</style>
