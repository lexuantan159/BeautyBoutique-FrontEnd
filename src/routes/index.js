import {
  Blog,
  Voucher,
  Home,
  Cart,
  ShipDetail,
  PaymentSuccess,
} from '../pages';
import { Admin, Blogpost, ContactUs, UserInfo } from '../pages';
import { Order } from '../pages';

import { OrderDetail } from '../pages';

const router = [
  { path: '/blogpost', component: Blogpost },
  { path: '/order', component: Order },
  { path: '/order/:orderId', component: OrderDetail },
  { path: '/contact', component: ContactUs },
  { path: '/admin', component: Admin },
  { path: '/user', component: UserInfo },
  { path: '/', component: Home },
  { path: '/blogpost', component: Blog },
  { path: '/voucher', component: Voucher },
  { path: '/cart', component: Cart },
  { path: '/ship-detail', component: ShipDetail },
  { path: '/payment-success', component: PaymentSuccess },
];

export { router };
