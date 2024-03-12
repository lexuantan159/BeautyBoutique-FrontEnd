import * as request from '../utils/request'

const GET_SHIP_DETAIL = "ship-detail/get-all"

export const getShipDetails = async (param) => {
    try {
        return await request.get(GET_SHIP_DETAIL, {
            params: param,
            headers: {
                "Content-Type": "Application/json",
            }
        });
    } catch (error) {
        return error
    }
};

const CREATE_SHIP_DETAIL = "ship-detail/create-ship"

export const createShipDetail = async (param , body) => {
    try {
        return await request.put(CREATE_SHIP_DETAIL, body, {
            params: param,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    } catch (error) {
        return error
    }
};

const UPDATE_SHIP_DETAIL = "ship-detail/update-ship"

export const updateShipDetail = async (param , body) => {
    try {
        return await request.put(UPDATE_SHIP_DETAIL, body, {
            params: param,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    } catch (error) {
        return error
    }
};

const DELETE_SHIP_DETAIL = "ship-detail/delete-ship"
export const deleteShipDetail = async (param) => {
    try {
        return await request.deleteRe(DELETE_SHIP_DETAIL,  {
            params: param,
            headers: {
                "Content-Type": "Application/json"
            }
        });
    } catch (error) {
        return error
    }
};