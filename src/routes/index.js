
import {
    Blog, ManageVoucher, Foundation, Voucher, Home, Cart, ShipDetail, PaymentSuccess, Product, Category, MakeupBase, PowerPact, Concealer, Cushion, BlusherHighlighter, ProductDetail
} from '../pages/index';

const router = [
    { path: '/', component: Home },
    { path: '/blogpost', component: Blog },
    { path: '/voucher', component: Voucher },
    { path: '/cart', component: Cart },
    { path: '/ship-detail', component: ShipDetail },
    { path: '/payment-success', component: PaymentSuccess },
    { path: '/managevoucher', component: ManageVoucher },

    { path: '/category', component: Category },
    { path: '/foundation', component: Foundation },
    { path: '/makeupbase', component: MakeupBase },
    { path: '/power&pact', component: PowerPact },
    { path: '/concealer', component: Concealer },
    { path: '/cushion', component: Cushion },
    { path: '/blusher&highlighter', component: BlusherHighlighter },
    { path: '/foundation/:productId', component: ProductDetail },
    { path: '/blusher&highlighter/:productId', component: ProductDetail },
    { path: '/makeupbase/:productId', component: ProductDetail },
    { path: '/power&pact/:productId', component: ProductDetail },
    { path: '/concealer/:productId', component: ProductDetail },
    { path: '/cushion/:productId', component: ProductDetail },
    { path: '/category/:productId', component: ProductDetail },

];



export { router }