interface State {
    defaultExpandKeys?: string[]
}

interface Getter {
    [key: string]: any
}

const state: State = {
    defaultExpandKeys: []
}

const getters: Getter = {
    defaultExpandKeys: (getterState: State) => {
        return getterState.defaultExpandKeys
    }
}

const mutations = {
}

const actions = {
}

export default {
    state,
    getters,
    mutations,
    actions
}
