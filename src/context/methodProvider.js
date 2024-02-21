import {createContext} from 'react';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from '../config/firebase.config';
import {v4} from "uuid";
import {toast} from 'react-toastify';
const MethodContext = createContext({});

export const MethodProvider = ({children}) => {


    const formatDateTime = (dateTimeString) => {
        // Tạo đối tượng Date từ chuỗi thời gian
        if (!dateTimeString) {
            return "Không có thời gian"
        }
        const dateTime = new Date(dateTimeString);

        // Lấy thông tin ngày, tháng, năm, giờ và phút
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear();
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');

        // Tạo chuỗi định dạng
        const formattedDateTime = `${month}-${day}-${year} ${hours} : ${minutes}`;

        return formattedDateTime;
    }


    const uploadFile = async (imageUploads) => {
        try {
            const uploadedImages = []

            for (const imageUpload of imageUploads) {
                const imageId = v4()
                const imageRef = ref(storage, `/Blog-post/${imageId}`)

                const snapshot = await uploadBytes(imageRef, imageUpload)
                const url = await getDownloadURL(snapshot.ref);

                uploadedImages.push({id: imageId, url});
            }

            console.log(uploadedImages);
            return uploadedImages
        } catch (error) {
            console.error("Error uploading images: ", error)
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
    };
    return (
        <MethodContext.Provider value={{formatDateTime, uploadFile, notify, toastLoadingId, toastUpdateLoadingId}}>
            {children}
        </MethodContext.Provider>
    );
};

export default MethodContext;