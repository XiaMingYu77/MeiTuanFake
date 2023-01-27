<template>
    <div class="empty-content">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-inbox"></use>
        </svg>
        <span>空空如也</span>
    </div>
</template>

<style lang='less' scoped>
.empty-content {
    height: 70vh;
    margin: 20px;
    font-size: 16px;
    overflow-y: auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;

    .icon {
        width: 100%;
        margin-bottom: 10px;
    }

    span {
        display: block;
        margin-top: 10px;
        font-size: 24px;
        font-weight: 500;
    }
}
</style>