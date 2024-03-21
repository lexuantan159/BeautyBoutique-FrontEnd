import {
  Blog,
  ManageVoucher,
  Voucher,
  Home,
  Cart,
  ShipDetail,
  PaymentSuccess,
  ProductDetail,
  Order,
  ManagementBlog,
  OrderDetail,
  ContactUs,
  UserInfo,
  Product,
  ManageProduct,
  ManageUser,
  ManageCategory,
  ManageBrand,
  AddProduct,
  Admin,
  LoginForm,
  RegisterForm,
} from '../pages/index';

import { LayoutAdmin, LayoutDefault } from '../layouts/index';

const router = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/blogpost', component: Blog },
  { path: '/voucher', component: Voucher },
  { path: '/cart', component: Cart },
  { path: '/ship-detail', component: ShipDetail },
  { path: '/payment-success', component: PaymentSuccess },
  { path: '/admin/voucher', layout: LayoutAdmin, component: ManageVoucher },
  { path: '/admin/blog', layout: LayoutAdmin, component: ManagementBlog },
  { path: '/admin/order', layout: LayoutAdmin, component: Order },
  { path: '/admin', component: LayoutAdmin },
  { path: '/admin/product', layout: LayoutAdmin, component: ManageProduct },
  { path: '/admin/brand', layout: LayoutAdmin, component: ManageBrand },
  { path: '/admin/category', layout: LayoutAdmin, component: ManageCategory },
  { path: '/admin/user', layout: LayoutAdmin, component: ManageUser },

  { path: '/product', component: Product },
  { path: '/admin', component: Admin },
  { path: '/product', component: Product },
  { path: '/product/:id', component: ProductDetail },

  { path: '/admin/addproduct', component: AddProduct },
  { path: '/order/:orderId', component: OrderDetail },
  { path: '/contact', component: ContactUs },
  { path: '/user', component: UserInfo },
  { path: '/login', layout: LayoutDefault, component: LoginForm },
  { path: '/register', layout: LayoutDefault, component: RegisterForm },
];

export { router };
