import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { setProfile, setPhotoURL, setDisplayName, setProfileCmt } from "./ProfileActions";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Profile = () => {
  const profile = useSelector((state) => state.profile.profile);
  const photoURL = useSelector((state) => state.profile.photoURL);
  const displayName = useSelector((state) => state.profile.displayName);
  const profileCmt = useSelector((state) => state.profile.profileCmt);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeDisplayName = (e) => dispatch(setDisplayName(e.target.value));
  const changeProfileCmt = (e) => dispatch(setProfileCmt(e.target.value));
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
      <div>My Profile</div>
      <div>
        {profile.map((user) => {
          return (
            <div key={user.uid}>
              <P.ProfileImage src={user.photoURL} alt="profile" />
              <P.ProfileBody>
                <P.FileBox>
                  <input type="file" onChange={changePhotoURL} />
                  <button onClick={uploadPhotoURL}>프로필 사진 변경하기</button>
                </P.FileBox>
                <P.Email>email : {user.email}</P.Email>
                <P.NameBox>
                  <p>name : {user.displayName}</p>
                  <P.ChangeNameBtn onClick={updateDisplayName}>변경</P.ChangeNameBtn>
                </P.NameBox>
                <div style={{ display: "flex" }}>
                  <p>intro : {user.profileCmt}</p>
                  <button onClick={updateProfileCmt}>수정하기</button>
                </div>
              </P.ProfileBody>
              <div onClick={() => navigate("/post")}>내가 쓴 글</div>
              <div>방명록</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;

const P = {
  ProfileImage: styled.img`
    width: 300px;
  `,

  ProfileBody: styled.div`
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    margin-top: 60px;
    margin-right: 360px;
  `,

  FileBox: styled.div`
    margin-bottom: 20px;
  `,
  Email: styled.p`
    margin-bottom: 20px;
  `,
  NameBox: styled.p`
    display: flex;
    margin-bottom: 20px;
  `,
  ChangeNameBtn: styled.button`
    margin-left: 5px;
  `,
};
