export const setProfile = (profile) => {
  return {
    type: "SET_PROFILE",
    payload: profile,
  };
};

export const setPhotoURL = (photoURL) => {
  return {
    type: "SET_PHOTO_URL",
    payload: photoURL,
  };
};

export const setDisplayName = (displayName) => {
  return {
    type: "SET_DISPLAY_NAME",
    payload: displayName,
  };
};

export const setProfileCmt = (profileCmt) => {
  return {
    type: "SET_PROFILE_CMT",
    payload: profileCmt,
  };
};
