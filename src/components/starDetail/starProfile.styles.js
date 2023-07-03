import { styled } from "styled-components";

export const P = {
  ProfileContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 100px;
    margin-top: 30px;
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

  ProfileBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: var(--color-text);
  `,

  IntroContainer: styled.div`
    margin-top: 10px;
  `,

  Intro: styled.div`
    margin-top: 15px;
    padding: 10px;
    font-size: 0.8rem;
    border: 1px solid rgba(77, 77, 77, 0.5);
    border-radius: 5px;
    width: 250px;
    height: 70px;
  `,

  NameBox: styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
};

export const G = {
  Guestbook: styled.div`
    position: relative;
    max-width: 750px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    padding-top: 40px;
    gap: 10px;
    color: var(--color-text);
    /* background-color: tomato; */
  `,

  GuestbookCut: styled.p`
    position: absolute;
    top: 10px;
    left: 20px;
  `,

  Textarea: styled.input`
    box-sizing: border-box;
    width: 95%;
    height: 100px;

    background-color: var(--color-bg);
    border: 1px solid rgba(77, 77, 77, 0.5);
    border-radius: 3px;

    padding: 15px;
  `,

  CreateBtn: styled.button`
    position: absolute;
    top: 150px;
    right: 20px;
    width: 45px;
    height: 28px;
    color: var(--color-white);
    background: var(--color-accent);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `,

  GuestbookList: styled.div`
    position: absolute;
    width: 95%;
    top: 150px;
    left: 10px;
    margin: 20px;
  `,

  UserImage: styled.img`
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 100%;
    margin-top: 30px;
  `,

  UserCmt: styled.div`
    position: absolute;
    top: 45px;
    left: 75px;

    p {
      font-size: 1.1rem;
      margin-bottom: 3px;
    }

    span {
      font-size: 0.7rem;
      color: var(--color-box);
      text-shadow: 1px 1px 7px rgba(0, 0, 0, 0.1);
    }
  `,

  UpdateBtn: styled.button`
    position: absolute;
    right: 50px;
    top: 55px;
    color: var(--color-text);
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      color: black;
      text-decoration: underline;
    }
  `,

  DeleteBtn: styled.button`
    position: absolute;
    right: 15px;
    top: 55px;
    color: var(--color-text);
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      color: black;
      text-decoration: underline;
    }
  `,

  Cmt: styled.p`
    padding: 20px 10px;
  `,
};
