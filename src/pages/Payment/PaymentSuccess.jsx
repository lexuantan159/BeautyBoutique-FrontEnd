import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentSuccess = () => {

    return (<div className="w-full h-screen flex flex-col justify-center items-center">

        <p className="text-3xl text-gray-300 font-bold mb-8">Thank you</p>
        <motion.h1

            className="text-8xl text-red-400 font-bold animate-bounce">Your Payment is Successful</motion.h1>
        <Link to={"/"} className="text-lg text-red-400 underline mt-8">Back to Home</Link>
    </div>)
}
export default PaymentSuccess