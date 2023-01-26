import { createRouter, createWebHashHistory } from 'vue-router'
import { showToast } from 'vant'

const routes: Array<any> = [
    {
        path: "/",
        redirect: '/home'
    },
    {
        path: "/home",
        name: "Home",
        component: () => import('../components/views/home/Home.vue'),
    },
    {
        path: "/order",
        name: "Order",
        //可以进行懒加载
        component: () => import("../components/views/order/Order.vue"),
        meta: {
            isAuth: true
        }
    },
    {
        path: "/mine",
        name: "Mine",
        component: () => import("../components/views/mine/Mine.vue"),
        meta: {
            isAuth: true
        }
    },
    {
        path: "/cart",
        name: "Cart",
        component: () => import("../components/views/cart/Cart.vue"),
        meta: {
            isAuth: true
        }
    },
    {
        path: "/store",
        name: "Store",
        component: () => import("../components/views/store/Store.vue"),
        meta: {
            isAuth: true
        }
    },
    {
        path: "/create_order",
        name: "CreateOrder",
        component: () => import("../components/views/createOrder/CreateOrder.vue"),
        meta: {
            isAuth: true
        }
    },
    {
        path: "/address",
        name: "Address",
        component: () => import("../components/views/address/Address.vue"),
        meta: {
            isAuth: true
        }
    },
    {
        path: "/address_edit",
        name: "AddrEdit",
        component: () => import("../components/views/addressEdit/AddressEdit.vue"),
        meta: {
            isAuth: true
        }
    },
    {
        path: '/userinfo_edit',
        name: 'UserInfoEdit',
        component: () => import("../components/views/userInfoEdit/UserInfoEdit.vue"),
        meta: {
            isAuth: true
        }
    },
    {
        path: '/login',
        name: 'LogIn',
        component: () => import("../components/views/login/Login.vue")
    }
]

//管理器
const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_PATH as string),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {  //说明该页面要进行用户验证，必须在登陆状态下才可访问，否则跳转至登陆页面
        //登陆了之后，会在localStorage中存储一个标识
        if (localStorage.isLogin === 'login') {
            next();
        } else {
            next('/login');
            showToast('请先登陆');
        }
    }else{ //不需验证的页面
        next();
    }
})

export default router;