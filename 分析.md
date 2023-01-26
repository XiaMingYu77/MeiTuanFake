# 第一章 仿美团项目之需求分析

**简介：详解需求分析**

- 需要开发的页面
  - 首页
  - 购物车
  - 订单
  - 个人中心
  - 店铺
  - 生成订单
  - 地址管理
  - 编辑地址
  - 新增地址
  - 账号管理
  - 注册
  - 登录

 

- 主要功能点
  - 店铺商品的加入购物车功能
  - 商品的下单功能
  - 用户地址管理功能
  - 账号管理功能
  - 注册登录功能



# 第二章 仿美团项目之项目搭建和初始化配置
## 安装vue的脚手架
```js
    npm install -g @vue/cli
```

**简介：项目搭建初始化配置**

- `rem` 适配

- - 安装

    ```
    yarn add postcss-pxtorem@5.1.1 amfe-flexible -S
   
    ```
  1. amfe-flexible
    amfe-flexible是配置可伸缩布局方案，主要是将1rem设为viewWidth/10。

  2. postcss-pxtorem
    postcss-pxtorem是postcss的插件，用于将像素单元生成rem单位。
  - 文件配置

    ```js
    // vue.config.js
    
    module.exports = {
    
      css: {
     
        loaderOptions: {
     
          postcss: {
     
            plugins: [
     
              require('postcss-pxtorem')({ rootValue: 16 , propList: ['*']}),
    
            ],
    
          },
     
        },
    
      },
    
    };
    ```
  - 引入

    ```
    // main.js
    ```

    ```
    import 'amfe-flexible';
    ```

 

- `less` 预处理器

  - 安装

    ```
    yarn add less less-loader@7 -S
    ```

- `vant` 组件库的引入

  - 安装
    yarn add i vant@next -S
  - 全局使用
    ```js
    import { createApp } from 'vue';
    // 1. 引入你需要的组件
    import { Button } from 'vant';
    // 2. 引入组件样式
    import 'vant/lib/index.css';
    
    const app = createApp();
    
    // 3. 注册你需要的组件
    app.use(Button);
    ```
  - 按需使用
    1. 安装插件
        yarn add unplugin-vue-components -D
    2. 配置插件（在vue-cli的项目中）
    ```js
      const { VantResolver } = require('unplugin-vue-components/resolvers');
      const ComponentsPlugin = require('unplugin-vue-components/webpack');
    
      module.exports = {
        configureWebpack: {
          plugins: [
            ComponentsPlugin({
              resolvers: [VantResolver()],
            }),
          ],
        },
      };
    ```

  - 使用组件
    ```js
      <template>
        <van-button type="primary" />
      </template>
    ```

  - base.less
  ```less
    html,
    body {
      padding: 0;
      margin: 0;
      background-color: #f5f5f5;
    }
    html,
    body,
    #app {
      height: 100%;
    }

    textarea {
      border: none;
      outline: none;
    }
    button {
      border: none;
      outline: none;
    }
    a {
      text-decoration: none;
      color: #333;
    }
    li {
      list-style-type: none;
    }

  ```

  # 首页数据
  ```js
    {
      big_sort: [
        {
          name: "美食",
          icon: "icon-meishi",
        },
        {
          name: "甜点饮品",
          icon: "icon-tiandian",
        },
        {
          name: "超市便利",
          icon: "icon-chaoshigouwu",
        },
        {
          name: "生鲜果蔬",
          icon: "icon-shengxian-ganju",
        },
        {
          name: "买药",
          icon: "icon-zhichiyiyuanyaodian",
        },
      ],
      small_sort: [
        {
          name: "午餐",
          icon: "icon-wucan",
        },
        {
          name: "买酒",
          icon: "icon-jiu",
        },
        {
          name: "新鲜水果",
          icon: "icon-xinxianguoshu_xinxianshuiguopingguo",
        },
        {
          name: "汉堡披萨",
          icon: "icon-hanbaopisa",
        },
        {
          name: "休闲饮品",
          icon: "icon-xiuxianyinpin",
        },
        {
          name: "夜宵",
          icon: "icon-yexiao",
        },
        {
          name: "吐司",
          icon: "icon-tusi",
        },
        {
          name: "跑腿",
          icon: "icon-paotuiAPP",
        },
        {
          name: "美人佳丽",
          icon: "icon-kouhong",
        },
        {
          name: "全部分类",
          icon: "icon-fenlei",
        },
      ],
      centent_nav_list: [
        {
          tab: "天天神券",
          data: [
            {
              pic: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
            {
              pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cfcy168.com%2FUploadFiles%2F2020%2F2%2F15904074889874037.jpg&refer=http%3A%2F%2Fwww.cfcy168.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645421933&t=66b58fbba9dce6f6b397e38820de24dc",
              title: "隆江猪脚饭",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
            {
              pic: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
            {
              pic: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
          ],
        },
        {
          tab: "减配送费",
          data: [
            {
              pic: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
          ],
        },
        {
          tab: "点评高分",
          data: [
            {
              pic: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
            {
              pic: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
          ],
        },
        {
          tab: "会员满减",
          data: [
            {
              pic: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
            {
              pic: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
              title: "酸菜鱼",
              sales: "2888",
              price: "20",
              label: ["门店上新", "很下饭"],
            },
          ],
        },
      ],
    }

  ```

  # header的样式
  ```css
  .header {
    background-color: #fff;
    height: 40px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
    .edit {
      font-size: 16px;
      position: absolute;
      right: 15px;
      font-weight: normal;
    }
    .icon {
      position: absolute;
      left: 10px;
    }
  }
  ```

  # 店铺的样式
  ```css
  .storeDetails {
      height: 100%;
      display: flex;
      flex-flow: column;
      .content {
        flex: 1;
        overflow-y: auto;
        .img {
          background: url("../../assets/yuna.jpg") no-repeat center/cover;
          width: 100%;
          height: 150px;
        }
        .foodSort {
          height: 500px;
          background-color: #fff;
          margin-top: -30px;
          border-radius: 20px 20px 0 0;

          .sort {
            margin-top: 10px;
          }
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
        }
      }
    }
  ```
  - 酸菜鱼图片地址
  https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440
  # 商店数据
  ```js
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

  ```
  # foodList样式
  ```less
  .food-list {
  margin-top: 20px;
  .item-bg {
    padding: 10px;
  }
  }
  /deep/ .van-tree-select__item--active {
    color: #ffc400;
  }
  /deep/ .van-sidebar-item--select::before {
    background-color: #ffc400;
  }
  ```

  # foodListItem的样式
  ```less
    .content-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .price {
        font-size: 16px;
        font-weight: 600;
      }
      .left {
        display: flex;
        align-items: center;
        flex: 1;
        img {
          margin-left: 10px;
          width: 60px;
          height: 60px;
          margin-right: 10px;
          border-radius: 10px;
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
          .van-icon {
            color: red;
            font-size: 20px;
            position: absolute;
            right: 4px;
            bottom: 4px;
          }
        }
      }
    }

  ```

  # 空购物车样式
  ```less
    <style lang='less' scoped>
    .empty-content {
      flex: 1;
      margin: 20px;
      font-size: 16px;
      overflow-y: auto;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 10px;
      height: 72vh;
      .icon {
        margin-bottom: 10px;
      }
    }
    </style>
  ```

  # 购物车列表样式
  ```less
  .cartDetail {
    font-size: 14px;
    flex: 1;
    position: relative;
    overflow-y: auto;
    padding: 20px 20px 55px;
    .submit-all {
      position: fixed;
      bottom: 48px;
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

    .content {
      padding: 10px;
      background-color: #fff;
      border-radius: 10px;
    }
  }

  ```
