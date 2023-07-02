import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { P, G } from "../starDetail/starProfile.styles";
import { useParams } from "react-router-dom";
import { showMembers } from "../../redux/modules/logReducer";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const starList = useSelector((state) => state.logReducer.members);
  // console.log("1", starList);

  const user = starList.find((user) => {
    return user.memberId == id;
  });

  useEffect(() => {
    dispatch(showMembers(starList));
  }, []);

  return (
    <>
      <P.ProfileContainer>
        <P.ProfileImageBox>
          <P.ProfileImage src={user.photoURL} alt="profile" />
        </P.ProfileImageBox>
        <P.ProfileBody>
          <p>EMAIL&nbsp;&nbsp;&nbsp; {user.email}</p>
          <P.NameBox>
            <p>NAME&nbsp;&nbsp;&nbsp;{user.displayName}</p>
          </P.NameBox>
          <P.IntroContainer>
            <label>COMMENT</label>
            <P.Intro> {user.profileCmt}</P.Intro>
          </P.IntroContainer>
        </P.ProfileBody>
      </P.ProfileContainer>
      <G.Guestbook>
        <G.GuestbookCut>1개의 방명록</G.GuestbookCut>
        <G.Textarea name="guestbook" />
        <G.CreateBtn>등록</G.CreateBtn>
        <G.GuestbookList>
          <G.UserImage src="https://i.pinimg.com/originals/99/f3/06/99f3068e425e6b9f56d683b0859ee942.jpg" alt="profile" />
          <G.UserCmt>
            <p>HONCOOK</p>
            <span>2시간 전</span>
          </G.UserCmt>
          <G.UpdateBtn>수정</G.UpdateBtn>
          <G.DeleteBtn>삭제</G.DeleteBtn>
          <G.Cmt>레시피 잘 보고 갑니다~</G.Cmt>
        </G.GuestbookList>
      </G.Guestbook>
    </>
  );
};

export default Profile;
