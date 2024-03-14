import {
    Blog, ManageVoucher, Voucher, Home, Cart, ShipDetail, PaymentSuccess,
    Order, ManagementBlog, AddProduct, ProductDetail,
    Product
} from '../pages/index';
import {
    LayoutAdmin,
    LayoutDefault
} from '../layouts/index';
import {Admin} from '../pages';

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
    { path: '/product/:id', component: ProductDetail },
    { path: '/payment-success', layout: LayoutDefault, component: PaymentSuccess },
    { path: '/admin/order', layout: LayoutAdmin, component: Order },
    { path: '/admin/addproduct', component: AddProduct },

];



export { router }




