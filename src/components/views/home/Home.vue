<template>
    <div class="home">
        <div class="content" @scroll="scroll">
            <div class="header">
                <div class="text">外卖</div>
                <div :class="locationClass">
                    <van-icon name="location-o" />
                    <span>重庆</span>
                    <van-icon name="arrow" />
                </div>
            </div>

            <!-- 页面主体 -->
            <div class="main">
                <div class="main-bg">
                    <div ref="searchPositionElement"><!-- 定位元素 --></div>
                    <div :class="searchAreaClass" :style="searchTextStyle">
                        <div class="search">
                            <input type="text" />
                            <button class="search-btn" @click="show">搜索</button>
                        </div>
                    </div>
                    <!-- 页面分类栏目 -->
                    <div class="sort">
                        <div class="big-sort">
                            <div v-for="(item, index) in data.big_list" :key="index">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="`#${item.icon}`"></use>
                                </svg>
                                {{ item.name }}
                            </div>
                        </div>

                        <div class="small-sort">
                            <div v-for="(item, index) in data.small_list" :key="index">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="`#${item.icon}`"></use>
                                </svg>
                                {{ item.name }}
                            </div>
                        </div>
                    </div>

                    <van-tabs v-model:active="active" class="van-tabs" color="#FFDC01" swipeable>
                        <van-tab v-for="(item, index) in data.centent_nav_list" :key="index" :title="item.tab">
                            <NavList :nav-list="item.data"></NavList>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </div>
        <Footer class="select-footer"></Footer>
    </div>
</template>

