import React, {useState, useRef, useContext, useEffect} from "react";
import {FaRegUserCircle} from "react-icons/fa";
import {MdOutlineEmail} from "react-icons/md";
import {MdOutlineLocationOn} from "react-icons/md";
import * as userServices from "../../../services/user";
import MethodContext from "../../../context/methodProvider";
import {useNavigate} from "react-router-dom";


const EditProfile = () => {
    const [images, setImages] = useState([]);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [loadingAva, setLoadingAva] = useState(true);
    const fileRef = useRef();
    const accessToken = localStorage.getItem("token");
    const {notify} = useContext(MethodContext)
    const navigation = useNavigate();

    const handleUpdateAvatar = async () => {
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {fullName, email, dateOfBirth, address}
        const responseUpdateUser = await userServices.updateUser(accessToken, body);
        if (responseUpdateUser.status === 200) {
            notify("Update user successfully!", "success");
        } else {
            notify("Update user fail!", "error");
        }
    };

    useEffect(() => {
        if (!accessToken) {
            navigation("/login")
        }
        const fetchUser = async () => {
            const userResponse = await userServices.getUser(accessToken);
            if (userResponse.status === 200) {
                const user = userResponse.data;
                const cleanedDateOfBirth = user.dateOfBirth.split('T')[0];
                setFullName(user.fullName);
                setDateOfBirth(cleanedDateOfBirth);
                setEmail(user.email);
                setAddress(user.address);
            }
        }
        fetchUser();
    }, [])

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
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-[1px] border-gray-100 focus:border-[1px] focus:border-red-400  rounded outline-none"
                        />
                        <MdOutlineEmail className="w-[18px] h-[18px] absolute right-4"/>
                    </div>
                    <div className="relative w-full flex items-center mb-4">
                        <label
                            className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                            Day of Birth
                        </label>
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-[1px] border-gray-100 focus:border-[1px] focus:border-red-400  rounded outline-none"
                        />
                    </div>
                    <div className="relative w-full flex items-center mb-4">
                        <label
                            className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                            Address
                        </label>
                        <input
                            type="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-[1px] border-gray-100 focus:border-[1px] focus:border-red-400  rounded outline-none"
                        />
                        <MdOutlineLocationOn className="w-[18px] h-[18px] absolute right-4"/>
                    </div>
                    <div className="flex justify-end">
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
