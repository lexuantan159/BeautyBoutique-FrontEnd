import {
  Voucher,
  Home,
  Cart,
  ShipDetail,
  PaymentSuccess,
} from '../pages';
import { Admin, Blogpost, ContactUs, UserInfo } from '../pages';
import { Order } from '../pages';
import { Category } from '../pages';
import { Foundation } from '../pages';
import { MakeupBase } from '../pages';
import { PowerPact } from '../pages';
import { Concealer } from '../pages';
import { Cushion } from '../pages';
import { BlusherHighlighter } from '../pages';
import { OrderDetail } from '../pages';
import { Product } from '../pages';
import { ProductDetail } from '../pages';
import { ProductDetail2 } from '../pages';


const router = [
  { path: '/order', component: Order },
  { path: '/order/:orderId', component: OrderDetail },
  { path: '/contact', component: ContactUs },
  { path: '/admin', component: Admin },
  { path: '/user', component: UserInfo },
  { path: '/home', component: Home },
  { path: '/voucher', component: Voucher },
  { path: '/cart', component: Cart },
  { path: '/ship-detail', component: ShipDetail },
  { path: '/payment-success', component: PaymentSuccess },
  { path: '/category', component: Category },
  { path: '/foundation', component: Foundation },
  { path: '/makeupbase', component: MakeupBase },
  { path: '/power&pact', component: PowerPact },
  { path: '/concealer', component: Concealer },
  { path: '/cushion', component: Cushion },
  { path: '/blusher&highlighter', component: BlusherHighlighter },
  { path: '/foundation/:productId', component:ProductDetail  },
  { path: '/blusher&highlighter/:productId', component:ProductDetail  },
  { path: '/makeupbase/:productId', component:ProductDetail  },
  { path: '/power&pact/:productId', component:ProductDetail  },
  { path: '/concealer/:productId', component:ProductDetail  },
  { path: '/cushion/:productId', component:ProductDetail  },
  { path: '/category/:productId', component:ProductDetail  },


 
];

export { router };
