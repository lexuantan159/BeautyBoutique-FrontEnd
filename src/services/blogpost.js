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
const createNewBlog = async (title, content, imageIds, imageUrls, userId) => {

    try {
        const creteBlog = await request.post('/blog/create-blog',
            {
                userId: 1,
                title: title,
                content: content,
                imageIds: imageIds,
                imageUrls: imageUrls,
                likeCount: 0,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        console.log(creteBlog.status);
        console.log(creteBlog.data);

        return {
            statusCode: creteBlog.status,
            message: creteBlog.data
        }

    } catch (error) {
        const statusCode = error.status || (error.response && error.response.status) || 500;
        return {
            error,
            statusCode,
        };
    }
}
const deleteBlog = async (id, userId) => {
    try {
        const response = await request.deleteRe(`/blog/delete-blog/?id=${id}&userId=${userId}`);
        return response.status
    } catch (error) {
        console.error("Error deleting blog:", error);
    }
};

export {
    createNewBlog,
    getAllBlogPost,
    deleteBlog,

};