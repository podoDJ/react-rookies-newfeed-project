// action value
export const ADD_COMMENT = "ADD_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

// 초기값
const initialState = [];

// 리듀서
const comment = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [action.payload, ...state];
    case REMOVE_COMMENT:
      return state.filter((comment) => comment.commentId !== action.payload);
    case UPDATE_COMMENT:
      return state.map((comment) => {
        if (comment.commentId === action.payload.commentId) {
          return { ...comment, Title: action.payload.title, comment: action.payload.commentId };
        } else {
          return comment;
        }
      });
    default:
      return state;
  }
};

export default comment;
