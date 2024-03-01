import * as request from '../utils/request'

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