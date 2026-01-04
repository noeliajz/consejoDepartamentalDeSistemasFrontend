import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Navbar1 from "../Components/Navbar1";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const IniciarSesion = () => {
  return (
    <>
      <Navbar1 />
      <Container>
        <Row>
          <Col className="text-center">
            <h5 className="p-5">Iniciar sesión</h5>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Ingresar correo electrónico o usuario</Form.Label>
                <Form.Control type="email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ingresar contraseña</Form.Label>
                <Form.Control type="password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Ingresar
              </Button>

              <div className="mt-3">
                <NavLink to="/OlvidarContrasenia">
                  Olvidé la contraseña
                </NavLink>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default IniciarSesion;
