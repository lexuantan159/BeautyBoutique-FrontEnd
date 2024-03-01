import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineLocalShipping, MdOutlinePayments } from "react-icons/md";
import { GoChevronRight } from "react-icons/go";

const DropList = ({ title, listItem = [], Icon }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [itemDrop, setItemDrop] = useState({});
    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };


    const container = {
        hidden: { opacity: 0, height: "0px", backgroundColor: "white" },
        show: {
            opacity: 1,
            height: "auto",
            transition: {
                easing: "linear",
            }
        }
    }

    const itemCross = {
        hidden: { opacity: 1, rotate: 0 },
        show: { opacity: 1, rotate: 90 }
    }
    const item = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                easing: "linear",
            }
        }
    }

    return (<>
        <motion.div
            initial="show"
            onClick={handleClick}
            className="p-3 mb-3 rounded-lg shadow-lg border-[0.2px] border-gray-300">
            <motion.div
                className="flex justify-between items-center cursor-pointer"
            >
                <motion.p className="flex items-center uppercase">
                    <Icon className="mr-2" /> {Object.keys(itemDrop).length === 0 ? title : itemDrop?.name}
                </motion.p>
                <motion.p animate={isExpanded ? itemCross.show : itemCross.hidden}
                >
                    <GoChevronRight className="text-xl" />
                </motion.p>
            </motion.div>
            <motion.div
                initial="hidden"
                variants={container}
                animate={isExpanded ? "show" : "hidden"}
                className={`${isExpanded ? "block mt-2" : "hidden"}`}
            >
                {
                    listItem.map((item) => {
                        return (
                            <motion.p key={item?.id} variants={item}
                                onClick={() => setItemDrop(item)}
                                className={isExpanded ? "block text-lg rounded hover:bg-gray-200 py-2 px-3 transition-all" : "hidden"}>
                                {item?.name}
                            </motion.p>
                        )
                    })
                }
            </motion.div>
        </motion.div>
    </>)
}

export default DropList