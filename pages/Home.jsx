import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../consts";
import PostCard from "../components/PostCard";
// import home_background_image from "../assets/pexels-ksenia-chernaya-5716775.jpg";
import home_background_video from "../assets/pexels-artem-podrez-6801515-2160x3840-30fps.mp4";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/posts/`);
      console.log(data);
      const searchData = data;
      console.log(searchData);
      const filteredData = searchData.filter((item) => {
        return (
          item.item.toLowerCase().includes(search.toLowerCase()) ||
          item.location.toLowerCase().includes(search.toLowerCase())
        );
      });

      console.log(filteredData);
      setSearchResults(filteredData);
    } catch (e) {
      console.log(e);
      console.log("This isn't working");
    }
  };

  const onSubmit = () => {
    fetchData();
  };

  return (
    <div className="home_search">
      {/* <img
        src={home_background_image}
        alt="Background image"
        className="home_background_image"
      /> */}
      <video
        src={home_background_video}
        autoPlay
        loop
        muted
        className="home_background_image"
      />

      <h1>The Reuse Network</h1>
      <div
        class="input-group"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div class="form-outline">
          <input
            style={{ width: "300px" }}
            type="search"
            id="form1"
            class="form-control"
            placeholder="Search by item..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          class="btn btn-primary"
          style={{ backgroundColor: "#A8C090", borderColor: "#A8C090" }}
          onClick={() => onSubmit()}
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
      <section className="postcards_onsearch">
        {searchResults.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}{" "}
      </section>
      <section className="signup_login_buttons">
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => navigate("/signup")}
        >
          Login
        </button>
      </section>
    </div>
  );
};
export default Home;
