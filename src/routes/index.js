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
];

export { router };
