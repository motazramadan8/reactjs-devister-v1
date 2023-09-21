import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCount: null,
    postsCate: [],
    loading: false,
    isPostCreated: false,
    post: null,
    isCommentDeleted: false,
    isCommentUpdated: false,
    isCommentLike: [],
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPostsCount(state, action) {
      state.postsCount = action.payload;
    },
    setPostsCate(state, action) {
      state.postsCate = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsPostCreated(state) {
      state.isPostCreated = true;
      state.loading = false;
    },
    clearIsPostCreated(state) {
      state.isPostCreated = false;
      state.loading = false;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    setLike(state, action) {
      if (state.post?.likes) {
        state.post.likes = action.payload.likes;
      }
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    },
    addCommentToPost(state, action) {
      state.post.comments.push(action.payload);
    },
    updateCommentPost(state, action) {
      state.post.comments = state.post.comments.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    },
    deleteCommentFromPost(state, action) {
      const comment = state.post.comments.find((c) => c._id === action.payload);
      const commentIndex = state.post.comments.indexOf(comment);
      state.post.comments.splice(commentIndex, 1);
    },
    setIsCommentDeleted(state) {
      state.isCommentDeleted = true;
    },
    setIsCommentUpdated(state) {
      state.isCommentUpdated = true;
    },
    setLikeComment(state, action) {
      if (state?.post?.comments?.likes) {
        state.post.comments.likes.push(action.payload.likes);
      }
    },
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postReducer, postActions };
