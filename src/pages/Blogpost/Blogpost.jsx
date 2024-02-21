import React, { useState } from 'react';
import { icons } from '../../utils/icons';

const Blogpost = () => {
  const [blogposts, setBlogposts] = useState([
    {
      author: 'John Doe',
      date: 'January 10, 2024',
      title: 'The Art of Makeup',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet magna sed dolor rhoncus, et dapibus neque pretium. Sed pulvinar ligula et urna aliquam, non lacinia arcu consectetur. Nunc eget risus id lorem sollicitudin pulvinar. Sed viverra sodales risus, eget condimentum nisi consectetur vel. Cras nec faucibus nulla. Nullam sed dui in neque tempus sagittis. Nulla placerat ligula ac massa feugiat, a tempor ex aliquet.',
    },
    {
      author: 'Jane Smith',
      date: 'February 5, 2024',
      title: 'Beauty Tips for Every Occasion',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet magna sed dolor rhoncus, et dapibus neque pretium. Sed pulvinar ligula et urna aliquam, non lacinia arcu consectetur. Nunc eget risus id lorem sollicitudin pulvinar. Sed viverra sodales risus, eget condimentum nisi consectetur vel. Cras nec faucibus nulla. Nullam sed dui in neque tempus sagittis. Nulla placerat ligula ac massa feugiat, a tempor ex aliquet.',
    },
    {
      author: 'Michael Johnson',
      date: 'March 20, 2024',
      title: 'The Evolution of Makeup Trends',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet magna sed dolor rhoncus, et dapibus neque pretium. Sed pulvinar ligula et urna aliquam, non lacinia arcu consectetur. Nunc eget risus id lorem sollicitudin pulvinar. Sed viverra sodales risus, eget condimentum nisi consectetur vel. Cras nec faucibus nulla. Nullam sed dui in neque tempus sagittis. Nulla placerat ligula ac massa feugiat, a tempor ex aliquet.',
    },
    {
      author: 'Emily Williams',
      date: 'April 15, 2024',
      title: 'Makeup Tips for a Natural Look',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet magna sed dolor rhoncus, et dapibus neque pretium. Sed pulvinar ligula et urna aliquam, non lacinia arcu consectetur. Nunc eget risus id lorem sollicitudin pulvinar. Sed viverra sodales risus, eget condimentum nisi consectetur vel. Cras nec faucibus nulla. Nullam sed dui in neque tempus sagittis. Nulla placerat ligula ac massa feugiat, a tempor ex aliquet.',
    },
  ]);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleLikeClick = () => {
    if (!liked) {
      // Tăng số lượt like khi người dùng bấm vào nút like
      setLikes(likes + 1);
    } else {
      // Giảm số lượt like khi người dùng nhấn lần 2
      setLikes(likes - 1);
    }
    // Đảo ngược trạng thái liked
    setLiked(!liked);
  };

  return (
    <div className="w-full bg-black">
      <div className="flex items-center justify-center">
        <div className="w-[60%] h-24">
          <div className=" flex items-center justify-center">
            <img
              src="https://via.placeholder.com/200"
              class="float-left rounded-full w-10 h-10 m-1 mr-3"
            />
            <input type="text" className="w-1/2 " />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[80%]">
          {blogposts.map(blogpost => {
            return (
              <div className="m-4" key={blogpost.id}>
                <div class="bg-white rounded shadow-lg max-w-[80%] mx-auto ">
                  <header class="p-4 flex">
                    <img
                      src="https://via.placeholder.com/200"
                      class="float-left rounded-full w-10 h-10 m-1 mr-3"
                    />
                    <div>
                      <h3 class="text-lg font-bold">{blogpost.author}</h3>
                      <p class="text-sm text-gray-600">{blogpost.date}</p>
                    </div>
                  </header>
                  <section>
                    <div className="flex items-center justify-center">
                      <span className="text-2xl w-[75%] font-semibold flex items-start justify-start max-sm:text-base">
                        {blogpost.title}
                      </span>
                    </div>
                    <div className="w-full h-96">
                      {/* <PhotoByBlogPost blog_id={blogpost.id} /> */}
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-[90%] bg-gray-200 border shadow-lg rounded-sm flex items-center justify-center">
                        <div className="collapse bg-base-200">
                          <input type="checkbox" />
                          <div className="collapse-title text-xl font-medium">
                            Xem thêm ...
                          </div>
                          <div className="collapse-content">
                            <p style={{ whiteSpace: 'pre-line' }}>
                              {blogpost.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <footer class="p-4">
                    <div className="grid grid-cols-3">
                      <div className="flex items-center justify-center">
                        <span
                          className="py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center"
                          onClick={handleLikeClick}
                        >
                          <span className="mr-2 ">
                            {liked ? (
                              <icons.FcLike />
                            ) : (
                              <icons.FcLikePlaceholder />
                            )}
                          </span>
                          <span>{likes} Thích</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center">
                          <span className="mr-2 ">
                            <icons.AiOutlineComment />
                          </span>
                          <span>Bình Luận</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center">
                          <span className="mr-2 ">
                            <icons.BiShare />
                          </span>
                          <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className="btn m-1">
                              Chia Sẻ
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <a>Item 1</a>
                              </li>
                              <li>
                                <a>Item 2</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      {/* <Comment id={blogpost.id} /> */}
                    </div>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogpost;
