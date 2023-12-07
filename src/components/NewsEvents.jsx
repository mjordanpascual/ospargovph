import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from 'react-bootstrap'

import womensmonthv3 from '../assets/womensmonthv3.jpg'
import cochiringv3 from '../assets/cochiringv3.jpg'
import librengopera from '../assets/librengopera.jpg'
// import librengOperasyonv2 from '../../assets/librengOperasyonv2.jpg'

export default function NewsEvents () {

        const newsInfo = [
            { image: womensmonthv3, title: "womensmonthv3", subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
            { image: cochiringv3, title: "cochiringv3", subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
            { image: librengopera, title: "librengopera", subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
            { image: cochiringv3, title: "cochiringv3", subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." }
        ]


    return (
        <>

            {/* <div>
                <h1 className='my-5 text-center'>News & Events</h1>
                <div className='d-flex gap-5 px-5 mb-5'>
                    {newsInfo.map(renderCard)}
                </div>
            </div> */}

        
                <Container id='newsEvents'>
                        <h1 className='heading text-center my-5'>News & Events</h1>
                    <Row className='newsEvents mb-5' >
                        <div className='cards col-sm-12 text-center col-md-6 col-lg-3'>
                            <img 
                                src={womensmonthv3}
                                width={300} 
                                height={180}
                                className='rounded'
                            />
                        </div>
                        <div className='cards  col-sm-12 text-center col-md-6 col-lg-3'>
                            <img src={cochiringv3}
                                width={300} 
                                height={180}
                                className='rounded'

                            />
                        </div>
                        <div className='cards col-sm-12 text-center col-md-6 col-lg-3'>
                            <img src={librengopera}
                                width={300} 
                                height={180}
                                className='rounded'
                            />
                        </div>
                        <div className='cards col-sm-12 text-center col-md-6 col-lg-3'>
                            <img src={cochiringv3}
                                width={300} 
                                height={180}
                                className='rounded'
                            />
                        </div>
                    </Row>
                </Container>
          

        </>

    )
}