import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getToken, isLoggedIn, logout } from "../../auth";
import { Button } from "../../util/styles";
import Toast from "../../util/toast";
import { Card, Form, Image, Input } from "./styles";

export default class UploadPost extends Component {
  state = {
    caption: "",
    captionError: true,
    image: null,
    imagePath: null,
    imageError: true,
    currentUserToken: null,
    showToast: false,
    isLoading: false,
  };
  componentDidMount() {
    this.setState({ currentUserToken: getToken() });
  }

  onChange = (e) => {
    this.setState({ caption: e.target.value }, () => {
      const { caption } = this.state;
      if (caption.length > 0) this.setState({ captionError: false });
      else this.setState({ captionError: true });
    });
  };

  fileHandler = (e) => {
    // this.setState({}).
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
      } else this.setState({ imageError: true });
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true }, async () => {
      try {
        const { imagePath, image, caption, currentUserToken } = this.state;
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "sastagram");
        data.append("cloud_name", "sastagram");
        console.log(data);
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/sastagram/image/upload",
          data
        );
        const url = res.data.secure_url;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${currentUserToken}`,
        };

        await axios
          .post(
            "http://127.0.0.1:4546/api/v1/post",
            {
              caption,
              image: url,
            },
            { headers }
          )
          .then((result) => {
            console.log(result.data);
            window.location.href = "http://localhost:3000/profile";
          })
          .catch((error) => {
            console.log(error.response);
            const { status } = error.response;
            console.log(status);
            if (status == 401) {
              console.log("Called nauthorized");
              this.setState({ showToast: true }, () => {
                setTimeout(() => {
                  logout();
                  window.location.reload();
                }, 2000);
              });
            }
          });
      } catch (error) {
        console.log(error.response);
      } finally {
        this.setState({ isLoading: false });
      }
    });
    // fetch("https://api.cloudinary.com/v1_1/sastagram/image/upload");
  };

  render() {
    if (!isLoggedIn()) return <Redirect to="/" />;
    const {
      captionError,
      imageError,
      image,
      imagePath,
      showToast,
      isLoading,
    } = this.state;

    return (
      <Card>
        {isLoading && (
          <h1>Uploading on free, bakwass server! Please wait patiently!</h1>
        )}
        {showToast && (
          <Toast text="You're an unwanted guest. Login again" type="danger" />
        )}
        <h1>Post</h1>
        <Form autoComplete="off" method="post" onSubmit={this.onSubmit}>
          <Image src={imagePath} alt="Upload File" />
          <Input
            type="text"
            name="caption"
            placeholder="Caption for Post"
            onChange={this.onChange}
            error={captionError}
            required
          />
          <Input
            type="file"
            name="image"
            onChange={this.fileHandler}
            accept="image/x-png,image/jpeg,image/gif"
            error={imageError}
            required
          />
          <Button
            type="submit"
            disabled={!imageError && !captionError ? false : true}
          >
            Upload
          </Button>
        </Form>
      </Card>
    );
  }
}
