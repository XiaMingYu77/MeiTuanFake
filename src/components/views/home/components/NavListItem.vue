<template>
    <div class="item" @click="toStore">
        <img :src="itemContent.pic" />
        <div class="item-right">
            <div class="title">{{ itemContent.title }}</div>
            <div class="salers"> {{ `月销：${itemContent.sales}` }}</div>
            <div class="price">{{ `￥${itemContent.price}` }}</div>
            <div class="lable">
                <div v-for="(tag, index) in itemContent.lable" :key="index">
                    {{ tag }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.item{
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    padding: 10px;

    img{
        width: 120px;
        height: 120px;
        border-radius: 10px;
        object-fit: cover;
        margin-right: 20px;
    }

    .item-right{
        display: flex;
        flex-flow: column;
        justify-content: space-between;

        .title{
            font-size: 18px;
        }
        .lable{
            display: flex;
            flex-direction: row;

            div{
                background-color: #FFDC01;
                padding: 2px 5px;
                border-radius: 5px;
            }
            div:not(:first-child){
                margin-left: 10px;
            }
        }
    }
}

.item:not(:first-child){
    margin-top: 10px;
}
</style>

<script lang="ts" setup>
import router from '@/router';

let props = defineProps(['itemContent']);

function toStore(){
    router.push('/store');
}
</script>