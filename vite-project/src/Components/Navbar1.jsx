import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbar1() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Consejo Departamental</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" className='fs-4'>Inicio</Nav.Link>
            <Nav.Link href="#features" className='fs-4'>Noticias</Nav.Link>
            <Nav.Link href="/IniciarSesion" className='fs-4'>Iniciar sesión</Nav.Link>
            <Nav.Link href="/Registrarse" className='fs-4'>Registrarse</Nav.Link>
            <Nav.Link href="/Drive" className='fs-4'>Drive</Nav.Link>
            <Nav.Link href="/Reportes" className='fs-4'>Reportes</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

      </>
  );
}

export default Navbar1;