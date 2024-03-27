import React from "react";
import {Link} from "react-router-dom";
import {IoIosSearch, IoIosSettings, IoMdLogOut} from "react-icons/io";
import {IoChatboxEllipses, IoNewspaperOutline} from "react-icons/io5";
import {
    FaUserCircle,
    FaUserEdit,
    FaLock,
    FaProductHunt,
    FaHome, FaRegUser,
} from "react-icons/fa";
import {Tb3DCubeSphere} from "react-icons/tb";
import {FaChevronDown} from "react-icons/fa6";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
} from "@material-tailwind/react";
import {CgProfile} from "react-icons/cg";

export default function SidebarUser() {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] shadow rounded-lg border-[1px] border-gray-200 mb-10">
            <List>
                <Accordion
                    open={open === 1}
                    icon={
                        <FaChevronDown
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                open === 1 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader
                            onClick={() => handleOpen(1)}
                            className="border-b-0 p-3 hover:bg-red-300 hover:text-white font-medium transition-all"
                        >
                            <ListItemPrefix>
                                <FaUserCircle className="h-5 w-5"/>
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-medium">
                                User
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1 ml-8">
                        <List className="p-0">
                            <Link to="/profile">
                                <ListItem className="hover:bg-red-300 hover:text-white font-medium transition-all">
                                    <ListItemPrefix>
                                        <FaRegUser strokeWidth={3} className="h-3 w-5"/>
                                    </ListItemPrefix>
                                    Profile
                                </ListItem>
                            </Link>
                            <Link to="/profile/change-password">
                                <ListItem className="hover:bg-red-300 hover:text-white font-medium transition-all">
                                    <ListItemPrefix>
                                        <FaLock strokeWidth={3} className="h-3 w-5"/>
                                    </ListItemPrefix>
                                    Change Password
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <Link to="/profile/order-histories">
                        <ListItem className="p-0">
                            <AccordionHeader className="border-b-0 p-3 hover:bg-red-300 hover:text-white font-medium transition-all">
                                <ListItemPrefix>
                                    <IoNewspaperOutline className="h-5 w-5"/>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-medium">
                                    Order Histories
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                    </Link>
                </Accordion>
                <hr className="my-2 border-blue-gray-50"/>
                <ListItem className="hover:bg-red-300 hover:text-white font-medium transition-all" >
                    <ListItemPrefix>
                        <IoMdLogOut className="h-5 w-5"/>
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}
