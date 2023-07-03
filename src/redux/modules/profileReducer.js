export const userProfile = (payload) => {
  return {
    type: "GET_PROFILE",
    payload,
  };
};

const initialState = { displayName: "", email: "", profileCmt: "", photoURL: "", uid: "", memberId: "", likes: "", isLiked: "" };

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return action.payload;
    default:
      return state;
  }
};

export default profileReducer;
