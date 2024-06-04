import PropTypes from 'prop-types';

const ACamp = ({camp,index}) => {

    const {campName,contactInformation,dateTime,description,fees,healthcareProfessional,image,location,participantCount,registrationDeadline,servicesOffered,sponsors,_id} = camp;

    return (
        <div className={`card card-side bg-base-100 shadow-xl my-8 rounded-none ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <figure  className='max-w-[700px]'><img src={image} alt={campName}/></figure>
            <div className="card-body w-96">
                <h2 className="card-title">{campName}</h2>
                <p>{description}</p> 
                <p>Event Date: {dateTime}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-outline text-blood">Join Camp</button>
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