<style lang="less" scoped>
.home {
    font-size: 13px;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #F5F5F5;

    .content {
        flex: 1;
        overflow-y: scroll;

        .header {
            display: flex;
            justify-content: space-between;
            padding: 20px 20px 40px 20px;
            background-image: linear-gradient(#FFDC01, #fefbe3);
            align-items: center;

            .text {
                font-size: 20px;
                font-weight: 600;
            }

            .location {
                span {
                    margin: 0 0 0 5px;
                }

                font-size: 14px;
            }

            .location-stay {
                position: fixed;
                left: 10px;
                top: 39px;
                z-index: 101;
                .location();
            }
        }

        .main {
            margin-top: -30px;
            border-radius: 5px;

            .main-bg {
                background-image: linear-gradient(#fff, #f5f5f5);
                padding: 0 20px 0 20px;
                border-radius: 30px 30px 0 0;


                // 实现搜索栏驻留
                .search-area-stay {
                    position: fixed;
                    left: 0;
                    right: 0;
                    top: 0;

                    padding: 35px 20px 10px 100px;
                    background-image: linear-gradient(#FFDC01 30%, #fefbe3);
                    .search-area-pub();
                }

                .search-area {
                    padding-top: 10px;
                    .search-area-pub();
                }

                .search-area-pub {
                    box-sizing: border-box;
                    //驻留搜索和移动的公共样式
                    z-index: 100;

                    .search {
                        width: 100%;

                        display: flex;
                        border-radius: 20px;
                        border: 1px solid #FFDC01;
                        background-color: #fffced;
                        overflow: hidden;
                        align-items: center;
                        font-size: 15px;

                        input {
                            background-color: inherit;
                            flex: 1;
                            height: 100%;
                            border: 0;
                            padding: 0 15px 0 15px;
                            width: 100px;
                        }

                        .search-btn {
                            box-sizing: border-box;
                            background-color: #FFDC01;
                            border-radius: 20px;
                            border: 0;
                            width: 60px;
                            padding: 5px 10px;
                        }
                    }
                }

                .sort {
                    padding-top: 20px;

                    .big-sort {
                        display: flex;

                        div {
                            flex: 1;
                            display: flex;
                            justify-content: center;
                            flex-flow: column;
                            align-items: center;

                            .icon {
                                width: 50px;
                                height: 50px;
                                margin-bottom: 5px;
                            }
                        }


                    }

                    .small-sort {
                        display: flex;
                        flex-wrap: wrap;
                        margin: 20px;

                        div {
                            display: flex;
                            justify-content: center;
                            flex-flow: column;
                            align-items: center;
                            width: 20%;

                            .icon {
                                width: 30px;
                                height: 30px;
                                margin: 10px;
                            }
                        }

                    }
                }

                .van-tabs {
                    :deep(.van-tabs__wrap) {
                        //深层穿透
                        border-radius: 10px;
                    }

                    :deep(.van-tabs__content) {
                        margin-top: 5px;
                    }
                }
            }

        }
    }
}
</style>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import NavList from './components/NavList.vue'
import Footer from '@/components/footer/Footer.vue'

//测试用数据
let data = reactive({
    big_list: [
        {
            name: "美食",
            icon: "icon-meishi"
        },
        {
            name: "甜点",
            icon: "icon-tiandian1"
        },
        {
            name: "超市",
            icon: "icon-chaoshigouwu"
        },
        {
            name: "生鲜果蔬",
            icon: "icon-xinxianguoshu_xinxianshuiguochengzi"
        },
        {
            name: "买药",
            icon: "icon-zhichiyiyuanyaodian"
        }
    ],
    small_list: [
        {
            name: "午餐",
            icon: "icon-wucan"
        },
        {
            name: "酒品",
            icon: "icon-jiu"
        },
        {
            name: "新鲜水果",
            icon: "icon-xinxianguoshu_xinxianshuiguopingguo"
        },
        {
            name: "汉堡披萨",
            icon: "icon-hanbao"
        },
        {
            name: "悠闲饮品",
            icon: "icon-xiuxianyinpin"
        },
        {
            name: "夜宵",
            icon: "icon-yexiao"
        },
        {
            name: "吐司",
            icon: "icon-tusi"
        },
        {
            name: "跑腿",
            icon: "icon-paotuiAPP"
        },
        {
            name: "化妆品",
            icon: "icon-kouhong"
        },
        {
            name: "全部分类",
            icon: "icon-fenlei"
        }
    ],

    centent_nav_list: [
        {
            tab: "天天神券",
            data: [
                {
                    pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cfcy168.com%2FUploadFiles%2F2020%2F2%2F15904074889874037.jpg&refer=http%3A%2F%2Fwww.cfcy168.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645421933&t=66b58fbba9dce6f6b397e38820de24dc",
                    title: "隆江猪脚饭",
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


})
let active = ref(0);

let searchPositionElement: any = ref();

//实现搜索栏驻留
let searchAreaClass = ref('search-area'); //动态切换搜索栏样式
let locationClass = ref('location'); //动态切换地址样式
let searchTextStyle = ref('padding-left:15px')
let heightBeging = 0;

onMounted(() => {
    heightBeging = getTop(searchPositionElement.value);
})

let ticking = false;
function scroll() {
    if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
            let searchElementPosition = getTop(searchPositionElement.value);
            //到指定位置改变样式
            if (searchElementPosition <= 25 && searchAreaClass.value === 'search-area') {
                searchAreaClass.value = 'search-area-stay';
                locationClass.value = 'location-stay';
                searchTextStyle.value = `padding-left:100px`;
            } else if (searchElementPosition > 25 && searchAreaClass.value === 'search-area-stay') {
                searchAreaClass.value = 'search-area';
                locationClass.value = 'location';
            }

            if (searchElementPosition > 25 && searchAreaClass.value === 'search-area') { //上下滑动且在切换样式前
                let changedHeight = heightBeging - searchElementPosition;
                let newPaddingLeft = changedHeight * 2;
                searchTextStyle.value = `padding-left:${newPaddingLeft}px`;
            }
            ticking = false;
        })
    }
}
function getTop(element: any) {
    let offset = element.getBoundingClientRect().top;
    return offset;
}

function show() {
    let searchElementPosition = getTop(searchPositionElement.value);
    console.log(searchElementPosition);
}
</script>