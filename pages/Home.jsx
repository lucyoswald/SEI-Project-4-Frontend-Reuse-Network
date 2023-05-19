import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../consts";
import PostCard from "../components/PostCard";
import home_background_video from "../assets/pexels-artem-podrez-6801515-2160x3840-30fps.mp4";
import LoadingVisual from "../components/LoadingVisual";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeColor, setActiveColor] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [unsuccessfulSearchSubmitted, setUnsuccessfulSearchSubmitted] =
    useState(false);

  const fetchData = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
      if (filteredData.length === 0) {
        setUnsuccessfulSearchSubmitted(true);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      console.log("This isn't working");
    }
  };

  const onSubmit = () => {
    setActiveColor(true);
    setIsLoading(true);
    setSearchSubmitted(true);
    fetchData();
  };

  return (
    <>
      <div className={!activeColor ? "home_search" : "grey_background"}>
        {isLoading ? (
          <div className="loading">
            <LoadingVisual />
          </div>
        ) : (
          <>
            {activeColor ? (
              <></>
            ) : (
              <video
                src={home_background_video}
                autoPlay
                loop
                muted
                className="home_background_image"
              />
            )}

            <h1
              style={{
                fontSize: "23px",
                wordSpacing: "3px",
                letterSpacing: "6px",
                marginTop: "120px",
                color: "white",
                textAlign: "center",
              }}
            >
              The Reuse Network
            </h1>
            <div
              class="input-group"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div class="form-outline">
                <input
                  style={{ fontSize: "14px" }}
                  id="form1"
                  class="form-control"
                  placeholder="Search by item or location..."
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
                style={{
                  backgroundColor: "#A8C090",
                  borderColor: "#A8C090",
                  height: "35px",
                }}
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
              {searchSubmitted ? null : (
                <>
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
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </button>
                </>
              )}
            </section>
          </>
        )}
      </div>

      <Modal
        show={unsuccessfulSearchSubmitted}
        onHide={() => setUnsuccessfulSearchSubmitted(false)}
        style={{ marginTop: "25vh" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Apologies the item or location you searched for isn't in our database
          yet.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setUnsuccessfulSearchSubmitted(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Home;
