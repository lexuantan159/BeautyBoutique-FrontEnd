import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import React, {useState, useContext} from "react";
import MethodContext from "../../../context/methodProvider";
import * as userService from "../../../services/login";

const ChangePass = () => {
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [openOldPass, setOpenOldPass] = useState(false)
    const [openNewPass, setOpenNewPass] = useState(false)
    const {notify} = useContext(MethodContext)

    function isStrongPassword(password) {
        // Check the length of the password
        if (password.length < 6) {
            notify("Password is too short!", "error");
            return false; // Password is too short
        }
        // Check if the password contains at least one uppercase letter, one lowercase letter, and one digit
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (!hasUppercase || !hasLowercase || !hasNumber) {
            notify("Password lacks character diversity!", "error");
            return false; // Password lacks character diversity
        }
        // Check if the password contains special characters
        const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        if (!hasSpecialChars) {
            notify("Password does not contain special characters!", "error");
            return false; // Password does not contain special characters
        }
        // Check if the password is a common password
        const commonPasswords = ["password", "123456", "qwerty", "abc123"]; // Add more common passwords if needed
        if (commonPasswords.includes(password.toLowerCase())) {
            notify("Password is too common!", "error");
            return false; // Password is too common
        }
        // If the password passes all checks, it's considered strong
        return true;
    }

    const handleSubmit = async (e) => {
        console.log(1)
        e.preventDefault();
        if (!isStrongPassword(newPass))
            return;
        const accessToken = localStorage.getItem('token');
        const response = await userService.changePass(accessToken, oldPass, newPass);
        if (response.status === 200){
            setNewPass("")
            setOldPass("")
            notify("Change password successfully!", "success");
        }
        else {
            console.log(response)
            notify("Change password fail!", "error");
        }
    }

    return (
        <div className="rounded-lg border-[1px] border-gray-200 shadow px-4 p-2">
            <div className="flex items-center justify-center pb-4 mt-3">
                <h1 className="text-xl text-red-400 font-bold">
                    Change Password
                </h1>
            </div>
            <div className="grid grid-cols-6 gap-4 ">
                <form className="font-[sans-serif] m-6 w-full mx-auto col-span-4">
                    <div className="relative w-full flex items-center mb-4">
                        <label
                            className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                            Old Password
                        </label>
                        <input
                            type={openOldPass ? 'text' : 'password'}
                            value={oldPass}
                            onChange={(e) => setOldPass(e.target.value)}
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-[1px] border-gray-100 focus:border-[1px] focus:border-red-400  rounded outline-none "
                        />
                        {
                            openOldPass ? <FaRegEye className="w-[18px] h-[18px] absolute right-4"
                                                    onClick={() => setOpenOldPass(false)}/> :
                                <FaRegEyeSlash className="w-[18px] h-[18px] absolute right-4"
                                               onClick={() => setOpenOldPass(true)}/>
                        }

                    </div>
                    <div className="relative w-full flex items-center mb-4">
                        <label
                            className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px] font-semibold">
                            New Password
                        </label>
                        <input
                            type={openNewPass ? 'text' : 'password'}
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-[1px] border-gray-100 focus:border-[1px] focus:border-red-400  rounded outline-none "
                        />
                        {
                            openNewPass ? <FaRegEye className="w-[18px] h-[18px] absolute right-4"
                                                    onClick={() => setOpenNewPass(false)}/> :
                                <FaRegEyeSlash className="w-[18px] h-[18px] absolute right-4"
                                               onClick={() => setOpenNewPass(true)}/>
                        }
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={(e) => handleSubmit(e)}
                            type="button"
                            className="mt-4 px-8 py-2.5 text-sm font-semibold bg-red-400 text-white rounded hover:opacity-90 transition-all"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ChangePass