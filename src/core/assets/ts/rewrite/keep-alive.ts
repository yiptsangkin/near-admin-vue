// @ts-nocheck

import utils from '@corets/utils'

function getComponentName (opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, key, name): boolean {
    function matchesValue(value) {
        if (Array.isArray(pattern)) {
            return pattern.indexOf(value) > -1
        } else if (typeof pattern === 'string') {
            return pattern.split(',').indexOf(value) > -1
        } else if (utils.isRegExp(pattern)) {
            return pattern.test(value)
        }
        /* istanbul ignore next */
        return false
    }

    return (key && matchesValue(key)) || matchesValue(name);
}

function pruneCache (keepAliveInstance, filter) {
    const { cache, keys, _vnode } = keepAliveInstance
    for (const key of Object.keys(cache)) {
        const cachedNode = cache[key]
        if (cachedNode) {
            const name = getComponentName(cachedNode.componentOptions)
            if (name && !filter(key, name)) {
                pruneCacheEntry(cache, key, keys, _vnode)
            }
        }
    }
}

function pruneCacheEntry (
    cache,
    key,
    keys,
    current
) {
    const cached = cache[key]
    if (cached && (!current || cached.tag !== current.tag)) {
        cached.componentInstance.$destroy()
    }
    cache[key] = null
    utils.arrayRemove(keys, key)
}

let isFinalUpdateCount = 1

export default {
    name: 'keep-alive',
    abstract: true,

    props: {
        include: {
            type: [String, RegExp, Array]
        },
        exclude: {
            type: [String, RegExp, Array]
        },
        max: {
            type: [String, Number]
        }
    },

    data () {
        return {
            count: 0
        }
    },

    created () {
        this.cache = Object.create(null)
        this.keys = []
    },

    destroyed () {
        for (const key of Object.keys(this.cache)) {
            pruneCacheEntry(this.cache, key, this.keys)
        }
    },

    mounted () {
        this.$watch('include', (val) => {
            pruneCache(this, (key, name) => matches(val, key, name))
        })
        this.$watch('exclude', (val) => {
            pruneCache(this, (key, name) => !matches(val, key, name))
        })
    },

    render () {
        const slot = this.$slots.default
        const vnode = utils.getFirstComponentChild(slot)
        const componentOptions = vnode && vnode.componentOptions
        if (componentOptions) {
            // because key will set faster than component
            // so here need to count when it is 2, means the component is update
            isFinalUpdateCount++
            if (isFinalUpdateCount !== 2) {
                return undefined
            } else {
                isFinalUpdateCount = 0
            }
            // check pattern
            const name = getComponentName(componentOptions)
            const key = vnode.key == null
                ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
                : vnode.key
            const { include, exclude } = this
            if (
                // not included
                (include && (!name || !matches(include, key, name))) ||
                // excluded
                (exclude && name && matches(exclude, key, name))
            ) {
                return vnode
            }

            const { cache, keys } = this

            if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance
                utils.arrayRemove(keys, key)
                keys.push(key)
            } else {
                cache[key] = vnode
                keys.push(key)
                if (this.max && keys.length > parseInt(this.max, 10)) {
                    pruneCacheEntry(cache, keys[0], keys, this._vnode)
                }
            }

            vnode.data.keepAlive = true
        }
        return vnode || (slot && slot[0])
    }
}
