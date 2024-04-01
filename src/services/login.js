import * as request from "../utils/request";

const LOGIN = 'auth/login';
const GET_USER = '/users/get';
const REGISTER = '/auth/register';
const CHANGE_PASS = '/auth/change-password';


export const login = async (username, password) => {
    const response = await request.post(LOGIN, {
        username: username,
        password: password,
    });
    localStorage.setItem("token", response.data.token);
    return response;
};
export const otp = async (param) => {
    const response = await request.post("/auth/sendotp", null, {
        params: {
            username: param,
        },
    });
    console.log(response.data);
    return response; // Trả về đối tượng User từ backend
};
export const reset = async (param) => {
    const response = await request.post(`/auth/resetpass?username=${param}`);
    console.log(response.data);
    return response; // Trả về đối tượng User từ backend
};
export const register = async (data) => {
    try {
        // const { username, email, password, retype_password } = data;
        // console.log(data);
        const response = await request.post(REGISTER, data);
        return response; // Trả về đối tượng User từ backend
    } catch (error) {
        throw error;
    }
};
export const getUser = async () => {
    const accessToken = localStorage.getItem("token");

<<<<<<< HEAD
  if (!accesstoken) {
    localStorage.removeItem('user');
    throw new Error('User not found');
  }
  try {
    const userResponse = await request.get(GET_USER, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    localStorage.setItem('user', JSON.stringify(userResponse.data));
    return userResponse.data;
  } catch (e) {
    throw new Error(e.message);
  }
=======
    if (!accessToken) {
        localStorage.removeItem("user");
        throw new Error("User not found");
    }
    try {
        const userResponse = await request.get(GET_USER, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "Application/json",
            },
        });
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        return userResponse.data; // Trả về đối tượng User từ backend
    } catch (e) {
        throw new Error(e.message);
    }
};

export const changePass = async (accessToken, oldPass, newPass) => {

    try {
        return await request.post(CHANGE_PASS, {
            oldPassword: oldPass,
            newPassword: newPass
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "Application/json",
            },
        });
    } catch (e) {
        return e
    }
>>>>>>> c9b23d4f088e654c4cecd7a3cfb741b2946778d3
};
