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
                className='h-[40vw]'
            >
                <div>
                    <img src="https://www.ifrc.org/sites/default/files/styles/hero_image_desktop_1280_x_600_/public/2021-05/p-FJI0614%201280x500.jpg?itok=y3WEJrXb" alt="Image 0" className='w-[100vw] h-1/2' />
                    <div className='max-w-2xl -mt-80 mx-auto bg-second animate__animated animate__backInUp'>
                        <div className="card">
                            <Fade direction='down'>
                                <div className="card-body">
                                    <p>The IFRC is committed to supporting humanitarian action that is as local as possible, as international as necessary. Our 191 National Red Cross and Red Crescent Societies are the lead actors in preparing for, responding to and helping communities recover from emergencies. In times of increased need, our global disaster response system effectively supports and coordinates their lifesaving work.</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn rounded-none">Read story...</button>
                                    </div>
                                </div>
                            </Fade>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="https://www.ifrc.org/sites/default/files/styles/featured_doc_thumbnail_desktop_648_x_453_/public/2021-07/p-BGD2651_jpg%201280x853.jpg?itok=euAsjVEH" alt="Image 1" className='w-[100vw]' />
                    <div className='max-w-2xl grid absolute bottom-0 left-1/4 bg-second animate__animated animate__backInUp'>
                        <Fade direction='up'>
                            <div className="card">
                                <div className="card-body">
                                    <p>IFRC’s Health and Care Framework sets out our contribution to healthier, more resilient communities and individuals. It presents the collective priorities and programming modalities that define our work in health and care. It illustrates a pathway for National Societies’ engagement with public health authorities in their auxiliary role around health and care. And it links the work of the IFRC in health and care to the global agenda of the Sustainable Development Goals (SDGs).</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn rounded-none">Read story...</button>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
                <div>
                    <img src="https://www.ifrc.org/sites/default/files/styles/hero_image_desktop_1280_x_600_/public/2021-05/p-syr1356%201280x500.jpg?itok=JzyCm6l9" alt="Image 2" className='w-[100vw]' />
                    <div className='max-w-2xl grid absolute bottom-0 left-1/4 bg-second animate__animated animate__backInUp'>
                        <Fade direction='up'>
                            <div className="card">
                                <div className="card-body">
                                    <p>The IFRC, with the support of partners, works at the community, national and global levels to reduce people’s risk of contracting non-communicable diseases. Our approach promotes healthy choices and behaviours at all stages of a person’s life.</p>
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