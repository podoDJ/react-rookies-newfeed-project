//진솔님파트-로그인상태에 따라 헤더변경
// isLogin: true ==> 로그인 된 상태

// action value
const SHOW_USER = "SHOW_USER";
const LOG_CHANGE = "LOG_CHANGE";

//action create

export const showUser = (payload) => {
  return {
    type: SHOW_USER,
    payload,
  };
};
export const logChange = (payload) => {
  return {
    type: LOG_CHANGE,
    payload,
  };
};

const initialState = { isLogin: false, user: "" };

//reducer
const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_USER:
      return { ...state, user: action.payload };
    case LOG_CHANGE:
      return { ...state, isLogin: action.payload };

    default:
      return state;
  }
};

export default logReducer;
