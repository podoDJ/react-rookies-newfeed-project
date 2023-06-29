import React, { useEffect } from "react";
import { styled } from "styled-components";
import { HeaderComp, UserHeaderComp } from "../components/common/Header.jsx/HeaderComp";
import { auth } from "../firebase";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const isLogin = useSelector((state) => {
    return state.logReducer.isLogin;
  });
  console.log(isLogin);
  return (
    <StLayout>
      {isLogin ? <UserHeaderComp /> : <HeaderComp />}
      <div>{children}</div>
    </StLayout>
  );
}

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 2px auto;
`;
