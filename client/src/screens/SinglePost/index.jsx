import axios from "axios";
import React, { Component } from "react";
import { H1, Image, P, Post } from "./styles";

class SinglePost extends Component {
  state = {
    caption: "",
    image: "",
    username: "",
    time: "",
  };

  async componentDidMount() {
    const id = window.location.href.split("/")[4];
    console.log(id);
    await axios.get(`http://127.0.0.1:4546/api/v1/post/${id}`).then((res) => {
      const { data } = res;
      const { caption, image, time, username } = data.post;
      this.setState({ caption, image, username, time }, () => {
        console.log(this.state);
      });
    });
  }

  render() {
    const { caption, image, username, time } = this.state;
    return (
      <div>
        <Post>
          <H1>{username}</H1>
          <Image image={image} />
          <P>{caption}</P>
        </Post>
      </div>
    );
  }
}

export default SinglePost;
