import { Table } from 'antd';
import { BsFillClipboardCheckFill } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const ManageRegCamps = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: joinedCamps = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['camps', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/joinedCamps?organizerMail=${user?.email}`);
            return res.data;
        }
    });

    // console.log(joinedCamps)

    const handleConfirmation = async (camp) => {
        // console.log(camp)
        try {
            const res = await axiosSecure.patch(`/joinedCamps/${camp}`, {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${camp.userName} is Confirmed!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error confirming camp:', error);
        }
    };

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
                                text: "Your file has been deleted.",
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
            render: (text) => `$${text}`,
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
            render: (text) => (
                <span style={{ color: text === 'Paid' ? 'green' : 'red' }}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Confirmation Status',
            dataIndex: 'confirmationStatus',
            sorter: (a, b) => a.confirmationStatus.localeCompare(b.confirmationStatus),
            render: (text, record) => (
                <span className={`icon ${text === 'Confirmed' ? 'icon-confirmed' : 'icon-pending'}`}>
                    {text === 'Confirmed' ? <BsFillClipboardCheckFill size={25} /> : <button onClick={() => handleConfirmation(record.key)} className='btn btn-ghost p-1'><MdOutlinePendingActions size={25} /></button>}
                </span>
            ),
        },
        {
            title: '',
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
        campFees: parseInt(camp.fees.split(' ')[0]),
        paymentStatus: camp.paymentStatus ? camp.paymentStatus : 'Unpaid',
        confirmationStatus: camp.confirmationStatus ? camp.confirmationStatus : 'Not Confirmed',
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
                onChange={(pagination, filters, sorter, extra) => {
                    console.log('params', pagination, filters, sorter, extra);
                }}
                sortIcon={<span className="icon">↑↓</span>}
            />

        </div>
    );
};

export default ManageRegCamps;
