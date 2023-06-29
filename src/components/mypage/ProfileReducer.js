const initialState = {
  profile: [],
  photoURL: "",
  displayName: "",
  profileCmt: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "SET_PHOTO_URL":
      return {
        ...state,
        photoURL: action.payload,
      };
    case "SET_DISPLAY_NAME":
      return {
        ...state,
        displayName: action.payload,
      };
    case "SET_PROFILE_CMT":
      return {
        ...state,
        profileCmt: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
