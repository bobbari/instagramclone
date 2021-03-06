import "./App.css";
import Navbar from "./components/Navbar.component";
import { Route } from "react-router-dom";
import Home from "./pages/home/Home.component";
import Login from "./pages/login/Login.component";
import Profile from "./pages/profile/Profile.component";
import Signup from "./pages/signup/Signup.component";
import CreatePost from "./pages/createpost/CreatePost.component";
// context
import UserContextProvider from "./context/user/user.provider";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Navbar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/createpost">
          <CreatePost />
        </Route>
      </UserContextProvider>
    </div>
  );
}

export default App;
