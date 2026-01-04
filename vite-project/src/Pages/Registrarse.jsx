import { Container, Row, Col } from "react-bootstrap";
import Navbar1 from "../Components/Navbar1";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Registrarse = () => {
  return (
    <>
      <Navbar1 />
      <Container>
        <Row>
          <Col className="text-center">
            <h5 className="text-center p-5">Iniciar sesión</h5>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresar correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ingresar contraseña</Form.Label>
                <Form.Control type="password" placeholder="" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Repetir contraseña</Form.Label>
                <Form.Control type="password" placeholder="" />
              </Form.Group>
              <Button variant="primary"  type="submit">
                Guardar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Registrarse;
