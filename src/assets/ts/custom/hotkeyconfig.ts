import {HotKeyConfig} from '@corets/type'

const hotkeyconfig: HotKeyConfig = {
    'ctrl+e': {
        // page component path means the hot key config will effect only equal to current page component path
        // if you don't use wildcard but page path, write the method in page component SFC
        'logline/Logline': [
            {
                name: `Logline 'Ctrl+e' event`,
                method: 'exportLog'
            }
        ]
    },
    escape: {
        // wildcard means the hot key config will effect all pages component, it will call the method from Manage.vue
        // if you use wildcard, write the method in custom/base.ts
        '*': [
        ]
    }
}

export default hotkeyconfig
