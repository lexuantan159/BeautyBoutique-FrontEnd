import * as request from '../utils/request'

const UPDATE_USER_ENDPOINT = "/users/update"

export const updateUser = async (accessToken, body) => {
    try {
        const newBody = {
            ...body,
            dateOfBirth: body.dateOfBirth + 'T00:00:00.000Z',
        };
        console.log(newBody);
        return await request.put(UPDATE_USER_ENDPOINT, newBody, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "Application/json",
            },
        });

    } catch (error) {
        return error
    }
};


const GET_USER = 'users/getUser';

export const getUser = async (accessToken) => {
    try {
        return await request.get(GET_USER, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "Application/json",
            },
        });
    } catch (e) {
        return e;
    }
};
