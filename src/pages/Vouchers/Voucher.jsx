import React, { useContext, useState, useEffect } from 'react';
import logo from '../../public/img/logo.jpg';
import MethodContext from '../../context/methodProvider';
import * as voucherApi from '../../service/voucher';

const Voucher = () => {
  const { formatDateTime } = useContext(MethodContext);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vouchersData = await voucherApi.getAllVoucher();
        setVouchers(vouchersData.voucherList);
      } catch (error) {
        console.error('Error fetching blogposts:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-auto pt-32 bg-[#F5F6F6] ">
      {vouchers.map(voucher => {
        return (
          <div className="flex items-center justify-center m-4 ">
            <div className="w-[50%] h-52 bg-[#F8EFEA] rounded-xl shadow-lg">
              <div className="h-full flex items-center justify-center">
                <div className="w-1/4 flex items-center justify-center">
                  <div className="avatar relative">
                    <div className="w-40 rounded-full ">
                      <img src={logo} />
                    </div>
                    <div className="bg-white h-16 w-16 rounded-full absolute top-[-20px] right-0 ">
                      <span className="block p-2">
                        UP TO {voucher.discount * 100} %
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 h-full flex items-center justify-center">
                  <div>
                    <span className="block">VOUCHER</span>
                    <span className="block">
                      Discount : {voucher.discount * 100} %
                    </span>
                    <span className="block">
                      Minimum purchase : {voucher.minimumOrder} $
                    </span>
                    <span className="block">
                      Maximum discount :{voucher.maximDiscount} ${' '}
                    </span>
                    <span className="block">{voucher.title}</span>
                    <span className="block">
                      Start Day : {voucher.startDate}
                    </span>
                    <span className="block">End Day : {voucher.endDate}</span>
                  </div>
                </div>
                <div className="w-1/4 h-full flex items-center justify-center">
                  <div>
                    <button className="btn btn-accent px-5 mb-6">
                      Save Voucher
                    </button>
                    <button className="btn btn-neutral ">Use right away</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Voucher;
