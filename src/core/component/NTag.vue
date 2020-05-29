<template>
    <div class="n-tag">
        <div class="n-tag-scroll-hider">
            <span v-for="(item, index) in curTagList" :key="index" :class="[curTagIndex === index ? 'cur' : '']" @click="changeCp(index)">
                {{ $t(item.title) }}<a-icon class="n-tag-close" type="close" />
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {mapGetters} from 'vuex'

    export default Vue.extend({
        name: 'NTag',
        data () {
            return {
            }
        },
        computed: {
            ...mapGetters([
                'curTagList',
                'curTagIndex'
            ])
        },
        methods: {
            changeCp (idx: number) {
                const self = this
                self.$emit('change-cp', self.curTagList[idx], false)
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/tag.scss'
</style>
