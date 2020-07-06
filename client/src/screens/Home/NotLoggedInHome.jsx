import React from "react";
import { Card } from "./styles";

const NotLoggedInHome = () => {
  return (
    <div>
      <Card>
        <div>
          <h1>
            Features of <span className="sastagram">Sastagram</span> (Instagram
            clone) :
          </h1>
          <ul>
            <li>Authentication using JWT (Signup / Login)</li>
            <li>Profile Page</li>
            <li>See Profiles</li>
            <li>Explore Posts</li>
            <li>Add Post</li>
            <li>Update Profile Picture</li>
          </ul>
          <h1>Upcoming Features</h1>
          <ul>
            <li>Delete Post</li>
            <li>Follow / unfollow</li>
            <li>Like / unlike</li>
            <li>Home page (showing the posts of followed users)</li>
            <li>Private / public account</li>
          </ul>
        </div>
      </Card>
      <a href="https://github.com/theneelshah/sastagram-server" target="_blank">
        Github Repo
      </a>
    </div>
  );
};
export default NotLoggedInHome;
