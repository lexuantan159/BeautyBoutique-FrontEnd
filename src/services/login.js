import * as request from '../utils/request';
const LOGIN = 'auth/login';
const GET_USER = '/users/get';
const REGISTER = '/auth/register';

export const login = async (username, password) => {
  const response = await request.post(LOGIN, {
    username: username,
    password: password,
  });
  localStorage.setItem('token', response.data.token);
  return response; // Trả về đối tượng User từ backend
};
export const register = async data => {
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
  const accesstoken = localStorage.getItem('token');

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
};
