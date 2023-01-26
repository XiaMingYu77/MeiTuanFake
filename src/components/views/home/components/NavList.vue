<template>
    <div v-for="(item, index) in navList" :key="index">
        <NavListItem :item-content="item"></NavListItem>
    </div>
</template>

<script setup lang="ts">
import NavListItem from './NavListItem.vue';

let props = defineProps(["navList"]);
</script>