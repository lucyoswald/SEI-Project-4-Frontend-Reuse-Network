import { useState } from "react";
import { API_URL } from "../consts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import signup_background_video from "../assets/pexels-charlotte-may-5824187-2160x3840-24fps.mp4";
import login_background_image from "../assets/pexels-francesco-ungaro-4322027.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/auth/login/`, formData);
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/");
      location.reload();
    } catch (err) {
      console.log("This isn't working");
      setShowError(true);
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
        src={login_background_image}
        alt="Background image"
        className="signup_background_image"
      />
      <form className="sl_form" onSubmit={onSubmit}>
        <h3 className="form_header">Login</h3>
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
        <button type="submit" class="btn btn-primary">
          Login
        </button>
        <p onClick={() => navigate("/signup")}>Don't have an account?</p>
      </form>
      {showError && (
        <div classs="container p-5 s_l_error">
          <div
            class="alert alert-danger alert-dismissible fade show error "
            role="alert"
            style={{ position: "absolute", width: "200px" }}
          >
            <strong>The account you entered does not exist.</strong>
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

export default Login;
