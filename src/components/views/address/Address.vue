<template>
    <div class="address">
        <Header title="地址管理"></Header>
        <div class="content">
            <van-address-list v-model="chosenAddressId" :list="userAddrList" default-tag-text="默认" @add="onAdd"
                @edit="onEdit" @click-item="itemClicked" :switchable="true" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import { useRoute } from 'vue-router';
import { showToast } from 'vant';

let route = useRoute();
let store = useStore();

let chosenAddressId = ref(0);
let userAddrList = ref([]);
let type = ref(route.query.type);
//select：可以选择一个地址作为当前订单的地址
//edit：不具有选择功能 


function init() {
    //将数据格式化以显示
    userAddrList.value = store.state.userAddress.map((userAddress: any) => {
        return {
            id: userAddress.id,
            name: userAddress.name,
            tel: userAddress.tel,
            address: `${userAddress.province}${userAddress.city}${userAddress.county}`
                + `${userAddress.addressDetail}`,
            isDefault: userAddress.isDefault,
        }
    });
}
onMounted(() => {
    init();
    if (type.value === 'select') {
        showToast('点击选择一个地址');
    }

    clickedEdit = false;
})


let clickedEdit = false;
function itemClicked(item: any) { //处理在type=='select'时的地址选择
    if (type.value === 'select') { //注意：这里的item是已经格式化后的，我们需要找到那个源
        setTimeout(() => {
            if (!clickedEdit) {
                let id = item.id;
                store.state.userAddress.forEach((addr: any) => {
                    if (addr.id == id) {
                        setSelectedAddr(addr);
                    }
                })
            }
        }, 50)
    }
}

function setSelectedAddr(addr: any) {
    store.commit('setSelectedAddr', addr); //上传修改
    showToast('选择地址成功');
    router.back(); //回到提交订单页
}

function onAdd() {
    router.push({
        path: '/address_edit',
        query: {
            type: 'add',
        }
    });
}
function onEdit(item: any) {
    clickedEdit = true;
    router.push({
        path: '/address_edit',
        query: {
            id: item.id,
            type: 'edit',
        }
    });
}
</script>

<style lang="less" scoped>
:deep(.van-button--primary) {
    background-image: linear-gradient(to bottom right, #ffc400, #ff8800);
    border-color: #ffc400;
    font-size: 18px;
}

:deep(.van-switch--on) {
    background-color: #ffc400;
}

:deep(.van-radio__icon) {
    display: none;
}

.address {
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
    height: 100%;

    .content {
        flex: 1;
        overflow-y: scroll;
    }
}
</style>