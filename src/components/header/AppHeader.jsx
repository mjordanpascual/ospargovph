import './AppHeader.css'
import Ospar1Logo from '../../assets/ospar1logo.png'

export default function AppHeader () {
    return (

        <>
            <header className='app-main-banner'>
                <div className='app-banner'>
                    <div className='app-banner-logo'>
                        <h5>Follow us on:</h5>
                        <a href='#'><i className='bx bxl-facebook' ></i></a>
                        <a href='#'><i className='bx bxl-twitter' ></i></a>
                        <a href='#'><i className='bx bxl-instagram-alt' ></i></a>
                    </div>
                    <div className='app-banner-logo'>
                        <a href='#'><i className='bx bx-location-plus'></i></a>
                        <h5 className='fw-bolder pr-3'>440 Quirino Avenue La Huerta Parañaque City | Call us (8) 8580-7350</h5>
                    </div>
                </div>
            </header>

            <header className='app-main'>
                <div className='app-main-logo'>
                    <img src={Ospar1Logo} alt='Ospar1 Logo' className='img-fluid responsive' />
                    <h2 className='mx-4 fs-1 app-main-brand'><a href='#'>Ospital ng Parañaque</a></h2>
                </div>
                <div className='app-main-link'>
                    <ul>
                        <li><a href='#'>Home</a></li>
                        <li><a href='#'>Services</a></li>
                        <li><a href='#'>Our Doctors</a></li>
                        <li><a href='#'>News & Events</a></li>
                        <li><a href='#'>About</a></li>
                        <li><a href='#'>Contact Us</a></li>
                    </ul>
                </div>
            </header>
        </>

    )
}