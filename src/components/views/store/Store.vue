<template>
  <div class="store">
    <Header title="店铺"></Header>

    <div class="content">
      <div class="img"></div>
      <div class="foodList">
        <div class="name">
          {{ storeDataRes.title }}
          <img :src="storeDataRes.img" class="store-img" />
        </div>

        <van-tabs color="#FFDC01" class="tabs">
          <van-tab title="点菜">
            <FoodList :foodData="storeDataRes.storeData[0].data" />
          </van-tab>
          <van-tab title="评价">
            <Appraise :appraiseData="storeDataRes.storeData[1].data" />
          </van-tab>
          <van-tab title="商家">
            <StoreProfile :storeProfileData="storeDataRes.storeData[2].data" />
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <van-action-bar class="action-bar">
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" :badge="store.state.cartMap.size" @click="goToCart" />
      <van-action-bar-button class="van-btn1" type="warning" text="加入购物车" @click="handleAddCart" />
      <van-action-bar-button class="van-btn2" type="danger" text="立即购买" @click="goBuy" />
    </van-action-bar>
  </div>
</template>

<style lang="less" scoped>
.store {
  height: 100%;
  box-sizing:border-box;
  display: flex;
  flex-flow: column;
  background-color: #F5F5F5;

  .content {
    flex: 1;

    display: flex;
    flex-direction: column;

    .img {
      background: url("https://img2.baidu.com/it/u=671019587,1535002884&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500") no-repeat center/cover;
      width: 100%;
      height: 150px;
    }

    .foodList {
      flex: 1;
      // height: 500px;
      background-color: #fff;
      margin-top: -30px;
      border-radius: 20px 20px 0 0;

      display: flex;
      flex-direction: column;


      .name {
        display: flex;
        padding: 20px;
        justify-content: space-between;

        .store-img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          margin-top: -30px;
        }
      }

      .tabs {
        flex: 1;
        display: flex;
        flex-direction: column;

        :deep(.van-tabs__content) {
          flex: 1;
        }

        :deep(.van-tab__panel) {
          height: 100%;
        }
      }
    }
  }

  .action-bar {
    z-index: 100;
    position: static;

    .van-btn {
      flex: 1;
      height: 40px;
      font-size: 15px;
      border: 0;
    }

    .van-btn1 {
      margin-left: 10px;
      border-radius: 99px 0 0 99px;
      background-image: linear-gradient(to right, #FFCD1E, #FF8A17);
      .van-btn();
    }

    .van-btn2 {
      margin-right: 10px;
      border-radius: 0 99px 99px 0;
      background-image: linear-gradient(to right, #FF5F34, #EF0D24);
      .van-btn();
    }
  }
}
</style>

<script lang="ts" setup>
import 'vant/es/tabs/style'
import { reactive } from 'vue';
import Header from '../../Header.vue';
import Appraise from './components/Appraise.vue';
import FoodList from './components/FoodList.vue';
import StoreProfile from './components/StoreProfile.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

let store = useStore();
let router = useRouter();

let storeDataRes = reactive({
  title: "鱼拿酸菜鱼",
  storeImg: "https://img1.baidu.com/it/u=671019587,1535002884&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  img: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
  storeData: [
    {
      name: "点菜",
      data: {
        content: "点菜",
        items: [
          {
            text: "热销套餐",
            children: [
              {
                pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cfcy168.com%2FUploadFiles%2F2020%2F2%2F15904074889874037.jpg&refer=http%3A%2F%2Fwww.cfcy168.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645421933&t=66b58fbba9dce6f6b397e38820de24dc",
                title: "隆江猪脚饭",
                num: 0,
                price: 25.0,
                id: 0,
                add: true,
              },
              {
                pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cfcy168.com%2FUploadFiles%2F2020%2F2%2F15904074889874037.jpg&refer=http%3A%2F%2Fwww.cfcy168.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645421933&t=66b58fbba9dce6f6b397e38820de24dc",
                title: "隆江猪脚饭",
                num: 0,
                price: 25.0,
                id: 1,
                add: true,
              },
              {
                pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cfcy168.com%2FUploadFiles%2F2020%2F2%2F15904074889874037.jpg&refer=http%3A%2F%2Fwww.cfcy168.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645421933&t=66b58fbba9dce6f6b397e38820de24dc",
                title: "隆江猪脚饭",
                num: 0,
                price: 25.0,
                id: 2,
                add: true,
              },
              {
                pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cfcy168.com%2FUploadFiles%2F2020%2F2%2F15904074889874037.jpg&refer=http%3A%2F%2Fwww.cfcy168.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645421933&t=66b58fbba9dce6f6b397e38820de24dc",
                title: "隆江猪脚饭",
                num: 0,
                price: 25.0,
                id: 3,
                add: true,
              },
            ],
          },
          {
            text: "超级折扣",
            children: [
              {
                pic: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
                title: "无骨酸菜鱼+肥牛双拼",
                num: 0,
                price: 25.0,
                id: 5,
                add: true,
              },
              {
                pic: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
                title: "香辣水煮鱼+肥牛双拼",
                num: 0,
                price: 25.0,
                id: 6,
                add: true,
              },
            ],
          },
        ],
      },
    },
    {
      name: "评价",
      data: {
        content: "评价",
      },
    },
    {
      name: "商家",
      data: {
        content: "商家",
      },
    },
  ],
});


function handleAddCart(type: string) {
  let newList: any = [];
  storeDataRes.storeData.forEach((item: any) => {
    item.data.items?.forEach((item: any) => {
      item.children?.forEach((item: any) => {
        if (item.num > 0) {
          newList.push(item);
        }
      });
    });
  });
  if (newList.length === 0) {
    showToast("尚未选择商品");
    return;
  }
  //进行深拷贝，让上传的购物车数据解绑
  store.commit('addCart', JSON.parse(JSON.stringify(newList)));
  //还原到初始状态
  newList.forEach((item: any) => {
    item.num = 0;
    item.add = true;
  })


  if (type == 'buy') {
    router.push("./cart");
  }
}

function goToCart() {
  router.push("/cart");
}

function goBuy() {
  handleAddCart('buy');
}
</script>