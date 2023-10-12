import './AppHeader.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Col from 'react-bootstrap/';

// import { Navbar, Container, Nav, NavDropdown}
import Image from '../../assets/ospar1logo.png'



export default function AppHeader () {
    return (
        <>

            <Navbar bg="light" data-bs-theme="light" className='d-none d-md-block'>
                <Container className='px-5' fluid>
                <Navbar.Brand className='text-muted'>Follow us on:</Navbar.Brand>
                <Nav className="me-auto navicons">
                    <Nav.Link href="https://www.facebook.com/osparanaque.I"><i className='bx bxl-facebook me-3 fs-2 fw-bolder' ></i></Nav.Link>
                    <Nav.Link href="#"><i className='bx bxl-twitter me-3 fs-2 fw-bolder' ></i></Nav.Link>
                    <Nav.Link href="#"><i className='bx bxl-instagram-alt me-3 fs-2 fw-bolder'></i></Nav.Link>
                </Nav>
                <Nav>
                    <Navbar.Brand><i className='bx bx-location-plus fs-4'></i></Navbar.Brand>
                    <Navbar.Brand className='text-muted'>440 Quirino Avenue La Huerta Parañaque City | Call us (8) 8580-7350</Navbar.Brand>
                </Nav>
                </Container>
            </Navbar>

            <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
                <Container>
                    <img src={Image} width={55} className='d-none d-sm-block'/>
                    <Navbar.Brand href="#home" className='fs-2 fw-bold ms-4'>Ospital ng Parañaque</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto fs-4 fw-bold">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#Services">Services</Nav.Link>
                        <Nav.Link href="#OurDoctors">Our Doctors</Nav.Link>
                        <Nav.Link href="#News&Events">News & Events</Nav.Link>
                        <Nav.Link href="#About">About</Nav.Link>
                        <Nav.Link href="#ContactUs">Contact Us</Nav.Link>
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



            {/* <Navbar bg="info" data-bs-theme="info" expand="lg" className="bg-body-tertiary m-0 p-1">
                <Container fluid>
                    <Navbar.Brand><h5 className='text-muted ms-5'>Follow us on:</h5></Navbar.Brand>
                    <Nav className='me-auto fw-bolder inline-flex' id="navicons">
                            <li>
                                <a href='https://www.facebook.com/osparanaque.I'></a>
                            </li>
                            <li>
                                <a href='#'></a>
                            </li>
                            <li>
                                <a href='#'></a>
                            </li>
                    </Nav>
                    <Nav className='app-banner-logo location'>
                        <a href='#'><i className='bx bx-location-plus fs-4 text-dark me-1'></i></a>
                        <h6 className='fw-bolder pr-3'>440 Quirino Avenue La Huerta Parañaque City | Call us (8) 8580-7350</h6>
                    </Nav>
                </Container>
            </Navbar> */}

            {/* <header className='app-main-header'>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container className='bg-success' fluid>
                        <Navbar.Brand href="#home" className='fs-1 fw-bolder text-white' id='navbrand'>Ospital ng Parañaque</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto fs-2">
                            <Nav.Link href="#home" className='text-white'>Home</Nav.Link>
                            <Nav.Link href="#link" className='text-white'>Services</Nav.Link>
                            <Nav.Link href="#link" className='text-white'>Our Doctors</Nav.Link>
                            <Nav.Link href="#link" className='text-white'>News & Events</Nav.Link>
                            <Nav.Link href="#link" className='text-white'>About</Nav.Link>
                            <Nav.Link href="#link" className='text-white'>Contact Us</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
            </header> */}

        </>

    )
}