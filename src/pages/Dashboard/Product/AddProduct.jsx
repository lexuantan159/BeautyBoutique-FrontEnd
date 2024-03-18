import React, { useContext, useState } from "react";
import MethodContext from "../../../context/methodProvider";
import * as productApi from "../../../services/product";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [quantity, setQuantity] = useState("");
  const { uploadFile, deleteAImage } = useContext(MethodContext);

  const [imageUploads, setImageUpload] = useState([]);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImageUpload((prevState) => [...prevState, newImage]);
    }
  };

  const updateImageToFirebase = async () => {
    const validImages = imageUploads.filter((image) => image !== null);
    if (validImages.length > 0) {
      const imagesFb = await uploadFile(validImages);
      return imagesFb;
    } else {
      console.log("Không có hình ảnh nào để upload");
    }
  };
  const handleSubmit = async () => {
    const img = await updateImageToFirebase();
    if (img && img.imageIds.length > 0 && img.imageURLs.length > 0) {
      const createBlog = await productApi.addProduct(
        productName,
        actualPrice,
        salePrice,
        description,
        categoryId,
        quantity,
        img.imageIds,
        img.imageURLs,
        1
      );
      if (createBlog.statusCode === 201) {
        alert("tạo sản phẩm  mới thành công");
         window.location.reload();
      } else alert("tạo sản phẩm không thành công");
    }
  };

  return (
    <div className="w-full mt-36">
      <div className="flex items-center justify-center">
        <div className="w-[60%] grid grid-cols-2 gap-4">
          <div>
            <div className="my-4">
              <span className="block my-2">Product Name</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-accent w-full max-w-xs"
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="my-4">
              <span className="block my-2">Actual Price</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-accent w-full max-w-xs"
                onChange={(e) => setActualPrice(e.target.value)}
              />
            </div>
            <div className="my-4">
              <span className="block my-2">Sale Price</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-accent w-full max-w-xs"
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="my-4">
              <span className="block my-2">Description</span>
              <textarea className="textarea textarea-accent w-full" type="text"
                placeholder="Type here"
                 onChange={(e) => setDescription(e.target.value)}
                 ></textarea>
             
            </div>
            <div className="my-4">
              <span className="block my-2">Category ID</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-accent w-full max-w-xs"
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </div>
            <div className="my-4">
              <span className="block my-2">Quantity</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-accent w-full max-w-xs"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Update Image Of Product</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            multiple
            onChange={handleChange}
          />
        </label>
      </div>
      <div className=" mt-4 flex items-center justify-center">
        <button className="btn btn-outline btn-success" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddProduct;
