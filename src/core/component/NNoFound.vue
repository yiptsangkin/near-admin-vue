<template>
    <div class="n-not-found-wrp">
        <div class="n-not-found">
            <div class="n-not-found-icon">
                <img :src="iconUrl" alt="404">
            </div>
            <div class="n-not-found-tip">{{ $t(dict.errorPage.errorTip.notfoundTip) }}</div>
            <div class="n-not-found-op">
                <a-button @click="closeCurTag" type="primary">{{ $t(dict.errorPage.btnText) }}</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import dict from '@custom/dict'
    import {mapGetters} from 'vuex'

    export default Vue.extend({
        name: 'NNoFound',
        data() {
            return {
                iconUrl: '/static/images/manage/404.png',
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
