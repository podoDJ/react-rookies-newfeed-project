//진솔님파트-로그인상태에 따라 헤더변경
// isLogin: true ==> 로그인 된 상태

// action value
// 현재 로그인한 유저의 정보
const SHOW_USER = "SHOW_USER";
// 모든 유저 리스트
const SHOW_MEMBERS = "SHOw_MEMBERS";
// 유저 인기순 정렬
const SORT_LIKE_MEMBERS = "SORT_LIKE_MEMBERS";

//action create

export const showUser = (payload) => {
  return {
    type: SHOW_USER,
    payload,
  };
};

export const showMembers = (payload) => {
  return {
    type: SHOW_MEMBERS,
    payload,
  };
};

export const sortLikeMembers = () => {
  return {
    type: SORT_LIKE_MEMBERS,
  };
};

const initialState = { isLogin: false, user: "", members: [] };

//reducer
const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_USER:
      return { ...state, user: action.payload };
    case SHOW_MEMBERS:
      return { ...state, members: action.payload };
    case SORT_LIKE_MEMBERS:
      return { ...state, members: state.members.sort((a, b) => b.likes - a.likes) };

    default:
      return state;
  }
};

export default logReducer;
