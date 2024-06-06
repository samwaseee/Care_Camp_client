import { createRoot } from 'react-dom';
import { Table } from 'daisyui';

const ManageRegCamps = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sortable: true,
      sortDirections: ['asc', 'desc'],
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            { text: 'Green', value: 'Green' },
            { text: 'Black', value: 'Black' },
          ],
        },
      ],
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sortable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
    },
  ];

  const data = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
    { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
  ];

  return (
    <div>
      <h2>Manage Registered Camps</h2>
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
