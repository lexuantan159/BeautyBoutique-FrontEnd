import React from 'react';
import { NavLink } from 'react-router-dom';

const sampleOder = [
  {
    orderId: 'hd001',
    userId: 'us001',
    orderDate: '12/01/2022',
    totalAmount: 120,
    deliveryId: 1,
    paymentId: 1,
  },
  {
    orderId: 'hd002',
    userId: 'us001',
    orderDate: '13/01/2022',
    totalAmount: 11,
    deliveryId: 1,
    paymentId: 1,
  },
  {
    orderId: 'hd003',
    userId: 'us001',
    orderDate: '14/01/2022',
    totalAmount: 20,
    deliveryId: 1,
    paymentId: 1,
  },
];
export function Order() {
  return (
    <div className="bg-white text-[#515151] text-lg border-b-[1px] border-[#E8E8E8] mb-2">
      <div className="rounded-lg ">
        <p className="font-medium text-[#2D2D2D] ml-3">My order</p>
        <div className="text-base font-medium text-center divide-y divide-solid">
          <ol className="grid grid-cols-6 gap-4 justify-between px-4 py-1 bg-[#E8E8E8] rounded-t-lg">
            <li>Order ID</li>
            <li>User ID</li>
            <li>Order date</li>
            <li>Total amount</li>
            <li>Delivery ID</li>
            <li>Payment ID</li>
          </ol>
          {sampleOder.map(value => {
            return (
              <NavLink to={value.orderId}>
                <ol className="hover:bg-sky-200 ease-in duration-200 grid grid-cols-6 gap-4 justify-between px-4 py-1 uppercase">
                  <li>{value.orderId}</li>
                  <li>{value.userId}</li>
                  <li>{value.orderDate}</li>
                  <li className="text-right pr-14">{value.totalAmount}$</li>
                  <li>{value.deliveryId}</li>
                  <li>{value.paymentId}</li>
                </ol>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
