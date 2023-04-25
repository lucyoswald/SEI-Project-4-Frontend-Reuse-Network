// import { Modal, Button } from "react-bootstrap";
// import { useState } from "react";
// import { API_URL } from "../consts";
// import axios from "axios";

// const CreatePostModal = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [posts, setPosts] = useState([]);

//   const initialFormData = {
//     image: "",
//     item: "",
//     description: "",
//     contact: "",
//     location: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     console.log(formData);
//   };

//   const onClick = () => {
//     setFormData(initialFormData);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     console.log("form submitted");

//     try {
//       const createPost = await axios.post(`${API_URL}/posts/`, {
//         ...formData,
//       });
//       console.log(createPost);
//       setPosts((prevPosts) => [...prevPosts, createPost.data]);
//       setShowModal(false);
//       setFormData(initialFormData);
//     } catch (err) {
//       console.log("This isn't working");
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <Button variant="primary" onClick={() => setShowModal(true)}>
//         Create New Post
//       </Button>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New Post</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={onSubmit}>
//             <div className="form-group">
//               <label htmlFor="image" className="form-label">
//                 Image:
//               </label>
//               <input
//                 type="text"
//                 id="image"
//                 name="image"
//                 value={formData.image}
//                 onChange={onChange}
//                 className="form-control form-control-sm"
//                 placeholder="Paste image URL here"
//                 style={{ marginBottom: "10px" }}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="title" className="form-label">
//                 Item name:
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="item"
//                 value={formData.item}
//                 onChange={onChange}
//                 className="form-control form-control-sm"
//                 style={{ marginBottom: "10px" }}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="content" className="form-label">
//                 Description:
//               </label>
//               <textarea
//                 id="content"
//                 name="description"
//                 value={formData.description}
//                 onChange={onChange}
//                 className="form-control"
//                 required
//               ></textarea>
//             </div>
//             <div className="form-group">
//               <label htmlFor="contact" className="form-label">
//                 Contact:
//               </label>
//               <input
//                 type="text"
//                 id="contact"
//                 name="contact"
//                 value={formData.contact}
//                 onChange={onChange}
//                 className="form-control form-control-sm"
//                 style={{ marginBottom: "10px" }}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="location" className="form-label">
//                 Location:
//               </label>
//               <input
//                 type="text"
//                 id="location"
//                 name="location"
//                 value={formData.location}
//                 onChange={onChange}
//                 className="form-control form-control-sm"
//                 style={{ marginBottom: "10px" }}
//                 required
//               />
//             </div>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" type="submit">
//             Create Post
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default CreatePostModal;
