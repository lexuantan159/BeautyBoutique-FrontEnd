import * as request from '../utils/request'

const GET_CART = "cart/get-cart"

export const getCart = async (param) => {
    try {
        return await request.get(GET_CART, {
            params: param,
            headers: {
                "Content-Type": "Application/json",
            }
        });

    } catch (error) {
        return error
    }
};

const UPDATE_CART = "cart/update-cart"

export const updateCartItem = async (param) => {
    try {
        return await request.put(UPDATE_CART, {}, {
            params: param,
            headers: {
                "Content-Type": "Application/json"
            }
        });
    } catch (error) {
        return error
    }
};

const DELETE_CART = "cart/delete-cart"
export const deleteCartItem = async (param) => {
    try {
        return await request.deleteRe(DELETE_CART, {
            params: param,
            headers: {
                "Content-Type": "Application/json"
            }
        });
    } catch (error) {
        return error
    }
};

export const addToCart = async (accessToken, params) => {
    try {
        return await request.post(`cart/add-to-cart`, {}, {
            params: params,
            headers: {
                "Content-Type": "Application/json"
            }
        })
    } catch (error) {
        return error
    }
}