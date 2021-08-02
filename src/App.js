import React, { useState, useRef, useEffect } from "react";

// Validation Module
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator"

import Service from "./service";
import './App.css';


// Check mandatory field
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

// Validate the email address
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

//Validate the Username
const validateUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};


//Validate the Passwork
const validatePassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};


//User registration 
const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      Service.register(username, email, password).then(
        (response) => {
          setMessage(response.message);
          setSuccessful(true);
          props.registeredUser();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-elemt">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-input"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, validateUsername]}
                />
              </div>

              <div className="form-elemt">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-input"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-elemt">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-input"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, validatePassword]}
                />
              </div>

              <div className="form-elemt">
                <button className="btn">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-elemt">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <div style={{float: "right",  fontSize: '11px'}}><a onClick= {props.login}>Login</a></div> 
      </div>
   
  );
};

// User login 
const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      Service.login(username, password).then(
        () => {
          props.signedUser(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="card card-container">
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-elemt">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-input"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-elemt">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-input"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-elemt">
            <button className="btn" disabled={loading}>
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-elemt">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
         <div style={{float: "right", fontSize: '11px'}}><a onClick= {props.register}>Register</a></div>
      </div>
  );
};

// User login and registration exchange
function User(props) {
  const [sign,setSign] = useState();
  const registerPage = () => {setSign ("register");}
  const loginPage = () => {setSign ();}
  return (
    <div className="App">
      <header className="App-header">
        {
          sign === 'register' ? 
          <div>
            <Register login = {loginPage} registeredUser = {loginPage}/>
          </div>  : 
          <div>
            <Login register = {registerPage} signedUser = {props.logedInUser}/> 
          </div>
        }
             
      </header>
    </div>
  );
}


// Content page 
function Homepage(props) {
  const [content,setContent] = useState("Welcome to our Application")
  const logout = () => {
    Service.logout();
    props.logout(false);
  }
  const getData = () => {
    Service.getData().then(
      (response) => {
        setContent(response.data.message);
      }
    );
  }
  return (
   <div className = "card card-container">
     <button onClick = {getData}>Data</button>
     <div>{content}</div>
     <div style={{float: "right", fontSize: '11px'}}><a onClick= {logout}>Logout</a></div>    
   </div>
  
  );
}

function App() {
  
  const [userState, setUserState] = useState(false)
  const isLogedIn = (userStatus) => {
    setUserState(userStatus);
  }
  return (
    <>
    {userState ? <Homepage logout = {isLogedIn}/>:<User logedInUser = {isLogedIn} /> }
    </>
  )
}

export default App;
