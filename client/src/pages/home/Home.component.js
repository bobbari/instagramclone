import React, { useState, useEffect } from "react";
import "./Home.style.css";
//axios
import axios from "axios";
// toast import
import M from "materialize-css";
// react router
import { Link } from "react-router-dom";
// displayCard itme
import DisplayPostItem from "../../components/DisplayPostItem.component";
//spinner
import { Loaderspinner } from "../../components/loginSpinner.component";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("Authorization");
    const headers = {
      authorization: token,
    };
    axios
      .get(`http://localhost:5000/api/v1/post/userpostlist`, {
        headers,
      })
      .then((response) => {
        setLoading(false);
        setPosts(response?.data?.posts);
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.response?.data);
        console.log("error", error?.response?.status);
        const message = error?.response?.data
          ? error?.response?.data?.message
          : error?.response?.error;
        if (error?.response?.status === 422) {
          M.toast({
            html: message,
            classes: "errorToast #e57373 red lighten-2",
          });
        }
      });
  }, []);

  const displayCard = (postList) => {
    return postList.length > 0 ? (
      postList.map((post) => <DisplayPostItem post={post} key={post.id} />)
    ) : (
      <div>
        <Link to="/createpost">Start Creating some Amazings post</Link>
      </div>
    );
  };

  return (
    <div className="home">
      {loading ? <Loaderspinner /> : displayCard(posts)}
    </div>
  );
};

export default Home;
