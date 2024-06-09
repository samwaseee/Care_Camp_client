import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'animate.css';
import { Fade } from 'react-awesome-reveal';
import Camps from './campSection/Camps';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Home = () => {
    return (
        <>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={true}
                interval={3000}
                className='h-[100vw] md:h-[40vw]'
            >
                <div className=''>
                    <img src="https://www.ifrc.org/sites/default/files/styles/hero_image_desktop_1280_x_600_/public/2021-05/p-FJI0614%201280x500.jpg?itok=y3WEJrXb" alt="Image 0" className='w-[100vw] h-screen lg:h-1/2' />
                    <div className='max-w-2xl grid absolute -bottom-12 lg:bottom-0 lg:left-1/4  animate__animated animate__backInUp'>
                        <div className="card bg-second scale-75 lg:scale-100 rounded-none">
                            <Fade direction='up'>
                                <div className="card-body">
                                    <p>An organization of Care Camp volunteers stood out as a ray of hope among the COVID-19 pandemic on a global scale. A response camp was established, together with testing facilities, safety supplies, and community education regarding preventive measures. They also provided people in need with crucial services and psychological support. Their unceasing efforts helped to strengthen relationships among neighbors and drastically lower the infection rate in their community during these trying times. Their success serves as an example of the strength of a strong sense of community, resiliency, and teamwork in the face of a major international emergency.</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn rounded-none">Read story...</button>
                                    </div>
                                </div>
                            </Fade>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="https://www.ifrc.org/sites/default/files/styles/featured_doc_thumbnail_desktop_648_x_453_/public/2021-07/p-BGD2651_jpg%201280x853.jpg?itok=euAsjVEH" alt="Image 1" className='w-[100vw] h-screen ' />
                    <div className='max-w-2xl grid absolute bottom-0 left-1/4 bg-second animate__animated animate__backInUp'>
                        <Fade direction='up'>
                            <div className="card">
                                <div className="card-body">
                                    <p>Care Camp’s Health and Care Framework” emerged as a beacon of hope in a world grappling with health disparities. The framework, with its collective priorities and programming modalities, revolutionized the approach to health and care. By engaging with public health authorities and aligning with the Sustainable Development Goals (SDGs), Care Camp transformed communities into healthier, more resilient havens. Their success story is a testament to their commitment to global health and their unwavering dedication to making the world a healthier place.</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn rounded-none">Read story...</button>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
                <div>
                    <img src="https://www.ifrc.org/sites/default/files/styles/hero_image_desktop_1280_x_600_/public/2021-05/p-syr1356%201280x500.jpg?itok=JzyCm6l9" alt="Image 2" className='w-[100vw] h-screen ' />
                    <div className='max-w-2xl grid absolute bottom-0 left-1/4 bg-second animate__animated animate__backInUp'>
                        <Fade direction='up'>
                            <div className="card">
                                <div className="card-body">
                                    <p>With the support of its partners, Care Camp launched a comprehensive program aimed at reducing the risk of non-communicable diseases. They started by educating the community about the importance of a balanced diet, regular exercise, and routine health check-ups. They organized workshops, fitness camps, and health fairs, promoting healthy behaviors at all stages of life.</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn rounded-none">Read story...</button>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </AutoplaySlider>
            <Camps></Camps>
        </>
    );
};

export default Home;