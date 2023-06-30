import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import GlobalStyle from "../style/GlobalStyle";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Post from "../pages/Post";
import PostDetail from "../pages/PostDetail";
import StarDetail from "../pages/StarDetail";
import Star from "../pages/Star";
import About from "../pages/About";
import Mypage from "../pages/Mypage";

//동준 추가
import PostCreate from "../pages/PostCreate";
import PostUpdate from "../pages/PostUpdate";

//진솔 추가
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { showMembers, showUser, sortLikeMembers } from "../redux/modules/logReducer";
import { auth, db } from "../firebase";

import { useEffect } from "react";
import { collection, getDocs, query } from "@firebase/firestore";
import { showPosts, sortLikePosts } from "../redux/modules/postWrite";
import PostCommentUpdata from "../pages/PostCommentUpdata";
const Router = () => {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(showUser(user));
      // dispatch(logChange(true));
    } else return;
  });
  useEffect(() => {
    const newArr = [];
    const fetchPostsData = async () => {
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newArr.push({ id: doc.id, ...doc.data() });
      });
      dispatch(showPosts(newArr));
    };
    fetchPostsData();

    const fetchMemberData = async () => {
      // q = 요청 객체
      const q = query(collection(db, "starList"));
      const querySnapshot = await getDocs(q);
      const initialStarList = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        initialStarList.push(data);
      });
      dispatch(showMembers(initialStarList));
    };
    fetchMemberData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/post" element={<Post />} />
            <Route path="/postcreate" element={<PostCreate />} />
            <Route path="/postupdate/:id" element={<PostUpdate />} />
            <Route path="/star/members/:id" element={<StarDetail />} />
            <Route path="/star" element={<Star />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/commentup/:id" element={<PostCommentUpdata />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default Router;
