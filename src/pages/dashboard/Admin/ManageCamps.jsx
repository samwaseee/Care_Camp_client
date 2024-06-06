import { Button, Form, Input, Modal, Table } from "antd";
import useAuth from "../../../hooks/useAuth";
import useCamps from "../../../hooks/useCamps";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const ManageCamps = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [camps, loading, refetch] = useCamps("camp-name-desc", user?.email)

    // console.log(camps)

    const [editingCamp, setEditingCamp] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    const handleEdit = (record) => {
        setEditingCamp(record);
        // console.log(camp)
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingCamp(null);
    };

    const handleUpdate = async () => {
        try {
            const updatedFields = {
                campName: editingCamp.campName,
                description: editingCamp.description,
                fees: editingCamp.fees,
                location: editingCamp.location
            };
            // console.log(updatedFields)
            const res = await axiosSecure.patch(`/camps/${editingCamp.key}`, updatedFields);
            // console.log( res);
            if (res.data.modifiedCount >= 0) {
                refetch();
                setIsEditing(false);
                setEditingCamp(null);
                Swal.fire({
                    title: "Success!",
                    text: "Camp information updated successfully.",
                    icon: "success"
                });
                refetch();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update camp information.",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error updating camp:', error);
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

                axiosSecure.delete(`/camps/${id}`)
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
            title: 'Camp',
            dataIndex: 'campImage',
            render: (url) => (
                <img src={url} alt="camp" className="rounded-md w-96" />
            )
        },
        {
            title: 'Camp Name',
            dataIndex: 'campName',
            sorter: (a, b) => a.campName.localeCompare(b.campName),
            render: (text) => (
                <strong>{text}</strong>
            )
        },
        {
            title: 'Camp Fees',
            dataIndex: 'fees',
            sorter: (a, b) => parseInt(a.fees.split(' ')[0]) - parseInt(b.fees.split(' ')[0]),
            render: (text) => `${text}`,
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Date & Time',
            dataIndex: 'dateTime',
            sorter: (a, b) => a.dateTime.localeCompare(b.dateTime),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            sorter: (a, b) => a.location.localeCompare(b.location),
        },
        {
            title: 'Doctor',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Participant',
            dataIndex: 'participantCount',
            sorter: (a, b) => a.participantCount-b.participantCount,
        },
        {
            title: 'Services Offered',
            dataIndex: 'servicesOffered',
            render: (services) => (
                <ul>
                    {services.map((service, index) => (
                        <li key={index}>
                            • {service.name}
                        </li>
                    ))}
                </ul>
            )
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_, record) => (
                <button className="btn btn-ghost p-1" onClick={() => handleEdit(record)}> <CiEdit size={30} /> </button>
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


    const data = camps.map((camp) => ({
        key: camp._id,
        campImage: camp.image,
        campName: camp.campName,
        fees: camp?.fees,
        servicesOffered: camp.servicesOffered,
        description: camp?.description,
        dateTime: camp.dateTime,
        location: camp.location,
        email: camp.healthcareProfessional.name,
        participantCount: camp.participantCount
    }));

    return (
        <div>

            <Modal
                title="Edit Camp"
                open={isEditing}
                onCancel={handleCancelEdit}
                footer={[
                    <Button key="cancel" onClick={handleCancelEdit}>Cancel</Button>,
                    <Button key="update" type="primary" onClick={handleUpdate}>Update</Button>,
                ]}
            >
                <Form>
                    <Form.Item label="Camp Name">
                        <Input value={editingCamp?.campName} onChange={(e) => setEditingCamp({ ...editingCamp, campName: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Camp Fees">
                        <Input value={editingCamp?.fees} onChange={(e) => setEditingCamp({ ...editingCamp, fees: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea value={editingCamp?.description} onChange={(e) => setEditingCamp({ ...editingCamp, description: e.target.value })} />
                    </Form.Item>
                    {/* <Form.Item label="Date & Time">
                        <DatePicker
                            showTime
                            value={moment(editingCamp?.dateTime, "dddd, MMMM Do YYYY, h:mm:ss a")}
                            onChange={(date) => setEditingCamp({ ...editingCamp, dateTime: date.format("dddd, MMMM Do YYYY, h:mm:ss a") })}
                        />
                    </Form.Item> */}
                    <Form.Item label="Location">
                        <Input value={editingCamp?.location} onChange={(e) => setEditingCamp({ ...editingCamp, location: e.target.value })} />
                    </Form.Item>
                    {/* <Form.Item label="Doctor">
                        <Input value={editingCamp?.email} onChange={(e) => setEditingCamp({ ...editingCamp, email: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Participant">
                        <Input value={editingCamp?.participantCount} onChange={(e) => setEditingCamp({ ...editingCamp, participantCount: e.target.value })} />
                    </Form.Item> */}
                    {/* <Form.Item label="Services Offered">
                        <Input.TextArea
                            value={editingCamp?.servicesOffered.map(service => `${service.name}: ${service.description}`).join('\n')}
                            onChange={(e) => {
                                const services = e.target.value.split('\n').map(line => {
                                    const [name, description] = line.split(':');
                                    return { name: name.trim(), description: description.trim() };
                                });
                                setEditingCamp({ ...editingCamp, servicesOffered: services });
                            }}
                            rows={4}
                        />
                    </Form.Item> */}


                </Form>
            </Modal>


            <h2 className='text-3xl font-taj font-bold text-center my-5'>Organizing Camps</h2>
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

export default ManageCamps;