import Router from "./shared/Router";
import { auth } from "./firebase";
// yarn install --force  (모듈강제설치)
// yarn add redux react-redux styled-components shortid firebase react-router-dom

function App() {
  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
