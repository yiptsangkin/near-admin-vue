<template>
    <a-breadcrumb class="n-bread-crumb">
        <a-breadcrumb-item v-for="(item, index) in cpBread" :key="index">
            {{ $t(item.name) }}
            <template v-if="item.child && item.child.length > 0">
                <a-menu slot="overlay">
                    <a-menu-item v-for="(sitem, sindex) in item.child" :key="sindex">
                        {{ $t(sitem.name) }}
                    </a-menu-item>
                </a-menu>
            </template>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'NBreadCrumb',
        props: {
          cpBread: {
              type: Array
          }
        },
        data() {
            return {}
        }
    });
</script>

<style lang="scss" scoped>
    @import "~@corescss/manage/breadcrumb.scss"
</style>
