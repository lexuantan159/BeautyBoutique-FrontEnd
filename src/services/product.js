import * as request from '../utils/request'

const addProduct = async (productName, actualPrice, salePrice, description, categoryId,quantity,imageIds,imageUrls) => {
    try {
        const addProduct = await request.post('/product/create-product',
            {
                productName:productName,
                actualPrice :actualPrice ,
                salePrice:salePrice,
                description:description,
                categoryId:categoryId,
                brandId:1,
                quantity:quantity, 
                imageIds: imageIds,
                imageUrls: imageUrls,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        return {
            statusCode: addProduct.status,
            message: addProduct.data
        }

    } catch (error) {
        const statusCode = error.status || (error.response && error.response.status) || 500;
        return {
            error,
            statusCode,
        };
    }
}
const getProduct = async() =>{
    try {
        const getAllProduct = await request.get('/product/get-all');
        console.log(getAllProduct.data);
        return{
            statusCode: getAllProduct.status,
            data : getAllProduct.data
        }  
    } catch (error) {
        const statusCode = error.status || (error.response && error.response.status) || 500;
        return {
            error,
            statusCode,
        };
    }
}
export {
    addProduct,
    getProduct
};