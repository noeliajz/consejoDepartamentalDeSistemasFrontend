import React from 'react'
import Navbar1 from '../Components/Navbar1'
import { Container, Row, Col } from "react-bootstrap";

const Drive = () => {
  return (
    <>
    <Navbar1/>
    <Container>
        <Row>
            <Col>
            <h4 className='text-center'>Acceso al Drive del Consejo Departamental de Sistemas</h4>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Drive