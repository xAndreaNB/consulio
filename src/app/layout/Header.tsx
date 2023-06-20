/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navbar, Container, Image, Nav } from "react-bootstrap";
import { getItem } from "../helper/localstorage.helper";
import ProfileIcon from "../../icons/ProfileIcon";
import SignOutIcon from "../../icons/SignOutIcon";
import { NavLink } from "react-router-dom";

export default function Header() {
  const user = getItem("user");
  const signOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Navbar bg="beige" expand="lg">
      <Container>
        <NavLink
          className="fw-bold"
          style={{ textDecoration: "none", color: "var(--bs-gray-700)" }}
          to={"/home"}
        >
          <Image src="/Logo.svg" width="100px" />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse role="" id="basic-navbar-nav">
          {user && (
            <Nav className="ms-auto align-items-center">
              <NavLink
                className="fw-bold"
                style={{ textDecoration: "none", color: "var(--bs-gray-700)" }}
                to={"/home"}
              >
                Home
              </NavLink>
              <NavLink
                className="fw-bold ms-3"
                style={{ textDecoration: "none", color: "var(--bs-gray-700)" }}
                to={"/aboutus"}
              >
                About Us
              </NavLink>
              <div className="d-flex ms-4 align-items-center gap-2">
                <p className="mb-0">
                  Welcome, <span className="fw-bold">{user?.name}</span>
                </p>
                <ProfileIcon width={32} />
              </div>
              <div
                style={{ height: "2rem" }}
                className="border-end border-start mx-2 border-primary "
              ></div>
              <div
                className="d-flex align-items-center gap-2 cursor-pointer"
                onClick={signOut}
              >
                <SignOutIcon width={32} />
                <p className="mb-0">Logout</p>
              </div>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
