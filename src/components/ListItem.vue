<template>
    <div class="content-item">
        <div class="left">
            <van-checkbox :name="item.id" v-if="showCheckBox"/>
            <img :src="item.pic" />
            <div class="text">
                <div class="title">{{ item.title }}</div>
                <van-icon name="add-o" v-if="item.add" @click="add" class="van-icon" />
                <van-stepper v-else v-model="item.num" :min="min" integer theme="round" button-size="22"
                    class="van-stepper" @change="valueChanged" :name="item.id"/>
                <div class="price">￥{{ item.price }}</div>
            </div>

        </div>
    </div>
</template>

<style lang="less" scoped>
.content-item {
    display: flex;
    justify-content: space-between;

    .left {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        

        img {
            margin-left: 10px;
            width: 60px;
            height: 60px;
            margin-right: 10px;
            border-radius: 10px;
            object-fit: cover;
        }

        .text {
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            height: 100%;
            position: relative;
            flex: 1;

            .title {
                font-size: 16px;
            }

            .price {
                font-size: 16px;
                font-weight: 600;
            }

            .van-icon {
                color: #ffb300d6;
                font-size: 22px;
                position: absolute;
                right: 4px;
                bottom: 0;
            }

            .van-stepper {
                position: absolute;
                right: 4px;
                bottom: 0;
                font-size: 20px;
            }

            :deep(.van-stepper__minus) {
                border-color: #ffc400d6;
            }

            :deep(.van-stepper__minus)::before {
                background-color: #ffc400d6;
            }

            :deep(.van-stepper__plus) {
                background-color: #ffc400d6;
            }
        }

        :deep(.van-checkbox__icon--checked .van-icon){
            background-color: #ffc400d6;
            border-color: #ffc400d6;
        }
    }
}
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue';

let props = defineProps(['item', 'showCheckBox', 'min']);
let item = props.item;
let value = ref(1);
let emit = defineEmits(['itemAdd', 'itemValChange']);

function add() {
    emit('itemAdd', item.id);
}

function valueChanged(value:number, detail:any){
    emit('itemValChange', value, detail);
}
</script>