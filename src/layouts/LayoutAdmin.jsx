import Sidebar, { SidebarItem } from '../components/sidebar/Sidebar';
import { IoIosHome } from 'react-icons/io';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaStoreAlt } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import { PiTicket } from 'react-icons/pi';
import { LuPackage } from 'react-icons/lu';
import { TbBrandTidal } from 'react-icons/tb';
import { MdOutlineCategory } from 'react-icons/md';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const LayoutAdmin = ({ children }) => {
  const location = useLocation();

  const sidebarItems = [
    { icon: <IoIosHome size={20} />, text: "Home", active: false },
    { icon: <LuPackage size={20} />, text: "Product", active: false },
    { icon: <TbBrandTidal size={20} />, text: "Brand", active: false },
    { icon: <MdOutlineCategory size={20} />, text: "Category", active: false },
    { icon: <LuLayoutDashboard size={20} />, text: "Dashboard", active: false },
    { icon: <FaStoreAlt size={20} />, text: "Order", active: false },
    { icon: <PiTicket size={20} />, text: "Voucher", active: false },
    { icon: <TfiWrite size={20} />, text: "Blog", active: false },
  ];
  const [listSidebarItem, setListSidebarItem] = useState(sidebarItems);


  useEffect(() => {
    const urlParts = location.pathname.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const upperCasedLastPart = lastPart.toUpperCase();
    const updatedSidebarItems = listSidebarItem.map(item => ({
      ...item,
      active: item.text.toUpperCase() === upperCasedLastPart
    }));
    setListSidebarItem(updatedSidebarItems);
  }, [location])

  return (
    <>
      <div className="flex bg-gray-100">
        <div className="flex">
          <Sidebar>
            {listSidebarItem.map((item, index) => (
              <SidebarItem key={index} icon={item?.icon} text={item?.text} active={item?.active} />
            ))}
          </Sidebar>
        </div>
        <div className="fill-available">{children}</div>
      </div>
    </>
  );
};

export default LayoutAdmin;
