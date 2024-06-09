import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Table } from 'antd';
import moment from "moment/moment";

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: payments = [], isLoading: loading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })


    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Camp Name',
            dataIndex: 'campName',
            sorter: (a, b) => a.campName.localeCompare(b.campName),
        },
        {
            title: 'Camp Fees',
            dataIndex: 'campFees',
            sorter: (a, b) => a.campFees - b.campFees,
            render: (text) => `$${text}`,
        },
        {
            title: 'Transaction Id',
            dataIndex: 'transactionId',
            sorter: (a, b) => a.transactionId - b.transactionId,
        },
        {
            title: 'date',
            dataIndex: 'date',
            sorter: (a, b) => a.date.localeCompare(b.date),
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus'
        }
    ];


    const data = payments.map((camp) => ({
        key: camp._id,
        campName: camp.campName,
        campFees: parseInt(camp.price),
        paymentStatus:'Paid',
        transactionId: camp.transactionId,
        date: moment(camp.date).format('MMMM Do YYYY, h:mm:ss a'),
        email: camp.email,
    }));

    return (
        <div>
            <h2 className='text-3xl font-taj font-bold text-center my-5'><span className="font-medium">Payment History of</span> {user?.displayName}</h2>
            {
                loading && <div className='flex justify-center'><span className="loading loading-bars loading-lg scale-150"></span></div>
            }
            <Table
                dataSource={data}
                columns={columns}
                onChange={(pagination, filters, sorter, extra) => {
                    console.log('params', pagination, filters, sorter, extra);
                }}
                sortIcon={<span className="icon">↑↓</span>}
            />
        </div>
    );
};

export default PaymentHistory;