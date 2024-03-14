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
                    'Content-Type': 'application/json'
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
const getProductByCategory = async (id)=>{
try {
    const response = await request.get(`/product/getProductByC/${id}`)
    return{
        statusCode : response.status,
        data : response.data
    }
} catch (error) {
    const statusCode = error.status || (error.response && error.response.status) || 500;
    return {
        error,
        statusCode,
    };
    
}
}
const getCategory = async () => {
    try {
        const quang = await request.get('/category/get-all')
        return{
            statusCode : quang.status,
            data : quang.data
        }
        
    } catch (error) {
        const statusCode = error.status || (error.response && error.response.status) || 500;
    return {
        error,
        statusCode,
    };
    }
}
const getProductById = async(id) =>{
    try {
        const product = await request.get(`/product/get/${id}`,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        return{
            data : product.data,
            statusCode : product.status
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
    getProduct,
    getProductByCategory,
    getCategory,
    getProductById
};