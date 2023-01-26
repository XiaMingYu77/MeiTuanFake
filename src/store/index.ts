import { createStore } from 'vuex'


let cartMap = new Map();
export default createStore({
    state: {
        cartMap: cartMap, //购物车的数据
        editState: false, //购物车是否在编辑状态
        createList: [], //生成订单过程中的数据
        orderList: [], //上传的订单
        userAddress: [
            {
                id: 1001,
                name: '屿墨',
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
                name: 'kk',
                tel: '15874859685',
                province: '湖北省',
                city: '武汉市',
                county: '武昌区',
                addressDetail: '黄鹤楼',
                isDefault: false,
                areaCode: '110101',
            },
        ],
        selectedAddr:[],
        defaultAddrSelected: false, //标志本次订单是否将默认地址选中过了
    },
    mutations: {
        setSelectedAddr(state, Addr){
            state.selectedAddr = Addr;
        },

        changeDefaultAddrSelectedState(state, value:boolean){ //改变defaultAddrSelected字段状态
            state.defaultAddrSelected = value
        },

        addCart(state, value: []) {
            value.forEach((item: any) => {
                let id = item.id;
                if (!state.cartMap.has(id)) {
                    state.cartMap.set(id, item);
                } else {
                    let oldItem = state.cartMap.get(id);
                    oldItem.num += item.num;
                }
            });
        },

        deleteGoods(state, Items: []) {
            Items.forEach((item: any) => {
                if (state.cartMap.has(item.id)) {
                    state.cartMap.delete(item.id);
                }
            });
        },

        submitCreateOrder(state, value) {//从购物车提交到生成订单页
            state.createList = value;
        },

        submitOrder(state, value: []) { //将生成的订单保存到订单栏中
            state.orderList.push(...value);
        },

        clearCreateOrderList(state) {
            state.createList = [];
        },

        addAddr(state, value) {
            //要生成一个id  实际投产时应该是后台来给我们
            let maxID = 0;
            state.userAddress.forEach((oldAddr) => {
                if (value.isDefault === true) { //如果将其设为了默认，要让其他的都不默认
                    oldAddr.isDefault = false;
                }
                maxID = Math.max(maxID, oldAddr.id);
            })
            value.id = maxID+1;
            state.userAddress.push(value);
        },

        editAddr(state, value) {
            state.userAddress = state.userAddress.map((oldAddr) => {
                if (oldAddr.id === value.id) {
                    return value;
                } else {
                    //如果将其设为了默认，要让其他的都不默认
                    if (value.isDefault === true) {
                        oldAddr.isDefault = false;
                    }
                    return oldAddr;
                }
            })
        },

        deleteAddr(state, value){
            state.userAddress = state.userAddress.filter((oldAddr)=>{
                if(value.id === oldAddr.id) return false;
                else return true;
            })
        },
    },
    actions: {}
})