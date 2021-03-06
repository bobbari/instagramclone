import React, { useState } from "react";
// custome hook for api calling
import useApiCall from "../../hooks/useApiCall";
// styles
import "./CreatePost.styles.css";
//axios
import axios from "axios";
// material import
import M from "materialize-css";
// history
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [file, setFile] = useState();
  const { apiCalling } = useApiCall();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(title, body, file);

    const data = new FormData();
    data.append("file", file);
    // data.append("upload_preset", "instagramclone");
    // data.append("cloud_name", "mahiown");
    // fetch("https://api.cloudinary.com/v1_1/mahiown/image/upload", {
    //   method: "POST",
    //   body: data,
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    data.append("body", body);
    data.append("title", title);
    //apiCalling("post/createPost", "post", data).then((res) => {console.log("res api calling ", res);});
    const token = localStorage.getItem("Authorization");
    const headers = {
      authorization: token,
    };
    console.log("data   dssssdss", data);

    axios
      .post(`http://localhost:5000/api/v1/post/createPost`, data, {
        headers: headers,
      })
      .then((response) => {
        console.log("response ", response);
        if (response?.status === 200) {
          M.toast({
            html: response?.data?.message,
            classes: "successToast #66bb6a green lighten-1",
          });
          setTitle("");
          setBody("");
          setFile("");
          setTimeout(() => {
            history.push("/");
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error?.response);

        const message = error?.response?.data?.error
          ? error?.response?.data?.error
          : error?.response?.data?.message;
        if (error?.response?.status === 422) {
          console.log("error ", error?.response?.data);
          M.toast({
            html: message,
            classes: "errorToast #e57373 red lighten-2",
          });
        }
      });
  };

  const selectedFile = (e) => {
    console.log("selectedFile ", e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    // <div className="createPostContainer">
    <div
      className="card "
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h4 className="center-align">Create Posts</h4>
      <form onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="title"
              type="text"
              className="validate"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="title">Title</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              id="body"
              type="text"
              className="validate"
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
            <label htmlFor="body">Body</label>
          </div>
        </div>

        <div className="file-field input-field">
          <div className="btn #64b5f6 blue lighten-2">
            <span>Upload Image</span>
            <input
              type="file"
              name="file"
              onChange={(e) => {
                selectedFile(e);
              }}
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Upload one or more files"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary submitButton center-align  #64b5f6 blue lighten-2"
        >
          Submit Post
        </button>
      </form>
    </div>
    // </div>
  );
};

export default CreatePost;
