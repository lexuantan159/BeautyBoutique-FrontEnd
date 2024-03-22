import React, { useContext, useEffect } from 'react';
import { FileInput, Label } from 'flowbite-react';
import { useState } from 'react';
import * as blogApi from '../../services/blogpost'
import MethodContext from '../../context/methodProvider';


const CreateBlog = ({ closeModal, isOpenForm, setChange, change, blogpost }) => {
    const { uploadFile, deleteAImage, notify } = useContext(MethodContext)
    const Token = localStorage.getItem('Token');
    const [imageUploads, setImageUpload] = useState(Array(6).fill(null));
    const [imagesDisplay, setImagesDisplay] = useState(Array(6).fill(null));
    const [images, setImages] = useState([])
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(Token);
        if (isOpenForm.isOpen) {
            document.getElementById('my_modal_2').showModal();
        }
        if (blogpost) {
            setId(blogpost?.id)
            setTitle(blogpost?.title)
            setContent(blogpost?.content)
            setImages(blogpost?.images)
            if (blogpost && blogpost.images) {
                const initialImages = blogpost.images.map(image => image.imageUrl);
                const filledImages = [...initialImages, ...Array(6 - initialImages.length).fill(null)];
                setImagesDisplay(filledImages);
            } else {
                setImagesDisplay(Array(6).fill(null));
            }
        }


    }, [])

    const handleFileChange = (index, e) => {
        const files = e.target.files;
        const newImages = [];
        const uploadedImages = [...imageUploads];
        const displayedImages = [...imagesDisplay];
        for (let i = 0; i < files.length; i++) {
            if (uploadedImages.filter(image => image !== null).length < 6) {
                const newImage = files[i];
                newImage["id"] = Math.random();
                newImages.push(newImage);
            } else {
                console.log("Maximum number of images reached!");
                break;
            }
        }
        for (let i = 0; i < uploadedImages.length; i++) {
            if (!uploadedImages[i]) {
                uploadedImages[i] = newImages.shift();
                if (!newImages.length) break;
            }
        }
        if (files.length > 0) {
            const imageUrlDisplay = URL.createObjectURL(files[0]);
            displayedImages[index] = imageUrlDisplay;
            setImagesDisplay(displayedImages);
        }
        setImageUpload(uploadedImages);

    };
    const handleDeleteImage = (index) => {
        const updatedImages = [...imageUploads];
        updatedImages[index] = null;
        setImageUpload(updatedImages);

        const updatedDisplayImages = [...imagesDisplay];
        updatedDisplayImages[index] = null;
        setImagesDisplay(updatedDisplayImages);
    };
    const handleDeleteImageUpdate = async (index) => {
        const deleteImage = await blogApi.deleteImageBlog(images[index].id)
        const deleteImageFirebase = await deleteAImage(images[index].id)
        if (deleteImage === 200 && deleteImageFirebase === 200) {
            console.log('xóa hình ảnh thành công ');
        }
    }

    const updateImageToFirebase = async () => {
        const validImages = imageUploads.filter(image => image !== null);
        if (validImages.length > 0) {
            const imagesFb = await uploadFile(validImages);
            return imagesFb
        } else {
            notify("There are no images to upload");
        }
    }

    const handlePost = async () => {
        const img = await updateImageToFirebase();
        if (img.imageIds.length > 0 && img.imageURLs.length > 0) {
            const createBlog = await blogApi.createNewBlog(title, content, img.imageIds, img.imageURLs, Token);
            if (createBlog.statusCode === 201) {
                setChange(!change)
                closeModal({ index: null, isOpen: false })
                notify("Created a successful post", 'success')
            } else {
                notify("Post creation failed")
            }
        } else {
            notify("Post creation failed")
        }
    }

    const handUpdate = async () => {
        const validImages = imageUploads.filter(image => image !== null);
        if (validImages.length > 0) {
            const img = await updateImageToFirebase();
            if (img.imageIds.length > 0 && img.imageURLs.length > 0) {
                const createBlog = await blogApi.updateBlogPost(id, title, content, img.imageIds, img.imageURLs, Token);
                if (createBlog.statusCode === 201) {
                    setChange(!change)
                    closeModal({ index: null, isOpen: false })
                    notify("Update successful post", 'success')

                } else {
                    notify("Update failed post")
                }
            } else {
                notify("Update failed post")

            }
        } else {
            const updateBlog = await blogApi.updateBlogPost(id, title, content, [], [], Token);
            if (updateBlog.statusCode === 201) {
                setChange(!change)
                closeModal({ index: null, isOpen: false })
                notify("Update successful post", 'success')

            }
        }
    }
    const handleSubmit = async () => {
        setLoading(true)
        if (blogpost) {
            await handUpdate()
        } else {
            await handlePost()
        }
        setLoading(false)
    }


    return (
        <div>
            <dialog id="my_modal_2" className="modal ">
                <div className="modal-box w-11/12 max-w-3xl no-scrollbar">
                    <div className='w-full m-4'>
                        <span className='mr-4 text-black font-semibold text-xl' >Title of the article</span>
                        <input type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Input Title"
                            value={title}
                            className="input input-bordered input-primary w-[70%] focus:outline-none" />
                    </div>
                    <div className='w-full m-4'>
                        <span className='text-black font-semibold text-xl'>Do you have any questions or concerns about products or beauty care?</span>
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Input Content"
                            value={content}
                            className="textarea textarea-primary textarea-lg w-[95%] mt-2 focus:outline-none" ></textarea>
                    </div>
                    <div className='w-full m-4'>
                        <span className='text-black font-semibold text-xl'>Please upload at least 1 image and at most 6 images .</span>
                        <div className='w-[95%] flex items-center justify-center'>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-2">
                                {imagesDisplay.map((url, index) => (
                                    <Label
                                        key={index}
                                        htmlFor={`dropzone-file-${index}`}
                                        className="flex h-80 w-[98%] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                                    >
                                        {url ? (
                                            <>
                                                <img src={url}
                                                    alt={`Uploaded image ${index + 1}`}
                                                    className="h-full w-full object-cover rounded-lg" />
                                                <button className="btn btn-outline btn-error btn-sm"
                                                    onClick={() => {
                                                        handleDeleteImage(index)
                                                        handleDeleteImageUpdate(index)
                                                    }}
                                                >DELETE</button>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                                <svg
                                                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLineJoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 text-center">
                                                    <span className="font-semibold ">Click to upload or drag and drop</span>
                                                </p>
                                                <p className="text-xs text-gray-500 flex items-center justify-center">SVG, PNG, JPG or GIF</p>
                                            </div>
                                        )}
                                        <FileInput id={`dropzone-file-${index}`} className="hidden" onChange={(e) => handleFileChange(index, e)} />
                                    </Label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>

                        <button className="btn btn-outline btn-success px-6"
                            onClick={handleSubmit}
                        >{loading ? (
                            <span className="loading loading-spinner text-secondary"></span>

                        ) : (
                            <div>
                                {blogpost ? (
                                    <span>UPDATE</span>
                                ) : (
                                    <span>POST</span>
                                )}
                            </div>
                        )}

                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => closeModal({ index: null, isOpen: false })}>close</button>
                </form>
            </dialog >
        </div>
    )
}

export default CreateBlog