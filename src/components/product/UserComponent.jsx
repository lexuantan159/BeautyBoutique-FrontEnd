import { BsFillTrash3Fill } from "react-icons/bs";
import { HeaderInfo, HeaderPage, ListItem } from "./ProductComponent.jsx";
import { BsFillCircleFill } from "react-icons/bs";
import { createContext, useContext, useEffect, useState } from "react";
import ModalDelete from "../modal/ModalDelete.jsx";
import ModalUser from "../modal/ModalUser.jsx";
import { getUser } from "../../services/user.js";

const testUsers = [
    {
        id: 1,
        fullname: "thinh",
        address: "120, nguyen Luong bang, Lien chieu, Da Nang",
        role: "admin",
        status: true,
    },
    {
        id: 2,
        fullname: "nam",
        address: "82, chuong cho",
        role: "user",
        status: false,
    },
];
function UserInline({ user }) {
    const { setCurrent } = useContext(UserContext);
    const openModal = () => {
        setCurrent(() => user);
        document.getElementById("modal_user").showModal();
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        document.getElementById("modal_delete").showModal();
    };
    return (
        <div
            className="grid grid-cols-4 hover:bg-slate-200 h-8"
            onClick={openModal}
        >
            <div className="m-auto">{user?.fullname}</div>
            <div className="m-auto truncate">{user?.address}</div>
            <div className="m-auto text-green-500">
                {user?.status ? (
                    <BsFillCircleFill color="#22c55e" />
                ) : (
                    <BsFillCircleFill color="red" />
                )}
            </div>
            <div
                id="delete"
                className="flex justify-center items-center w-full text-slate-400 hover:text-red-500 font-medium text-xl ease-in duration-200 hover:scale-110"
                onClick={handleDelete}
            >
                <BsFillTrash3Fill />
            </div>
        </div>
    );
}
export const UserContext = createContext();

function ManageListUser() {
    const [current, setCurrent] = useState({});
    const [users, setUsers] = useState(testUsers);
    useEffect(() => {
        function fetchUsers() {
            // fetch users from API
            const data = getUser();
            console.log(data);
        }
    }, []);

    return (
        <UserContext.Provider value={{ current, setCurrent }}>
            <div className="text-slate-500 bg-white">
                <HeaderPage
                    info="User"
                    setCurrentItem={setCurrent}
                    type="user"
                />
                <HeaderInfo
                    headers={["User Name", "Address", "Status", "Delete"]}
                />
                <ListItem>
                    {users.map((user) => (
                        <UserInline user={user} key={user.id} />
                    ))}
                </ListItem>
                <ModalDelete info="user" />
                <ModalUser key={current?.id || 99} />
            </div>
        </UserContext.Provider>
    );
}

export default ManageListUser;
