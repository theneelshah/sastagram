import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../auth";
import { Button } from "../../util/styles";
import Toast from "../../util/toast";
import { Card, Form, Heading, Input } from "./styles";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameError: true,
    emailError: true,
    passwordError: true,
    cnfPasswordError: true,
    showToast: false,
    toastText: "",
    redirect: false,
  };

  onChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        const { name, email, password, confirmPassword } = this.state;

        if (name.length > 4) this.setState({ nameError: false });
        else this.setState({ nameError: true });

        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (re.test(String(email).toLowerCase()))
          this.setState({ emailError: false });
        else this.setState({ emailError: true });

        if (password.length < 6 && password.length >= 0)
          this.setState({ passwordError: true });
        else this.setState({ passwordError: false });

        if (password !== confirmPassword)
          this.setState({ cnfPasswordError: true });
        else this.setState({ cnfPasswordError: false });
      }
    );
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const headers = { "Content-Type": "application/json" };
    const { name, email, password } = this.state;
    this.setState({ toastText: "Loading..." }, () => {
      this.setState({ showToast: true });
    });
    await axios
      .post(
        "http://127.0.0.1:4546/api/v1/user/signup",
        { name: name.toLowerCase(), email, password },
        { headers }
      )
      .then((user) => {
        const { status, data } = user;
        const message = user.data.message;
        const username = data.user.name;
        console.log(user);
        this.setState(
          { toastText: `${message}: ${username}` },
          this.setState(
            { showToast: false },

            this.setState({ redirect: true })
          )
        );
      })
      .catch((err) => {
        console.log(err.response.data.message);
        this.setState(
          { toastText: err.response.data.message },
          this.setState({ showToast: true }, () => {
            setTimeout(() => {
              this.setState({ showToast: false });
            }, 2000);
          })
        );
      });
  };

  render() {
    const {
      nameError,
      emailError,
      passwordError,
      cnfPasswordError,
      showToast,
      toastText,
      redirect,
    } = this.state;
    if (redirect) {
      localStorage.setItem("signedIn", true);
      return <Redirect to="/login" />;
    }
    if (isLoggedIn()) return <Redirect to="/" />;

    return (
      <Card>
        {showToast ? (
          <Toast
            text={toastText}
            type={toastText === "Loading..." ? "normal" : "danger"}
          />
        ) : (
          <></>
        )}
        <Heading>Sastagram</Heading>
        <Form method="post" autoComplete="off" onSubmit={this.onSubmit}>
          <Input
            type="text"
            placeholder="Username"
            name="name"
            onChange={this.onChange}
            error={nameError}
            required
          />
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
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={this.onChange}
            error={cnfPasswordError}
            required
          />
          <Button
            type="submit"
            disabled={
              !emailError && !passwordError && !nameError && !cnfPasswordError
                ? false
                : true
            }
          >
            Sign-Up
          </Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </Card>
    );
  }
}

export default Signup;
