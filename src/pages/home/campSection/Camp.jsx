import PropTypes from 'prop-types';

const Camp = ({camp}) => {
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl mx-auto mb-10">
            <figure><img src={camp.image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{camp.campName}</h2>
                <p>{camp.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn bg-second text-blood">Join camp</button>
                </div>
            </div>
        </div>
    );
};

Camp.propTypes = {
    camp: PropTypes.object,
  };

export default Camp;