import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Camps = () => {

    const axiosPublic = useAxiosPublic();

    const camps =  axiosPublic.get('/camps')
        
    return (
        <div className="my-20">
            {
                
            }
        </div>
    );
};

export default Camps;