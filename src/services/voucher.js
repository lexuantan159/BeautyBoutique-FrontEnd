
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
const saveVoucher = async (accessToken, voucherId) => {
    try {
        const saveVouUser = await request.post('/voucher/save-voucher-for-user',
            {},
            {
                params: {
                    voucherId: voucherId
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        return {
            message: saveVouUser.data,
            statusCode: saveVouUser.status
        }

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

const deleteVoucher = async (id, accessToken) => {
    try {
        console.log(accessToken);
        const response = await request.deleteRe(`/voucher/delete-voucher?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': "application/json"
            }
        });
        return response.status
    } catch (error) {
        console.error("Error deleting voucher:", error);
    }
};


export {
    getAllVoucher,
    createNewVouccher,
    updateVouccher,
    deleteVoucher,
    saveVoucher

}

const GET_VOUCHER = "voucher/get-voucher"

export const getVoucher = async (param) => {
    try {
        return await request.get(GET_VOUCHER, {
            params: param,
            headers: {
                "Content-Type": "Application/json",
            }
        });
    } catch (error) {
        return error
    }
};
