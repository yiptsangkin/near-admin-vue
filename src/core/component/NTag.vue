<template>
    <div class="n-tag">
        <div class="n-tag-scroll-hider">
            <span
                    v-for="(item, index) in curTagList"
                    :key="index"
                    :class="[
                         curTagIndex === index ? 'cur' : '',
                         saveWarning && item.params && item.params.checkSave && !item.params.isAffix ? 'n-tag-warning' : ''
                     ]"
                    @click="changeCp(index)"
                    @contextmenu.prevent="showContextMenu($event, index)"
            >
                <i class="n-tag-affix" v-if="(item.params && item.params.isAffix)"></i>{{ $t(item.title) }}<a-icon v-if="!(item.params && item.params.isAffix)" class="n-tag-close" type="close" @click.stop="closeTag(index)"/>
            </span>
        </div>
        <a-dropdown class="n-tag-dropdown" v-if="showDropDown">
            <a-icon type="down" />
            <a-menu slot="overlay" class="n-tag-dropdown-menu" v-model="currentSelectedKeys">
                <a-menu-item v-for="(item, index) in curTagList" :key="index" @click="changeCp(index)">
                    <a target="_blank" rel="noopener noreferrer">{{ $t(item.title) }}</a>
                </a-menu-item>
                <a-menu-item>
                    <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.closeAll) }}</a>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {mapGetters} from 'vuex'
    import dict from '@custom/dict'
    import bus from '@corets/eventbus'

    export default Vue.extend({
        name: 'NTag',
        data () {
            return {
                dict,
                showDropDown: false
            }
        },
        computed: {
            ...mapGetters([
                'curTagList',
                'curTagIndex',
                'saveWarning'
            ]),
            currentSelectedKeys () {
                const self = this as any
                return [self.curTagIndex]
            }
        },
        watch: {
            curTagList (val) {
                // watch tag list to judge if will show the tag dropdown
                const self = this as any
                self.$nextTick(() => {
                    const sumTagWidth = self.getTagDomLength()
                    const tagWrpDom = self.$el
                    // 32 is the n-tag-scroll-hider's padding
                    if (tagWrpDom.clientWidth < sumTagWidth) {
                        self.showDropDown = true
                    } else {
                        self.showDropDown = false
                    }
                    self.moveTagToCenter()
                })
            }
        },
        methods: {
            changeCp (idx: number) {
                const self = this as any
                self.$emit('change-cp', self.curTagList[idx], false)
                self.$nextTick(() => {
                    self.moveTagToCenter()
                })
            },
            showContextMenu (e: any, idx: any) {
                bus.$emit('tagCtxMenu', {
                    x: e.clientX,
                    y: e.offsetY,
                    idx
                })
            },
            closeTag (idx: number) {
                const self = this as any;
                if (idx === 0) {
                    self.$message.warn(self.$t(dict.localeObj.tagObj.errorTip.homePageCloseError).toString());
                } else {
                    self.$closepage({
                        idx
                    })
                }
            },
            getTagDomLength () {
                const self = this as any
                let spanLength = 0
                const tagDomList = self.$el.querySelectorAll('.n-tag-scroll-hider span')
                for (const item of tagDomList) {
                    spanLength += item.clientWidth
                }
                const borderLength = (tagDomList.length - 1) * 2
                return (spanLength + borderLength + 32)
            },
            curTagDistFromLeft (idx: number) {
                // to move tag to center position
                const self = this as any
                let spanLength = 0
                let spanCount = 0
                const tagDomList = self.$el.querySelectorAll('.n-tag-scroll-hider span')
                for (let i = 0; i < tagDomList.length; i++) {
                    const item = tagDomList[i]
                    if (i < self.curTagIndex) {
                        spanLength += item.clientWidth
                        spanCount++
                    }
                }
                const borderLength = (spanCount - 1) * 2
                return spanLength + borderLength
            },
            moveTagToCenter () {
                const self = this as any
                const tagLeftDist = self.curTagDistFromLeft(self.curTagIndex)
                const tagBar = self.$el.querySelector('.n-tag-scroll-hider')
                if (tagBar) {
                    tagBar.scrollLeft = tagLeftDist
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/tag.scss'
</style>
