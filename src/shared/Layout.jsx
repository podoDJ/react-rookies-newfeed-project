import { styled } from "styled-components";
import { HeaderComp, UserHeaderComp } from "../components/common/Header.jsx/HeaderComp";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const user = useSelector((state) => {
    return state.logReducer.user;
  });
  return (
    <>
      <StHeader>{user ? <UserHeaderComp /> : <HeaderComp />}</StHeader>
      <StLayout>
        <div>{children}</div>
      </StLayout>
    </>
  );
}

// 제이 추가
const StHeader = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
`;

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 2px auto;
`;
