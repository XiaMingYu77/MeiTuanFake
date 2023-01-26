<template>
    <div class="register">
        <div class="inputArea" @click.stop>
            <div class="area">
                <input class="input" type="text" placeholder="用户名（6~15）:" v-model.lazy="username" required
                    @touchmove.stop @click.stop @change="usernameChange" />
            </div>
            <span class="errMsg" v-if="showErr_UserName">{{ errMsg_username }}</span>
            <div class="area" @click.stop>
                <input class="input" :type="passType" placeholder="密码（7~15）:" v-model.lazy="password" required
                    @touchmove.stop @change="passwordChange" />
                <div class="eye" @click="changeEye">
                    <van-icon name="eye-o" v-if="eyeOpen" />
                    <van-icon name="closed-eye" v-if="!eyeOpen" />
                </div>
            </div>
            <span class="errMsg" v-if="showErr_Password">{{ errMsg_password }}</span>
        </div>
        <div class="errMsg-request">
            <span v-if="showErrMsg">{{ errMsg }}</span>
        </div>
        <button class="btn" @click.stop="submitRegister">注册</button>
    </div>
</template>

<style lang="less" scoped>
.errMsg-text {
    font-size: 17px;
    color: rgb(255, 79, 20);
}

.register {

    .inputArea {
        padding: 30px 20px 10px 20px;

        .area:not(:first-child) {
            margin-top: 20px;
        }

        .area {
            box-sizing: border-box;
            width: 100%;
            border: #feaf4f 2px solid;
            box-shadow: 5px 5px 10px #ff7439;
            font-size: 18px;
            border-radius: 50px;

            position: relative;

            .input {
                box-sizing: border-box;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.12);
                border: 0;
                font-size: 18px;
                border-radius: 50px;
                padding: 12.5px 15px;
                color: #f5f5f5;
            }

            //对placeholder的颜色修改
            .input-placeholder {

                ::-webkit-input-placeholder {
                    /* WebKit, Blink, Edge */
                    color: rgb(172, 172, 172);
                }

                :-moz-placeholder {
                    /* Mozilla Firefox 4 to 18 */
                    color: rgb(172, 172, 172);
                }

                ::-moz-placeholder {
                    /* Mozilla Firefox 19+ */
                    color: rgb(172, 172, 172);
                }

                :-ms-input-placeholder {
                    /* Internet Explorer 10-11 */
                    color: rgb(172, 172, 172);
                }
            }

            .input-placeholder();

            .eye {
                position: absolute;
                text-align: center;
                height: 25px;
                widows: 25px;
                font-size: 25px;
                top: 1px;
                bottom: 0;
                right: 10px;
                margin: auto;
                color: rgb(231, 231, 231);
            }
        }

        .errMsg {
            display: block;
            .errMsg-text();
            margin: 5px auto 0 5px;
        }
    }

    .errMsg-request {
        width: 100%;
        height: 35px;
        padding-left: 25px;

        span {
            .errMsg-text();
        }
    }

    .btn {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 40px;
        margin: auto;
        width: 85%;
        border-radius: 13px;
        height: 35px;
        font-size: 20px;
        box-shadow: 2px 2px 5px #ff7439;
        background-image: linear-gradient(to right, #ffd01e7c, #ff7017b5);
        transition: all ease-in-out 200ms;
    }

    .btn:active {
        box-shadow: 0px 0px 5px #ff7439;
        transform: translate(2px, 2px);
    }
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import router from '@/router';
import { useStore } from 'vuex';
let store = useStore();

let passType = ref('password');

let username = ref('');
let password = ref('');
let errMsg = ref('用户名已存在');
let errMsg_username = ref('用户名过长');
let errMsg_password = ref('密码过长');
let showErrMsg = ref(false); //这个是显示服务器传回的错误信息
let eyeOpen = ref(false);
let showErr_UserName = ref(false);
let showErr_Password = ref(false);

function changeEye() {
    eyeOpen.value = !eyeOpen.value;
    if (eyeOpen.value) {
        passType.value = 'text'
    }
    else {
        passType.value = 'password'
    };
}
function checkUsername() { //短=-1 长=1 合适=0
    let len = username.value.length;
    if (len < 6) {
        errMsg_username.value = '用户名过短';
        showErr_UserName.value = true;
        return -1;
    } else if (len > 15) {
        errMsg_username.value = '用户名过长'
        showErr_UserName.value = true;
        return 1;
    } else {
        showErr_UserName.value = false;
        return 0;
    }
}

function usernameChange() {
    checkUsername();
}

function checkPassword() { //短=-1 长=1 合适=0
    let len = password.value.length;
    if (len < 7) {
        errMsg_password.value = '密码过短';
        showErr_Password.value = true;
        return -1;
    } else if (len > 15) {
        errMsg_username.value = '密码过长';
        showErr_Password.value = true;
        return 1;
    } else {
        showErr_Password.value = false;
        return 0;
    }
}
function passwordChange() {
    checkPassword();
}

function submitRegister() {
    let userNameOk = false;
    let paswordOk = false;
    if (checkUsername() === 0) userNameOk = true;
    if (checkPassword() === 0) paswordOk = true;

    if (userNameOk && paswordOk) {
        //执行上传
        let response = register_local();
        checkResponse(response);
    } else {
        showToast('请再次检查');
    }
}

function register_local() {
    let usernameStr = username.value;
    let passwordStr = password.value;
    if (!localStorage.getItem(usernameStr)) { //没有内容，注册成功
        localStorage.setItem(usernameStr, passwordStr);
        return {state:200}
    }else{
        return {state:-1, errMsg:'该用户名已存在'};
    }
}

function checkResponse(response:any){
    if(response.state === 200){
        showToast('注册成功');
        localStorage.setItem('isLogin', 'login');
        localStorage.setItem('username', username.value);
        initUserInfo(username.value);
        router.back();
    }else{
        showErrMsg.value = true;
        errMsg.value = response.errMsg;
    }
}

function initUserInfo(username:string){
    let userInfo = {
        nickName:'未设置',
        sign:'太懒了，没得签名！'
    }
    let userInfoJson = JSON.stringify(userInfo);
    localStorage.setItem(`${username}Info`, userInfoJson);

    // console.log(localStorage.getItem(`${localStorage.username}Info`));
}
</script>