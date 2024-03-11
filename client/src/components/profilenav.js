import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Navbar, Dropdown } from "react-bootstrap";

export default function ProfileNav({name}) {
  return (
    <Col>
      <Navbar className="justify-content-between">
        <Navbar.Brand href="#">Jot</Navbar.Brand>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
        {name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#">Settings</Dropdown.Item>
          <Dropdown.Item href="#">Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </Navbar>
    </Col>
  );
}