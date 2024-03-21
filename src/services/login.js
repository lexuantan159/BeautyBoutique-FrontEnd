import * as request from '../utils/request';
const LOGIN = 'auth/login';
const GET_USER = '/users/getuser';
const REGISTER = '/auth/register';

export const login = async (username, password) => {
  const response = await request.post(LOGIN, {
    username: username,
    password: password,
  });
  console.log(response);
  localStorage.setItem('token', response.data.token);
  return response; // Trả về đối tượng User từ backend
};
export const register = async data => {
  try {
    console.log(...data);
    const response = await request.post(REGISTER, { ...data });
    return response; // Trả về đối tượng User từ backend
  } catch (error) {
    return error;
  }
};
export const getUser = async () => {
  const accesstoken = localStorage.getItem('token');

  if (!accesstoken) {
    localStorage.removeItem('user');
    return;
  }
  try {
    const userResponse = await request.get(GET_USER, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    localStorage.setItem('user', JSON.stringify(userResponse.data));
    return userResponse.data; // Trả về đối tượng User từ backend
  } catch (e) {
    return e;
  }
};