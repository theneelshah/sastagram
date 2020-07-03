import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getUser } from "../../auth";
import Profile from "./Profile";

export default class UserProfile extends Component {
  state = {
    searchedUser: null,
    loggedInUser: null,
  };

  async componentWillMount() {
    const searchedUser = window.location.href.split("/")[4];
    const { user, email } = getUser();
    this.setState(
      {
        searchedUser,
        loggedInUser: { user, email },
        searchedUserPresent: null,
      },
      async () => {
        if (searchedUser) {
          console.log(searchedUser);
          await this.getUserByUsername(searchedUser);
          // console.log(searchedUserPresent);
          // if (searchedUserPresent) this.setState({ searchedUserPresent });
        }
      }
    );
  }

  async componentDidMount() {
    const { searchedUser } = this.state;
    // if (searchedUser) {
    //   console.log(searchedUser);
    //   const searchedUserPresent = await this.getUserByUsername(searchedUser);
    //   console.log(searchedUserPresent);
    //   if (searchedUserPresent) this.setState({ searchedUserPresent });
    // }
  }

  getUserByUsername = async (username) => {
    await axios
      .get(`http://127.0.0.1:4546/api/v1/user/${username}`)
      .then((res) => {
        const { user } = res.data;
        console.log(user);
        this.setState({ searchedUserPresent: user });
      })
      .catch((err) => {
        const { status } = err.response;
        window.location.href = "http://localhost:3000/user-not-found";
        // console.log("called");
        // return null;
      });
  };

  render() {
    const { searchedUser, loggedInUser, searchedUserPresent } = this.state;
    console.log(searchedUser, loggedInUser);
    if (searchedUser === loggedInUser.user) return <Redirect to="/profile" />;

    return (
      <div>
        {searchedUserPresent ? (
          <Profile
            user={searchedUserPresent.user}
            email={searchedUserPresent.email}
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}
