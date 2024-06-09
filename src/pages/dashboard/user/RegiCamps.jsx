import { Table } from 'antd';
import { BsFillClipboardCheckFill } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const RegiCamps = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: joinedCamps = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['camps', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/joinedCamps/user?email=${user?.email}`);
            return res.data;
        }
    });

    // console.log(joinedCamps)

    const handleDelete = id => {
        //console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/joinedCamps/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Camp Registration cancelled.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const columns = [
        {
            title: 'Participant Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
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
            render: (text) => {
                return !isNaN(text) ? `$${text}` : 'Free';
            },
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Emergency Contact',
            dataIndex: 'emergencyContact',
            sorter: (a, b) => a.emergencyContact.localeCompare(b.emergencyContact),
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
            render: (text, record) => (
                <div>
                    {
                        text === 'Paid' || record.campFees === 'free' ?
                            <p className='badge badge-success text-neutral-50 p-3'>Paid</p>
                            :
                            <Link to={`/dashboard/payment/${record.key}`}
                                className="tooltip" data-tip="Pay Now">
                                <button
                                    style={{ color: 'red' }}
                                    className='btn'
                                >
                                    Pay
                                </button>
                            </Link>
                            
                    }
                </div>
            ),
        },
        {
            title: 'Confirmation Status',
            dataIndex: 'confirmationStatus',
            sorter: (a, b) => a.confirmationStatus.localeCompare(b.confirmationStatus),
            render: (text) => (
                <span className={`icon ${text === 'Confirmed' ? 'icon-confirmed' : 'icon-pending'}`}>
                    {text === 'Confirmed' ? <BsFillClipboardCheckFill size={25} /> : <MdOutlinePendingActions size={25} />}
                </span>
            ),
        },
        {
            title: 'Feedback',
            dataIndex: 'feedback',
            render: (text, record) => (
                <Link to={`/dashboard/feedback/${record.campName}`} className={`${text === 'Not Confirmed' && 'tooltip'}`} data-tip="Pay and wait for organizer approval">
                    <button className={`icon btn ${text === 'Not Confirmed' && 'btn-disabled'}`}>
                        Give Feedback
                    </button>
                </Link>
            ),
        },
        {
            title: 'Cancel',
            dataIndex: 'action',
            render: (_, record) => (
                <button className="btn btn-ghost p-1"
                    onClick={() => handleDelete(record.key)}> <RiDeleteBin2Fill size={30} color='red' /> </button>
            ),
        }
    ];


    const data = joinedCamps.map((camp) => ({
        key: camp._id,
        name: camp.userName,
        campName: camp.campName,
        campFees: camp.fees === 'free' ? 'Free' : parseInt(camp.fees),
        paymentStatus: camp.paymentStatus ? 'Paid' : 'Unpaid',
        confirmationStatus: camp.confirmationStatus ? camp.confirmationStatus : 'Not Confirmed',
        feedback: camp.confirmationStatus ? camp.confirmationStatus : 'Not Confirmed',
        age: camp.age,
        phoneNumber: camp.phoneNumber,
        gender: camp.gender,
        email: camp.email,
        emergencyContact: camp.emergencyContact
    }));

    return (
        <div>
            <h2 className='text-3xl font-taj font-bold text-center my-5'>Registered Camps</h2>
            {
                loading && <div className='flex justify-center'><span className="loading loading-bars loading-lg scale-150"></span></div>
            }
            <Table
                dataSource={data}
                columns={columns}
                // onChange={(pagination, filters, sorter, extra) => {
                //     // console.log('params', pagination, filters, sorter, extra);
                // }}
                sortIcon={<span className="icon">↑↓</span>}
            />

        </div>
    );
};

export default RegiCamps;
