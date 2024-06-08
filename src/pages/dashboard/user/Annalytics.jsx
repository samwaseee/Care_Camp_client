import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Annalytics = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: joinedCamps = [], isLoading, } = useQuery({
        queryKey: ['camps', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/joinedCamps/user?email=${user?.email}`);
            return res.data;
        }
    });

    const formattedData = joinedCamps.map(camp => {
        let fees = camp.fees;

        if (typeof fees === 'string') {
            fees = fees.replace(/[^\d.-]/g, '');
        }

        return {
            ...camp,
            fees: parseFloat(fees)
        };
    });

    // eslint-disable-next-line react/prop-types
    const CustomBarChart = ({ data }) => {
        return (
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="campName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="fees" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-center text-3xl font-taj font-bold">Camps Joined</h1>
            <CustomBarChart data={formattedData} />
        </div>
    );
};

export default Annalytics;
