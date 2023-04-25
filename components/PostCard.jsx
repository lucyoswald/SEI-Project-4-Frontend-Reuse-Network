import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const PostCard = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Card style={{ width: "300px", height: "450px" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
          width: "60px",
          height: "20px",
          backgroundColor: "#A8C090",
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
            fontSize: "10px",
            color: "white",
            border: "none",
            backgroundColor: "#A8C090",
            borderBottomLeftRadius: "10px",
            outline: "none",
          }}
        >
          Available
        </button>
      </div>

      <Card.Img variant="top" src={post.image} className="post_image" />
      <Card.Body>
        <Card.Title className="post_item" style={{ fontSize: "15px" }}>
          {post.item}
        </Card.Title>
        <Card.Text style={{ fontSize: "13px" }}>{post.description}</Card.Text>
        <Card.Text style={{ fontSize: "13px" }}>{post.contact}</Card.Text>
        <Card.Text style={{ fontSize: "13px" }}>{post.location}</Card.Text>
        <Button
          variant="primary"
          style={{
            fontSize: "12px",
            paddingRight: "8px",
            paddingLeft: "8px",
          }}
          className="comment_button"
          onClick={() => setShowModal(true)}
        >
          Leave a comment
        </Button>
      </Card.Body>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Your comment</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default PostCard;
