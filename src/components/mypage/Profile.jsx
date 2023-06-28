import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { setProfile, setPhotoURL, setDisplayName, setProfileCmt } from "./ProfileActions";
import { useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";

const Profile = () => {
  const profile = useSelector((state) => state.profile.profile);
  const photoURL = useSelector((state) => state.profile.photoURL);
  const displayName = useSelector((state) => state.profile.displayName);
  const profileCmt = useSelector((state) => state.profile.profileCmt);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeDisplayName = (e) => dispatch(setDisplayName(e.target.value));
  const changeProfileCmt = (e) => dispatch(setProfileCmt(e.target.value));
  // useRef를 이용하여 input태그에 접근
  const imageFileInput = useRef();
  // 이미지 업로드 버튼 클릭 시 이미지 파일 인품 태그에 클릭 이벤트 걸기
  const onClickImageFile = () => {
    imageFileInput.current.click();
  };

  const changePhotoURL = (e) => {
    const file = e.target.files[0];
    dispatch(setPhotoURL(file));
  };

  const updateDisplayName = () => {
    // displayName을 업데이트하는 액션 디스패치
  };

  const updateProfileCmt = () => {
    // profileCmt를 업데이트하는 액션 디스패치
  };

  const uploadPhotoURL = () => {
    // photoURL을 업로드하는 액션 디스패치
  };

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "profile"));
      const snapshot = await getDocs(q);
      const initialProfile = [];
      snapshot.forEach((doc) => {
        const data = {
          id: doc.uid,
          ...doc.data(),
        };
        console.log("data", data);
        initialProfile.push(data);
      });
      dispatch(setProfile(initialProfile));
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div>
        {profile.map((user) => {
          return (
            <div key={user.uid}>
              <P.ProfileContainer>
                <P.ProfileImageWrap>
                  <P.ProfileImageBox>
                    <P.ProfileImage src={user.photoURL} alt="profile" />
                  </P.ProfileImageBox>
                  <P.ImageUploadBox>
                    <input type="file" style={{ display: "none" }} ref={imageFileInput} />
                    <P.Btns onChange={changePhotoURL} onClick={onClickImageFile}>
                      이미지 업로드
                    </P.Btns>
                    <P.Btns onClick={uploadPhotoURL}>프로필 사진 변경하기</P.Btns>
                  </P.ImageUploadBox>
                </P.ProfileImageWrap>
                <P.ProfileBody>
                  <p>EMAIL : {user.email}</p>
                  <P.NameBox>
                    <p>NAME : {user.displayName}</p>
                    {/* <p>좋아요 수 : {user.likes}</p> */}
                    <P.Btns size="medium" onClick={updateDisplayName}>
                      변경
                    </P.Btns>
                  </P.NameBox>
                  <div style={{ display: "flex" }}>
                    <p>INTRO : {user.profileCmt}</p>
                    <P.Btns size="large" onClick={updateProfileCmt}>
                      수정하기
                    </P.Btns>
                  </div>
                </P.ProfileBody>
              </P.ProfileContainer>
              <P.Contents>
                <P.ContentsTitle onClick={() => navigate("/post")}>내가 쓴 글</P.ContentsTitle>
                <P.ContentsTitle>방명록</P.ContentsTitle>
              </P.Contents>
              <P.contentsBody>게시글 연결은 어느세월에,,,</P.contentsBody>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;

const P = {
  ProfileContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 80px;
    margin-top: 30px;
  `,

  ProfileImageWrap: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ProfileImageBox: styled.div`
    width: 280px;
    height: 280px;
    overflow: hidden;
    border-radius: 100%;
    margin: 30px;
  `,

  ProfileImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  ImageUploadBox: styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
  `,

  FileBoxLabel: styled.label`
    display: inline-block;
    padding: 10px 20px;
    vertical-align: middle;
    cursor: pointer;
    height: 30px;
    margin-left: 10px;
  `,

  ProfileBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
  `,
  NameBox: styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,

  Contents: styled.div`
    display: flex;
    gap: 30px;
    margin: 10px;
  `,

  ContentsTitle: styled.p`
    cursor: pointer;
  `,

  contentsBody: styled.div`
    background-color: #ffbf9b;
    border-radius: 5px;
    margin-top: 15px;
    width: 100%;
    height: 100%;
  `,

  Btns: styled.button`
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 10px;

    ${({ size }) => {
      switch (size) {
        case "large":
          return css`
            width: 80px;
            height: 30px;
          `;
        case "medium":
          return css`
            width: 50px;
            height: 30px;
          `;
      }
    }}
  `,
};
