import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  const navigationLinks = [
    { title: "Home", slug: "/" },
    { title: "Posts", slug: "/Posts" },
    { title: "Sign Up", slug: "/Signup" },
    { title: "Login", slug: "/Login" },
  ];

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Nav.Link as={Link} to={"/"}>
          {" "}
          Home{" "}
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/Posts"}>
              Posts
            </Nav.Link>
            <Nav.Link as={Link} to={"/Signup"}>
              Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to={"/Login"}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
