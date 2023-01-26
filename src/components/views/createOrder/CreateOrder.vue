<template>
    <div class="create-order">
        <Header title="生成订单" :edit="false"></Header>
        <van-contact-card type="edit" :tel="personAddr.tel" :name="personAddr.name" @click="onEdit" />
        <div class="content">
            <div v-for="(item, index) in store.state.createList" :key="item.id">
                <van-card :num="item.num" :price="item.price" :title="item.title" :thumb="item.pic" />
            </div>
        </div>

        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{ totalPrise }}</span>
            </div>
            <!-- 生成订单按钮 -->
            <button class="pay-btn" @transitionend="payBtnClicked">
                <span>生</span>
                <span class="blanck"></span>
                <span>成</span>
                <span class="blanck"></span>
                <span>订</span>
                <span class="blanck"></span>
                <span>单</span>
            </button>
        </div>
    </div>
</template>

<style lang="less" scoped>
.create-order {
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: #F5F5F5;

    .content {
        flex: 1;
        overflow-y: auto;
    }

    .pay-wrap {
        padding: 10px 0 20px 0;
        width: 100%;
        background: #fff;
        border-top: 1px solid #e9e9e9;

        .price {
            display: flex;
            justify-content: space-between;
            padding: 0 7.5%;
            margin: 10px 0;
            font-size: 14px;

            span:nth-child(2) {
                color: red;
                font-size: 18px;
            }
        }

        .pay-btn {
            display: block;
            width: 85%;
            margin-left: auto;
            margin-right: auto;
            background-color: inherit;
            background-image: linear-gradient(to right, rgb(255, 208, 30), rgb(255, 112, 23));
            color: #fff;
            border-radius: 30px;
            padding: 4px 0 4px 0;
            font-size: 20px;
            box-shadow: 3px 5px 5px rgba(109, 69, 23, 0.3);
            transition: all ease-in-out 100ms;

            .blanck {
                display: inline-block;
                width: 2%;
            }
        }

        .pay-btn:active {
            box-shadow: 0px 0px 5px rgba(109, 69, 23, 0.3);
            transform: translate(3px, 5px);
        }
    }
}
</style>

<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect } from 'vue';
import Header from '@/components/Header.vue';
import { useStore } from 'vuex';
import { showDialog } from 'vant';
import router from '@/router';

let store = useStore();
let personAddr = ref({
    name: '屿洺',
    tel: '12345678901'
}); //保存当前订单使用的地址

watchEffect(() => { //是为了解决到其他页面后该组件停止导致watch无法监听变化的问题
    personAddr.value = store.state.selectedAddr;
})


const totalPrise = computed(() => {
    let prise = 0;
    if (store.state.createList.length) {
        store.state.createList.forEach((item: any) => {
            prise += item.price * item.num;
        })
    }
    return prise;
})

function initUser() {
    if (!store.state.defaultAddrSelected) {
        store.state.userAddress.forEach((userAddr: any) => {
            //使用默认地址作为选中地址
            if (userAddr.isDefault) {
                store.commit('setSelectedAddr', userAddr);
            }
        });
    }
    store.commit('changeDefaultAddrSelectedState', true); //表示本次订单已经初始化过了
}

onMounted(() => {
    if (store.state.createList.length === 0) {
        router.push('/cart'); //不允许自己到这个页面来
    }else{
        initUser();
    }
})

//修改联系人信息，选择地址
function onEdit() {
    router.push({
        path: '/address',
        query: {
            type: 'select',
        }
    });
}

function createEnd(){ //生成订单了或者取消生成订单了
    store.commit('changeDefaultAddrSelectedState', false); //重置状态，下次就会再初始化了
}

//生成订单
function payBtnClicked() {
    showDialog({
        title: "提示",
        message: "生成订单成功",
        confirmButtonColor: '#ffc400d6',
    }).then(() => {
        //将生成的订单推入保存
        store.commit('submitOrder', store.state.createList);
        //和购物车联系起来
        store.commit('deleteGoods', store.state.createList);
        //清除过程中产生的数据
        store.commit('clearCreateOrderList');
        createEnd();
    }).then(() => {
        //接入支付页面在这个地方
        router.push('/order');
    })
}
</script>