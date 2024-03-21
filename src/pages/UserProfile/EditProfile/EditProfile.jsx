import React, {useState, useRef} from "react";
import {FaRegUserCircle, FaTimes} from "react-icons/fa";
import {MdOutlineEmail} from "react-icons/md";
import {MdPhoneIphone, MdOutlineLocationOn} from "react-icons/md";

const EditProfile = () => {
    const [images, setImages] = useState([]);
    const [loadingAva, setLoadingAva] = useState(true);
    const fileRef = useRef();

    const handleUpdateAvatar = async () => {
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic submit form ở đây
        console.log("Form submitted!");
    };
    const handleCancel = () => {
        // Xử lý logic khi người dùng nhấn nút "Cancel" ở đây
        console.log("Form canceled!");
    };
    return (
        <div className="rounded-lg border-[1px] border-gray-200 shadow px-4 p-2">
            <div className="flex items-center justify-center pb-4 mt-3">
                <h1 className="text-xl text-red-400 font-bold">
                    Edit User Profile
                </h1>
            </div>
            <div className="grid grid-cols-6 gap-4 ">
                <form className="font-[sans-serif] m-6 w-full mx-auto col-span-4">
                    <div className="relative w-full flex items-center mb-4">
                        <label
                            className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                            Full Name
                        </label>
                        <input
                            type="name"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-[1px] border-gray-100 focus:border-[1px] focus:border-red-400  rounded outline-none "
                        />
                        <FaRegUserCircle className="w-[18px] h-[18px] absolute right-4"/>
                    </div>
                    <div className="relative w-full flex items-center mb-4">
                        <label
                            className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-[1px] border-gray-100 focus:border-[1px] focus:border-red-400  rounded outline-none"
                        />
                        <MdOutlineEmail className="w-[18px] h-[18px] absolute right-4"/>
                    </div>
                    <div className="relative w-full flex items-center mb-4">
                        <label
                            className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                            Phone Number
                        </label>
                        <input
                            type="phone"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-[1px] border-gray-100 focus:border-[1px] focus:border-red-400  rounded outline-none"
                        />
                        <MdPhoneIphone className="w-[18px] h-[18px] absolute right-4"/>
                    </div>
                    <div className="relative w-full flex items-center mb-4">
                        <label
                            className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                            Address
                        </label>
                        <input
                            type="address"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-[1px] border-gray-100 focus:border-[1px] focus:border-red-400  rounded outline-none"
                        />
                        <MdOutlineLocationOn className="w-[18px] h-[18px] absolute right-4"/>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="mt-4 px-6 py-2.5 text-sm font-semibold  text-black border  border-gray-400  rounded hover:bg-gray-200 mr-4"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="mt-4 px-8 py-2.5 text-sm font-semibold bg-red-400 text-white rounded hover:bg-white hover:text-black transition-all"
                        >
                            Save
                        </button>
                    </div>
                </form>
                <div className="flex flex-col items-center col-span-2 mt-4">
                    {loadingAva ? (
                        <img
                            src="https://img.thuthuattinhoc.vn/uploads/2020/05/30/hhinh-anh-luffy-chibi-thu-the-rat-ngau_055520104.jpg"
                            alt="loading-avatar"
                            className="w-40 h-40 object-cover border-2 rounded-full"
                        />
                    ) : (
                        <img
                            src={
                                "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            }
                            alt="avatar"
                            className="w-40 h-40 object-cover border-2 rounded-full"
                        />
                    )}
                    <div className="relative w-full mt-4">
                        <input
                            ref={fileRef}
                            onChange={handleUpdateAvatar}
                            className="relative block w-full text-sm"
                            type="file"
                            id="formFileMultiple"
                            hidden
                            accept=".png, .jpg, .jpeg"
                            multiple
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
