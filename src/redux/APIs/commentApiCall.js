import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastOptions";
import { commentActions } from "../slices/commentSlice";

// Create Comment
export function createComment(newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/comments`, newComment, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentActions.setComments(data));
      window.location.reload()
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Update Comment
export function updateComment(comment, commentId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        comment,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.updateCommentPost(data));
      window.location.reload()
      toast.success("Comment Updated Successfully", toastOptions);
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Delete Comment
export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentActions.deleteComment(commentId))
      dispatch(postActions.setIsCommentDeleted());
      window.location.reload()
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Get All Comments
export function getAllComments() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentActions.setComments(data));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}
