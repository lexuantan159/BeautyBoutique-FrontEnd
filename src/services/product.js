import * as request from '../utils/request';

export const createProduct = async product => {
  try {
    const data = await request.post('/product/create-product', product, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};
export const updateProduct = async product => {
  try {
    const data = await request.put(
      `/product/updateProduct/${product.id}`,
      product,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};
const addProduct = async (
  productName,
  actualPrice,
  salePrice,
  description,
  categoryId,
  quantity,
  imageIds,
  imageUrls
) => {
  try {
    const addProduct = await request.post(
      '/product/create-product',
      {
        productName: productName,
        actualPrice: actualPrice,
        salePrice: salePrice,
        description: description,
        categoryId: categoryId,
        brandId: 1,
        quantity: quantity,
        imageIds: imageIds,
        imageUrls: imageUrls,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return {
      statusCode: addProduct.status,
      message: addProduct.data,
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
const getProduct = async () => {
  try {
    const getAllProduct = await request.get('/product/get-all');
    return {
      statusCode: getAllProduct.status,
      data: getAllProduct.data,
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
const getProductByCategory = async id => {
  try {
    const response = await request.get(`/product/getProductByC/${id}`);
    return {
      statusCode: response.status,
      data: response.data,
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
const getCategory = async () => {
  try {
    const quang = await request.get('/category/get-all');
    return {
      statusCode: quang.status,
      data: quang.data,
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
const getCategoryById = async (id = 99) => {
  try {
    const quang = await request.get(`/category/findById/${id}`);
    return {
      statusCode: quang.status,
      data: quang.data,
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
const getProductById = async id => {
  try {
    const product = await request.get(`/product/get/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return {
      data: product.data,
      statusCode: product.status,
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

const addFeedback = async (content, rating, productId, userId) => {
  try {
    const feedback = await request.post(
      '/product/feedback/create-feedback',
      {
        content: content,
        rating: rating,
        productId: productId,
        userId: userId,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return {
      statusCode: feedback.status,
      data: feedback.data,
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

const getFeedback = async id => {
  try {
    const feedback = await request.get(
      `/product/feedback/get-feedback-product?productId=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return {
      data: feedback.data,
      statusCode: feedback.status,
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
const deleteFeedback = async (id, userId) => {
  try {
    const response = await request.deleteRe(
      `/product/feedback/delete-feedback?id=${id}&userId=${userId}`
    );
    return response.status;
  } catch (error) {
    console.error('Error deleting blog:', error);
  }
};
const updateFeedback = async (id, feedback, userId) => {
  console.log(feedback);
  try {
    const response = await request.put(
      `/product/feedback/update-feedback?id=${id}&userId=${userId}`,
      {
        content: feedback,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (error) {
    const statusCode =
      error.status || (error.response && error.response.status) || 500;
    return {
      error,
      statusCode,
    };
  }
};

export {
  addProduct,
  getProduct,
  getProductByCategory,
  getCategory,
  getProductById,
  addFeedback,
  getFeedback,
  deleteFeedback,
  updateFeedback,
  getCategoryById,
};
