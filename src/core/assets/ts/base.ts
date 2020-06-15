// @ts-nocheck

export default {
    props: {
        pagePath: {
            type: String
        },
        cpParams: {
        }
    },
    data () {
        return {
            dict
        }
    },
    methods: {
        triggerEvent (methodName, params, hotKey): void {
            const self = this as any
            if (self[methodName]) {
                self[methodName](params, hotKey)
            }
        }
    },
    mounted () {
        const self = this as any
        self.$emit('load')
    }
}
