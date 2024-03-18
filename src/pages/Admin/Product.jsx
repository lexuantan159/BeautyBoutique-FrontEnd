// import React, { useContext, useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaChartLine, FaUser } from 'react-icons/fa';
// import { IoBagHandle } from 'react-icons/io5';
// import { MdOutlineCategory } from 'react-icons/md';
// import { TbBuildingWarehouse } from 'react-icons/tb';
// import { TiTicket } from 'react-icons/ti';
// import { Button, Modal, Checkbox, Table } from 'flowbite-react';
// import { MdDelete } from "react-icons/md";
// import MethodContext from "../../../context/methodProvider";
// import * as productApi from "../../../services/product";

// export function Product() {
//   const [openModal, setOpenModal] = useState(false);
  
//   const [productName, setProductName] = useState("");
//   const [actualPrice, setActualPrice] = useState("");
//   const [salePrice, setSalePrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const { uploadFile, deleteAImage } = useContext(MethodContext);

//   const [imageUploads, setImageUpload] = useState([]);

//   const handleChange = (e) => {
//     for (let i = 0; i < e.target.files.length; i++) {
//       const newImage = e.target.files[i];
//       newImage["id"] = Math.random();
//       setImageUpload((prevState) => [...prevState, newImage]);
//     }
//   };

//   const updateImageToFirebase = async () => {
//     const validImages = imageUploads.filter((image) => image !== null);
//     if (validImages.length > 0) {
//       const imagesFb = await uploadFile(validImages);
//       return imagesFb;
//     } else {
//       console.log("Không có hình ảnh nào để upload");
//     }
//   };
//   const handleSubmit = async () => {
//     const img = await updateImageToFirebase();
//     if (img && img.imageIds.length > 0 && img.imageURLs.length > 0) {
//       const createBlog = await productApi.addProduct(
//         productName,
//         actualPrice,
//         salePrice,
//         description,
//         categoryId,
//         quantity,
//         img.imageIds,
//         img.imageURLs,
//         1
//       );
//       if (createBlog.statusCode === 201) {
//         alert("tạo sản phẩm  mới thành công");
//       } else alert("tạo sản phẩm không thành công");
//     }
//   };

//   const [menuItems, setMenuItems] = useState([ 
//   { id: '001', name: 'Classic Burger', category: 'Burger', price: 40.00 },
//   { id: '002', name: 'Watermelon Juice', category: 'Drink', price: 45.00 },
//   { id: '003', name: 'Chicken Nugget', category: 'Side Dish', price: 50.00 },
//   { id: '004', name: 'Cheese Pizza', category: 'Pizza', price: 160.00 },
//   { id: '005', name: 'Chicken Burger', category: 'Burger', price: 80.00 },
//   { id: '006', name: 'Bacon & Egg Sandwich', category: 'Sandwich', price: 90.00 },
//   { id: '007', name: 'Carnitas Hotdog', category: 'Hotdog', price: 80.00 },
//   { id: '008', name: 'Baguette Grilled Pork', category: 'Baguette', price: 35.00 },
//   { id: '009', name: 'Saigon Red Beer', category: 'Drink', price: 25.00 },
//   { id: '010', name: 'BBQ Pulled Pork Burger', category: 'Burger', price: 99.00 }
// ]);

//   const addItem = () => {
//     // Check if any of the fields are empty
//     if (!ID || !Name || !Category || !Price) {
//       alert('Please fill in all fields');
//       return;
//     }

//     // Convert the Price to a number
//     const parsedPrice = parseFloat(Price);

//     // Check if Price is a valid number
//     if (isNaN(parsedPrice)) {
//       alert('Please enter a valid price');
//       return;
//     }

//     // Create a new item object
//     const newItem = {
//       id: ID,
//       name: Name,
//       category: Category,
//       price: parsedPrice,
//     };

//     // Update the state with the new item
//     setMenuItems([...menuItems, newItem]);

//     // Clear the input fields
//     setID('');
//     setName('');
//     setCategory('');
//     setPrice('');
//   };
//   return (
//     <div className="max-w-[1200px] mx-auto " >
//     <div className="flex gap-2">
//       <div className="min-w-72 bg-[#4B4949] rounded-md p-7">
//         <div className="flex flex-col h-full">
//           <p className="text-[#FFFFFF] text-xl font-bold text-center">ADMIN</p>
//           <div className="flex flex-col pl-7 font-medium text-slate-500 text-lg my-auto gap-4 ">
//             <NavLink
//               to=""
//               className="flex gap-2 text-[#FFFFFF] items-center hover:cursor-pointer hover:bg-blue-200 rounded-md py-4 px-2 ease-in duration-300"
//             >
//               <FaChartLine />
//               <p className="text-[#FFFFFF]">Statistic</p>
//             </NavLink>
//             <NavLink
//               to="/admin"
//               className="flex gap-2 text-[#FFFFFF] items-center hover:cursor-pointer hover:bg-blue-200 rounded-md py-4 px-2 ease-in duration-300"
//             >
//               <FaUser />
//               <p className="text-[#FFFFFF]">User Management</p>
//             </NavLink>
//             <NavLink
//               to="/admin/product"
//               className="flex gap-2 text-[#50FAD1] items-center hover:cursor-pointer hover:bg-blue-200 rounded-md py-4 px-2 ease-in duration-300"
//             >
//               <IoBagHandle />
//               <p className="text-[#50FAD1]">Items List</p>
//             </NavLink>
//             <NavLink
//               to="/admin/category"
//               className="flex gap-2 text-[#FFFFFF] items-center hover:cursor-pointer hover:bg-blue-200 rounded-md py-4 px-2 ease-in duration-300"
//             >
//               <MdOutlineCategory />
//               <p className="text-[#FFFFFF]">Category</p>
//             </NavLink>
//             <NavLink
//               to=""
//               className="flex gap-2 text-[#FFFFFF] items-center hover:cursor-pointer hover:bg-blue-200 rounded-md py-4 px-2 ease-in duration-300"
//             >
//               <TbBuildingWarehouse />
//               <p className="text-[#FFFFFF]">Inventory List</p>
//             </NavLink>
//             <NavLink
//               to=""
//               className="flex gap-2 text-[#FFFFFF] items-center hover:cursor-pointer hover:bg-blue-200 rounded-md py-4 px-2 ease-in duration-300"
//             >
//               <TiTicket />
//               <p className="text-[#FFFFFF]">Voucher</p>
//             </NavLink>
//           </div>
//         </div>
//       </div>
//        <div className="w-full flex flex-col">
//         <div className="w-full flex flex-row justify-between items-center">
//             <p className="w-[750px] text-center text-2xl font-medium p-2 text-black"> ITEM LIST </p>

