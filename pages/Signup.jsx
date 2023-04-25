import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../consts";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.prevent.default();
    try {
      await axios.post(`${API_URL}/signup/`, formData);
      navigate("/login");
    } catch (e) {}
  };

  return (
    <div className="form_box">
      <form className="sl_form" onSubmit={onSubmit}>
        <h3 className="form_header">Sign Up</h3>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            value={formData.userName}
            placeholder="Username"
            name="userName"
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
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={formData.password}
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={onChange}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Sign up
        </button>
        <p onClick={() => navigate("/login")}>Already have an account? </p>
      </form>
    </div>
  );
};

export default Signup;
