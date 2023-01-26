<template>
    <div class="mine">
        <Header title="我的" ></Header>

        <div class="content">
            <div class="user-info">
                <div class="info">
                    <img src="../../../assets/header.jpg" />
                    <div class="user-desc">
                        <span>昵称：{{ userInfo.nickName }}</span>
                        <span class="name">个性签名：{{ userInfo.sign }}</span>
                    </div>
                </div>
            </div>
            <ul class="user-list">
                <li class="van-hairline--bottom" @click="go('/order')">
                    <span>我的订单</span>
                    <van-icon name="arrow" />
                </li>
                <li class="van-hairline--bottom" @click="go('/address', 'edit')">
                    <span>地址管理</span>
                    <van-icon name="arrow" />
                </li>
                <li class="van-hairline--bottom" @click="go('/userinfo_edit')">
                    <span>账号管理</span>
                    <van-icon name="arrow" />
                </li>
            </ul>
        </div>

        <Footer class="select-footer"></Footer>
    </div>
</template>

<style lang="less" scoped>
.mine {
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: #F5F5F5;
  .content {
    flex: 1;
    overflow-y: auto;
    .user-info {
      width: 94%;
      margin: 10px;
      height: 115px;
      background: linear-gradient(90deg, #ffc400, #c7c351);
      box-shadow: 0 2px 5px #ffc400;
      border-radius: 6px;
      .info {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 25px 20px;
        box-sizing: border-box;
        img {
          border-radius: 50%;
          margin-top: 4px;
        }
        .user-desc {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          line-height: 20px;
          font-size: 14px;
          color: #fff;
          justify-content: space-between;
          span {
            color: #fff;
            font-size: 14px;
            padding: 2px 0;
          }
        }
        .account-setting {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 13px;
          color: #fff;
          .van-icon-setting-o {
            font-size: 16px;
            vertical-align: -3px;
            margin-right: 4px;
          }
        }
      }
    }
    .user-list {
      padding: 0 20px;
      margin-top: 20px;
      background-color: #fff;
      li {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        .van-icon-arrow {
          margin-top: 13px;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue'
import Header from '@/components/Header.vue';
import { useStore } from 'vuex';
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let store = useStore();
let router = useRouter();

let userInfo = reactive({
  nickName:"未设置",
  sign:'太懒了，没得签名！',
});

function init(){
    let userInfoJson:any = localStorage.getItem(`${localStorage.username}Info`);
    let userInfo_new = JSON.parse(userInfoJson);
    userInfo.nickName = userInfo_new.nickName;
    userInfo.sign = userInfo_new.sign;
}
onMounted(()=>{
    init();
})

function go(path:string, setType:string=''){
    if(setType!==''){
        router.push({
            path: path,
            query:{
                type: setType
            }
        })
    }else{
        router.push(path);
    }
}
</script>