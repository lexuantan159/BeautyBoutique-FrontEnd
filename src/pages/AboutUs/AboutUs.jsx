import React from "react";
import { Card } from 'flowbite-react';

const AboutUs = () => {
    const Branches = [
    {
        image: '01.jpg',
        district: 'Quận Tân Bình',
        address: 'CN 1: 71 Hoàng Hoa Thám, P.13, Q.Tân Bình, TP.HCM',
        MST: '1800 6324'
    },
    {
        image: '02.jpg',
        district: 'Quận 10',
        address: 'CN 2: 555 Đường 3 Tháng 2, P.8, Q.10, TP.HCM',
        MST: '1800 6324'
    },
    {
        image: '03.jpg',
        district: 'Quận Phú Nhuận',
        address: 'CN 3: 176 Phan Đăng Lưu, P.3, Q.Phú Nhuận, TP.HCM',
        MST: '1800 6324'
    },
   
];

  return (
    <div className="w-[1000px] mx-auto ">
      <p className="text-4xl text-center font-sans font-semibold mt-4">
        March 20, 2024
      </p>
      <img src={require("../../images/1.jpg")} alt="" className="w-full" />
      <div className="w-full bg-red-100 rounded-l py-4 ">
        <p className="mx-5 text-l font-sans font-medium">
          • BEAUTY BOUTIQUE was established in Vietnam in March 2024 with the
          goal of providing comprehensive beauty and health care for the people
          of Vietnam.
        </p>
        <p className="mx-5 text-l font-sans font-medium ">
          • BEAUTY BOUTIQUE has created exceptional online shopping experiences
          along with professional Spa care services using state-of-the-art
          equipment from leading global brands.
        </p>
      </div>
      <img src={require("../../images/2.jpg")} alt="" className="w-full mt-2" />
      <img src={require("../../images/3.jpg")} alt="" className="w-full mt-2" />
      <p className="text-4xl text-center font-sans font-semibold mt-8">
        BEAUTY BOUTIQUE BRANCHES
      </p>
      
      <div className="grid grid-cols-3 gap-10 mt-8">
        {Branches?.map((item, index) => {
            return(
                <>
                 <Card
            key={index}
            className="max-w-sm"
            renderImage={() => (
              <img
                className="w-full self-center mt-2"
                src={require(`../../images/BlusherHighlighter/${item.image}`)}
                alt={item.district}
              />
            )}
          >
            <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              {item.district}
            </h5>
            <p className="font-normal text-center text-gray-700 dark:text-gray-400">
              {item.address} <br />
              {item.MST}
            </p>
          </Card>
                </>
            )
        })}
        
     </div> 
    </div>
  );
};
export default AboutUs;
