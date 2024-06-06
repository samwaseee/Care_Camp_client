import moment from "moment";
import { Helmet } from "react-helmet";
import { FaHouseMedicalFlag, FaLocationDot } from "react-icons/fa6";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const CampDetails = () => {

    const camp = useLoaderData();
    const { _id, campName, contactInformation, dateTime, description, fees, healthcareProfessional, image, location, participantCount, registrationDeadline, servicesOffered, sponsors } = camp;
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [hasJoined, setHasJoined] = useState(false);

    const { refetch, data: joinedCamps = [] } = useQuery({
        queryKey: ['joinedCamp', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/joinedCamps?email=${user.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (joinedCamps.some(joinedCamp => joinedCamp.campId === _id)) {
            setHasJoined(true);
        } else {
            setHasJoined(false);
        }
    }, [joinedCamps, _id]);

    const handleJoinCamp = () => {
        if (user && user.email) {
            Swal.fire({
                title: 'Enter your age',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Next',
                showLoaderOnConfirm: true,
                preConfirm: (age) => {
                    return new Promise((resolve) => {
                        resolve({ age });
                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const { age } = result.value;
                    Swal.fire({
                        title: 'Enter your phone number',
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Next',
                        showLoaderOnConfirm: true,
                        preConfirm: (phoneNumber) => {
                            return new Promise((resolve) => {
                                resolve({ age, phoneNumber });
                            });
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const { age, phoneNumber } = result.value;
                            Swal.fire({
                                title: 'Enter your gender',
                                input: 'text',
                                inputAttributes: {
                                    autocapitalize: 'off'
                                },
                                showCancelButton: true,
                                confirmButtonText: 'Next',
                                showLoaderOnConfirm: true,
                                preConfirm: (gender) => {
                                    return new Promise((resolve) => {
                                        resolve({ age, phoneNumber, gender });
                                    });
                                }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    const { age, phoneNumber, gender } = result.value;
                                    Swal.fire({
                                        title: 'Enter your emergency contact',
                                        input: 'text',
                                        inputAttributes: {
                                            autocapitalize: 'off'
                                        },
                                        showCancelButton: true,
                                        confirmButtonText: 'Join Camp',
                                        showLoaderOnConfirm: true,
                                        preConfirm: (emergencyContact) => {
                                            return new Promise((resolve) => {
                                                resolve({ age, phoneNumber, gender, emergencyContact });
                                            });
                                        }
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            const { age, phoneNumber, gender, emergencyContact } = result.value;
                                            const joinedCampItem = {
                                                campId: _id,
                                                email: user.email,
                                                userName: user.displayName,
                                                campName,
                                                image,
                                                fees,
                                                age,
                                                phoneNumber,
                                                gender,
                                                emergencyContact
                                            };
                                            axiosSecure.post('/joinedCamps', joinedCampItem)
                                                .then(res => {
                                                    console.log(res.data);
                                                    if (res.data.insertedId) {
                                                        Swal.fire({
                                                            position: "top-end",
                                                            icon: "success",
                                                            title: `${campName} added to your joined camps`,
                                                            showConfirmButton: false,
                                                            timer: 1500
                                                        });
                                                        refetch();
                                                    }
                                                })
                                                .catch(error => {
                                                    console.error('Error joining camp:', error);
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'An error occurred while joining the camp. Please try again later.',
                                                    });
                                                });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the joined camps?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };



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

                    <div className="flex">
                        <h2 className="card-title font-merri text-4xl flex-1">
                            {campName}
                        </h2>
                        <button onClick={handleJoinCamp}
                            className="btn btn-outline "
                            disabled={hasJoined}
                        >
                            {hasJoined ? 'Already Joined' : <div className=" text-blood text-2xl flex"><FaHouseMedicalFlag /> Join Camp </div> }
                        </button>
                    </div>
                    <div className="card my-20 bg-base-100 shadow-xl">
                        <div className="card-body font-playfair text-3xl">
                            <h2 className="card-title"></h2>
                            <p>{description}</p>
                        </div>
                    </div>
                    <p className='text-2xl mb-10'>Participant: {participantCount} <br /> Camp Date : {dateTime}</p>
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
        </div >
    );
};

export default CampDetails;