// @ts-nocheck

import utils from '@corets/utils'

function getComponentName (opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
    if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1
    } else if (utils.isRegExp(pattern)) {
        return pattern.test(name)
    }
    return false
}

function pruneCache (keepAliveInstance, filter) {
    const { cache, keys, _vnode } = keepAliveInstance
    for (const key of Object.keys(cache)) {
        const cachedNode = cache[key]
        if (cachedNode) {
            const name = getComponentName(cachedNode.componentOptions)
            if (name && !filter(name)) {
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
            pruneCache(this, (name) => matches(val, name))
        })
        this.$watch('exclude', (val) => {
            pruneCache(this, (name) => !matches(val, name))
        })
    },

    render () {
        console.log('#####')
        const slot = this.$slots.default
        const vnode = utils.getFirstComponentChild(slot)
        const componentOptions = vnode && vnode.componentOptions
        if (componentOptions) {
            // check pattern
            const name = getComponentName(componentOptions)
            const { include, exclude } = this
            if (
                // not included
                (include && (!name || !matches(include, name))) ||
                // excluded
                (exclude && name && matches(exclude, name))
            ) {
                return vnode
            }

            const { cache, keys } = this
            const key = vnode.key == null
                ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
                : vnode.key
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
