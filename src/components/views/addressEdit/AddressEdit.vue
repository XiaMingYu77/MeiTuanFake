<template>
    <div class="addrEdit">
        <Header :title="getTitle"></Header>
        <van-address-edit 
        :address-info="addressInfo"
        :area-list="areaList" show-set-default show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']" 
        :show-delete="getShowDeleteBtn"
        @save="onSave" @delete="onDelete" />
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import { areaList } from '@vant/area-data';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter} from 'vue-router';
import { showToast } from 'vant';

let store = useStore();
let rout = useRoute();
let router = useRouter();

let addressInfo = ref({});
let type = ref(rout.query.type);

let getShowDeleteBtn = computed(()=>{
    return type.value === 'edit';
})
let getTitle = computed(()=>{
    return type.value === 'edit'? '地址编辑': '地址新增';
})

function init(){ //获取初始地址信息
    let addrID = Number(rout.query.id);
    store.state.userAddress.forEach((addr:any)=>{
        if(addr.id === addrID){
            addressInfo.value = addr;
        }
    })
}

onMounted(()=>{
    init();
});

function onSave(info:any){
    //新增或编辑
    if(type.value === 'add'){ //新增
        store.commit('addAddr', info);
        showToast('地址新增成功');
    }else{ //编辑
        store.commit('editAddr', info);
        showToast('地址编辑成功');
    }

    setTimeout(()=>{
        router.back();
    }, 800);
}
function onDelete(info:any){
    store.commit('deleteAddr', info);
    showToast('删除成功');
    setTimeout(()=>{
        router.back();
    }, 800);
}
</script>

<style lang="less" scoped>
:deep(.van-button--primary) {
    background-image: linear-gradient(to bottom right, #ffc400, #ff8800);
    border-color: #ffc400;
}

:deep(.van-switch--on) {
    background-color: #ffc400;
}

.addrEdit{
    background-color: #F5F5F5;
    height: 100%;
}
</style>