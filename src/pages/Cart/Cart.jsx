import {useQuery} from "react-query";
import * as cartService from "../../services/cart"
import React, {useContext, useEffect, useState} from "react";
import CartItem from "../../components/cart/CartItem";
import VoucherCom from "../../components/voucher/VoucherCom";
import {Link} from "react-router-dom";
import MethodContext from "../../context/methodProvider";
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const [action, setAction] = useState(false)
    const {
        data: cart,
        isLoading,
    } = useQuery(["cart", action], () => cartService.getCart({userId: 1}));
    const navigate = useNavigate();
    const {notify} = useContext(MethodContext)
    const [discount, setDiscount] = useState(0)
    let totalPriceWithDiscount = 0;

    useEffect(() => {
        // totalPriceWithDiscount = discount === 0 ? cart?.data?.totalPrice : cart?.data?.totalPrice * discount;
        totalPriceWithDiscount = 10;
    }, [cart, discount])

    const handlePayment = () => {
        if (totalPriceWithDiscount <= 0) {
            console.log(totalPriceWithDiscount)
            notify("Cannot payment with no products", "error");
            return;
        }
        navigate("/ship-detail");
    }

    return (
        <>
            <div className="max-w-[1200px] grid grid-cols-12 gap-5 mt-40 mx-10 lg:px-2 lg:mx-auto">
                <h1 className="col-span-12 font-semibold text-xl">My Cart <span
                    className="font-normal">{cart?.data?.quantity <= 1 ? `( ${cart?.data?.quantity === 0 ? 0 : cart?.data?.quantity} product )` : `( ${cart?.data?.quantity} products )`}</span>
                </h1>
                <div
                    className="bg-white col-span-12 lg:col-span-8 rounded-lg shadow-lg max-h-[430px] overflow-y-scroll no-scrollbar border-[0.2px] border-gray-300">
                    {isLoading ? <span
                        className="loading loading-dots loading-lg text-xl "></span> : (cart.status === 200 && cart?.data?.carts.length > 0) ? cart?.data?.carts.map((item) => {
                            return (<CartItem key={item?.id} item={item} actionChange={setAction} action={action}/>)
                        })
                        : <div className="h-full flex flex-col justify-center items-center py-10">
                            <img className="w-10 h-10 md:w-30 md:h-30 "
                                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEnUlEQVR4nO1bS4gcRRguFYyKDxQ0PhDBkw8UFDSIIfiEgWR3+/uaykGQHH0haECF5DBB9iCiKAHxIChofAuiBz2oFx8HvQWjEh9Xk40eorKP+mezLbVb3dR2Znp7dvq5sx/8zExNT0311/X/X/1/dSu1iU0sQ4C3DXBKyMg3AxwzYXiLqgCR1hcJ8JMAR+x7VSUMcCJ98okBb1QxBiF3eP+7o4r/TCBhuM0A04Z8LjYBDi/PAvLPSKkzVMnoheFdMQH2vaobEgQPJ65QgRs0joC5qamrPTfYN3YEWAj5s3ODb9Q4EmCAFxwBvWjnzoubTICNUwb4YtnIB4sa1L1eHNitCoYEwe0CPBp1OlvSBNg2AR6zx+QlwFORbiEDjDqdLQb4ryw5NOTfcd9pAmybW4ucyOpjnry2R95nLZ4BloC4beRBCvlJWXJoyM/99Ua/94b8LLMP4IA7bimrrZFyGE1MbLXEDlqEGXJmdnLyyloJmCOvKVMObZwZsAxf7AH3rPX70l2gCjmMr1jKhgpkpQTBquQw0vosQ37lXf0vbVvtMliVHMbxIMkGJya2qiYh0vpsQ/7rSHhdjSMklkPgWBXZYeMgFWeHjcOcJ4eGfDWWmZbZ3VGnc+G6SRAbpAZVjtpiwOGR5VBabHblWYwcAs83YErnM+B+Q866GfB+MXKIaoqlRcCE4Y3eLHhk7ORQbF3BEbAQBNePnRwK+YHz/5mRL9pcxcXSUbGcI5DH3Xjfa12xtFH+H8MAL7o4sBhpfYkaF/+PYaWl7Oywkf7fNjksxf/bJIdD+X80OXmBIZ91ldp316rHrZJD4FbVQNg9h1z+HwGXCfBHas28JOTTuYql5P41BxOG2wR4pkoz5PfuXI5nzlIhD3kn86MBTrorK1nMxdlhHjlMNkHqyQCz1/8G+Mcd/KH9vKD1DV4He4solgrwTr/yd0WW7f/GXfGYgFTw2FtnsbR0/7cQ4C1vuhxZ5QLkdaqmvcOC9D/b/y0irS8dEASfUi2UQ6f/M0Pl/5HW59sdGrsZae8ay7tH30Q5TMWwYtb/bcoOS1n/tyk7LGX935bssPD1v5B3xiurNshh4fm/kN24w0HTKSWHn9ZZAfZL94X4v+QgwJfDptjI/m9W1gHWrw9kta1xk0N9BAAvr/vkRyWg7o0Qm3lG3e6ZahRInFaSXe8G6pW2INieRYDaSJD8MSDXcRuXgGDVhsnuDUVCHtiqUq1Fj9NVYMnmNKpK9IBOw0iYUVUjWqkvPiTka54kLdq01JAvCfBbMkjgV/8plVwGzHv9fm0XPvbVa5t3x00LcJuqC0Lujwe1ACAhSOtzk2IlcNJ+zt1nEGwfpPOGPJgQGwR3qLohwMfuKv+S/s6QDyQnMjV10xB9PpkEZK0v97+b1foqb2Y9rhpDAHk0k4AwvHmIPp9ICACuaDoB+xIXIMO4Pdq16zxD/pC4wJ4956zLBciDsdS6FPiVdbuA9HlsblSzd5R6/npKgI+cn/7uReqjIwbBb21gNcB3pwXB/r+d7vsEiiH/qluyKpPGfk+gCHmoxk2LKk/ezsQ3h3KPTaiNi/8Bz/mfErhQWrYAAAAASUVORK5CYII="
                                 alt="sdfd"/>
                            <p className="hidden md:block text-lg font-medium mt-2 text-red-400">Your cart is empty!</p>
                        </div>
                    }

                </div>
                <div className="bg-white col-span-12 lg:col-span-4 flex-grow mt-5 lg:mt-0 ">
                    <div className="w-full flex justify-between gap-2">
                        <Link to="/products" relative={"route"} className="w-full">
                            <button type="button"
                                    className="w-full text-center bg-white hover:bg-red-500 hover:text-white border-[1px] border-red-400 py-3 px-4 rounded font-bold mr-3 shadow-lg transition-all">
                                Add Other
                            </button>
                        </Link>

                        <button type="button"
                                onClick={handlePayment}
                                className="w-full text-center bg-red-500 hover:bg-white hover:border-[1px] hover:border-red-400 hover:text-black text-white font-bold py-3 px-4 rounded shadow-lg transition-all">
                            Payment
                        </button>

                    </div>
                    {/*Voucher*/}
                    <VoucherCom conditionApply={totalPriceWithDiscount}/>
                    <div className="w-full mt-4 bg-white rounded-lg shadow-md px-3 mb-2 border-[0.2px] border-gray-300">
                        <div className="mx-3 mb-3 flex justify-between items-center border-b-[1px] border-gray-300">
                            <p className="py-2 ">Price </p>
                            <p className="py-2 ">{cart?.data?.totalPrice}$ </p>
                        </div>
                        <div className="mx-3 mb-3 flex justify-between items-center border-b-[1px] border-gray-300">
                            <p className="py-2 ">Discount </p>
                            <p className="py-2 ">{discount}% </p>
                        </div>
                        <div className="mx-3 mb-3 flex justify-between items-center text-[#FF9FA0]">
                            <p className="py-2 ">Total </p>
                            <p className="py-2 ">{totalPriceWithDiscount}$ </p>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default Cart;