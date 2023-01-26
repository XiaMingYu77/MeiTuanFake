<template>
    <div class="order">
        <Header title="订单"></Header>
        <div class="content">
            <van-tabs color="#ffDC01" class="tabs" swipeable>
                <van-tab v-for="(tab, index) in navData" :title="tab">
                    <!-- 注意：由于脱机状态下没办法异步改变订单状态，所以暂时不对其进行区分 -->
                    <div v-if="index === 0 && store.state.orderList.length" v-for="(item) in store.state.orderList">
                        <van-card :num="item.num" :price="item.price" :title="item.title" :thumb="item.pic" />
                    </div>
                    <Empty v-else></Empty>
                </van-tab>
            </van-tabs>
        </div>
        <Footer class="select-footer"></Footer>
    </div>
</template>

<style lang="less" scoped>
.order {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #F5F5F5;

    .content {
        flex: 1;
        overflow-y: scroll;

        .tabs {
            height: 100%;
            display: flex;
            flex-direction: column;

            .van-tabs__content{
                flex: 1;

                .van-card{
                    background-color: #fff;
                }
            }
        }
    }
}
</style>

<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue'
import Header from '@/components/Header.vue';
import Empty from '@/components/Empty.vue';
import { useStore } from 'vuex';
import { ref, reactive } from 'vue';

let store = useStore();
let navData = ['全部', '交易完成', '待付款', '待完成'];

</script>