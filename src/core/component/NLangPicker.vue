<template>
    <div class="n-global-locale">
        <a-dropdown :trigger="['hover']">
            <a-icon type="global" class="n-locale-icon"/>
            <a-menu slot="overlay" @click="pickLocale" class="n-lang-menu" v-model="currentSelectedKeys">
                <a-menu-item v-for="(item, index) in ableLocaleList" :key="item.locale">
                    <a target="_blank" rel="noopener noreferrer">
                        <template v-if="deviceInfo !== 'Windows'">
                            <span class="n-lang-flag">{{ item.flag }}</span>
                        </template>
                        <template v-else>
                            <span class="n-lang-tag">{{ item.locale.toUpperCase() }}</span>
                        </template>
                        {{ ableLocaleMap[item.locale].localeMap[item.locale] }}
                    </a>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {mapGetters, mapActions} from 'vuex'
    import CountryFlag from '@corets/countryflag'
    import utils from '@corets/utils'

    interface PickerEvent {
        key: string
    }

    export default Vue.extend({
        name: 'NLangPicker',
        data () {
            return {
                currentSelectedKeys: [],
                deviceInfo: utils.getDeviceInfo('machine')
            }
        },
        computed: {
            ...mapGetters([
               'locale'
            ]),
            ableLocaleList () {
                const self = this as any
                const newAbleList: object[] = []
                const localeObj = self.$i18n.messages
                Object.keys(localeObj).forEach((key) => {
                    newAbleList.push({
                        flag: `${new CountryFlag().getFlagByChar(localeObj[key].country)}`,
                        locale: key
                    })
                })
                return newAbleList
            },
            ableLocaleMap () {
                const self = this as any
                return self.$i18n.messages
            }
        },
        methods: {
            ...mapActions([
                'changeLocale'
            ]),
            pickLocale (e: PickerEvent) {
                const self = this as any
                self.$i18n.locale = e.key
                self.currentSelectedKeys = [e.key]
                // cache in localStorge
                localStorage.setItem('nearAdminLang', e.key)
                // update vuex state
                self.changeLocale(e.key)
            }
        },
        created () {
            const self = this as any
            self.currentSelectedKeys = [self.locale]
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/auth/langpicker.scss'
</style>
