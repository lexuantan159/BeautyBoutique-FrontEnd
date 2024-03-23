import React from "react";
const AboutUs = () => {
    return(
        <div className="w-[1200px] mx-auto ">
           <p className="text-4xl text-center font-sans font-semibold mt-4">March 20, 2024</p>
           <img src={require("../../images/1.jpg")} alt="" className="w-full"/>
           <div className="w-full h-[100px] bg-red-100 rounded-l ">
                <p className="ml-[30px] pt-[15px] text-l font-sans font-medium">
                    • BEAUTY BOUTIQUE was established in Vietnam in March 2024 with the goal of providing comprehensive beauty and health care for the people of Vietnam.
                </p>
                <p className="ml-[30px] text-l font-sans font-medium">
                    • BEAUTY BOUTIQUE has created exceptional online shopping experiences along with professional Spa care services using state-of-the-art equipment from leading global brands.
                </p>
           </div>
           <img src={require("../../images/2.jpg")} alt="" className="w-full mt-2"/>
           <img src={require("../../images/3.jpg")} alt="" className="w-full mt-2"/>
           
        </div>
    )
}
export default AboutUs;
