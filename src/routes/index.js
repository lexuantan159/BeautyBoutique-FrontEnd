
import {
    Blog, Voucher, Home, Cart, ShipDetail,PaymentSuccess
} from '../pages/index';

const router = [
    { path: '/', component: Home },
    { path: '/blogpost', component: Blog },
    { path: '/voucher', component: Voucher },
    { path: '/cart', component: Cart },
    { path: '/ship-detail', component: ShipDetail },
    { path: '/payment-success', component: PaymentSuccess },

];


export { router }