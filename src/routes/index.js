import {
    Blog, Voucher, Home, Cart, ShipDetail, PaymentSuccess, Order
} from '../pages/index';

import {
    LayoutAdmin,
    LayoutDefault
} from '../layouts/index';

const router = [
    {path: '/', component: Home},
    {path: '/blogpost', component: Blog},
    {path: '/voucher', component: Voucher},
    {path: '/cart', component: Cart},
    {path: '/ship-detail/:cartItemIds', component: ShipDetail},
    {path: '/payment-success', layout: LayoutDefault, component: PaymentSuccess},
    {path: '/admin/order', layout: LayoutAdmin, component: Order},

];


export {router}