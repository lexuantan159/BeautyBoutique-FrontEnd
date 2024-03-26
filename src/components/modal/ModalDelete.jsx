import { useContext } from "react";
import { IoWarning } from "react-icons/io5";
import { ManageProductContext } from "../product/ProductComponent.jsx";
function ModalDelete({ info }) {
    const { current: product } = useContext(ManageProductContext);
    function handleDelete() {
        console.log(info);
    }
    return (
        <dialog
            id="modal_delete"
            className="modal modal-bottom sm:modal-middle w-[60%] mx-auto"
        >
            <div className=" dark:bg-white  modal-box relative left-0 right-0 overflow-y-scroll no-scrollbar rounded-lg sm:max-w-full">
                <form method="dialog">
                    <button className="bt n btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none outline-none">
                        ✕
                    </button>
                </form>
                <div className="flex gap-3 items-center">
                    <span className="text-2xl text-red-500">
                        <IoWarning />
                    </span>
                    <span className="text-2xl text-slate-600 font-semibold">
                        Confirm delete
                    </span>
                </div>
                <div className="text-slate-600">
                    <p>Are you sure you want to delete this {info}</p>
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="border-2 border-slate-400 hover:border-slate-300 btn px-6 py-2 text-slate-600 min-h-0 h-auto bg-slate-200  hover:bg-slate-300 box-border">
                            Cancel
                        </button>
                    </form>
                    <button
                        onClick={handleDelete}
                        className="border-2 border-red-400 btn px-6 py-2 text-slate-600 min-h-0 h-auto bg-white hover:bg-red-500 hover:text-white hover:border-red-400 box-border"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default ModalDelete;
