import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

export const HeaderComp = () => {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.HeaderMenuDiv>
        <S.HeaderMenu onClick={() => navigate("/")}>로고</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/post")}>POST</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/star")}>MEMBER</S.HeaderMenu>
      </S.HeaderMenuDiv>
      <S.HeaderMenuDiv>
        <S.HeaderMenu onClick={() => navigate("/login")}>Log In</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/signup")}>Sign Up</S.HeaderMenu>
      </S.HeaderMenuDiv>
    </S.Header>
  );
};

export const UserHeaderComp = () => {
  const navigate = useNavigate();

  const logOutFunc = async () => {
    await signOut(auth);
    window.location.reload();
  };
  return (
    <S.Header>
      <S.HeaderMenuDiv>
        <S.HeaderMenu onClick={() => navigate("/")}>로고</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/post")}>POST</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/star")}>MEMBER</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/mypage/profile/:id")}>PROFILE</S.HeaderMenu>
      </S.HeaderMenuDiv>
      <S.HeaderMenuDiv>
        <S.HeaderMenu onClick={logOutFunc}>Log Out</S.HeaderMenu>
        <S.HeaderMenu>Profile</S.HeaderMenu>
      </S.HeaderMenuDiv>
    </S.Header>
  );
};

const S = {
  Header: styled.header`
    background-color: #b46060;
    color: white;
    width: 100wh;
    height: 70px;

    display: flex;
    justify-content: space-between;
  `,
  HeaderMenuDiv: styled.div`
    display: flex;
    align-items: center;
  `,
  HeaderMenu: styled.span`
    font-size: 25px;
    font-weight: 600;
    margin: 0 15px;
    cursor: pointer;
  `,
};
