import React, {useEffect, useState} from "react";
import InputText from "../inputs/InputText";
import {MdDeleteForever, MdDeleteOutline} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";
import * as shipDetailService from "../../services/shipDetail";
import {useMutation, useQueryClient} from "react-query";
import DeleteModal from "./DeleteModalShipDetail";
import DeleteModalShipDetail from "./DeleteModalShipDetail";

const ShipDetailItem = ({shipDetails = [], itemShip, setItemShip}) => {

    const [updated, setUpdated] = useState({isUpdate: false})
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [created, setCreated] = useState(false)
    const [deletedItem , setDeletedItem] = useState({})

    useEffect(() => {
        if (fullName === "" && phoneNumber === "" && address === "") {
            setUpdated({isUpdate: false});
        }
    }, [fullName, phoneNumber, address])
    const queryClient = useQueryClient()

    const handleSubmit = async (body) => {
        if (updated?.isUpdate) {
            return await shipDetailService.updateShipDetail({userId: 1, shipDetailId: updated?.infoItem?.id}, body);
        } else {
            setCreated(true)
            return await shipDetailService.createShipDetail({userId: 1}, body);
        }
    }

    const {mutate} = useMutation({
        mutationFn: (body) => {
            return handleSubmit(body)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["shipDetails"]});
        },
        onError: (err) => {
            setCreated(false)
            console.log(err)
        }
    });

    const handleReset = () => {
        setFullName("")
        setPhoneNumber("")
        setAddress("")
        setUpdated({isUpdate: false})
    }

    return (
        <dialog id="my_modal_4"
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
                                <div key={item?.id} className="flex items-center justify-start mb-3 w-full lg:w-[91%]">
                                    <input type="radio" name="radio-2" className="radio radio-error"
                                           defaultChecked={true}
                                           checked={created && index === item?.length - 1 ? true : item.id === (itemShip ? itemShip.id : null)}
                                           onChange={() => setItemShip(item)}
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
                                                onClick={() => {
                                                    setDeletedItem(item)
                                                    document.getElementById('my_modal_5').close()
                                                    document.getElementById('my_modal_6').showModal()
                                                }}
                                                className="ml-2 hover:cursor-pointer hover:text-red-500 transition-all"
                                                size={20}/>

                                        </div>
                                        <p className="w-full">{item.fullName}</p>
                                        <p className="w-full">{item?.phoneNumber}</p>
                                        <p className="truncate w-full">{item?.address}</p>
                                    </div>
                                </div>)
                        })}
                        <DeleteModalShipDetail shipDetail={deletedItem}/>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <form onSubmit={async (event) => {
                            event.preventDefault();

                            const body = {
                                fullName: fullName,
                                phoneNumber: phoneNumber,
                                address: address
                            }
                            await mutate(body)
                            handleReset();
                        }}
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
                                    className={`ml-3 px-4 py-2 font-medium text-white rounded-lg mb-2 text-center bg-green-400 hover:cursor-pointer transition-all`}
                                    onClick={handleReset}
                                >Reset
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