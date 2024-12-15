import React, { useContext, useState } from "react";
import axios from "axios";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";


const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { url, setToken } = useContext(StoreContext) || {};
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUrl = `${url}/api/user/${currState === "Login" ? "login" : "register"}`;
    console.log("Requesting URL:", newUrl);

    console.log("userData", userData);

    try {
      const response = await axios.post(newUrl, userData);
       console.log("response", response.data);
       
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        console.log("Token:", response.data.token);

       setShowLogin(false);
        navigate("/")
      }
      else {
        alert(response.data.message || "An error occurred.");
      }
    } catch (success) {
      console.log("User registered successfully", success);
      alert("User registered successfully");
    }
  };

  // useEffect(() => {
  //  console.log(userData)
  // }, [userData])

  return (
    <div className="login-popup">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-popup-inputs">
            <div className="input-box">
              {currState === "Login" ? (
                <></>
              ) : (
                <div className="input-box">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Your Name"
                    name="name"
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    value={userData.name}
                  />
                  <i className="fa-solid fa-envelope"></i>
                </div>
              )}

              <div className="input-box">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  name="email"
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  value={userData.email}
                />
                <i className="fa-solid fa-eye-slash"></i>
              </div>

              <div className="input-box">
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  name="password"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  value={userData.password}
                />
                <i className="fa-solid fa-eye-slash"></i>
              </div>
            </div>
            <button type="submit" className="input-submit">
              {currState === "Sign Up" ? "Create account" : "Login"}
            </button>

            <div className="condition">
              <input type="checkbox" required />
              <p>
                By continuing , i agree to the terms of use & privacy policy
              </p>
            </div>
            {currState === "Login" ? (
              <p>
                Create a new account?
                <span onClick={() => setCurrState("Sign Up")}>Click here</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setCurrState("Login")}>Login here</span>
              </p>
            )}
          </div>
        </form>
        <div className="social-login">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-google"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
