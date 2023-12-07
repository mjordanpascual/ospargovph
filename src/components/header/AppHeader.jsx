import './AppHeader.css'
import './AppHeader.jsx'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Navbar, Container, Nav, NavDropdown}
import Image from '../../assets/ospar1logo.png'
import { Link } from 'react-router-dom';



export default function AppHeader () {
    return (
        <>

            {/* <Navbar bg="light" data-bs-theme="light" className='d-none d-md-block m-0 p-0'>
                <Container className='px-5' fluid>
                <Navbar.Brand className='text-muted'>Follow us on:</Navbar.Brand>
                <Nav className="me-auto navicons">
                    <Nav.Link href="https://www.facebook.com/osparanaque.I" target='_blank'><i className='bx bxl-facebook me-3 fs-2 fw-bolder' ></i></Nav.Link>
                    <Nav.Link href="#"><i className='bx bxl-twitter me-3 fs-2 fw-bolder' ></i></Nav.Link>
                    <Nav.Link href="#"><i className='bx bxl-instagram-alt me-3 fs-2 fw-bolder'></i></Nav.Link>
                </Nav>
                <Nav>
                    <Navbar.Brand><i className='bx bx-location-plus fs-4'></i></Navbar.Brand>
                    <Navbar.Brand className='text-muted'>440 Quirino Avenue La Huerta Parañaque City | Call us (8) 8580-7350</Navbar.Brand>
                </Nav>
                </Container>
            </Navbar> */}

            <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary sticky-top">
                <Container>
                    <img src={Image} width={55} className='d-none d-sm-block'/>
                    <Navbar.Brand as={Link} to="/" className='fs-2 fw-bold ms-4 main-app-title'>Ospital ng Parañaque</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto fs-4 fw-bold" id='main-app-navbar'>
                            <Nav.Link as={Link} to="/" className='me-3'>Home</Nav.Link>
                            {/* <Nav.Link href="#services" className='me-3'>Services</Nav.Link> */}
                            <NavDropdown title='Services' className='me-3' id='basic-nav-dropdown'>
                                <NavDropdown.Item as={Link} to='/services'>Online Services</NavDropdown.Item>
                                {/* <NavDropdown>Online Services</NavDropdown> */}
                                {/* <NavDropdown.Item href='/dentist'>DENTIST</NavDropdown.Item>
                                <NavDropdown.Item href='/ent'>ENT</NavDropdown.Item>
                                <NavDropdown.Item href='/orthosurgeon'>ORTHO-SURGEON</NavDropdown.Item>
                                <NavDropdown.Item href='/gasthro'>GASTROENTEROLOGY</NavDropdown.Item>
                                <NavDropdown.Item href='/pedia'>PEDIATRICIAN</NavDropdown.Item>
                                <NavDropdown.Item href='/obgyne'>OB-GYNECOLOGIST</NavDropdown.Item>
                                <NavDropdown.Item href='/adultnephro'>ADULT-NEPHRO</NavDropdown.Item>
                                <NavDropdown.Item href='/cardio'>CARDIOLOGIST</NavDropdown.Item>
                                <NavDropdown.Item href='/surgeon'>SURGEON</NavDropdown.Item>
                                <NavDropdown.Item href='/derma'>DERMATOLOGIST</NavDropdown.Item>
                                <NavDropdown.Item href='/neuro'>NEUROLOGIST</NavDropdown.Item>
                                <NavDropdown.Item href='/pulmo'>PULMONOLOGIST</NavDropdown.Item>
                                <NavDropdown.Item href='/endo'>ENDOCRINOLOGIST</NavDropdown.Item>
                                <NavDropdown.Item href='/nuclear'>NUCLEAR MEDICINE</NavDropdown.Item>
                                <NavDropdown.Item href='/urologist'>UROLOGIST</NavDropdown.Item>
                                <NavDropdown.Item href='/internalmed'>INTERNAL MEDICINE</NavDropdown.Item>
                                <NavDropdown.Item href='/optha'>OPTHALMOLOGIST</NavDropdown.Item>
                                <NavDropdown.Item href='/pedianephro'>PEDIA-NEPHRO</NavDropdown.Item>
                                <NavDropdown.Item href='/rehab'>REHAB. MEDICINE</NavDropdown.Item>
                                <NavDropdown.Item href='/orthosurgeon'>ORTHO-SURGEON</NavDropdown.Item>
                                <NavDropdown.Item href='/pshychiatrist'>PSYCHIATRIST</NavDropdown.Item>
                                <NavDropdown.Item href='/vascularsurgeon'>VASCULAR SURGEON</NavDropdown.Item>
                                <NavDropdown.Item href='/rheumatologist'>RHEUMATOLOGIST</NavDropdown.Item>
                                <NavDropdown.Item href='/iminfectious'>IM-INFECTIOUS DISEASE</NavDropdown.Item>
                                <NavDropdown.Item href='/pediapulmo'>PEDIA-PULMONOLOGIST</NavDropdown.Item>
                                <NavDropdown.Item href='/hematologist'>HEMATOLOGIST</NavDropdown.Item> */}
                            </NavDropdown>
                            {/* <Nav.Link href="#ourDoctors" className='me-3'>Our Doctors</Nav.Link> */}
                            <NavDropdown title='Our Doctors' className='me-3' id='basic-nav-dropdown'>
                                <NavDropdown.Item as={Link} to='/doctors'>Find Doctor</NavDropdown.Item>
                                {/* <NavDropdown.Item>Actions</NavDropdown.Item>
                                <NavDropdown.Item>Actionss</NavDropdown.Item>
                                <NavDropdown.Item>Actionsss</NavDropdown.Item>
                                <NavDropdown.Item>Actionssss</NavDropdown.Item> */}
                            </NavDropdown>
                            <Nav.Link as={Link} to="/newsEvents" className='me-3'>News & Events</Nav.Link>
                            <Nav.Link as={Link} to="/about" className='me-3'>About</Nav.Link>
                            <Nav.Link as={Link} to="/contact" className='me-3'>Contact Us</Nav.Link>
                            <NavDropdown title="Sign In" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>

    )
}