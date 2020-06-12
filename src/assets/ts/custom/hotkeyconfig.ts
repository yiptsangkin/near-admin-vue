import {HotKeyConfig} from '@corets/type'

const hotkeyconfig: HotKeyConfig = {
    'ctrl+s': {
        // wildcard means the hot key config will effect all pages component, it will call the method from Manage.vue
        // if you use wildcard, write the method in custom/base.ts
        '*': [
            {
                name: `global 'Ctrl+S' event`,
                method: 'showGlobalSaveHotKey',
                params: {
                    message: `you have pressed 'Ctrl+S'`
                }
            }
        ],
        // page component path means the hot key config will effect only equal to current page component path
        // if you don't use wildcard but page path, write the method in page component SFC
        'home/HomePage': [
            {
                name: `HomePage 'Ctrl+S' event`,
                method: 'showHomePageSaveHotKey'
            }
        ],
        'setting/Setting': [
            {
                name: `Setting 'Ctrl+S' event`,
                method: 'showHomePageSaveHotKey'
            },
            {
                name: 'Save successful',
                method: 'showSaveSuccess'
            }
        ]
    },
    'ctrl+e': {
        'logline/Logline': [
            {
                name: `Logline 'Ctrl+S' event`,
                method: 'showExportSuccess'
            }
        ]
    },
    esc: {
        '*': [
            {
                name: `change full screen status 'Esc' event`,
                method: 'setFullScreen',
            }
        ]
    }
}

export default hotkeyconfig
