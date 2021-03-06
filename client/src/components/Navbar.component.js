import { useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";
// user context
import { UserContext } from "../context/user/user.provider";
// action types
import { userType } from "../context/user/user.types";

const Navbar = () => {
  const { userDetails } = useContext(UserContext);
  console.log("nav userDetails ", userDetails?.token);
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo">
          <img
            width="25px"
            src="https://i.pinimg.com/originals/71/72/16/7172161b580470deb78078669236d2c1.jpg"
            alt="logo"
          />
          Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {userDetails?.token ? (
            <li>
              <Link to="/signout">Signout</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Signin</Link>
            </li>
          )}
          {!userDetails?.token && (
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          )}
          {userDetails?.token && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/createpost">Create Posts</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
