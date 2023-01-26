<template>
    <div class="cart">
        <Header title="购物车" :edit="true" :has-data="hasData"></Header>
        <div class="content">
            <CartDetail v-if="hasData" @no-data="setStateNo"/>
            <Empty v-else class="cartEmpty"/>
        </div>
        <Footer class="select-footer"></Footer>
    </div>
</template>

<style lang="less" scoped>
.cart {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #F5F5F5;

    .content {
        flex: 1;
        overflow-y: scroll;

        .cartEmpty{
            margin-top: 40px;
        }
    }
}
</style>

<script setup lang="ts">
import Empty from '@/components/Empty.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/footer/Footer.vue'
import CartDetail from './components/CartDetail.vue';
import { useStore } from 'vuex'
import { ref, onMounted, reactive } from 'vue'

let store = useStore();
let hasData = ref(false);

function init() {
    if (store.state.cartMap.size) {
        hasData.value = true;
    }

}

onMounted(() => {
    init();
});

//由子组件告知购物车里面没有数据了，修改成空页面
function setStateNo(){
    hasData.value = false;
}
</script>