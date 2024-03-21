import * as request from "../utils/request";
const LOGIN = "auth/login";
const GET_USER = "/users/getuser";

export const login = async (username, password) => {
  const response = await request.post(LOGIN, {
    username: username,
    password: password,
  });
  return response; // Trả về đối tượng User từ backend
};
export const getUser = async () => {
  const accesstoken = localStorage.getItem("token");
  console.log(accesstoken);
  const userResponse = await request.get(GET_USER, {
    headers: {
      Authorization: `Bearer ${accesstoken}`, // Gửi token trong headers để xác thực yêu cầu
    },
  });

  console.log(userResponse);
  return userResponse.data; // Trả về đối tượng User từ backend
};
