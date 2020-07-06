import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { getToken, getUser, isLoggedIn, logout } from "../../auth";
import { Post, PostImage, Posts } from "../../components/PostImage";
import { Button } from "../../util/styles";
import {
  ButtonHolder,
  Details,
  Img,
  PictureHolder,
  ProfileDetails,
  ProfilePicture,
} from "./styles";

class Profile extends Component {
  state = {
    profileEmail: "",
    profileName: "",
    selfProfile: false,
    posts: [],
    image: "",
    profilePicture: "",
    imageError: false,
    isLoading: false,
    isLoadingProfile: false,
  };

  componentWillMount() {
    const { user, email } = this.props;
    const currUser = getUser();
    if (!user || !email)
      this.setState({
        selfProfile: true,
        profileEmail: currUser.email,
        profileName: currUser.user,
      });
    else
      this.setState({
        profileEmail: email,
        profileName: user,
      });
  }

  getPosts = async () => {
    const id = localStorage.getItem("id");
    const { profileName } = this.state;
    this.setState({ isLoadingProfile: true });
    await axios
      .get(`/api/v1/post/user/${profileName}`)
      .then((res) => {
        console.log(res);
        const { status, data } = res;
        const { posts, profilePicture } = data;
        this.setState({ posts, profilePicture: profilePicture }, () => {
          this.setState({ isLoadingProfile: false });
        });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ isLoadingProfile: false });
      });
  };

  async componentDidMount() {
    this.setState({ currentUserToken: getToken() });
    this.profilePictureRef = React.createRef();

    this.getPosts();
  }

  onClick = () => {
    // console.log("called");
    const { selfProfile } = this.state;
    if (!selfProfile) return;
    this.profilePictureRef.current.click();
  };

  onChange = (e) => {
    this.setState({ image: e.target.files[0] }, () => {
      const { image } = this.state;
      if (image) {
        const reader = new FileReader();
        reader.onload = async (result) => {
          const imagePath = result.srcElement.result;
          this.setState({ imagePath }, () => {
            this.setState({ imageError: false });
          });
        };
        reader.readAsDataURL(image);
        this.onSubmit();
      } else this.setState({ imageError: true });
    });
  };

  onSubmit = async () => {
    // e.preventDefault();
    this.setState({ isLoading: true }, async () => {
      try {
        const { image, currentUserToken } = this.state;
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "sastagram");
        data.append("cloud_name", "sastagram");
        console.log(data);
        this.setState({ isLoading: true });
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/sastagram/image/upload",
          // Kindly don't spam the url, if you know how to hide it, it'll be appreciated if you'd tell me
          data
        );
        const url = res.data.secure_url;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${currentUserToken}`,
        };
        console.log(url);
        const { profileName } = this.state;
        await axios
          .put(
            `/api/v1/user/${profileName}`,
            {
              profilePicture: url,
            },
            { headers }
          )
          .then((result) => {
            console.log(result.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("finally called");
            this.setState({ isLoading: false });
            this.getPosts();
          });
      } catch (error) {
        console.log(error.response);
      } finally {
        console.log("finally called");
        this.setState({ isLoading: false });
      }
    });
  };

  render() {
    if (!isLoggedIn()) return <Redirect to="/" />;

    const {
      profileName,
      profileEmail,
      selfProfile,
      posts,
      image,
      profilePicture,
      isLoading,
      isLoadingProfile,
    } = this.state;

    return (
      <div>
        {isLoading && (
          <h1 style={{ color: "red" }}>
            Please Wait patiently while profile picture is updating... (If the
            image is high quality, response will be slower)
          </h1>
        )}

        <Details>
          <ProfilePicture>
            <PictureHolder>
              <Img
                src={
                  profilePicture ||
                  "https://res.cloudinary.com/sastagram/image/upload/v1593768176/user-profile-pngrepo-com_z6yhex.png"
                }
                alt=""
                onClick={this.onClick}
              />
              <input
                type="file"
                name="image"
                style={{ display: "none" }}
                accept="image/x-png,image/jpeg,image/gif"
                ref={this.profilePictureRef}
                onChange={this.onChange}
              />
            </PictureHolder>
          </ProfilePicture>
          <ProfileDetails>
            <div>
              <h1>{profileName}</h1>
              {selfProfile && <HiddenButtons />}
            </div>
          </ProfileDetails>
        </Details>
        <Posts>
          {isLoadingProfile && <h3>Loading...</h3>}
          {posts.map((el) => {
            const { _id, caption, image } = el;
            return (
              <Post key={_id}>
                <Link target="_blank" to={`/p/${_id}`}>
                  <PostImage profile image={image} />
                </Link>
              </Post>
            );
          })}
        </Posts>
      </div>
    );
  }
}

const HiddenButtons = () => {
  return (
    <ButtonHolder>
      <Button type="button">
        <Link to="/add-new-post">Add Post</Link>
      </Button>

      {/* <Button type="button">
        <Link to="/">Update Profile</Link>
      </Button> */}

      <Button type="button" secondary onClick={() => logout()}>
        Logout
      </Button>
    </ButtonHolder>
  );
};

export default Profile;
