import { useState, useEffect } from "react";
import { API_URL } from "../consts";
import axios from "axios";
import PostCard from "../components/PostCard";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import LoadingVisual from "../components/LoadingVisual";
import { useNavigate } from "react-router-dom";

config.autoAddCss = false;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInPostModal, setLoggedInPostModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/posts/`);
        setPosts(data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log("This is not working!");
      }
    };
    fetchData();
  }, []);

  const initialFormData = {
    image: "",
    item: "",
    description: "",
    contact: "",
    location: "",
    status: "Available",
  };

  const [formData, setFormData] = useState(initialFormData);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onClick = () => {
    const isLoggedIn = localStorage.getItem("token") !== null;

    if (!isLoggedIn) {
      setLoggedInPostModal(true);
    } else {
      setShowModal(true);
      setFormData(initialFormData);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const createPost = await axios.post(`${API_URL}/posts/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(createPost);
      setPosts((prevPosts) => [...prevPosts, createPost.data]);
      setShowModal(false);
      setFormData(initialFormData);
    } catch (err) {
      console.log("This isn't working");
      console.log(err);
    }
    location.reload();
  };

  return (
    <>
      <div className="fixing_loading">
        <div className="posts_background">
          {isLoading ? (
            <div className="loading">
              <LoadingVisual />
            </div>
          ) : (
            <div>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="edit-tooltip" style={{ fontSize: "10px" }}>
                    Create a post
                  </Tooltip>
                }
              >
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  onClick={onClick}
                  bounce
                  className="fa-regular fa-square-plus fa-beatt"
                  style={{
                    height: "30px",
                    marginLeft: "30px",
                    cursor: "pointer",
                    marginTop: "30px",
                    color: "grey",
                  }}
                />
              </OverlayTrigger>

              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Create New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label htmlFor="image" className="form-label">
                        Image:
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={onChange}
                        className="form-control form-control-sm"
                        placeholder="Paste image URL here"
                        style={{ marginBottom: "10px" }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="title" className="form-label">
                        Item name:
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="item"
                        value={formData.item}
                        onChange={onChange}
                        className="form-control form-control-sm"
                        style={{ marginBottom: "10px" }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="content" className="form-label">
                        Description:
                      </label>
                      <textarea
                        id="content"
                        name="description"
                        value={formData.description}
                        onChange={onChange}
                        className="form-control"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact" className="form-label">
                        Contact:
                      </label>
                      <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={onChange}
                        className="form-control form-control-sm"
                        style={{ marginBottom: "10px" }}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="location" className="form-label">
                        Location:
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={onChange}
                        className="form-control form-control-sm"
                        style={{ marginBottom: "10px" }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="status" className="form-label">
                        Status:
                      </label>
                      <input
                        type="text"
                        id="status"
                        name="status"
                        defaultValue={"Available"}
                        value={formData.status}
                        onChange={onChange}
                        className="form-control form-control-sm"
                        style={{ marginBottom: "10px" }}
                        required
                      />
                    </div>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ backgroundColor: "#a8c090", border: "none" }}
                    >
                      Create Post
                    </Button>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>

              <div className="postcard_main">
                {posts.map((post) => (
                  <div key={post.id}>
                    <PostCard post={post} setFormData={setFormData} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Modal
          show={loggedInPostModal}
          onHide={() => setLoggedInPostModal(false)}
          style={{ marginTop: "25vh" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>You must be logged in to create a post.</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => navigate("/login")}
              style={{ backgroundColor: "#a8c090", border: "none" }}
            >
              Log In
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Posts;
