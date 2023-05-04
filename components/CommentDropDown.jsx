import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { API_URL } from "../consts";
import axios from "axios";

const CommentModal = ({ comments }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

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
                  </button>

                  <p>{comment.owner.username}</p>
                  <p>{comment.text}</p>
                  <p style={{ color: "blue" }}>
                    Posted:{" "}
                    {new Date(comment.created_at).toLocaleString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
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
