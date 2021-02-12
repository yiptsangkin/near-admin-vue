<template>
    <a-input
            v-model="selectedValue"
            v-bind="$attrs"
            @input="formatValue"
            @blur="blurFormatValue"
            @pressEnter="nextFocus"
    >
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
                    const self = this as any
                    return val
                }
            },
            blurFormatter: {
                type: Function,
                default (val: any) {
                    const self = this as any
                    return val
                }
            },
            value: {
                default: undefined
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        computed: {
            selectedValue: {
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
        data () {
            return {
            }
        },
        methods: {
            formatValue (e: any) {
                const self = this as any
                self.selectedValue = self.inputFormatter(e.currentTarget.value)
            },
            blurFormatValue (e: any) {
                const self = this as any
                self.selectedValue = self.blurFormatter(e.currentTarget.value)
            },
            nextFocus (val: any) {
                utils.nextFocus()
            }
        }
    })
</script>

<style lang="scss" scoped>
</style>
