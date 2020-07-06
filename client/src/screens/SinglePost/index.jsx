import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { H1, Image, P, Post } from "./styles";

class SinglePost extends Component {
  state = {
    caption: "",
    image: "",
    username: "",
    time: "",
    isLoading: false,
  };

  async componentDidMount() {
    const id = window.location.href.split("/")[4];
    console.log(id);
    this.setState({ isLoading: true });
    await axios.get(`/api/v1/post/${id}`).then((res) => {
      const { data } = res;
      const { caption, image, time, username } = data.post;
      this.setState({ caption, image, username, time }, () => {
        console.log(this.state);
        this.setState({ isLoading: false });
      });
    });
  }

  render() {
    const { caption, image, username, time, isLoading } = this.state;
    return (
      <div>
        {isLoading && <h4> Loading... </h4>}
        <Post>
          <H1>
            <Link target="_blank" to={`/user/${username}`}>
              {username}
            </Link>
          </H1>
          <Image image={image} />
          <P>{caption}</P>
        </Post>
      </div>
    );
  }
}

export default SinglePost;
