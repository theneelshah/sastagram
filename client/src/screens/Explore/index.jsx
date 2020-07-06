import axios from "axios";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { getToken } from "../../auth";
import {
  Post,
  PostCaption,
  PostImage,
  Posts,
  PostTitle,
} from "../../components/PostImage";
import { Loading } from "./styles";

export default class Explore extends Component {
  state = {
    totalPosts: 0,
    hasMore: true,
    posts: [],
    page: 1,
    isLoading: false,
    redirectTo: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { page } = this.state;
    const token = getToken();
    const headers = {
      Authorization: `Bearer: ${token}`,
      "Content-type": "application/json",
    };
    this.setState({ isLoading: true });

    await axios.get(`/api/v1/post?page=${page}`, { headers }).then((result) => {
      this.setState({ isLoading: false }, () => {
        let { posts } = this.state;
        posts = posts.concat(result.data.posts);
        // console.log(posts);
        this.setState({ posts, totalPosts: posts.length }, () => {
          this.setState({ page: this.state.page + 1 });
          if (result.data.posts.length === 9) this.setState({ hasMore: true });
          else this.setState({ hasMore: false });
        });
      });
    });
  };

  render() {
    const { isLoading, posts, hasMore, totalPosts } = this.state;
    console.log(posts.length);
    return (
      <div>
        <h1>Explore Page</h1>

        {isLoading && <Loading> Loading.. </Loading>}

        <InfiniteScroll
          dataLength={totalPosts}
          hasMore={hasMore}
          next={this.fetchData}
          loader={<Loading> Loading... </Loading>}
          endMessage={<Loading> All posts done. </Loading>}
        >
          <Posts>
            {posts.map((el) => {
              const { _id, caption, image, username } = el;

              return (
                <Post key={_id}>
                  <Link
                    target="_blank"
                    className="username"
                    to={`/user/${username}`}
                  >
                    <PostTitle> {username} </PostTitle>
                  </Link>
                  <Link target="_blank" to={`/p/${_id}`}>
                    <PostImage image={image} />
                    <PostCaption>{caption}</PostCaption>
                  </Link>
                </Post>
              );
            })}
          </Posts>
        </InfiniteScroll>
      </div>
    );
  }
}
