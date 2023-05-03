import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../consts";
import axios from "axios";
import { useJwt } from "react-jwt";

const CommentModal = ({ comments }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  // const post = post.id;
  // const auth_token = localStorage.getItem("token");
  // const decodedToken = useJwt(auth_token);
  // const userId = decodedToken?.decodedToken?.sub;

  // const handleShowDeleteComment = (value) => {
  //   console.log(userId, post.owner.id);

  //   if (userId === post.owner.id) {
  //     console.log("this function is running");

  //     deleteComment(value);
  //   } else {
  //     window.alert(
  //       "Apologies you can't delete this comment as you aren't the creator."
  //     );
  //   }
  // };

  const deleteComment = async (e) => {
    e.preventDefault();
    const id = e.target.value;
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      const deletedComment = await axios.delete(`${API_URL}/comments/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      location.reload();
    } catch (err) {
      console.log("this isn't working");
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleButtonClick}
        style={{
          fontSize: "9px",
          backgroundColor: "#a8c090",
          border: "none",
          position: "absolute",
          right: "0",
          bottom: "0.1px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          borderTopLeftRadius: "10px",
        }}
      >
        Comments ({comments && comments.length})
      </Button>

      <Modal
        show={showModal}
        onHide={handleModalClose}
        style={{ marginTop: "25vh" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            Comments ({comments && comments.length})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {comments &&
              comments.map((comment) => (
                <ListGroup.Item key={comment.id}>
                  <button
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: "transparent",
                      fontSize: "10px",
                      border: "none",
                      color: "red",
                    }}
                    value={comment.id}
                    // onClick={handleShowDeleteComment(true)}
                    onClick={deleteComment}
                  >
                    {" "}
                    ❌
                    {/* <FontAwesomeIcon
                    icon={faTimes}
                    style={{
                      color: "red",
                      zIndex: 1,
                      height: "20px",
                      padding: "10px",
                      display: "flex",
                      cursor: "pointer",
                    }}
                  /> */}
                  </button>

                  <p>{comment.owner.username}</p>
                  <p>{comment.text}</p>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentModal;
