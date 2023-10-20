import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col, Card, Button} from 'react-bootstrap'
import './AppMain.css'
import './AppMain'

import womensmonthv3 from '../../assets/womensmonthv3.jpg'
import cochiringv3 from '../../assets/cochiringv3.jpg'
import librengopera from '../../assets/librengopera.jpg'
// import librengOperasyonv2 from '../../assets/librengOperasyonv2.jpg'

export default function AppMain () {
    return (
        <>

            <Container>
                <Row>
                    <Col>    
                        <section className='w-75 p-0 mx-auto'>
                            <Carousel data-bs-theme="dark" fade>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={cochiringv3}
                                    alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={librengopera}
                                    alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={womensmonthv3}
                                    alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </section> 
                    </Col>
                </Row>
            </Container>

            <section className='pt-3 mb-5 bg-light text-dark justify-content-center align-items-center' id='news&events'>
                    <h1 className='d-flex justify-content-center align-items-center pt-4'>News & Events</h1>
                    <div className='d-flex'>
                        <Card className='col w-25 p-1 m-1'>
                            <Card.Img src={librengopera} id='cards'/>
                            <Card.Body>
                                <Card.Title>Libreng Opera</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button className='w-100' href='https://www.facebook.com/photo/?fbid=825404892704726&set=a.817902420121640' target='_blank'>Read Article</Button>
                            </Card.Body>
                        </Card>
                        <Card className='col w-25 p-1 m-1'>
                            <Card.Img src={cochiringv3} id='cards'/>
                            <Card.Body>
                                <Card.Title>Job Hiring</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button className='w-100'>Go somewhere</Button>
                            </Card.Body>
                        </Card>
                        <Card className='col w-25 p-1 m-1'>
                            <Card.Img src={womensmonthv3} id='cards'/>
                            <Card.Body>
                                <Card.Title>Women's Month</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button className='w-100'>Go somewhere</Button>
                            </Card.Body>
                        </Card>
                        <Card className='col w-25 p-1 m-1'>
                            <Card.Img src={cochiringv3} id='cards'/>
                            <Card.Body>
                                <Card.Title>Job Hiring</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button className='w-100'>Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
            </section>            

        </>

    )
}