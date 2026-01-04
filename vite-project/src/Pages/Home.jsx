import React from "react";
import Navbar1 from "../Components/Navbar1";
import logo from "../assets/logo.png";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Navbar1 />
      <Container>
        <Row>
          <Col className="text-center py-5">
            <img src={logo} alt="logo de la universidad" />
            <h1>Universidad Tecnológica Nacional</h1>
            <h2>Facultad Regional Tucumán</h2>
            <h3>"Ingeniería en sistemas de información"</h3>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
