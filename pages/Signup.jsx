import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import signup_background_image from "../assets/pexels-francesco-ungaro-8345717.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("something");
    try {
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.password_confirmation
      ) {
        setShowError("Please fill in all the fields.");
        return;
      }

      if (formData.password !== formData.password_confirmation) {
        setShowError("Passwords do not match.");
        return;
      }

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        setShowError(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
        );
        return;
      }

      console.log(formData);
      await axios.post(`${API_URL}/auth/signup/`, formData);
      navigate("/login");
    } catch (e) {
      console.log("this isn't working");
      console.log(e);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form_box">
      {/* <video
        src={signup_background_video}
        autoPlay
        loop
        muted
        className="signup_background_video"
      /> */}
      <img
        src={signup_background_image}
        alt="Background image"
        className="signup_background_image"
      />

      <form className="sl_form" onSubmit={onSubmit}>
        <h3 className="form_header">Sign Up</h3>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            value={formData.username}
            placeholder="Your name"
            name="username"
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={formData.email}
            placeholder="Email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <div
            class="input-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type={showPassword ? "text" : "password"}
              class="form-control"
              id="exampleInputPassword1"
              value={formData.password}
              placeholder="Password"
              name="password"
              onChange={onChange}
              onClick={toggleShowPassword}
              style={{ width: "280px", borderRadius: "5px" }}
            />
            <FontAwesomeIcon
              onClick={toggleShowPassword}
              style={{
                cursor: "pointer",
                width: "20px",
                position: "absolute",
                right: 10,
                color: "grey",
              }}
              icon={showPassword ? faEye : faEyeSlash}
              aria-hidden="true"
            />
          </div>
        </div>
        <div class="form-group">
          <div
            class="input-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type={showPassword ? "text" : "password"}
              class="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm Password"
              name="password_confirmation"
              onChange={onChange}
              onClick={toggleShowPassword}
              style={{ width: "280px", borderRadius: "5px" }}
            />
            <FontAwesomeIcon
              onClick={toggleShowPassword}
              style={{
                cursor: "pointer",
                width: "20px",
                position: "absolute",
                right: 10,
                color: "grey",
              }}
              icon={showPassword ? faEye : faEyeSlash}
              aria-hidden="true"
            />
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Sign up
        </button>
        <p onClick={() => navigate("/login")}>Already have an account? </p>
      </form>
      {showError && (
        <div classs="container p-5 s_l_error">
          <div
            class="alert alert-danger alert-dismissible fade show error "
            role="alert"
            style={{ position: "absolute", width: "200px" }}
          >
            <strong>{showError} </strong>
            <button
              type="button"
              class="close close_button"
              data-dismiss="alert"
              style={{ focus: "none" }}
              aria-label="Close"
              onClick={() => setShowError(false)}
            >
              <span aria-hidden="True">&times;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
