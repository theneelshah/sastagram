import axios from "axios";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { getToken, isLoggedIn, logout } from "./auth";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
import Explore from "./screens/Explore";
import NotLoggedInHome from "./screens/Home/NotLoggedInHome.jsx";
import Profile from "./screens/Profile/Profile";
import UserProfile from "./screens/Profile/UserProfile";
import SinglePost from "./screens/SinglePost";
import UploadPost from "./screens/UploadPost";

const validateLogin = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer: ${getToken()}`,
  };
  await axios
    .post("/api/v1/user/loggedIn", {}, { headers })
    .then((res) => {
      if (res.status === 200) return true;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
        return false;
      }
    });
};

const Routes = () => {
  if (isLoggedIn() && validateLogin())
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/explore" component={Explore} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/add-new-post" component={UploadPost} />
        <Route path="/signup" component={Signup} />
        <Route path="/user/:user" component={UserProfile} />
        <Route path="/p/:id" component={SinglePost} />
        <Route path="*" component={Error404LoggedIn} />
      </Switch>
    );
  return (
    <Switch>
      <Route exact path="/" component={NotLoggedInHome} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

const Error404 = () => (
  <div>
    <h1>You aren't supposed to be here. Do you want to login to continue?</h1>
  </div>
);

const Error404LoggedIn = () => (
  <div>
    <h1>Not Found</h1>
  </div>
);

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

export default Routes;
