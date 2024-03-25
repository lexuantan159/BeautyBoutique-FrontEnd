import * as request from '../utils/request'

const CREATE_ORDER_ENDPOINT = "/order/create-order"

export const createOrder = async (accessToken, paramObject, cartItemsId) => {
    try {
        return await request.post(CREATE_ORDER_ENDPOINT,
            { cartItemsId },
            {
                params:
                    paramObject
                ,
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
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

export const createPayment = async (accessToken, paramObject, cartItemsId) => {
    try {
        return await request.post(CREATE_PAYMENT_ENDPOINT,
            { cartItemsId },
            {
                params:
                    paramObject,
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
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
export const getOrderHistories = async (accessToken, paramsObject) => {
    try {
        return await request.get(ORDER_HISTORY_ENDPOINT, {
            params: paramsObject,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
        });
    } catch (error) {
        return error
    }
};

const ALL_ORDER_ENDPOINT = "order/get-all-orders"
export const getAllOrder = async (accessToken, paramsObject) => {
    try {
        return await request.get(ALL_ORDER_ENDPOINT, {
            params: paramsObject,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
        });
    } catch (error) {
        return error
    }
};

const SUMMARY_ORDER_ENDPOINT = "order/get-summary-orders"
export const getSummaryOrder = async (accessToken) => {
    try {
        return await request.get(SUMMARY_ORDER_ENDPOINT, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
        });
    } catch (error) {
        return error
    }
};

const APPROVE_ORDER_ENDPOINT = "/order/approve-order"

export const approveOrder = async (accessToken, paramObject) => {
    try {
        return await request.put(APPROVE_ORDER_ENDPOINT,
            {},
            {
                params:
                    paramObject
                ,
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        return error
    }
};


const CHANGE_STATUS_ENDPOINT = "/order/change-status"

export const changeStatus = async (accessToken, paramObject) => {
    try {
        return await request.put(CHANGE_STATUS_ENDPOINT,
            {},
            {
                params:
                    paramObject
                ,
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        return error
    }
};

const CANCEL_ORDER_ENDPOINT = "order/cancel-order"
export const cancelOrder = async (accessToken, paramObject) => {
    console.log({ accessToken, paramObject })
    try {
        return await request.deleteRe(CANCEL_ORDER_ENDPOINT,
            {
                params: paramObject,
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        return error
    }
};

