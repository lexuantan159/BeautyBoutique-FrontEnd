import React, {useEffect, useState} from "react";
import InputText from "../inputs/InputText";
import {MdDeleteForever, MdDeleteOutline} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";

const ShipDetailItem = ({shipDetails = [], itemShip, setItemShip}) => {

    const [updated, setUpdated] = useState({isUpdate: false})
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    useEffect(() => {
        if (fullName === "" && phoneNumber === "" && address === "") {
            setUpdated({isUpdate: false});
        }
    }, [fullName, phoneNumber, address])


    const handleSubmit = (event) => {
        event.preventDefault()

    }

    const handleReset = () => {
        setFullName("")
        setPhoneNumber("")
        setAddress("")
    }

    return (
        <dialog id="my_modal_5"
                className="modal modal-bottom sm:modal-middle px-3 md:w-[90%] lg:w-[80%] md:mx-auto">
            <div
                className="modal-box sm:max-w-full sm:w-full relative left-0 right-0 overflow-y-scroll no-scrollbar rounded-lg ">
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none outline-none">✕
                    </button>
                </form>
                <h3 className="font-bold text-xl text-center text-red-400 uppercase">Ship Detail</h3>
                <h2 className="font-medium text-[16px]">Ship Detail</h2>

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className=" col-span-12 lg:col-span-6 max-h-[238px] overflow-y-scroll no-scrollbar">
                        {shipDetails.map((item, index) => {
                            return (
                                <div key={index} className="flex items-center justify-start mb-3 w-full lg:w-[91%]">
                                    <input type="radio" name="radio-2" className="radio radio-error"
                                           checked={item.id === (itemShip ? itemShip.id : null)}
                                           onClick={() => setItemShip(item)}
                                    />
                                    <div
                                        className="relative ml-2 p-3 border-[1px] rounded-lg hover:cursor-pointer w-full">
                                        <div className="absolute top-3 right-8 flex items-center">
                                            <FaRegEdit size={20} onClick={() => {
                                                setFullName(item?.fullName)
                                                setPhoneNumber(item?.phoneNumber)
                                                setAddress(item?.address)
                                                setUpdated({isUpdate: true, infoItem: item})
                                            }}/>
                                            <MdDeleteOutline
                                                className="ml-2 hover:cursor-pointer hover:text-red-500 transition-all"
                                                size={20}/>
                                        </div>
                                        <p className="w-full">{item.fullName}</p>
                                        <p className="w-full">{item?.phoneNumber}</p>
                                        <p className="truncate w-full">{item?.address}</p>
                                    </div>
                                </div>)
                        })}

                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <form onSubmit={handleSubmit}
                              className="w-full pt-7 px-3 border-[1px] border-gray-400 rounded-lg ">
                            <InputText title={"Username"} isUpdate={updated?.isUpdate} value={fullName}
                                       setValue={setFullName}/>
                            <InputText title={"Phone"} isUpdate={updated?.isUpdate} value={phoneNumber}
                                       setValue={setPhoneNumber}/>
                            <InputText title={"Address"} isUpdate={updated?.isUpdate} value={address}
                                       setValue={setAddress}/>
                            <div className="flex justify-start">
                                <button
                                    className={`px-4 py-2 font-medium text-white rounded-lg mb-2 text-center ${updated?.isUpdate ? 'bg-green-400' : "bg-red-400"}  transition-all`}>{updated.isUpdate ? "Update" : "Create"}
                                </button>

                                {(fullName !== "" && phoneNumber !== "" && address !== "" && updated?.isUpdate) && <p
                                    className={`px-4 py-2 font-medium text-white rounded-lg mb-2 text-center bg-green-400 transition-all`}
                                    onClick={handleReset}
                                >reset
                                </p>}

                            </div>
                        </form>
                    </div>

                </div>


                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn px-6 py-2 min-h-0 h-auto hover:bg-red-500 hover:text-white">Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>)
}

export default ShipDetailItem