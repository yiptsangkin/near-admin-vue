<template>
    <div class="n-not-found-wrp">
        <div class="n-not-found">
            <div class="n-not-found-icon">
                <img :src="iconUrl" alt="403">
            </div>
            <div class="n-not-found-tip">
                {{ $t(dict.localeObj.errorPage.errorTip.notrightTip) }}</div>
            <div class="n-not-found-op">
                <a-button @click="closeCurTag" type="primary">{{ $t(dict.localeObj.errorPage.btnText) }}</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import dict from '@custom/dict'
    import {mapGetters} from 'vuex'
    import CoreBase from '@corets/base'

    export default Vue.extend({
        name: 'NNoRight',
        mixins: [CoreBase],
        data() {
            return {
                iconUrl: '/iport-new/static/images/manage/403.png',
                dict
            }
        },
        computed: {
            ...mapGetters(['curTagIndex'])
        },
        methods: {
            closeCurTag () {
                const self = this as any
                self.$closepage({
                    idx: self.curTagIndex
                })
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/error.scss'
</style>
