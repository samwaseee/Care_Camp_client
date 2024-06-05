import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ACamp = ({camp,index,view}) => {

    

    const {campName,contactInformation,dateTime,description,fees,healthcareProfessional,image,location,participantCount,registrationDeadline,servicesOffered,sponsors,_id} = camp;

    return (
        <div className={`card ${view === 'list' && 'card-side'} bg-base-100 shadow-xl rounded-none ${(view === 'list' && index % 2 === 0) ? 'flex-row-reverse' : ''}`}>
            <figure  className='max-w-[700px]'><img src={image} alt={campName}/></figure>
            <div className="card-body w-96">
                <h2 className="card-title">{campName}</h2>
                <p>{description}</p>
                <p>Camp Lead By: {healthcareProfessional?.name}</p> 
                <p>Event Date: {moment(dateTime).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
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