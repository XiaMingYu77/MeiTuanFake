<template>
    <div class="login">
        <Header title="登陆/注册"></Header>
        <div class="content" ref="content">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-meituan"></use>
            </svg>
            <div class="cardArea">
                <div class="logCard">
                    <!-- 登陆 -->
                    <div class="loginCard">
                        <span class="logTitle">登<span class="blanck"></span>录</span>
                        <div class="inputArea">
                            <input type="text" v-model.lazy="username" placeholder="用户名:" class="userName input"
                                required />
                            <input type="password" v-model.lazy="password" placeholder="密码:" class="passWord input"
                                required />
                        </div>
                        <span class="errMsg" v-if="showErrMsg">用户名或密码错误</span>
                        <div class="clickArea">
                            <button class="login-btn btn" @click="login">登录</button>
                        </div>
                    </div>
                    <!-- 注册 -->
                    <div :class="registerCardClass" :style="registerStyle" @touchstart="touchStart"
                        @touchmove="touchMove" @touchend="touchEnd" @transitionend="tsend" @click="clicked">
                        <div class="pull-tab">注<span class="blanck"></span>册</div>
                        <Register class="register"></Register>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.login {
    z-index: 5;
    height: 100%;
    display: flex;
    flex-direction: column;

    .content {
        flex: 1;

        display: flex;
        flex-direction: column;

        .icon {
            margin: 15px auto 0 auto;
            display: block;
        }

        .cardArea {
            flex: 1;
            position: relative;

            .logCard {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;

                height: 360px;
                width: 75%;

                border-radius: 20px;
                box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.272);
                -webkit-backdrop-filter: blur(5px);
                backdrop-filter: blur(5px);

                overflow: hidden;

                .blanck {
                    display: inline-block;
                    width: 15px;
                }

                .loginCard {
                    height: 100%;
                    background-image: radial-gradient(ellipse at 90% 90%, #e37f15ce, #ffd1399f);

                    .logTitle {
                        font-size: 20px;
                        display: block;
                        padding: 10px 0;
                        text-align: center;
                        color: #f5f5f5;

                    }

                    .inputArea {
                        padding: 30px 20px 0px 20px;

                        .input {
                            box-sizing: border-box;
                            margin-bottom: 20px;
                            width: 100%;
                            background-color: rgba(0, 0, 0, 0.12);
                            border: #feaf4f 2px solid;
                            box-shadow: 5px 5px 10px #ff7439;
                            font-size: 18px;
                            border-radius: 50px;
                            padding: 12.5px 15px;
                        }

                        .input:focus {
                            background-color: #ffc277a1;
                        }
                    }

                    .errMsg {
                        display: block;
                        font-size: 17px;
                        color: rgb(255, 79, 20);
                        padding-left: 25px;
                    }

                    .clickArea {
                        margin:auto;
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 55px;

                        .btn {
                            display: block;
                            width: 85%;
                            margin: 0 auto 15px auto;
                            border-radius: 13px;
                            height: 35px;
                            font-size: 20px;
                            box-shadow: 2px 2px 5px #ff7439ca;
                            transition: all ease-in-out 200ms;
                        }

                        .btn:active {
                            transform: translate(2px, 2px);
                            box-shadow: 0px 0px 5px #ff7439;
                        }

                        .login-btn {
                            background-image: linear-gradient(to right, #ffd01e, #ff7017);
                        }
                    }

                }

                // 注册页面从下面拉出来
                .registerCard {
                    position: absolute;
                    left: 0;
                    right: 0;
                    background-color: gray;
                    height: 100%;
                    box-shadow: 0px -4px 7px rgba(0, 0, 0, 0.345);
                    background-image: linear-gradient(to bottom right, rgba(105, 122, 161) 40%, rgba(231, 182, 193) 100%);
                    border-radius: 20px;
                    z-index: 10;

                    display: flex;
                    flex-direction: column;

                    .pull-tab {
                        font-size: 20px;
                        padding-top: 7px;
                        height: 40px;
                        text-align: center;
                        color: #f5f5f5;
                    }

                    .register {
                        flex: 1;
                    }
                }

                .registerCard-hide {
                    top: 320px; // 320px~0px
                    .registerCard();
                }

                .registerCard-show {
                    top: 0px;
                    .registerCard();
                }
            }
        }

    }
}
</style>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Register from './Register.vue'
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
let store = useStore();
let router = useRouter();

let ribbon: any = document.getElementById('bgCanvas'); //让背景可视化
onMounted(() => {
    ribbon.style.display = "block"; //显示背景
})
onBeforeUnmount(() => { //离开登陆页面时让背景消失
    ribbon.style.display = "none";
})


//处理登陆/注册栏目下拉
let registerState = 0; //0为收起1为展开
let registerCardClassList = ['registerCard-hide', 'registerCard-show']
let registerCardClass = ref(registerCardClassList[registerState]);
let registerStyle = ref(''); //在拖拽时要将动画的延时给弄掉

let moved = false;//记录是否只是点击了一下
let startY = 0;//用于记录开始时的位置
let changeFlag = false; //记录是否要更改状态
let startTop = 320; //收起来是320px 打开时是0px
function touchStart(event: TouchEvent) { //在这要完成初始化的任务
    let touch = event.touches[0];
    startY = touch.screenY;
    changeFlag = false;
    moved = false;
}
let currentTop = 0;
let ticking = false; //要进行一个节流
function touchMove(event: TouchEvent) {
    event.preventDefault();
    if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
            let touch = event.touches[0];
            let currentY = touch.screenY;
            let changedY = currentY - startY; //往上是负往下是正的，单位为px
            currentTop = startTop + changedY;
            if (currentTop > 0 && currentTop < 320) {
                registerStyle.value = `top:${currentTop}px`;
                changeFlag = (Math.abs(changedY) > 80);
                if (!moved && Math.abs(changedY) > 5) moved = true;
            }

            ticking = false;
        })
    }
}
function touchEnd(event: TouchEvent) {
    if (moved) {
        setTimeout(() => { //由于DOM操作耗时快速的改变会来不及应用到DOM中，需要个延时来避免bug（拖拽卡中间）
            registerStyle.value = 'transition: top ease-out 500ms; pointer-events: none;'; //运动的500ms要禁止交互
        }, 10);
        if (changeFlag) {
            changeRegister();
            changeFlag = false;
        };
    }
}
function tsend() {
    registerStyle.value = '';
}
function changeRegister() {
    if (registerState === 0) {
        registerState = 1;
        startTop = 0;
    } else {
        registerState = 0;
        startTop = 320;
    }
    registerCardClass.value = registerCardClassList[registerState];
}
function clicked() {
    if (!moved) { //如果产生了拖动就不执行后续的方法了
        registerStyle.value = 'transition: top ease-out 500ms; pointer-events: none;'; //运动的500ms要禁止交互
        changeRegister();
    }
}

let username = ref('');
let password = ref('');
let showErrMsg = ref(false);

function login() {
    let response = login_local();
    checkResponse(response);
}
function login_local(){
    let usernameStr = username.value;
    let passwordStr = password.value;
    let pass = localStorage.getItem(usernameStr);
    if(pass){ //有这个用户名
        if(passwordStr === pass){
            return {state:200}
        }
    }
    return {stare:-1};
}
function checkResponse(response:any){
    if(response.state === 200){
        localStorage.setItem('isLogin', 'login');
        localStorage.setItem('username', username.value);
        showErrMsg.value = false;
        showToast('登录成功');
        router.back();
    }else{
        showErrMsg.value = true;
    }
}
</script>