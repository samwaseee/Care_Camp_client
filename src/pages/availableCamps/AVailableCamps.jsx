import useCamps from "../../hooks/useCamps";
import ACamp from "./ACamp";

const AVailableCamps = () => {

    const [camps, loading] = useCamps();

    return (
        <div className="py-20">
            {
                camps.map((camp,index) => <ACamp
                    key={camp._id}
                    index={index}
                    camp={camp}></ACamp>)
            }
        </div>
    );
};

export default AVailableCamps;