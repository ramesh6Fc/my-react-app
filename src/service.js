import axios from "axios";
import authHeader from "./auth-header";


// TODO Need to configure
const api_auth_url = "http://localhost:8080/api/auth/";
const api_url = "http://localhost:8080/api/user/";

const register = (username, email, password) => {
  return axios.post(api_auth_url + "signup", {
    username,
    email,
    password,
  })
  .then((response) => {
    return "Registered Successfully";
  });
};

const login = (username, password) => {
  return axios
    .post(api_auth_url + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  console.log("logout")
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


// Uer actions
const postData = () => {
    return axios.post(api_url, { headers: authHeader() });
  };
  
  const getData = () => {
    return axios.get(api_url, { headers: authHeader() });
  };
  
  const PutDate = () => {
    return axios.put(api_url, { headers: authHeader() });
  };

export default {
  register,
  login,
  logout,
  getCurrentUser,
  postData,
  getData,
  PutDate,
};