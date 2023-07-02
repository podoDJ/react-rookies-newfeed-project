import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/modules/profileReducer";
import { doc, updateDoc, query, docs, collection, where, getDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { P, S } from "./ProfileStyle";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BiSolidLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../../redux/modules/profileReducer";

const Profile = () => {
  const getProfile = useSelector((state) => state.profile);
  const getMyPosts = useSelector((state) => state.myPosts);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { uid } = getProfile;

  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPhotoURL, setCurrentPhotoURL] = useState(null);
  const [currentDisplayName, setCurrentDisplayName] = useState(null);
  const [currentProfileCmt, setCurrentProfileCmt] = useState(null);

  useEffect(() => {
    setCurrentPhotoURL(getProfile.photoURL);
  }, [getProfile.photoURL]);

  useEffect(() => {
    setCurrentDisplayName(getProfile.displayName);
  }, [getProfile.displayName]);

  useEffect(() => {
    setCurrentProfileCmt(getProfile.profileCmt);
  }, [getProfile.profileCmt]);

  // useRef를 이용하여 input태그에 접근
  const imageFileInput = useRef();

  // 이미지 업로드 버튼 클릭 시 이미지 파일 인풋 태그에 클릭 이벤트 걸기
  const onClickImageFile = () => {
    imageFileInput.current.click();
  };

  const nameChangeHandler = (e) => {
    setCurrentDisplayName(e.target.value);
  };

  const profileCmtChangeHandler = (e) => {
    setCurrentProfileCmt(e.target.value);
  };

  const profileUpdateHandler = (e) => {
    e.preventDefault();
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!currentDisplayName) return alert("닉네임을 입력해주세요");

    const q = query(collection(db, "members"), where("displayName", "==", currentDisplayName), where("email", "!=", getProfile.email));
    const result = await getDocs(q);
    const findData = result.docs[0]?.data();

    if (findData) return alert("이미 사용중인 닉네임 입니다.");

    const userDocRef = doc(db, "members", uid);
    await updateDoc(userDocRef, { profileCmt: currentProfileCmt, displayName: currentDisplayName });

    alert("프로필 정보 변경 완료");

    const updateProfileData = { ...getProfile, profileCmt: currentProfileCmt, displayName: currentDisplayName };
    dispatch(userProfile(updateProfileData));
  };

  // const updatedProfile = { ...getProfile, displayName: currentDisplayName, profileCmt: currentProfileCmt };
  const changedPhoto = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    try {
      const URL = `${uid}/${file.name}`;
      const storageRef = ref(storage, URL);
      await uploadBytes(storageRef, file);
      const resultPhotoURL = await getDownloadURL(storageRef);
      setCurrentPhotoURL(resultPhotoURL);
      const userDocRef = doc(db, "members", uid);
      await updateDoc(userDocRef, { photoURL: resultPhotoURL });
      alert("프로필 사진 변경 완료");

      const updateProfileData = { ...getProfile, photoURL: resultPhotoURL };
      dispatch(userProfile(updateProfileData));
    } catch (error) {
      console.log(error);
      alert("프로필 사진 변경 실패", error);
    }
  };

  return (
    <>
      <div>
        <div key={uid}>
          <P.ProfileContainer>
            <P.ProfileImageWrap>
              <P.ProfileImageBox>
                <P.ProfileImage src={currentPhotoURL} alt="profile" />
              </P.ProfileImageBox>
              <P.ImageUploadBox>
                <P.ImageInput type="file" ref={imageFileInput} onChange={changedPhoto} />
                <P.Btns onClick={onClickImageFile} btn="imageBtn">
                  프로필 사진 변경
                </P.Btns>
              </P.ImageUploadBox>
            </P.ProfileImageWrap>

            <form onSubmit={profileUpdateHandler}>
              <P.ProfileBody>
                <p>EMAIL</p>
                <P.MemberInput type="email" placeholder={getProfile.email} disabled={true} />

                <p>NAME</p>
                <P.MemberInput type="text" maxLength={10} value={currentDisplayName} onChange={nameChangeHandler} />
                {/* <p>좋아요 수 : {profile.likes}</p> */}
                <p>COMMENT</p>
                <P.MemberTextarea maxLength={30} value={currentProfileCmt} onChange={profileCmtChangeHandler} />
                <P.Btns type="submit" onClick={updateProfile} btn="profileBtn">
                  프로필 정보 변경
                </P.Btns>
              </P.ProfileBody>
            </form>
          </P.ProfileContainer>
          <P.Contents>
            <P.ContentsTitle>내가 쓴 글</P.ContentsTitle>
            <P.ContentsTitle>방명록</P.ContentsTitle>
          </P.Contents>
          <P.contentsBody>
            <S.PostingBoxCtn>
              {getMyPosts.map((info) => {
                return (
                  <S.PostingBox onClick={() => Navigate(`/post/${info.postId}`)} key={info.postId}>
                    <S.PostingFoodPhoto src={info.photoURL} />
                    <S.PostingTitle>{info.postTitle}</S.PostingTitle>
                    <S.PostingBody>작성자</S.PostingBody>
                    <S.PostingDateLikeBox>
                      <p style={{ marginRight: "20px" }}> {info.postDate.slice(0, 11)}</p>
                      <S.PostingLike>
                        <BiSolidLike size={20} style={{ color: "#b46060", marginRight: "5px" }} /> <span style={{ marginRight: "3px" }}>{info.postWhoLiked?.length || 0}</span>
                      </S.PostingLike>
                    </S.PostingDateLikeBox>
                  </S.PostingBox>
                );
              })}
            </S.PostingBoxCtn>
          </P.contentsBody>
        </div>
      </div>
    </>
  );
};
export default Profile;
