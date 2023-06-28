//action value
const SORT_LIKE_POSTS = "SORT_LIKE_POSTS";
const SHOW_POSTS = "SHOW_POSTS";

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

// initial state
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
      return state.sort((a, b) => b.like - a.like);
    default:
      return state;
  }
};

export default posts;
