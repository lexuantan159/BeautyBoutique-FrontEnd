import React from 'react';

const ImageBlog = ({ imageUrls = [] }) => {
  return (
    <div>
      {imageUrls.length === 1 ? (
        <div className="w-full flex items-center justify-center m-4">
          <div className="h-96 w-96">
            <img
              className="object-cover w-full h-full rounded-lg"
              src={imageUrls[0].imageUrl}
              alt=""
            />
          </div>
        </div>
      ) : imageUrls.length === 2 ? (
        <div className="grid grid-cols-2 gap-4 m-4">
          {imageUrls.map((url, index) => (
            <div className="relative overflow-hidden group" key={index}>
              <img
                className="h-auto max-w-full rounded-lg cursor-pointer transition-transform duration-300 transform-gpu group-hover:scale-110"
                src={url.imageUrl}
                alt=""
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4">
          {imageUrls.map((url, index) => (
            <div className="relative overflow-hidden group" key={index}>
              <img
                className="h-auto max-w-full rounded-lg cursor-pointer transition-transform duration-300 transform-gpu group-hover:scale-110"
                src={url.imageUrl}
                alt=""
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageBlog;
