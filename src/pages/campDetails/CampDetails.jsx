import moment from "moment";
import { Helmet } from "react-helmet";
import { FaCheck, FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";

const CampDetails = () => {

    const camp = useLoaderData();
    const { campName, contactInformation, dateTime, description, fees, healthcareProfessional, image, location, participantCount, registrationDeadline, servicesOffered, sponsors, _id } = camp;


    return (
        <div className='py-20'>
            <div>
                <Helmet>
                    <title>SAM Travles | {campName}</title>
                </Helmet>

                <img src={image} alt={campName} className="mx-auto mt-10 rounded-3xl" />
                <div className="w-[85vw] lg:max-w-[80vw] mx-auto">
                    <div className="flex gap-4 items-center my-10">
                        <div className='badge flex gap-2 p-4 text-xl'> <FaLocationDot></FaLocationDot> {location}</div>
                    </div>

                    <h2 className="card-title font-merri text-4xl">
                        {campName}
                    </h2>
                    <div className="card my-20 bg-base-100 shadow-xl">
                        <div className="card-body font-playfair text-3xl">
                            <h2 className="card-title"></h2>
                            <p>{description}</p>
                        </div>
                    </div>
                    <p className='text-2xl mb-10'>Participant: {participantCount} <br /> Camp Date : {moment(dateTime).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
                    <p><span className="text-xl font-semibold ">Registration fees: {fees} </span> per person</p>
                    <div className="flex flex-wrap justify-between">
                        <div className="flex items-center gap-7 my-5">
                            <div>
                                <div className='flex justify-center items-center gap-2'>

                                </div>

                                <p>Registration Last</p>
                            </div>
                            <div>
                                <div className='flex justify-center items-center gap-2'>

                                </div>
                                <p>{moment(registrationDeadline).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-10">
                        <p>Services Offered</p>
                        <div>
                            {
                                servicesOffered.map((service, index) =>
                                    <div
                                        key={index}
                                        className=''>
                                        <p className="font-bold">{service.name}</p>
                                        <p>{service.description}</p>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                    <div className="flex items-center gap-10 mt-5">

                    </div>



                    <div className="hero bg-base-200 mt-20 rounded-2xl">
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="text-center lg:text-left mx-5">
                                <div className="flex items-center">
                                    <img src='https://demo.egenslab.com/html/tourxpro/demo/assets/images/reviewer/r-sm2.png' className=" rounded-lg mr-5" />
                                    <div>
                                        <p className="font-bold border-b-2">{healthcareProfessional.name}</p>
                                        <p>Specialist</p>
                                    </div>
                                </div>


                            </div>
                            <div className="card max-w-sm shadow-2xl bg-base-100 rounded-4xl">
                                <div className="card-body">
                                    <h1 className="card-title">Camp Doctor</h1>
                                    <p>Experinece :{healthcareProfessional.experience}</p>
                                    <p>Specialist :{healthcareProfessional.specialization}</p>
                                    <p>{healthcareProfessional.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card w-full shadow-2xl bg-base-100 rounded-4xl my-5">
                        <div className="card-body">
                            <p>Sponsors {sponsors.map(sponsor => <span key={sponsor} className="ml-5 btn btn-accent text-xl font-semibold">{sponsor}</span>)}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;