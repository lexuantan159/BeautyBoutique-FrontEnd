import {
    Blog, ManageVoucher, Voucher, Home, Cart, ShipDetail, PaymentSuccess,
     PowerPact, ProductDetail, Order, ManagementBlog, AddProduct,
    Product
} from '../pages/index';
import {
    LayoutAdmin,
    LayoutDefault
} from '../layouts/index';
import {Admin} from '../pages'
const router = [
    { path: '/', component: Home },
    { path: '/blogpost', component: Blog },
    { path: '/voucher', component: Voucher },
    { path: '/cart', component: Cart },
    { path: '/ship-detail', component: ShipDetail },
    { path: '/payment-success', component: PaymentSuccess },
    { path: '/admin/voucher', layout: LayoutAdmin, component: ManageVoucher },
    { path: '/admin/blog', layout: LayoutAdmin, component: ManagementBlog },

    { path: '/admin', component: Admin },
    { path: '/product', component: Product },


    {path: '/power&pact', component: PowerPact },
   {path: '/foundation/:productId', component: ProductDetail },
    { path: '/blusher&highlighter/:productId', component: ProductDetail },
    { path: '/makeupbase/:productId', component: ProductDetail },
    { path: '/power&pact/:productId', component: ProductDetail },
    { path: '/concealer/:productId', component: ProductDetail },
    { path: '/cushion/:productId', component: ProductDetail },
    { path: '/category/:productId', component: ProductDetail },

    { path: '/payment-success', layout: LayoutDefault, component: PaymentSuccess },
    { path: '/admin/order', layout: LayoutAdmin, component: Order },

    { path: '/dashboard/addproduct', component: AddProduct },

];



export { router }




