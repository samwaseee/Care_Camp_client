import PropTypes from 'prop-types';
import { FaPeopleGroup } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ACamp = ({ camp, index, view }) => {



    const { campName, dateTime, description, fees, healthcareProfessional, image, location, participantCount, registrationDeadline, servicesOffered, _id } = camp;

    return (
        <div className={`card m-5 md:m-0 ${view === 'list' && 'card-side'} bg-second shadow-xl rounded-none ${(view === 'list' && index % 2 === 0) ? 'flex-row-reverse' : ''}`}>
            <figure className='max-w-[700px] w-3/4 md:w-full mx-auto'><img src={image} alt={campName} /></figure>
            <div className="card-body w-96">
                <h2 className="card-title font-bold font-taj text-xs lg:text-4xl text-neutral-50 p-2 bg-neutral-800">{campName}</h2>
                <p className='text-[10px] lg:text-lg'>{description}</p>

                <div className="flex flex-wrap justify-between gap-2 items-center">
                    <p className='text-[10px] lg:text-lg'>{location}</p>
                    <p className='text-[10px] lg:text-lg badge'><FaPeopleGroup /> {participantCount}</p>
                    <p className='text-[10px] lg:text-lg'>Services Offered</p>
                    <div>
                        {
                            servicesOffered.map((service, index) =>
                                <div
                                    key={index}
                                    className=''>
                                    <p className="font-bold text-[10px] lg:text-lg">{service.name}</p>
                                </div>
                            )
                        }
                    </div>

                </div>
                <p className='text-[10px] lg:text-lg'>Camp Lead By: {healthcareProfessional?.name}</p>
                <p className='text-[10px] lg:text-lg'>Event Date: {dateTime}</p>
                <div className="card-actions justify-end">
                    <Link to={`/camps/${_id}`} 
                    onClick={() => window.reload()}
                    ><button
                        className="btn btn-outline text-blood">Join Camp</button></Link>
                </div>
            </div>
        </div>
    );
};

ACamp.propTypes = {
    camp: PropTypes.object,
    index: PropTypes.number
};

export default ACamp;