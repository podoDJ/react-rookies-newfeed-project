import shortid from "shortid";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";

let newArr = [];
console.log("여기는 POSTLIST");
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
    case "ADD_POST":
      return [action.payload, ...state];
    case "DELETE_POST":
      return state.filter((post) => {
        return post.postId !== action.payload;
      });
    default:
      return state;
  }
};

export default posts;
