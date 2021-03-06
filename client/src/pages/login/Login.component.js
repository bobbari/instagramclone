import { useState, useContext } from "react";
import "./Login.styles.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
// material import
import M from "materialize-css";
// user context
import { UserContext } from "../../context/user/user.provider";
// action types
import { userType } from "../../context/user/user.types";
// // userReducers
// import { userReducers } from "../../context/user/user.reducers";

const Login = () => {
  const { userDetails, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLogin, setisLogin] = useState();
  const history = useHistory();

  const onSubmitHandler = () => {
    const postData = { email, password };
    axios
      .post(`http://localhost:5000/api/v1/auth/signin`, postData)
      .then((response) => {
        console.log(response);
        console.log("status", response?.request?.status);
        if (response?.request?.status === 200) {
          setEmail("");
          setPassword("");
          M.toast({
            html: response?.data?.message,
            classes: "successToast #66bb6a green lighten-1",
          });
        }
        //if (!localStorage.getItem("Authorization")) {
        //console.log("user data ", response?.data?.user);
        const userDetails = JSON.stringify(response?.data?.user);
        localStorage.setItem("Authorization", response?.data?.token);
        localStorage.setItem("user", userDetails);

        dispatch({
          type: userType.ADD_USER,
          payload: response?.data?.user,
        });
        dispatch({
          type: userType.ADD_TOKEN,
          payload: response?.data?.token,
        });

        setisLogin(true);
        setTimeout(() => {
          history.push("/profile");
        }, 1500);
        //}
      })
      .catch((error) => {
        setisLogin(false);
        const errorData = error?.response?.data;
        const message = errorData?.message
          ? errorData?.message
          : errorData?.error;

        console.log(errorData);

        if (message) {
          M.toast({
            html: message,
            classes: "errorToast #e57373 red lighten-2",
          });
        }
      });
  };

  return (
    <div className="loginContainer">
      <div className="card darken-1 loginCard">
        <h4 className="center-align">Signin</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitHandler();
          }}
        >
          <div className="formContainer">
            <input
              name="email"
              placeholder="email-id"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Link to="/signup">
              <h6 style={{ padding: "10px" }}> Do you have account?</h6>
            </Link>

            <button
              type="submit"
              className="btn btn-primary submitButton center-align  #64b5f6 blue lighten-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
