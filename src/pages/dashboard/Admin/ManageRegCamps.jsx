import { Table } from 'antd';
import { BsFillClipboardCheckFill } from 'react-icons/bs';
import { MdOutlinePendingActions} from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';

const ManageRegCamps = () => {
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
            render: (text) => (
                <span className={`icon ${text === 'Confirmed' ? 'icon-confirmed' : 'icon-pending'}`}>
                    {text === 'Confirmed' ? <BsFillClipboardCheckFill size={25} /> : <MdOutlinePendingActions size={25} />}
                </span>
            ),
        },
        {
            title: '',
            dataIndex: 'action',
            render: () => (
                <button className="cancel-button"> <RiDeleteBin2Fill size={30} color='red'/> </button>
            ),
        },
    ];

    const data = [
        { key: '1', name: 'John Doe', campName: 'Summer Camp', campFees: 200, paymentStatus: 'Paid', confirmationStatus: 'Confirmed' },
        { key: '2', name: 'John Doe', campName: 'Summer Camp', campFees: 20, paymentStatus: 'not Paid', confirmationStatus: 'Confirmed' },
        { key: '3', name: 'John Doe', campName: 'Summer Camp', campFees: 500, paymentStatus: 'Paid', confirmationStatus: 'pending' },
        { key: '4', name: 'John Doe', campName: 'Summer Camp', campFees: 1200, paymentStatus: 'Paid', confirmationStatus: 'Confirmed' },
    ];

    return (
        <div>
            <h2 className='text-3xl font-taj font-bold text-center my-5'>Registered Camps</h2>
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
