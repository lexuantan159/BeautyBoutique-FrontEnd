import React, {useContext} from "react";
import MethodContext from "../../context/methodProvider"
import {useMutation, useQueryClient} from "react-query";
import * as shipDetailServices from "../../services/shipDetail"

const ModalVoucher = ({shipDetail}) => {
    const {notify} = useContext(MethodContext)
    const queryClient = useQueryClient();
    const handleDelete = async (params) => {
        return await shipDetailServices?.deleteShipDetail(params)
    }

    const {mutate} = useMutation({
        mutationFn: (body) => {
            return handleDelete(body)
        },
        onSuccess: () => {
            notify("Delete ship detail successfully!", "success");
            queryClient.invalidateQueries({queryKey: ["shipDetails"]});
        },
        onError: (err) => {
            notify("Delete ship detail fail!", "error");
        }
    });

    return (<>
        <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle  ">
            <div className="modal-box rounded-lg overflow-y-scroll no-scrollbar">
                <h2 className="font-medium text-xl text-center">Are you sure you want to delete it?</h2>

                <form method="dialog" className="flex justify-center items-center gap-2 mt-5">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        onClick={async () => {
                            const body = {userId: 1, shipDetailId: shipDetail?.id}
                            await mutate(body)
                        }}
                        className="btn px-8 py-3 min-h-0 h-auto text-white hover:bg-red-500 hover:opacity-90 outline-none bg-red-500">Yes
                    </button>
                    <button
                        onClick={() => {
                            document.getElementById('my_modal_5').showModal()
                        }}
                        className="btn px-8 py-3 min-h-0 h-auto hover:opacity-90 outline-none">No
                    </button>
                </form>

                <div className="modal-action mt-2">
                    <form method="dialog" >
                        {/* if there is a button in form, it will close the modal */}
                        <button
                            onClick={() => {
                                document.getElementById('my_modal_5').showModal()
                            }}
                            className="btn px-6 py-2 min-h-0 h-auto hover:bg-red-500 hover:text-white outline-none">Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    </>)
}

export default ModalVoucher