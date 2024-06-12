import { useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import useAuth from "../../../hooks/useAuth";
import useCamps from "../../../hooks/useCamps";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [camps, loading, refetch] = useCamps("camp-name-desc", user?.email);

  const [editingCamp, setEditingCamp] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (record) => {
    setEditingCamp(record);
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
        location: editingCamp.location,
      };
      const res = await axiosSecure.patch(`/camps/${editingCamp.key}`, updatedFields);
      if (res.data.modifiedCount >= 0) {
        refetch();
        setIsEditing(false);
        setEditingCamp(null);
        Swal.fire({
          title: "Success!",
          text: "Camp information updated successfully.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to update camp information.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating camp:", error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/camps/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const columns = [
    {
      title: "Camp",
      dataIndex: "campImage",
      render: (url) => <img src={url} alt="camp" className="rounded-md w-96" />,
    },
    {
      title: "Camp Name",
      dataIndex: "campName",
      sorter: (a, b) => a.campName.localeCompare(b.campName),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Camp Fees",
      dataIndex: "fees",
      sorter: (a, b) => parseInt(a.fees.split(" ")[0]) - parseInt(b.fees.split(" ")[0]),
      render: (text) => `${text}`,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      sorter: (a, b) => a.dateTime.localeCompare(b.dateTime),
    },
    {
      title: "Location",
      dataIndex: "location",
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Doctor",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Participant",
      dataIndex: "participantCount",
      sorter: (a, b) => a.participantCount - b.participantCount,
    },
    {
      title: "Services Offered",
      dataIndex: "servicesOffered",
      render: (services) => (
        <ul>
          {services.map((service, index) => (
            <li key={index}>• {service.name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (_, record) => (
        <button className="btn btn-ghost p-1" onClick={() => handleEdit(record)}>
          <CiEdit size={30} />
        </button>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <button className="btn btn-ghost p-1" onClick={() => handleDelete(record.key)}>
          <RiDeleteBin2Fill size={30} color="red" />
        </button>
      ),
    },
  ];

  const filteredData = camps.filter((camp) => 
    (camp.campName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (camp.healthcareProfessional?.name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const data = filteredData.map((camp) => ({
    key: camp._id,
    campImage: camp.image,
    campName: camp.campName,
    fees: camp?.fees,
    servicesOffered: camp.servicesOffered,
    description: camp?.description,
    dateTime: camp.dateTime,
    location: camp.location,
    email: camp.healthcareProfessional.name,
    participantCount: camp.participantCount,
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
          <Form.Item label="Location">
            <Input value={editingCamp?.location} onChange={(e) => setEditingCamp({ ...editingCamp, location: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>

      <h2 className="text-3xl font-taj font-bold text-center my-5">Organizing Camps</h2>
      <div className="flex justify-between mb-4">
        <Input.Search
          placeholder="Search by camp name or doctor"
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      {loading && <div className="flex justify-center"><span className="loading loading-bars loading-lg scale-150"></span></div>}
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: 400  }}
        onChange={(pagination, filters, sorter, extra) => {
          console.log('params', pagination, filters, sorter, extra);
        }}
        sortIcon={<span className="icon">↑↓</span>}
      />
    </div>
  );
};

export default ManageCamps;
