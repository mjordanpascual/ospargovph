import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from 'react-bootstrap'
import './AppMain.css'
import './AppMain'
import NewsEvents from '../../components/NewsEvents'
import About from '../../components/About'
import Contact from '../../components/Contact'

import womensmonthv3 from '../../assets/womensmonthv3.jpg'
import cochiringv3 from '../../assets/cochiringv3.jpg'
import librengopera from '../../assets/librengopera.jpg'
// import librengOperasyonv2 from '../../assets/librengOperasyonv2.jpg'

export default function AppMain () {

        const newsInfo = [
            { image: womensmonthv3, title: "womensmonthv3", subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
            { image: cochiringv3, title: "cochiringv3", subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
            { image: librengopera, title: "librengopera", subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
            { image: cochiringv3, title: "cochiringv3", subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." }
        ]


    return (
        <>

            <Container>
                <Row>
                    <Col>    
                        <section className='w-75 p-0 mx-auto' style={{height: '50px;'}} id='main-banner'>
                            <Carousel data-bs-theme="dark" fade style={{height: '50vh;'}}>
                                <Carousel.Item>
                                    <img
                                    width={400} height={500}
                                    className="d-block w-100"
                                    src={librengopera}
                                    alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    width={400} height={500}
                                    className="d-block w-100"
                                    src={womensmonthv3}
                                    alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    width={400} height={500}
                                    className="d-block w-100"
                                    src={cochiringv3}
                                    alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </section> 
                    </Col>
                </Row>
            </Container>

           {/* <NewsEvents /> */}
           <About />
           <Contact />

        </>

    )
}