import React from 'react';
const ImageBlog = ({ imageUrls }) => {
    return (
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 m-4">
            {imageUrls.map((url, index) => (
                <img class="h-auto max-w-full rounded-lg" src={url} alt="" />
            ))}

        </div>
    );
};

export default ImageBlog;
