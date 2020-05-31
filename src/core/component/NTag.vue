<template>
    <div class="n-tag">
        <div class="n-tag-scroll-hider">
            <span
                    v-for="(item, index) in curTagList"
                    :key="index"
                    :class="[curTagIndex === index ? 'cur' : '']"
                    @click="changeCp(index)"
                    @contextmenu.prevent="showContextMenu"
            >
                {{ $t(item.title) }}<a-icon class="n-tag-close" type="close" @click.stop="closeTag(index)"/>
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
                'curTagIndex'
            ]),
            currentSelectedKeys () {
                const self = this
                return [self.curTagIndex]
            }
        },
        watch: {
            curTagList (val) {
                // watch tag list to judge if will show the tag dropdown
                const self = this
                self.$nextTick(() => {
                    let spanLength = 0
                    const tagDomList = self.$el.querySelectorAll('.n-tag-scroll-hider span')
                    for (const item of tagDomList) {
                        spanLength += item.clientWidth
                    }
                    const borderLength = (tagDomList.length - 1) * 2
                    const tagWrpDom = self.$el
                    // 32 is the n-tag-scroll-hider's padding
                    if (tagWrpDom.clientWidth < (spanLength + borderLength + 32)) {
                        // @ts-ignore
                        self.showDropDown = true
                    } else {
                        // @ts-ignore
                        self.showDropDown = false
                    }
                })
            }
        },
        methods: {
            changeCp (idx: number) {
                const self = this
                self.$emit('change-cp', self.curTagList[idx], false)
            },
            showContextMenu () {
                console.log('ctxmenu')
            },
            closeTag (idx: number) {
                const self = this;
                if (idx === 0) {
                    self.$message.warn(self.$t(dict.localeObj.tagObj.errorTip.homePageCloseError).toString());
                } else {
                    // @ts-ignore
                    self.$closepage({
                        idx
                    });
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/tag.scss'
</style>
