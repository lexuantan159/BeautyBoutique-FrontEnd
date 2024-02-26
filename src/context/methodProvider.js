import { createContext } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from '../config/firebase.config';
import { v4 } from "uuid";
import { toast } from 'react-toastify';

const MethodContext = createContext({});

export const MethodProvider = ({ children }) => {


    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) {
            return "Không có thời gian"
        }
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear();
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const formattedDateTime = `${month}-${day}-${year} ${hours} : ${minutes}`;
        return formattedDateTime;
    }
    const uploadFile = async (imageUploads) => {
        try {
            const imageIds = [];
            const imageURLs = [];
            for (const imageUpload of imageUploads) {
                const imageId = v4();
                const imageRef = ref(storage, `/Blog-post/${imageId}`);
                const snapshot = await uploadBytes(imageRef, imageUpload);
                const url = await getDownloadURL(snapshot.ref);
                imageIds.push(imageId);
                imageURLs.push(url);
            }
            return { imageIds, imageURLs };
        } catch (error) {
            console.error("Error uploading images: ", error);
            throw error;
        }
    };
    const deleteImage = async (imageIds) => {
        try {
            const deletePromises = imageIds.map(async (imageId) => {
                const imageRef = ref(storage, `/Blog-post/${imageId.id}`);
                await deleteObject(imageRef);
                // console.log(`Image ${imageId.id} deleted successfully.`);
                return imageId.id;
            });

            const deletedImageIds = await Promise.all(deletePromises);
            console.log("Deleted Image IDs:", deletedImageIds);

            return deletedImageIds;
        } catch (error) {
            console.error("Error deleting images: ", error);
            throw error;
        }
    };
    const notify = (message, type) => {
        const toastType = type === 'success' ? toast.success : toast.error;
        return toastType(message);
    };

    const toastLoadingId = (message) => {
        return toast.loading(message);
    };

    const toastUpdateLoadingId = (message, status, idLoading) => {
        if (status === 'success') {
            toast.update(idLoading, {
                render: message,
                type: 'success',
                isLoading: false,
                autoClose: true,
                closeButton: 'close',
            });
        } else {
            toast.update(idLoading, {
                render: message,
                type: 'error',
                isLoading: false,
                autoClose: true,
                closeButton: 'close',
            });
        }
    }

    return (
        <MethodContext.Provider value={{ formatDateTime, uploadFile, notify, toastLoadingId, toastUpdateLoadingId, deleteImage }}>
            {children}
        </MethodContext.Provider>
    );
};

export default MethodContext;