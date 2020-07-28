<template>
    <div class="customer-entry">

    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'
    import {mapGetters} from 'vuex'

    export default Vue.extend({
        name: 'HomePage',
        mixins: [CoreBase, Base],
        computed: {
            ...mapGetters([
                'cacheEntry'
            ])
        }
    })
</script>

<style lang="scss" scoped>
</style>
