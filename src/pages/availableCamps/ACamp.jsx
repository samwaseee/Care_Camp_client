import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ACamp = ({ camp, index, view }) => {



    const { campName, dateTime, description, fees, healthcareProfessional, image, location, participantCount, registrationDeadline, servicesOffered, _id } = camp;

    return (
        <div className={`card ${view === 'list' && 'card-side'} bg-second shadow-xl rounded-none ${(view === 'list' && index % 2 === 0) ? 'flex-row-reverse' : ''}`}>
            <figure className='max-w-[700px]'><img src={image} alt={campName} /></figure>
            <div className="card-body w-96">
                <h2 className="card-title font-bold font-taj text-4xl text-neutral-50 p-2 bg-neutral-800">{campName}</h2>
                <p>{description}</p>

                <div className="flex items-center">
                    <p>{location}</p>
                    <p>{participantCount}</p>
                    <p className='ml-32'>Services Offered</p>
                    <div>
                        {
                            servicesOffered.map((service, index) =>
                                <div
                                    key={index}
                                    className=''>
                                    <p className="font-bold">{service.name}</p>
                                </div>
                            )
                        }
                    </div>

                </div>
                <p>Camp Lead By: {healthcareProfessional?.name}</p>
                <p>Event Date: {dateTime}</p>
                <div className="card-actions justify-end">
                    <Link to={`/camps/${_id}`}><button className="btn btn-outline text-blood">Join Camp</button></Link>
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