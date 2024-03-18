import * as request from '../utils/request'

const CREATE_ORDER_ENDPOINT = "/order/create-order"

export const createOrder = async (paramObject, cartItemsId) => {
    try {
        return await request.post(CREATE_ORDER_ENDPOINT,
            {cartItemsId},
            {
                params:
                paramObject
                ,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                // withCredentials: true
            }
        );
    } catch (error) {
        return error
    }
};


const CREATE_PAYMENT_ENDPOINT = "/order/create-payment"

export const createPayment = async (paramObject, cartItemsId) => {
    try {
        return await request.post(CREATE_PAYMENT_ENDPOINT,
            {cartItemsId},
            {
                params:
                paramObject,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                // withCredentials: true
            }
        );
    } catch (error) {
        return error
    }
};


const ORDER_HISTORY_ENDPOINT = "/order/order-histories"
export const getOrderHistories = async (paramsObject) => {
    try {
        return await request.get(ORDER_HISTORY_ENDPOINT, {
            params: paramsObject,
            headers: {
                "Content-Type": "application/json"
            },
            // withCredentials: true
        });
    } catch (error) {
        return error
    }
};

const APPROVE_ORDER_ENDPOINT = "/order/approve-order"

export const approveOrder = async (paramObject) => {
    try {
        return await request.put(APPROVE_ORDER_ENDPOINT,
            {},
            {
                params:
                paramObject
                ,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        return error
    }
};

