const getToken = () => {
  return localStorage.getItem("token");
};

const isLoggedIn = () => {
  if (getToken()) return true;
  return false;
};

const logout = () => {
  if (getToken()) localStorage.removeItem("token");
  if (getUser()) {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  }
  window.location.href = "/";
  window.location.reload();
};

const login = (token) => {
  localStorage.setItem("token", token);
};

const setUser = (user, email, id) => {
  localStorage.setItem("username", user);
  localStorage.setItem("email", email);
  localStorage.setItem("id", id);
};

const getUser = () => ({
  user: localStorage.getItem("username"),
  email: localStorage.getItem("email"),
});

export { isLoggedIn, getToken, logout, login, setUser, getUser };
