<template>
    <div class="footer-content">
        <div class="item">
            <RouterLink to="/home" class="nav-item" active-class="active-coler">
                <van-icon name="wap-home-o" size="30" />
                首页
            </RouterLink>

        </div>
        <div class="item">
            <RouterLink to="/cart" class="nav-item" active-class="active-coler">
                <van-icon name="shopping-cart-o" size="30" />
                购物车
            </RouterLink>
        </div>
        <div class="item">
            <RouterLink to="/order" class="nav-item" active-class="active-coler">
                <van-icon name="orders-o" size="30" />
                订单
            </RouterLink>
        </div>
        <div class="item">
            <RouterLink to="/mine" class="nav-item" active-class="active-coler">
                <van-icon name="contact" size="30" />
                我的
            </RouterLink>
        </div>
    </div>
</template>

<style lang="less" scoped>
.footer-content {
    display: flex;
    background-color: #fff;
    border-top: 0.5px solid #eee;
    flex-direction: row;
    padding: 3px 0 0;

    .item {
        flex: 1;

        .active-coler {
            color: #FFDC01;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 14px;
        }
    }
}
</style>