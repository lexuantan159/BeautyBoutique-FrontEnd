import {
  Blog,
  ManageVoucher,
  Voucher,
  Home,
  Cart,
  ShipDetail,
  PaymentSuccess,
  Order,
  ManagementBlog,
  AddProduct,
  ProductDetail,
  Product,
  EditProfile,
  OrderHistories,
  OrderDetail,
  ContactUs,
  UserInfo,
  ManageProduct,
  ManageUser,
  ManageCategory,
  ManageBrand,
  LoginForm,
  RegisterForm,
} from '../pages/index';
import { LayoutAdmin, LayoutDefault, LayoutUser } from '../layouts/index';
import { Admin } from '../pages';

const router = {
  normal: [
    // cac route tren nay khong can phai protect
    { path: '/', component: Home },
    { path: '/blogpost', component: Blog },
    { path: '/product', component: Product },
    { path: '/product/:id', component: ProductDetail },
    { path: '/home', component: Home },
    { path: '/contact', component: ContactUs },
    { path: '/login', layout: LayoutDefault, component: LoginForm },
    { path: '/register', layout: LayoutDefault, component: RegisterForm },
  ],

  // cac route duoi day can phai dc protect
  protect: [
    { path: '/voucher', component: Voucher },
    { path: '/cart', component: Cart },
    { path: '/ship-detail/:cartItemIds', component: ShipDetail },
    { path: '/payment-success', component: PaymentSuccess },
    { path: '/admin/voucher', layout: LayoutAdmin, component: ManageVoucher },
    { path: '/admin/blog', layout: LayoutAdmin, component: ManagementBlog },
    { path: '/admin', component: Admin },
    {
      path: '/payment-success',
      layout: LayoutDefault,
      component: PaymentSuccess,
    },
    { path: '/admin/order', layout: LayoutAdmin, component: Order },
    { path: '/admin/addproduct', component: AddProduct },
    { path: '/profile', layout: LayoutUser, component: EditProfile },
    {
      path: '/profile/order-histories',
      layout: LayoutUser,
      component: OrderHistories,
    },
    { path: '/admin/voucher', layout: LayoutAdmin, component: ManageVoucher },
    { path: '/admin/blog', layout: LayoutAdmin, component: ManagementBlog },
    { path: '/admin/product', layout: LayoutAdmin, component: ManageProduct },
    { path: '/admin/brand', layout: LayoutAdmin, component: ManageBrand },
    { path: '/admin/category', layout: LayoutAdmin, component: ManageCategory },
    { path: '/admin/user', layout: LayoutAdmin, component: ManageUser },
    { path: '/product/:id', component: ProductDetail },
    { path: '/order/:orderId', component: OrderDetail },
    { path: '/user', component: UserInfo },
  ],
};

export { router };
