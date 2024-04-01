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
const createNewBlog = async (title, content, imageIds, imageUrls, accessToken) => {
    try {
        const creteBlog = await request.post('/blog/create-blog',
            {
                title: title,
                content: content,
                imageIds: imageIds,
                imageUrls: imageUrls,
                likeCount: 0,
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
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
const updateBlogPost = async (id, title, content, imageIds, imageUrls, accessToken) => {
    try {
        const creteBlog = await request.put(`/blog/update-blog?id=${id}`,
            {
                title: title,
                content: content,
                imageIds: imageIds,
                imageUrls: imageUrls,
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
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
const deleteBlog = async (id, accessToken) => {
    try {
        const response = await request.deleteRe(`/blog/delete-blog/?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        return response.status
    } catch (error) {
        console.error("Error deleting blog:", error);
    }
};
const deleteImageBlog = async (id) => {
    try {
        const response = await request.deleteRe(`/blog/delete-image-blog-id/?id=${id}`);
        return response.status
    } catch (error) {
        console.error("Error deleting blog:", error);
    }
}

export {
    createNewBlog,
    getAllBlogPost,
    deleteBlog,
    deleteImageBlog,
    updateBlogPost

};

