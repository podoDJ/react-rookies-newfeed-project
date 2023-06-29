import { styled } from "styled-components";
import { HeaderComp, UserHeaderComp } from "../components/common/Header.jsx/HeaderComp";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const user = useSelector((state) => {
    return state.logReducer.user;
  });
  return (
    <StLayout>
      {user ? <UserHeaderComp /> : <HeaderComp />}
      <div>{children}</div>
    </StLayout>
  );
}

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 2px auto;
`;
