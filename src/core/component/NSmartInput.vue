<template>
    <a-input
            v-model="inputValue"
            v-bind="$attrs"
            @input="formatValue"
            @blur="blurFormatValue"
            @pressEnter="nextFocus"
    >
        <slot name="n-customer-bar-btn" slot="n-customer-bar-btn"></slot>
    </a-input>
</template>

<script lang="ts">
    import Vue from 'vue'
    import utils from '@corets/utils'

    export default Vue.extend({
        name: 'NSmartInput',
        props: {
            inputFormatter: {
                type: Function,
                default (val: any) {
                    return val
                }
            },
            blurFormatter: {
                type: Function,
                default (val: any) {
                    return val
                }
            },
            value: {
                default: undefined
            },
            isNextFocus: {
              type: Boolean,
              default: true
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        computed: {
            inputValue: {
                get () {
                    const self = this as any
                    return self.value
                },
                set (val) {
                    const self = this as any
                    self.$emit('change', val)
                }
            }
        },
        watch: {
            value (nv: any, ov: any) {
                const self = this as any
                self.$emit('change', self.inputFormatter(nv))
            }
        },
        data () {
            return {
            }
        },
        methods: {
            formatValue (e: any) {
                const self = this as any
                self.inputValue = self.inputFormatter(e.currentTarget.value)
            },
            blurFormatValue (e: any) {
                const self = this as any
                self.inputValue = self.blurFormatter(e.currentTarget.value)
            },
            nextFocus (val: any) {
                const self = this as any
                if (self.isNextFocus) {
                    utils.nextFocus()
                }

            }
        }
    })
</script>

<style lang="scss" scoped>
</style>
