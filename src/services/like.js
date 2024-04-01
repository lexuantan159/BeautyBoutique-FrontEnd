import * as request from '../utils/request'

const userIsLike = async (accessToken, blogId) => {
    try {
        const response = await request.get('/blog/like/is-like',
            {
                params: {
                    blogId: blogId
                },

                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
        return response

    } catch (error) {
        console.log(error);
    }
}
const addLike = async (accessToken, blogId) => {
    try {
        const response = await request.post(`/blog/like/add-like`, {
            blogId: blogId
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response
    } catch (error) {
        console.log(error);
    }
}
const removeLike = async (accessToken, blogId) => {
    try {
        const response = await request.deleteRe('/blog/like/delete-like', {
            params: {
                blogId: blogId
            },

            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response
    } catch (error) {
        console.log(error);
    }
}
const countLike = async (blogId) => {
    try {
        const response = await request.get('/blog/like/count',
            {
                params: {
                    blogId: blogId
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        return response

    } catch (error) {
        console.log(error);
    }
}

export {
    userIsLike,
    addLike,
    removeLike,
    countLike
};