//action value
const SHOW_POSTS = "SHOW_POSTS";
const SORT_LIKE_POSTS = "SORT_LIKE_POSTS";

//action creater
export const showPosts = (payload) => {
  return {
    type: SHOW_POSTS,
    payload,
  };
};

export const sortLikePosts = () => {
  return {
    type: SORT_LIKE_POSTS,
  };
};

let newArr = [];

const posts = (state = newArr, action) => {
  switch (action.type) {
    case SHOW_POSTS:
      return action.payload;
    case "ADD_POST":
      return [action.payload, ...state];
    case "DELETE_POST":
      return state.filter((post) => {
        return post.postId !== action.payload;
      });
    case "UPDATE_POST":
      return state.map((post) => {
        if (post.postId === action.payload.postId) {
          return { ...post, postTitle: action.payload.postTitle, postBody: action.payload.postBody };
        } else {
          return post;
        }
      });
    case SORT_LIKE_POSTS:
      return state.sort((a, b) => b.postWhoLiked?.length || 0 - a.postWhoLiked?.length || 0);
    case "UPDATE_POSTLIKE":
      return state.map((post) => {
        if (post.postId === action.payload.postId) {
          return { ...post, postWhoLiked: action.payload.postWhoLiked };
        } else {
          return post;
        }
      });
    default:
      return state;
  }
};

export default posts;
