import { useState, useEffect } from "react";
// styles
import "../login/Login.styles.css";
// route import
import { Link, useHistory } from "react-router-dom";
//axios
import axios from "axios";
// material import
import M from "materialize-css";
//react form hook validation
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [successtoast, setSuccesstoast] = useState();

  const onChangeHandler = (e) => {};

  const onSubmitHandler = () => {
    const postData = {
      name,
      email,
      password,
    };
    axios
      .post(`http://localhost:5000/api/v1/auth/signup`, postData)
      .then((response) => {
        console.log(response);
        setEmail("");
        setName("");
        setPassword("");
        M.toast({
          html: "sign up successfully",
          classes: "successToast #66bb6a green lighten-1",
        });
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      })
      .catch((error) => {
        const errorMessage = error?.response?.data;
        console.log(errorMessage);
        if (error) {
          M.toast({
            html: errorMessage?.error,
            classes: "errorToast #e57373 red lighten-2",
          });
        }
      });
    console.log("onsubmit", name, email, password);
  };

  useEffect(() => {
    console.log(name, email, password);
  }, [email, name, password]);
  return (
    <div className="loginContainer">
      <div className="card darken-1 loginCard">
        <h4 className="center-align">Signup</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitHandler();
          }}
        >
          <div className="formContainer">
            <input
              name="name"
              placeholder="Name"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
            <Link to="/login">
              <h6>Already have an account?</h6>
            </Link>
            <br></br>
            <button
              type="submit"
              className="btn btn-primary submitButton 
            center-align #64b5f6 blue lighten-2"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
