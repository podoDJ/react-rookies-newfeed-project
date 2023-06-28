import shortid from "shortid";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";



//실험페이지

 const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
// console.log("현재 uid : ",auth.currentUser.uid)

//action value
const SORT_LIKE_POSTS = "SORT_LIKE_POSTS";
const SHOW_POSTS = "SHOW_POSTS";

//action creater
export const showPosts = (payload) => {
  return {
    type: SHOW_POSTS,
    payload,
  };
};

export const sortLikePosts = () => {
  return {
    type: SORT_LIKE_POSTS,
  };
};

// initial state
let newArr = [];

const fetchData = async () => {
  const q = query(collection(db, "posts"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    newArr.push({ id: doc.id, ...doc.data() });
  });
  return newArr;
};
fetchData();

//fetchData().then(() => {}).catch((error) => {console.log("데이터를 수신 오류", error)})

const posts = (state = newArr, action) => {
  switch (action.type) {
    case SHOW_POSTS:
      return action.payload;
    case "ADD_POST":
      return [action.payload, ...state];
    case "DELETE_POST":
      return state.filter((post) => {
        return post.postId !== action.payload;
      });
    case "UPDATE_POST":
      return state.map((post) => {
        if (post.postId === action.payload.postId) {
          return { ...post, postTitle: action.payload.postTitle, postBody: action.payload.postBody };
        } else {
          return post;
        }
      });
    case SORT_LIKE_POSTS:
      return state.sort((a, b) => b.like - a.like);
    default:
      return state;
  }
};

export default posts;
