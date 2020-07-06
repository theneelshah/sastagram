import React from "react";
import { Card } from "./styles";

const NotLoggedInHome = () => {
  return (
    <div>
      <Card>
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
      </Card>
    </div>
  );
};
export default NotLoggedInHome;
