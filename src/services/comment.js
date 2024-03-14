import * as request from '../utils/request'

const createNewComment = async (content, blogId, userId) => {

    try {
        const creteBlog = await request.post('/blog/comment/create-comment',
            {
                userId: 1,
                blogId: blogId,
                content: content,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
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
const getAllCommentByBlogId = async (blogId) => {
    try {
        const response = await request.get(`/blog/comment/get-comment-blog?blogId=${blogId}`, {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return {
            commentList: response.data.commentList,
            message: response.data.message,
        }
    } catch (error) {
        const statusCode = error.status || (error.response && error.response.status) || 500;
        return {
            error,
            statusCode,
        };
    }
}
const deleteComment = async (id, userId) => {
    try {
        const response = await request.deleteRe(`/blog/comment/delete-comment?id=${id}&userId=${userId}`);
        return response.status
    } catch (error) {
        console.error("Error deleting blog:", error);
    }
};
const updateComment = async (id, content, userId) => {
    console.log(content);
    try {
        return await request.put(`/blog/comment/update-comment?id=${id}&userId=${userId}`,
            {
                content: content,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    } catch (error) {
        const statusCode = error.status || (error.response && error.response.status) || 500;
        return {
            error,
            statusCode,
        };
    }
}

export {
    createNewComment,
    getAllCommentByBlogId,
    deleteComment,
    updateComment

};