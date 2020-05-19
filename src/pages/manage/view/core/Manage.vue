<template>
    <div class="n-manage-ctx">
        <a-layout class="n-layout-wrp">
            <n-header></n-header>
            <a-layout>
                <n-aside></n-aside>
                <a-layout-content class="n-layout-content"></a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@core/base'
    import NAside from '../../component/core/NAside.vue'
    import NHeader from '../../component/core/NHeader.vue'

    export default Vue.extend({
        name: 'Manage',
        mixins: [CoreBase],
        components: {
            NAside,
            NHeader
        },
        data () {
            return {}
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@scss/core/manage/manage.scss'
</style>
