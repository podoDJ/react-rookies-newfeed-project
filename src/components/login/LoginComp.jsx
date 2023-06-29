import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { ERR_CODE } from "../../constant";
import { auth } from "../../firebase";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginFunc = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("user with signIn", userCredential);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(ERR_CODE[errorCode]);
      console.log("error", errorCode, errorMessage);
    }
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    loginFunc();
    navigate("/");
  };

  return (
    <S.LoginForm onSubmit={loginSubmitHandler}>
      <S.LoginTitle>E-mail</S.LoginTitle>
      <S.LoginInput
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <S.LoginTitle>Password</S.LoginTitle>
      <S.LoginInput
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div>
        <S.LoginBtn>Log In</S.LoginBtn>
      </div>
    </S.LoginForm>
  );
};

export default LoginComp;

const S = {
  LoginForm: styled.form`
    background-color: #ffbf9b;
    color: #4d4d4d;
    width: 500px;
    height: 300px;

    margin: auto;
    padding: 50px;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  LoginTitle: styled.p`
    font-size: 20px;
    margin: 0 auto 5px 50px;
  `,
  LoginInput: styled.input`
    width: 400px;
    height: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    border-color: transparent;
  `,
  LoginBtn: styled.button`
    width: 200px;
    height: 40px;
    color: white;
    background-color: #b46060;
    border-color: transparent;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
  `,
};
