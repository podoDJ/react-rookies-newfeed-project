import { styled, css } from "styled-components";

export const P = {
  ProfileContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 120px;
    margin-top: 30px;
  `,

  ProfileImageWrap: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ProfileImageBox: styled.div`
    width: 300px;
    height: 300px;
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
    margin-bottom: 15px;
  `,

  ImageInput: styled.input`
    display: none;
  `,

  ProfileBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  MemberInput: styled.input`
    width: 300px;
    height: 30px;
    padding-left: 15px;
    border: 0.03rem solid gray;
    border-radius: 5px;
    background-color: transparent;
    color: var(--color-text);
  `,
  MemberTextarea: styled.textarea`
    width: 296px;
    height: 40px;
    padding: 10px;
    border: 0.03rem solid gray;
    border-radius: 5px;
    background-color: transparent;
    color: var(--color-text);
  `,

  Contents: styled.div`
    display: flex;
    gap: 30px;
    margin: 10px;
    color: var(--color-text);
  `,

  ContentsTitle: styled.button`
    cursor: pointer;
    margin-left: 15px;
    margin-bottom: 5px;
    border: none;
    background-color: transparent;
    font-size: 15px;
  `,

  contentsBody: styled.div`
    background-color: var(--color-box);
    border-radius: 5px;
    margin-top: 15px;
    width: 100%;
    height: 100%;
    color: var(--color-text);
  `,

  Btns: styled.button`
    border: none;
    cursor: pointer;
    border-radius: 5px;
    color: var(--color-text);
    background-color: #e4dccf;

    ${({ btn }) => {
      switch (btn) {
        case "imageBtn":
          return css`
            width: 150px;
            height: 30px;
            margin-right: 5px;
          `;
        case "profileBtn":
          return css`
            width: 319px;
            height: 40px;

            margin-top: 10px;
          `;
      }
    }}
  `,
};

export const S = {
  PostWriteBox: styled.div`
    background-color: white;
    width: 92.5%;
    height: 70px;
    padding: 1rem;
    display: flex;
    align-items: center;
    border-radius: 20px;
    box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    margin: 30px auto;
    -webkit-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  `,

  PostWriteBoxCnt: styled.span`
    font-size: 23px;
    font-weight: 500;
    color: #4d4d4d;
    margin: 10px;
  `,

  PostingBoxCtn: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,

  PostingBox: styled.div`
    width: 240px;
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
    //------ 제이 삭제 (프로필 페이지 불필요 기능)
    /* &:hover {
      box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
      transform: translateY(-10px);
    } */
    //제이 삭제--------
    //---------------제이 추가
    margin-top: 25px;
    //제이 삭제----------
  `,
  PostingFoodPhoto: styled.img`
    width: 230px;
    height: 230px;
    border-radius: 5px;
    margin-top: 5px;
  `,

  PostingTitle: styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 20px;
  `,

  PostingDateLikeBox: styled.div`
    display: flex;
    flex-direction: row;
    float: right;
    gap: 30px;
  `,

  PostingBody: styled.p`
    padding-bottom: 10px;
  `,
  PostingLike: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
