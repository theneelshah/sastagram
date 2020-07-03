import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isLoggedIn, login, setUser } from "../../auth";
import { Button } from "../../util/styles";
import Toast from "../../util/toast";
import { Card, Form, Heading, Input } from "./styles";

class Login extends Component {
  state = {
    email: "",
    password: "",
    emailError: true,
    passwordError: true,
    disabled: true,
    showToast: false,
    toastText: "",
    toastType: "",
    isLoading: false,
  };

  componentDidMount() {
    if (localStorage.getItem("signedIn"))
      this.setState(
        { toastText: "Please login to continue!", toastType: "success" },
        () => {
          this.setState({ showToast: true }, () => {
            setInterval(() => {
              this.setState({ showToast: false });
              localStorage.removeItem("signedIn");
            }, 2000);
          });
        }
      );
  }

  componentWillUnmount() {}

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { email, password } = this.state;
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (re.test(String(email).toLowerCase()))
        this.setState({ emailError: false });
      else this.setState({ emailError: true });

      if (password.length < 6 && password.length >= 0)
        this.setState({ passwordError: true });
      else this.setState({ passwordError: false });
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    this.setState({ isLoading: true });
    await axios
      .post("http://127.0.0.1:4546/api/v1/user/login", {
        email,
        password,
      })
      .then((res) => {
        const { token } = res.data;
        const { name, email, _id } = res.data.user;
        // console.log(res.data);
        this.setState({ isLoading: false });
        login(token);
        setUser(name, email, _id);

        window.location.reload();
      })
      .catch((error) => {
        const message = error.response.data.message;
        this.setState(
          { isLoading: false, toastText: message, toastType: "danger" },
          () => {
            this.setState({ showToast: true }, () => {
              setInterval(() => {
                this.setState({ showToast: false });
                localStorage.removeItem("signedIn");
              }, 2000);
            });
          }
        );
      });
  };

  render() {
    const { emailError, passwordError } = this.state;
    const { showToast, isLoading, toastText, toastType } = this.state;
    if (isLoggedIn()) return <Redirect to="/" />;
    return (
      <Card>
        {showToast && <Toast text={toastText} type={toastType} />}
        {isLoading && <Toast text="Loading..." type="normal" />}

        <Heading>Sastagram</Heading>
        <Form autoComplete="off" method="post" onSubmit={this.onSubmit}>
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            onChange={this.onChange}
            error={emailError}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.onChange}
            error={passwordError}
            required
          />
          <Button
            type="submit"
            disabled={!emailError && !passwordError ? false : true}
          >
            Login
          </Button>
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </Form>
      </Card>
    );
  }
}
export default Login;
