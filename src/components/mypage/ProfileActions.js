import { ref } from "firebase/storage";
import { app } from "../../firebase";
import { doc } from "firebase/firestore";
import { getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { firestore, getFirestore, updateDoc } from "firebase/firestore";

export const updatePhotoURL = (file, uid) => {
  return async (dispatch, getState) => {
    try {
      // 이미지 파일 업로드
      const storage = getStorage(app);
      const storageRef = ref(storage, `profile/${file.name}`);
      await uploadBytes(storageRef, file);

      // 업로드된 파일의 다운로드 URL 가져오기
      const downloadURL = await getDownloadURL(storageRef);

      // 파이어베이스에 프로필 사진 업데이트
      const firestore = getFirestore(app);
      const userRef = doc(firestore, `users/${uid}`);
      await updateDoc(userRef, { photoURL: downloadURL });

      // 상태 업데이트
      dispatch({ type: "UPDATE_PHOTO_URL", payload: file });
    } catch (error) {
      console.log("프로필 사진 업데이트 오류", error);
    }
  };
};

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
