import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Camp from "./Camp";
import { Link } from "react-router-dom";

const Camps = () => {

    const axiosPublic = useAxiosPublic();
    const [camps, setCamps] = useState([]);

    useEffect(() => {
        axiosPublic.get('/camps')
            .then(response => {
                setCamps(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [axiosPublic]);

    return (
        <>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
                {
                    camps.slice(0, 6).map(camp => <Camp
                        key={camp._id}
                        camp={camp}></Camp>)
                }
            </div>
            <Link className="btn btn-outline ml-[46vw] rounded-none text-blood">See all Camps</Link>
        </>
    );
};

export default Camps;