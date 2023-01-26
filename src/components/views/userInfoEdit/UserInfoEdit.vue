<template>
    <div class="userinfo-edit">
        <Header title="账户管理"></Header>
        <div class="content">
            <div class="inputArea">
                <van-field v-model="nickname" label="昵称" maxlength="15" placeholder="请输入昵称" clearable />
                <van-field v-model="sign" label="个性签名" maxlength="30" placeholder="请输入个性签名" show-word-limit clearable />
                <van-field v-model="password" :type="passType" maxlength="15" label="新密码(7~15位)" placeholder="请输入密码"
                    :error-message="passwordErrMsg" @update:model-value="checkPassword" />
                <div class="eye" @click="changeEye">
                    <van-icon name="eye-o" v-if="eyeOpen" />
                    <van-icon name="closed-eye" v-if="!eyeOpen" />
                </div>
            </div>
            <button class="save-btn btn" @click="saveUserInfo">保存</button>
            <button class="exit-btn btn" @click="exit_login">退出登陆</button>

        </div>
    </div>
</template>

<style lang="less" scoped>
.userinfo-edit {
    height: 100%;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;

    .content {
        flex: 1;

        .inputArea {
            margin-bottom: 20px;
            position: relative;

            .eye {
                position: absolute;
                text-align: center;
                height: 25px;
                widows: 25px;
                font-size: 25px;
                bottom: 10px;
                right: 10px;
                margin: auto;
            }
        }

        .btn {
            margin: 20px auto;
            display: block;
            width: 75%;
            height: 35px;
            border-radius: 20px;
            box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.315);
            transition: all ease-in-out 200ms;
            font-size: 17px;
        }

        .btn:active {
            transform: translate(3px, 4px);
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.315);
        }

        .save-btn {
            background-image: linear-gradient(to right, #ffd01e, #ff7017);
        }

        .exit-btn {
            color: #f5f5f5;
            background-image: linear-gradient(to right, rgba(105, 122, 161), rgba(231, 182, 193));
        }
    }
}
</style>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import router from '@/router';
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { showToast } from 'vant';
let store = useStore();

let eyeOpen = ref(false);


let userInfo = reactive({ //默认内容
  nickName:"未设置",
  sign:'太懒了，没得签名！',
});

let nickname = ref(userInfo.nickName);
let sign = ref(userInfo.sign);
let password = ref('');
let passType: any = ref('password');
let passwordErrMsg = ref('');

function init(){
    let userInfoJson:any = localStorage.getItem(`${localStorage.username}Info`);
    let userInfo_new = JSON.parse(userInfoJson);
    userInfo.nickName = userInfo_new.nickName;
    userInfo.sign = userInfo_new.sign;
}
onMounted(()=>{
    init();
})

function changeEye() {
    eyeOpen.value = !eyeOpen.value;
    if (eyeOpen.value) {
        passType.value = 'text'
    }
    else {
        passType.value = 'password'
    };
}

function checkPassword() { //短=-1 长=1 合适=0
    let len = password.value.length;
    if(len === 0){
        passwordErrMsg.value = '';
        return 0;
    }

    if (len < 7) {
        passwordErrMsg.value = '密码过短';
        return -1;
    } else if (len > 15) {
        passwordErrMsg.value = '密码过长';
        return 1;
    } else {
        passwordErrMsg.value = '';
        return 0;
    }
}

function saveUserInfo() {
    if (nickname.value) {
        let userInfo = {
            nickName: nickname.value,
            sign: sign.value,
        };
        let userInfoJson = JSON.stringify(userInfo);
        localStorage.setItem(`${localStorage.username}Info`, userInfoJson);

        if (password.value != '') { //要修改密码
            if (checkPassword() === 0) {
                localStorage.setItem(localStorage.username, password.value);
                showToast('保存成功');
            }
        }else{
            showToast('保存成功');
        }
    }
    router.back();
}

function exit_login() {
    localStorage.removeItem('username');
    localStorage.removeItem('isLogin');
    showToast('已退出登录');
    router.push('/');
    // localStorage.clear();
}

</script>