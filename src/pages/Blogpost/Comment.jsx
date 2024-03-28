import React, { useContext, useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { Button } from 'flowbite-react';
import { Spinner } from '@material-tailwind/react';
import * as commentApi from '../../services/comment';
import MethodContext from '../../context/methodProvider';
import * as productApi from '../../services/product';

const Comment = ({ commentId, index, setChange, change }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [updateNewComment, setUpdateNewComment] = useState('');
  const { formatDateTime, notify } = useContext(MethodContext);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(false);
  const [isBuyProduct, setisBuyProduct] = useState('')
  const Token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (index === 1) {
          const feedback = await productApi.getFeedback(commentId);
          setComments(feedback.data.feedbackList);
          const isBuy = await productApi.isBuy(Token, commentId)
          setisBuyProduct(isBuy?.data)
          console.log(isBuy?.data);
        } else {
          const commentData = await commentApi.getAllCommentByBlogId(commentId);
          setComments(commentData.commentList);
        }
      } catch (error) {
        console.error('Error fetching blogposts:', error);
      }
    };
    fetchData();
  }, [change, commentId]);

  const postComment = async () => {
    try {
      if (newComment.trim() === '') {
        notify('You must write a review');
        return;
      }
      if (index === 1) {

        const addFeedback = await productApi.addFeedback(newComment, 5, commentId, Token);
        if (addFeedback.statusCode === 201) {
          notify(addFeedback.data, "success")
        }
        else {
          notify("Cannot add feedback to product")
        }
      } else {
        const addComment = await commentApi.createNewComment(newComment, commentId, Token);
        if (addComment.statusCode === 201) {
          notify(addComment.data, "success")
        }
        else {
          notify("Cannot add comment to blog")
        }
      }
      setLoading(false);
      setChange(!change);
      setNewComment('');
    } catch (error) {
      setChange(!change);
      setLoading(false);
    }
  };
  const deleteComment = async cmtid => {
    try {
      if (index === 1) {
        const deleteFeedback = await productApi.deleteFeedback(cmtid, Token)
        if (deleteFeedback === 200) {
          notify("Delete Feedback Successfully", "success")
        } else {
          notify("Delete Feedback failed")
        }
      } else {
        const delComment = await commentApi.deleteComment(cmtid, Token);
        if (delComment === 200) {
          notify("Delete comment Successfully", "success")
        } else {
          notify("Delete comment failed")
        }
        setChange(!change);
      }

      setChange(!change)
    } catch (error) {
      notify('Error deleting comment.');
    }
  };
  const updateComment = async id => {
    try {
      if (updateNewComment === '') {
        notify("Cannot be left blank")
        return
      }
      if (index === 1) {
        const updateFeedback = await productApi.updateFeedback(id, updateNewComment, Token);
        notify(updateFeedback, "success")
      } else {
        const updatecomment = await commentApi.updateComment(id, updateNewComment, Token);
        notify(updatecomment, "success")
      }
      setChange(!change);
    } catch (error) {
      notify('Editing comments failed');
    }
  };

  return (
    <>
      <div className="w-full h-auto">
        {isBuyProduct || index === 2 ? (
          <div className="flex items-start justify-center m-2">
            <div className="avatar-group -space-x-6 rtl:space-x-reverse w-[10%]">
              <div className="avatar">
                <div className="w-12">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="name"
                  />
                </div>
              </div>
            </div>
            <div class="flex py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 w-[80%]">
              <textarea
                id="comment"
                rows="1"
                onChange={e => setNewComment(e.target.value)}
                value={newComment}
                className="textarea textarea-accent w-[90%] focus:fill-none"
                placeholder="Write Your Comment..."
                required
              ></textarea>
              <div className="flex items-center justify-center ml-4">
                <Button
                  gradientMonochrome="lime"
                  onClick={postComment}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Spinner className="h-6 w-6 mr-4" /> <span>Loading...</span>
                    </div>
                  ) : (
                    <FiSend />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center'>
            <img src="https://th.bing.com/th/id/OIP.Wu_5CJjihyM-HCHKFC3h6QHaGP?rs=1&pid=ImgDetMain" alt="" />
          </div>
        )}
        {comments && comments.length > 0 ? (
          comments?.map((comment) => (
            <div key={comment?.id} className="flex items-start justify-center">
              <div className="w-4/5 flex items-start justify-center">
                <div className="w-[90%] border bg-gray-100 p-1 rounded-xl my-2">
                  <div className=" avatar-group">
                    <div className="avatar">
                      <div className="w-10">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar" />
                      </div>
                    </div>
                    <div className="ml-2">
                      <h1 className="text-base font-semibold">
                        {comment?.user?.fullName}
                      </h1>
                      <h1 className="text-sm">
                        {formatDateTime(comment?.createdAt)}
                      </h1>
                    </div>
                  </div>
                  <div className="px-2">
                    {isEdit && idEdit === comment?.id ? (
                      <input
                        type="text"
                        placeholder={comment?.content}
                        value={updateNewComment}
                        onChange={(e) => setUpdateNewComment(e.target.value)}
                        className="input input-bordered input-accent w-full max-w-xl focus:outline-none"
                      />
                    ) : (
                      <h2>{comment?.content}</h2>
                    )}
                  </div>
                  <div className="flex items-end justify-end">
                    {isEdit && idEdit === comment?.id ? (
                      <>
                        <button
                          className="text-xs mx-2 link link-accent"
                          onClick={() => {
                            updateComment(comment?.id);
                            setIdEdit(false);
                            setUpdateNewComment('');
                          }}
                        >
                          Save
                        </button>

                        <button className="text-xs mx-2 link link-error"
                          onClick={() => { setIdEdit(false); setUpdateNewComment(''); }} >
                          Cance
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-xs mx-2 link link-accent"
                          onClick={() => {
                            setIdEdit(comment?.id);
                            setIsEdit(true);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="text-xs mx-2 link link-error"
                          onClick={() => deleteComment(comment?.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-xl">
            There are no comments for this post yet.
          </div>
        )}
      </div >
    </>
  );
};

export default Comment;