# 编辑购物车
1. 点击编辑 下面的全选删除要出来
2. 删除商品 分为删除部分 和 删除所有 当是删除所有的时候 兜底样式要出来
3. 当购物车没有东西的时候 此时点击编辑提示购物车没有东西
4. 点击编辑以后 完成的逻辑

# 生成订单页面的样式
```less
.create-order {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
  .pay-wrap {
    padding: 10px 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      width: 90%;
      margin: 0 auto;
    }
  }
}

```
# store地址数据
```js
      {
        id: 1001,
        name: 'jason',
        tel: '15874859686',
        province: '广东省',
        city: '深圳市',
        county: '南山区',
        addressDetail: '深圳湾',
        isDefault: true,
        areaCode: '110101',
      },
      {
        id: 1002,
        name: 'allen',
        tel: '15874859685',
        province: '湖北省',
        city: '武汉市',
        county: '武昌区',
        addressDetail: '黄鹤楼',
        isDefault: false,
        areaCode: '110101',
      },
```

# address的样式
```less
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-switch--on {
  background-color: #ffc400;
}
/deep/ .van-radio__icon {
  display: none;
}
```

# addressEdit的样式

```less
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-switch--on {
  background-color: #ffc400;
}
```

# 地区的数据
```js
      {
        province_list: {
          110000: "广东省",
          120000: "浙江省",
        },
        city_list: {
          110100: "广州市",
          110200: "深圳市",
          120100: "杭州市",
          120200: "宁波市",
        },
        county_list: {
          110101: "天河区",
          110102: "海珠区",
          120102: "上城区",
          130102: "下城区",
        }
      }
```

# 我的页面 html 和 css的代码
```html
<Header title="我的" />
    <div class="content">
      <div class="user-info">
        <div class="info">
          <img src="../../assets/header.png" />
          <div class="user-desc">
            <span>昵称：{{ name }}</span>
            <span class="name">个性签名：{{ describe }}</span>
          </div>
        </div>
      </div>
      <ul class="user-list">
        <li class="van-hairline--bottom" @click="go('./order')">
          <span>我的订单</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="go('./address')">
          <span>地址管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="go('./userinfoedit')">
          <span>账号管理</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
```

```less
.me {
  height: 100%;
  display: flex;
  flex-flow: column;
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

```

# login
```less
.login {
  .img {
    width: 200px;
    height: 200px;
    background-color: #ffc400;
    font-size: 80px;
    line-height: 200px;
    text-align: center;
    border-radius: 40px;
    margin: 20px auto;
  }
  .register {
    margin-top: 20px;
  }
}
```
# reginster

```less
.register {
  .img {
    width: 200px;
    height: 200px;
    background-color: #ffc400;
    font-size: 80px;
    line-height: 200px;
    text-align: center;
    border-radius: 40px;
    margin: 20px auto;
  }
  .register {
    margin-top: 20px;
  }
}
```

# userinfoEdit样式
```less
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
.save-btn {
  width: 80%;
  margin: 20px auto;
}
```