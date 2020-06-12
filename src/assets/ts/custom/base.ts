import {mapActions} from 'vuex'

export default {
    props: {
    },
    components: {
    },
    data () {
        return {
        }
    },
    methods: {
        ...mapActions(
            ['changeFullScreen']
        ),
        showGlobalSaveHotKey (): void {
            console.log(`You press crtl+s, the method named 'showGlobalSaveHotKey' is triggered`)
        },
        setFullScreen (): void {
            const self = this
            self.changeFullScreen(false)
        }
    }
}
