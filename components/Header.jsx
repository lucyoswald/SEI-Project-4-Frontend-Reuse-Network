import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const navigationLinks = [
    { title: "Home", slug: "/" },
    { title: "Posts", slug: "/posts" },
    { title: "Sign Up", slug: "/signup" },
    isLoggedIn
      ? { title: "Log Out", slug: "/", onClick: handleLogout }
      : { title: "Login", slug: "/login" },
  ];

  return (
    <Navbar bg="light" expand="lg">
      <Container style={{ maxWidth: "100vw" }}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="all_nav"
          style={{
            width: "100vw",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Nav>
            {navigationLinks.slice(0, 2).map((link) => (
              <Nav.Link as={Link} to={link.slug} onClick={link.onClick}>
                {link.title}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            {navigationLinks.slice(2).map((link) => (
              <Nav.Link as={Link} to={link.slug} onClick={link.onClick}>
                {link.title}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
