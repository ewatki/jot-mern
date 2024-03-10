import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from '../api/userApi';
import { Container, Row, Col, Form, Button, Tab, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function Login() {
    const [activeTab, setActiveTab] = useState("Sign in");

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
    }

    const handleTabChange = (cityName) => {
      setActiveTab(cityName);
    };

    async function onSubmit(e) {
      e.preventDefault();
      const loggedUser = { ...form };
      const response = await getUser(loggedUser);

      if (response.ok) {
          setForm({ username: "", password: "" });
          navigate("/profile/");
      } else {
          throw new Error("Failed to log in")
      }
    }

    return (
      <Container fluid>
        <Tab.Container activeKey={activeTab}>
          <Nav className="tab">
            <Nav.Item>
              <Nav.Link
                eventKey="Sign in"
                onClick={() => handleTabChange("Sign in")}
              >
                Sign in
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="Sign up"
                onClick={() => handleTabChange("Sign up")}
              >
                Sign up
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="Sign in">
              <Row>
                <Col>
                  <Form onSubmit={onSubmit}>
                    <Form.Group as={Col} column="true" controlId="email">
                      <Form.Label column="true" sm="2">
                        Email
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={form.email}
                          onChange={(e) =>
                            updateForm({ email: e.target.value })
                          }
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="password">
                      <Form.Label column="true" sm="2">
                        Password
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={form.password}
                          onChange={(e) =>
                            updateForm({ password: e.target.value })
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Col>
                      <Button variant="primary" type="submit" size="md">
                        Submit
                      </Button>
                    </Col>
                  </Form>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="Sign up">
              <Row>
                <Col>
                  <Form onSubmit={onSubmit}>
                    <Form.Group as={Col} column="true" controlId="email">
                      <Form.Label column="true" sm="2">
                        Email
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={form.email}
                          onChange={(e) =>
                            updateForm({ email: e.target.value })
                          }
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Col} column="true" controlId="username">
                      <Form.Label column="true" sm="2">
                        Username
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          type="username"
                          placeholder="Username"
                          value={form.username}
                          onChange={(e) =>
                            updateForm({ username: e.target.value })
                          }
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="password">
                      <Form.Label column="true" sm="2">
                        Password
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={form.password}
                          onChange={(e) =>
                            updateForm({ password: e.target.value })
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Col>
                      <Button variant="primary" type="submit" size="md">
                        Submit
                      </Button>
                    </Col>
                  </Form>
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    );
}