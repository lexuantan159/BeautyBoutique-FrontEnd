
import {
    Blog, ManageVoucher, Foundation, Voucher, Home, Cart, ShipDetail, PaymentSuccess,
    Category, MakeupBase, PowerPact, Concealer, Cushion, BlusherHighlighter, ProductDetail, Order, ManagementBlog
} from '../pages/index';
import {
    LayoutAdmin,
    LayoutDefault
} from '../layouts/index';
const router = [
    { path: '/', component: Home },
    { path: '/blogpost', component: Blog },
    { path: '/voucher', component: Voucher },
    { path: '/cart', component: Cart },
    { path: '/ship-detail', component: ShipDetail },
    { path: '/payment-success', component: PaymentSuccess },
    { path: '/admin/voucher', layout: LayoutAdmin, component: ManageVoucher },
    { path: '/admin/blog', layout: LayoutAdmin, component: ManagementBlog },


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

    { path: '/payment-success', layout: LayoutDefault, component: PaymentSuccess },
    { path: '/admin/order', layout: LayoutAdmin, component: Order },

];



export { router }




