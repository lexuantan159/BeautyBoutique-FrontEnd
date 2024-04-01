import * as request from '../utils/request';

const getCategory = async () => {
    try {
      const getAllCategory = await request.get('/category/get-all');
      return {
        statusCode: getAllCategory.status,
        data: getAllCategory.data,
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
  const addCategory = async (
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
        message:  addCategory.data,
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