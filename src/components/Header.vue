<template>
    <div class="header">
        <van-icon name="arrow-left" class="icon" @click="back" />
        <div class="title">{{ title }}</div>
        <div class="edit" v-if="edit && hasData" @click="changeEdit">{{ editText }}</div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useStore } from 'vuex';

let router = useRouter();
let store = useStore();
let props = defineProps(['title', 'edit', 'hasData']);
let onEdit = ref(false); //用于标记是否在进行编辑
let editText = ref('编辑');

function back() {
    router.back();
}

function changeEdit() {
    onEdit.value = !onEdit.value;
    store.state.editState = onEdit.value;
    if (onEdit.value) {
        editText.value = '完成';
    } else {
        editText.value = '编辑';
    }
}

</script>

<style lang="less" scoped>
.header {
    background-color: #fff;
    min-height: 40px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
    padding: 20px 0 5px 0;

    .edit {
        font-size: 16px;
        position: absolute;
        right: 15px;
        font-weight: normal;
    }

    .icon {
        position: absolute;
        left: 10px;
    }
}
</style>