import { styled } from "styled-components";

export const S = {
  Title: styled.h2`
    text-align: center;
    color: var(--color-text);
    font-size: 3rem;
    padding-top: 70px;
    padding-bottom: 50px;
  `,

  Container: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,

  Profile: styled.div`
    width: 220px;
    text-align: center;
    padding: 1rem;
    background-color: var(--color-white);
    border-radius: 20px;
    box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    margin: 10px;
    -webkit-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    cursor: pointer;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
      transform: translateY(-10px);
    }
  `,

  LikesWrapper: styled.div`
    margin-left: 180px;
  `,

  LikeBtn: styled.button`
    cursor: pointer;
    border: none;
    /* margin-left: 180px; */
    background-color: var(--color-white);
    color: #b46060;
  `,

  LikeCut: styled.p`
    color: var(--color-text);
  `,

  Photo: styled.img`
    width: 200px;
    height: 200px;
    border-radius: 100%;
  `,

  Name: styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 20px;
    color: var(--color-text);
  `,

  Cmt: styled.p`
    padding-bottom: 10px;
    color: var(--color-text);
  `,
};
