import * as request from '../utils/request'

const getAllVoucher = async () => {
    try {
        const response = await request.get('/voucher/get-all-voucher', {});
        return {
            voucherList: response.data.voucherList,
            quantity: response.data.quantity
        }
    } catch (error) {

        const statusCode = error.status || (error.response && error.response.status) || 500;
        return {
            error,
            statusCode,
        };
    }
};
const createNewVouccher = async (title, content, quantity, numUsedVoucher, discount, maximDiscount, minimumOrder, startDate, endDate) => {
    try {
        return await request.post('/voucher/create-voucher',
            {
                title: title,
                discount: discount,
                content: content,
                quantity: quantity,
                numUsedVoucher: numUsedVoucher,
                minimumOrder: minimumOrder,
                maximDiscount: maximDiscount,
                startDate: startDate,
                endDate: endDate
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });


    } catch (error) {
        const statusCode = error.status || (error.response && error.response.status) || 500;
        return {
            error,
            statusCode,
        };
    }
}
const updateVouccher = async (id, title, content, quantity, numUsedVoucher, discount, maximDiscount, minimumOrder, startDate, endDate) => {
    try {
        return await request.put(`/voucher/update-voucher?id=${id}`,
            {
                title: title,
                discount: discount,
                content: content,
                quantity: quantity,
                numUsedVoucher: numUsedVoucher,
                minimumOrder: minimumOrder,
                maximDiscount: maximDiscount,
                startDate: startDate,
                endDate: endDate
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    } catch (error) {
        const statusCode = error.status || (error.response && error.response.status) || 500;
        return {
            error,
            statusCode,
        };
    }
}
const deleteVoucher = async (id) => {
    try {
        const response = await request.deleteRe(`/voucher/delete-voucher?id=${id}`);
        return response.status
    } catch (error) {
        console.error("Error deleting voucher:", error);
    }
};


export {
    getAllVoucher,
    createNewVouccher,
    updateVouccher,
    deleteVoucher

}