//         <button onClick={() => setOpenModal(true)} className="bg-[#4B4949] text-white text-base font-medium px-4 py-2 rounded self-end shadow-md">
//           Add New Items
//         </button>
//         <Modal show={openModal} onClose={() => setOpenModal(false)}>
//         <Modal.Header>Create New Items</Modal.Header>
//         <Modal.Body>
//           <div className="space-y-6">
//             <form className="flex gap-4 flex-col px-16 text-slate-500">
//         <div className="grid grid-cols-2 gap-8 justify-around flex-1">
//           <fieldset className="border border-solid border-gray-300 p-3 rounded-xl">
//             <legend className="text-base">Item ID</legend>
//             <input
//               className="bg-transparent w-full px-4 rounded-base"
//               onChange={(e)=>{setID(e.target.value)}}
//               type="text"
//             />
//           </fieldset>
//           <fieldset className="border border-solid border-gray-300 p-3 rounded-xl">
//             <legend className="text-base">Item Name</legend>
//             <input
//               type="text"
//               onChange={(e)=>{setName(e.target.value)}}
//               className="bg-transparent w-full px-4 rounded-base"
//             />
//           </fieldset>
//         </div>
//         <div className="grid grid-cols-2 gap-8 justify-around flex-1">
//           <fieldset className="border border-solid border-gray-300 p-3 rounded-xl">
//             <legend className="text-base">Category</legend>
//             <input
//               className="bg-transparent w-full px-4 rounded-base"
//               onChange={(e)=>{setCategory(e.target.value)}}
//               type="text"
//             />
//           </fieldset>
//           <fieldset className="border border-solid border-gray-300 p-3 rounded-xl">
//             <legend className="text-base">Unit</legend>
//             <input
//               type="text"
//               className="bg-transparent w-full px-4 rounded-base"
//             />
//           </fieldset>
//         </div>
//         <div className="grid grid-cols-2 gap-8 justify-around flex-1">
//           <fieldset className="border border-solid border-gray-300 p-3 rounded-xl">
//             <legend className="text-base">Image</legend>
//             <input
//               className="bg-transparent w-full px-4 rounded-xl"
//               type="file"
//             />
//           </fieldset>
//           <fieldset className="border border-solid border-gray-300 p-3 rounded-xl">
//             <legend className="text-base">Price</legend>
//             <input
//               type="text"
//               onChange={(e)=>{setPrice(e.target.value)}}
//               className="bg-transparent w-full px-4 rounded-base"
//             />
//           </fieldset>
//         </div>
        
//       </form>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={() => {setOpenModal(false);addItem()}}>I accept</Button>
//           <Button color="gray" onClick={() => setOpenModal(false)}>
//             Decline
//           </Button>
//         </Modal.Footer>
//       </Modal>
//         </div>
//     <div  className="w-full pt-[10px]">
//             <div className="flex flex-col text-slate-500">
//               <input
//                 className="bg-slate-200 p-1 focus:outline-none rounded"
//                 type="text"
//                 placeholder=" Search Items"
//                 id="name"
//               />
//             </div>
//     <div className="overflow-x-auto">
//       <Table hoverable>
//   <Table.Head>
    
//     <Table.HeadCell>Item ID</Table.HeadCell>
//     <Table.HeadCell>Item Name</Table.HeadCell>
//     <Table.HeadCell>Category</Table.HeadCell>
//     <Table.HeadCell>Price</Table.HeadCell>
//     <Table.HeadCell>
//       <span className="sr-only">Edit</span>
//     </Table.HeadCell>
//     <Table.HeadCell>
//       <span className="sr-only">Edit</span>
//     </Table.HeadCell>
//   </Table.Head>
//   <Table.Body className="divide-y">
//     {menuItems.map(item => (
//       <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
        
//         <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//           {item.id}
//         </Table.Cell>
//         <Table.Cell>{item.name}</Table.Cell>
//         <Table.Cell>{item.category}</Table.Cell>
//         <Table.Cell>{item.price.toFixed(2)} $</Table.Cell>
//         <Table.Cell>
//           <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
//             <img src={require(`../../images/Burger/pen.jpg`) } alt="" className='w-[20px] ml-[85px]'></img>
//           </a>
//           </Table.Cell>
//         <Table.Cell>
//           <a href="#" className="font-medium hover:underline dark:text-cyan-500">
//             <MdDelete className='text-base' />
//           </a>
//         </Table.Cell>
//       </Table.Row>
//     ))}
//   </Table.Body>
// </Table>

//     </div>
           
     
//      </div>
//      </div>
//      </div>
//      </div>
//   );
// }