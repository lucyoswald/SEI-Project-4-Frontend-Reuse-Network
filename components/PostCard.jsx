import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { API_URL } from "../consts";
import CommentDropdown from "./CommentDropDown";
import { useJwt } from "react-jwt";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [theStatus, setTheStatus] = useState("Available");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showDeleteAlertModal, setShowDeleteAlertModal] = useState(false);
  const [CommentAlertModal, setCommentAlertModal] = useState(false);
  const [loginUpdateAlertModal, setLoginUpdateAlertModal] = useState(false);
  const [loginDeleteAlertModal, setLoginDeleteAlertModal] = useState(false);

  const navigate = useNavigate();

  const commentData = {
    text: "",
    post: post.id,
  };

  const [commentFormData, setCommentFormData] = useState(commentData);

  const [patchFormData, setPatchFormData] = useState({
    image: post.image,
    item: post.item,
    description: post.description,
    contact: post.contact,
    location: post.location,
    owner: post.owner.id,
    status: post.status,
  });

  const onCommentClick = () => {
    if (!userId) {
      setCommentAlertModal(true);
      return;
    }
    setShowCommentModal(true);
  };

  const onCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("its working");

    try {
      const token = localStorage.getItem("token");
      const createComment = await axios.post(
        `${API_URL}/comments/`,
        commentFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(createComment);
      setComments((prevComments) => [...prevComments, createComment.data]);
      console.log(commentFormData);
      setShowCommentModal(false);
      setCommentFormData(commentData);
      location.reload();
    } catch (err) {
      console.log("This isn't working");
      console.log(err);
    }
  };
  const onCommentChange = (e) => {
    setCommentFormData({ ...commentFormData, [e.target.name]: e.target.value });
    console.log(commentFormData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const id = post.id;
      const token = localStorage.getItem("token");
      console.log(patchFormData);
      const updatePost = await axios.patch(
        `${API_URL}/posts/${id}/`,
        patchFormData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTheStatus(patchFormData.status);
      setShowPostModal(false);
      setPatchFormData();
      location.reload();
    } catch (err) {
      console.log(err);
      console.log("This isn't working!");
    }
  };

  const onChange = (e) => {
    setPatchFormData({ ...patchFormData, [e.target.name]: e.target.value });
    console.log(patchFormData);
  };

  const deletePost = async (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
    try {
      const id = post.id;
      const token = localStorage.getItem("token");
      const deletedPost = await axios.delete(`${API_URL}/posts/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      location.reload();
    } catch (err) {
      console.log("this isn't working");
    }
  };

  const auth_token = localStorage.getItem("token");
  const decodedToken = useJwt(auth_token);
  const userId = decodedToken?.decodedToken?.sub;

  const handleUpdateModal = (value) => {
    if (!userId) {
      // Show not logged in update modal
      setLoginUpdateAlertModal(true);
    } else if (userId === post.owner.id) {
      // Show update modal
      setShowPostModal(value);
    } else {
      // Show alert modal for not owner
      setShowAlertModal(true);
    }
  };

  const handleShowDeleteModal = (value) => {
    if (!userId) {
      // Show not logged in delete modal
      setLoginDeleteAlertModal(true);
    } else if (userId === post.owner.id) {
      // Show delete modal
      setShowDeleteModal(value);
    } else {
      // Show alert modal for not owner
      setShowDeleteAlertModal(true);
    }
  };
  useEffect(() => {
    setTheStatus(post.status);
  }, [post.status]);

  return (
    <div>
      <Card
        className="card"
        style={{
          width: "300px",
          height: "440px",
          border: "none",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
            width: "80px",
            height: "20px",
            backgroundColor: theStatus === "Available" ? "#A8C090" : "#d8c6a8",
            borderBottomLeftRadius: "10px",
            borderTopRightRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="available_tab"
            style={{
              fontSize: "9px",
              color: "white",
              paddingRight: "5px",
              paddingLeft: "5px",
              border: "none",
              backgroundColor:
                theStatus === "Available" ? "#A8C090" : "#d8c6a8 ",
              borderBottomLeftRadius: "10px",
              outline: "none",
            }}
          >
            {post.status}
          </button>
        </div>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => handleShowDeleteModal(true)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "#ededed",
            zIndex: 1,
            height: "20px",
            padding: "10px",
            display: "flex",
            cursor: "pointer",
          }}
        />
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          style={{ marginTop: "25vh" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={deletePost}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Card.Img variant="top" src={post.image} className="post_image" />

        <Card.Body>
          <Card.Title className="post_item" style={{ fontSize: "15px" }}>
            {post.item}
          </Card.Title>
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: "20px",
              color: "grey",
            }}
          >
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="edit-tooltip" style={{ fontSize: "10px" }}>
                  Leave a comment
                </Tooltip>
              }
            >
              <FontAwesomeIcon
                icon={faComment}
                onClick={onCommentClick}
                style={{ cursor: "pointer", marginRight: "10px" }}
              />
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="edit-tooltip" style={{ fontSize: "10px" }}>
                  Click to edit
                </Tooltip>
              }
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={() => handleUpdateModal(true)}
                style={{ cursor: "pointer" }}
              />
            </OverlayTrigger>
          </div>
          <Card.Text style={{ fontSize: "13px" }}>{post.description}</Card.Text>
          <Card.Text style={{ fontSize: "13px" }}>{post.contact}</Card.Text>
          <Card.Text style={{ fontSize: "13px" }}>{post.location}</Card.Text>
        </Card.Body>

        {/* COMMENT MODAL  */}
        <Modal
          show={showCommentModal}
          onHide={() => setShowCommentModal(false)}
          style={{ marginTop: "25vh" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "20px" }}>
              Leave a comment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onCommentSubmit}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{ fontSize: "15px" }}>
                  Your comment
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="text"
                  value={commentFormData.text}
                  rows={3}
                  onChange={onCommentChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCommentModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={onCommentSubmit}
              type="submit"
              style={{ backgroundColor: "#a8c090", border: "none" }}
            >
              Comment
            </Button>
          </Modal.Footer>
        </Modal>

        {/* UPDATE CARD MODAL  */}

        <Modal show={showPostModal} onHide={() => setShowPostModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update post</Modal.Title>
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
                  value={patchFormData.image}
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
                  id="item"
                  name="item"
                  value={patchFormData.item}
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
                  value={patchFormData.description}
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
                  value={patchFormData.contact}
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
                  value={patchFormData.location}
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
                  value={patchFormData.status}
                  onChange={onChange}
                  className="form-control form-control-sm"
                  style={{ marginBottom: "10px" }}
                  required
                />
              </div>

              <Button
                variant="primary"
                style={{ backgroundColor: "#a8c090", border: "none" }}
                type="submit"
              >
                Update Post
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPostModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <CommentDropdown comments={comments} />
      </Card>
      <Modal
        show={showAlertModal}
        onHide={() => setShowAlertModal(false)}
        style={{ marginTop: "25vh" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Apologies you can't update this post as you aren't the creator.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlertModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDeleteAlertModal}
        onHide={() => setShowDeleteAlertModal(false)}
        style={{ marginTop: "25vh" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Apologies you can't delete this post as you aren't the creator.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteAlertModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={CommentAlertModal}
        onHide={() => setCommentAlertModal(false)}
        style={{ marginTop: "25vh" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>You must be logged in to leave a comment.</Modal.Body>
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
      <Modal
        show={loginUpdateAlertModal}
        onHide={() => setLoginUpdateAlertModal(false)}
        style={{ marginTop: "25vh" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>You must be logged in to update a post.</Modal.Body>
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
      <Modal
        show={loginDeleteAlertModal}
        onHide={() => setLoginDeleteAlertModal(false)}
        style={{ marginTop: "25vh" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>You must be logged in to delete a post.</Modal.Body>
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
  );
};

export default PostCard;
