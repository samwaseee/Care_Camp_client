import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCamps = (sort) => {
    const axiosPublic = useAxiosPublic();
    
    const { data: camps = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['camps', sort], 
        queryFn: async () => {
            const res = await axiosPublic.get('/camps', {
                params: { sort }
            });
            return res.data;
        }
    });

    return [camps, loading, refetch];
};

export default useCamps;
