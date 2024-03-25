import * as request from '../utils/request'

const GET_SHIP_DETAIL = "/ship-detail/get-all"

export const getShipDetails = async (accessToken) => {
    try {
        return await request.get(GET_SHIP_DETAIL, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "Application/json",
            }
        });
    } catch (error) {
        return error
    }
};

const CREATE_SHIP_DETAIL = "/ship-detail/create-ship"

export const createShipDetail = async (accessToken , body) => {
    try {
        return await request.post(CREATE_SHIP_DETAIL, body, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    } catch (error) {
        return error
    }
};

const UPDATE_SHIP_DETAIL = "/ship-detail/update-ship"

export const updateShipDetail = async (accessToken ,param, body) => {
    try {
        return await request.put(UPDATE_SHIP_DETAIL, body, {
            params: param,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    } catch (error) {
        return error
    }
};

const DELETE_SHIP_DETAIL = "/ship-detail/delete-ship"
export const deleteShipDetail = async (accessToken, param) => {
    try {
        return await request.deleteRe(DELETE_SHIP_DETAIL,  {
            params: param,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "Application/json"
            }
        });
    } catch (error) {
        return error
    }
};