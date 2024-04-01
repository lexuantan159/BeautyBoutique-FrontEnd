import * as request from '../utils/request';

const getBrand = async () => {
  try {
    const getAllBrand = await request.get('/brand/get-all');
    return {
      statusCode: getAllBrand.status,
      data: getAllBrand.data,
    };
  } catch (error) {
    const statusCode =
      error.status || (error.response && error.response.status) || 500;
    return {
      error,
      statusCode,
    };
  }
};
const addBrand = async (
  categoryName
) => {
  try {
    const addCategory = await request.post(
      '/category/create',
      {
        categoryName: categoryName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return {
      statusCode: addCategory.status,
      message: addCategory.data,
    };
  } catch (error) {
    const statusCode =
      error.status || (error.response && error.response.status) || 500;
    return {
      error,
      statusCode,
    };
  }
};
const updateCategory = async (params, body) => {
  try {
    const newBody = {
      ...body,
    };
    console.log(newBody);
    return await request.put(`/category/updateCategory`, newBody, {
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return error;
  }
};

export {
  getCategory,
  addCategory,
  updateCategory,
};