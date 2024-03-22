import * as request from '../utils/request'


const getAllBlogPost = async () => {
    try {
        const response = await request.get('/blog/get-all-blog', {});
        return {
            blogList: response.data.blogPostList,
            message: response.data.message,
        }
    } catch (error) {

        const statusCode = error.status || (error.response && error.response.status) || 500;
        return {
            error,
            statusCode,
        };
    }
};
export {

    getAllBlogPost,

};