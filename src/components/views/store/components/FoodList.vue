<template>
    <div class="food-list">
        <van-sidebar v-model="activeIndex" @change="navClick">
            <van-sidebar-item title="热销套餐" />
            <van-sidebar-item title="超级折扣" />
        </van-sidebar>
        <div class="content">
            <div class="items">
                <div v-for="(item, index) in subItems" :key="item.id" class="item-bg">
                    <ListItem :item="item" @itemAdd="handleAdd" @item-val-change="handleChange" :show-check-box="false"
                        :min="0"></ListItem>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.food-list {
    height: 100%;
    box-sizing: border-box;
    display: flex;


    :deep(.van-sidebar) {
        background-color: #F7F8FA;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;

        .items{
            flex: 1 1 auto;
            height: 0;
            overflow-y: auto;
        }

        .item-bg {
            padding: 10px;
        }

        .item-bg:not(:last-child) {
            margin-bottom: 20px;
        }

        :deep(.van-tree-select__content) {
            overflow-y: scroll;
        }
    }
}

:deep(.van-tree-select__item--active) {
    color: #ffc400d6;
}

:deep(.van-sidebar-item--select::before) {
    background-color: #ffc400d6;
}
</style>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import ListItem from '@/components/ListItem.vue';

let props = defineProps(['foodData']);

let foodData = ref(props.foodData);

let activeIndex = ref(0);
let items = ref([{ text: '分组 1' }, { text: '分组 2' }]);
let subItems = ref();

function initData() {
    let data = foodData.value;
    let newItems: any = [];
    data.items.forEach((item: any, index: number) => {
        newItems.push({ text: item.text });
    })
    items.value = newItems;
    getFoodListData(0);
}
function getFoodListData(index: number) {
    let item = foodData.value
        .items[index];
    subItems.value = item.children;
    // console.log(subItems);
}
initData();

function navClick(index: number) {
    getFoodListData(index);
}

function handleAdd(id: number) {
    //拿到后对数量的修改必须反映到该页面的主体数据中去，而不能是过程数据
    //过程数据会丢失
    subItems.value.forEach((item: any, index: number) => { //这里的一系列赋值只是引用的传递，所以在subItems上更改会反映到data中去
        if (item.id === id) {
            item.add = false;
            item.num++;
        }
    });
}

function handleChange(value: number, detail: any) {
    subItems.value.forEach((item: any, index: number) => {
        if (item.id === detail.name) {
            item.num == value;
            if (value == 0) {
                item.add = true;
            }
        }
    })
}

</script>