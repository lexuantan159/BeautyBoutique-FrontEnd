import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";
import { ManageProductContext } from "../product/ProductComponent.jsx";
import Spinner from "../../pages/Dashboard/Product/Spinner.jsx";
import MethodContext from "../../context/methodProvider.js";
import { toast } from "react-toastify";
import {
    createProduct,
    getProductById,
    updateProduct,
    getCategory,
} from "../../services/product.js";
const style =
    "dark:bg-white ring-1 ring-slate-400 rounded-lg py-1 px-2 focus:outline-none";

const LabelInfo = ({ label, description = false, field = label }) => {
    const { dispatch, state } = useContext(ModalContext);
    return (
        <div className="grid grid-cols-2 max-w-lg items-center">
            <label className="font-semibold" htmlFor="product-name">
                {label}
            </label>
            {!description ? (
                <input
                    className={style}
                    type="text"
                    value={state?.[field]}
                    onChange={(e) =>
                        dispatch({ type: field, name: e.target.value })
                    }
                />
            ) : (
                <textarea
                    className={style}
                    value={state?.[field]}
                    onChange={(e) =>
                        dispatch({ type: field, name: e.target.value })
                    }
                ></textarea>
            )}
        </div>
    );
};
const LabelCategory = ({ label }) => {
    const { dispatch, state } = useContext(ModalContext);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        try {
            const fetchDataCategory = async () => {
                const getCategories = await getCategory();
                setCategories(getCategories.data);
            };
            fetchDataCategory();
        } catch (error) {
            console.log(error);
        }
    }, []);
    // console.log(categories);
    // console.log(state);
    return (
        <div className="grid grid-cols-2 items-center max-w-lg">
            <label className="font-semibold" htmlFor="product-name">
                {label}
            </label>
            <select
                value={state?.category?.id}
                onChange={(e) => {
                    //chua lamg gi het
                    // console.log(state?.category?.id);
                    dispatch({ type: "categoryId", name: e.target.value });
                }}
                className="bg-gray-50 border border-gray-300 text-slate-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-400  dark:bg-white dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {categories.map((c) => (
                    <option className="font-sans" value={c.id} key={c.id}>
                        {c.categoryName}
                    </option>
                ))}
            </select>
        </div>
    );
};
export function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// make useReducer to handler product object that contains many properties
const initialProduct = {
    productName: undefined,
    actualPrice: undefined,
    salePrice: undefined,
    description: undefined,
    categoryId: 1,
    brandId: 1,
    quantity: 1,
    imageIds: undefined,
    imageUrls: undefined,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "productName":
            return { ...state, productName: action.name };
        case "actualPrice":
            return { ...state, actualPrice: Number(action.name) };
        case "salePrice":
            return { ...state, salePrice: +action.name };
        case "description":
            return { ...state, description: action.name };
        case "categoryId":
            return { ...state, categoryId: +action.name };
        case "quantity":
            return { ...state, quantity: +action.name };
        case "imageIds":
            return { ...state, imageIds: action.name };
        case "imageUrls":
            return { ...state, imageUrls: action.name };
        case "update":
            return action.name;
        default: {
            console.log(`khong thuc hien action ${action.type}`);
            console.log(action.type === "imageUrls");
        }
    }
};
const ModalContext = createContext();
const ModalProduct = () => {
    const { current, create, setCreate, setIsUpdate } =
        useContext(ManageProductContext);
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialProduct);
    const [image, setImage] = useState(null);
    const ref = useRef();
    const { uploadFile, deleteImage } = useContext(MethodContext);
    const handleUpload = async () => {
        return await uploadFile([image]);
    };
    const handleSummit = async () => {
        // when Admin try to update the current product
        if (!create) {
            try {
                if (image) {
                    // delete old image
                    console.log(state);
                    await deleteImage([state?.images[0]]);
                    // update new image to database
                    const data = await handleUpload();
                    await updateProduct({
                        ...state,
                        imageIds: [data.imageIds[0]],
                        imageUrls: [data.imageURLs[0]],
                        categoryId: state?.category?.id,
                        brandId: state?.brand?.id,
                    });
                    setIsUpdate((va) => !va);
                    toast.success("Update product successfully");
                    return;
                } else {
                    await updateProduct({
                        ...state,
                        categoryId: state?.category?.id,
                        brandId: state?.brand?.id,
                        imageIds: [state.images?.[0].id],
                        imageUrls: [state.images?.[0].imageUrl],
                    });
                    toast.success("Update product successfully");
                    setIsUpdate((va) => !va);
                    return;
                }
            } catch (e) {
                console.log(e);
                toast.error("Something went wrong, please try again later");
            }
        }
        // when Admin try to create new product
        if (!image) {
            toast.error("Please provide the image of product");
            return;
        }
        try {
            const data = await handleUpload();
            await createProduct({
                ...state,
                imageIds: [data.imageIds[0]],
                imageUrls: [data.imageURLs[0]],
            });
            toast.success("Add product successfully");
            setIsUpdate((va) => !va);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        async function fetchData() {
            setIsLoading(() => true);
            if (!create && current?.id) {
                const { data } = await getProductById(current?.id);
                setProduct(() => data);
                dispatch({ type: "update", name: data });
            } else {
                await delay(10);
                dispatch({ type: "update", name: initialProduct });
                setProduct(() => {});
            }
            setIsLoading(() => false);
        }
        fetchData();
    }, [current, create]);
    return (
        <ModalContext.Provider value={{ dispatch, state }}>
            <dialog
                id="modal_product"
                ref={ref}
                className="modal modal-bottom sm:modal-middle w-[60%] mx-auto"
                onClose={() => setCreate(() => false)}
            >
                <div className=" dark:bg-white  modal-box relative left-0 right-0 overflow-y-scroll no-scrollbar rounded-lg sm:max-w-full">
                    <form method="dialog">
                        <button className="bt n btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none outline-none">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-xl text-center uppercase">
                        {product ? "Product Detail" : "Add new product"}
                    </h3>
                    {/* this div display image of product and label - input to update product */}
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <div>
                            <div className="flex gap-3 flex-col text-slate-500">
                                <div className="flex gap-4 items-end">
                                    <img
                                        className="w-20 rounded-lg shadow-lg"
                                        src={product?.images?.[0]?.imageUrl}
                                        alt={product?.name}
                                        key={product?.images?.[0]?.imageUrl}
                                    />
                                    <label
                                        className="font-semibold"
                                        htmlFor="product-image"
                                    >
                                        Change image
                                    </label>
                                    <input
                                        className="rounded-md cursor-pointer"
                                        type="file"
                                        name="product-image"
                                        onChange={(e) => {
                                            setImage(
                                                () => e.target?.files?.[0]
                                            );
                                        }}
                                    />
                                </div>
                                <LabelInfo
                                    label="Product name"
                                    field={"productName"}
                                />
                                <LabelInfo
                                    label="Product quantity"
                                    field={"quantity"}
                                />
                                <LabelInfo
                                    label="Actual price"
                                    field={"actualPrice"}
                                />
                                <LabelInfo
                                    label="Sale Price"
                                    field={"salePrice"}
                                />
                                <LabelCategory
                                    label="Category"
                                    field={"categoryName"}
                                />
                                <LabelInfo
                                    description={true}
                                    label="Description"
                                    field={"description"}
                                />
                            </div>
                        </div>
                    )}
                    <div className="modal-action flex items-center">
                        <form method="dialog">
                            <button className="border-0 btn px-6 py-2 text-slate-800 min-h-0 h-auto bg-slate-400 hover:bg-red-500 hover:text-white">
                                Close
                            </button>
                        </form>
                        <button
                            className="border-2 border-green-500 btn px-6 py-2 min-h-0 h-auto bg-white   text-slate-700  hover:text-white hover:bg-green-500 hover:border-white"
                            onClick={handleSummit}
                        >
                            {product ? "Update" : "Create"}
                        </button>
                    </div>
                </div>
            </dialog>
        </ModalContext.Provider>
    );
};

export default ModalProduct;
