import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, updateDoc, query, collection, where, getDoc, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { P, S } from "./ProfileStyle";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BiSolidLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../../redux/modules/profileReducer";
import { myPosts } from "../../redux/modules/myPostReducer";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  // 초기 회원가입 후 로그인 시 렌더링 시점이 로그인 전이기에 데이터가 리덕스 스토어에 저장되지 않아 프로필 접속 시 스토어로 데이터가 전달될 수 있도록 구현
  const firebaseGetProfile = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "members", user.uid);
        const docSnap = await getDoc(docRef);
        dispatch(userProfile({ ...docSnap.data(), uid: user.uid }));
      }
    });
  };
  // POST 게시물 CRUD 진행 후 프로필 페이지로 넘어올 경우 반영되지않아 프로필 접속 시 내가 작성한 게시물을 서버에서 받아올 수 있도록 구현
  const firebaseGetMyPosts = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "posts"), where("uid", "==", user.uid));
        const docSnap = await getDocs(q);
        const result = docSnap.docs.map((x) => x.data());
        dispatch(myPosts(result));
      }
    });
  };

  // 위 함수들이 1회만 실행될 수 있도록 useEffect 내 함수 선언
  useEffect(() => {
    firebaseGetProfile();
    firebaseGetMyPosts();
  }, []);

  const getProfile = useSelector((state) => state.profile);
  const MyPosts = useSelector((state) => state.myPosts);

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
    //firebase storage에 복합색인 설정 필요. 컬렉션ID : members, 필드 : displayName과 email 각각 입력, 컬렉션 종류(?)는 단일 컬렉션 선택 by DJ
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
            {/* <P.ContentsTitle>방명록</P.ContentsTitle> */}
          </P.Contents>
          <P.contentsBody>
            <S.PostingBoxCtn>
              {MyPosts.map((info) => {
                return (
                  <S.PostingBox onClick={() => Navigate(`/post/${info.postId}`)} key={info.postId}>
                    <S.PostingFoodPhoto src={info.photoURL} />
                    <S.PostingTitle>{info.postTitle}</S.PostingTitle>
                    <S.PostingBody>{info.displayName}</S.PostingBody>
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
