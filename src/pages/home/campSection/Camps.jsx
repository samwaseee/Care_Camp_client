import Camp from "./Camp";
import { Link } from "react-router-dom";
import useCamps from "../../../hooks/useCamps";


const Camps = () => {

    const [camps, loading] = useCamps("most-registered");
    const times = new Array(6).fill(null);

    return (
        <>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
                {
                    loading ?
                        times.map((_, index) => {
                            return (
                                <div key={index} className="flex flex-col gap-4 w-52">
                                    <div className="skeleton h-32 w-full"></div>
                                    <div className="skeleton h-4 w-28"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                </div>
                            )
                        })
                        :

                        camps.slice(0, 6).map(camp => <Camp
                            key={camp._id}
                            camp={camp}></Camp>)
                }
            </div>
            <Link to={'/camps'} onClick={() => window.reload()} className="btn btn-outline ml-[46vw] rounded-none text-blood">See all Camps</Link>
        </>
    );
};

export default Camps;