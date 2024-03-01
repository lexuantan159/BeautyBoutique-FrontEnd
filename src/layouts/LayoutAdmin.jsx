
import Sidebar, { SidebarItem } from "../components/sidebar/Sidebar"
import {IoIosHome } from "react-icons/io";
import {LuLayoutDashboard} from "react-icons/lu";
import {CgShutterstock} from "react-icons/cg";
import {FaStoreAlt} from "react-icons/fa";
import {IoSettingsSharp} from "react-icons/io5";
import {useState} from "react"

const LayoutAdmin = ({children}) => {

    return (<>
        <div className="flex bg-gray-100">
            <div className="flex">
                <Sidebar>
                    <SidebarItem icon={<IoIosHome size={20} />} text="Home" />
                    <SidebarItem icon={<LuLayoutDashboard size={20} />} text="Dashboard" />
                    <SidebarItem icon={<CgShutterstock size={20} />} text="Stock" alert />
                    <SidebarItem icon={<FaStoreAlt  size={20} />} text="Order" />
                    <hr className="my-3" />
                    <SidebarItem icon={<IoSettingsSharp  size={20} />} text="Settings" />
                </Sidebar>
            </div>
            <div className="fill-available">{children}</div>
        </div>
    </>)
}

export default LayoutAdmin