<template>
    <div class="cartDetail">
        <div class="content">
            <div class="list">
                <van-checkbox-group v-model="checked" @change="groupChange">
                    <div v-for="(item, index) in dataList" :key="item.id" class="item-bg">
                        <ListItem :item="item" @item-val-change="handleChange" :show-check-box="true" :min="1">
                        </ListItem>
                    </div>
                </van-checkbox-group>
            </div>
        </div>
        <van-submit-bar :price="allPrise" button-text="提交订单" @submit="onSubmit" class="submit-order"
            v-if="!store.state.editState">
            <van-checkbox v-model="checkedAll" @change="checkedAllChanged">全选</van-checkbox>
        </van-submit-bar>

        <van-submit-bar button-text="删除" @submit="onDelete" class="submit-edit" v-if="store.state.editState">
            <van-checkbox v-model="checkedAll" @change="checkedAllChanged">全选</van-checkbox>
            <span class="blanck"></span>
        </van-submit-bar>
    </div>
</template>

<style lang="less" scoped>
.cartDetail {
    box-sizing: border-box;
    height: 100%;
    font-size: 14px;
    flex: 1;
    overflow-y: auto;

    display: flex;
    flex-direction: column;

    .content {
        flex: 1;
        margin: 20px;
        background-color: #f5f5f5;
        border-radius: 10px;

        .list {
            box-sizing: border-box;
            border-radius: 10px;
            padding: 10px;
            background-color: #fff;
            height: 100%;
            overflow-y: scroll;

            .item-bg:not(:last-child) {
                margin-bottom: 20px;
            }
        }
    }

    .submit-order {
        box-sizing: border-box;
        position: static;
        padding-left: 30px;

        :deep(.van-submit-bar__bar) {
            padding-left: 0;
        }

        :deep(.van-checkbox__icon--checked .van-icon) {
            background-color: #ffc400;
            border-color: #ffc400;
        }
    }

    .submit-edit {
        .submit-order();

        .blanck {
            flex: 1;
        }
    }

    .buy {
        position: fixed;
        bottom: 48px;
        right: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        height: 50px;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;

        .left {
            display: flex;
            align-items: center;
        }

        .delete {
            color: #fff;
            background-color: #ffc400;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            width: 110px;
            height: 40px;
            text-align: center;
            line-height: 40px;
        }
    }
}
</style>

<script lang="ts" setup>
import { ref, onMounted, computed, watch, toRef, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import ListItem from '@/components/ListItem.vue';
import { showToast } from 'vant';
import router from '@/router';

let emits = defineEmits(['noData']);

let store = useStore();
let checked: any = ref([]);
let dataList: any = ref([]);
let checkedAll = ref(true);

function init() {
    getDataList();
    setCheckedAll();
}
function setCheckedAll() {
    let newCheckedList: any = [];
    for (const id of store.state.cartMap.keys()) {
        newCheckedList.push(id);
    }
    checked.value = newCheckedList;
}
function setCancelAll() {
    checked.value = [];
}
function getDataList() {
    let newList: any = [];
    store.state.cartMap.forEach((value: any) => {
        newList.push(value);
    })
    dataList.value = newList;

    if (dataList.value.length === 0) { //如果长度为0要还原成空页面
        emits('noData')
    }
}
//通过侦听器使得cartMap的数据和本页面取出的数据同步
//在vuex中集合类型会被再包装一个相应式，但是基本数据就不会了
watch(store.state.cartMap, getDataList);

onMounted(() => {
    init();
})

onBeforeUnmount(() => {
    store.state.editState = false; //将状态还原
})

function handleChange(value: number, detail: any) {
    let item = store.state.cartMap.get(detail.name);
    item.num = value;
}

function checkedAllChanged(allChecked: boolean) {
    //由于手动修改绑定值也会启动该回调，所以需要后面对内容长度的判断以实现同步
    if (allChecked === true && checked.value.length < dataList.value.length) {
        setCheckedAll();
    } else if (allChecked === false && checked.value.length == dataList.value.length) {
        setCancelAll();
    }
}

//让手动选择与全选框同步
function groupChange(result: []) {
    if (result.length === store.state.cartMap.size) {
        checkedAll.value = true;
    } else {
        checkedAll.value = false;
    }
}

const allPrise = computed(() => {
    let countList = getItemSelected();
    let sum = 0;
    countList.forEach((item: any) => {
        sum += item.num * item.price;
    })
    return sum * 100;
});

//对store进行监听，对编辑状态和cartMap的变化进行捕获
//在vuex中集合类型会被再包装一个相应式，但是基本数据就不会了
//因此在这里不能对editState单独进行追踪
watch(store.state, (newState) => {
    if (newState.editState === true) { //正在编辑时默认是全不选
        setCancelAll();
    } else { //取消编辑状态时默认全选
        setCheckedAll();
    }
})

//删除
function onDelete() {
    if (checked.value.length) {
        store.commit("deleteGoods", getItemSelected());
        checked.value = [];
    } else {
        showToast("未选中要删除的商品");
    }
}
function getItemSelected() {
    return dataList.value.filter((item: any, index: number) => {
        //对列表中的item进行过滤，将没选中的给过滤掉
        return checked.value.includes(item.id);
    });
}

//提交订单
function onSubmit() {
    if (checked.value.length) { //是否有选中
        store.commit('submitCreateOrder', getItemSelected());
        router.push("/create_order");
    } else {
        showToast("未选中商品");
    }
}
</script>