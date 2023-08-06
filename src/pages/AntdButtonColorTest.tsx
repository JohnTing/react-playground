import React, { TdHTMLAttributes, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';


type Data= {
  key: string;
  name: string;
  age: number;
}

const data:Data[] = [
  {
    key: '1',
    name: 'John Doe',
    age: 30,
  },
  {
    key: '2',
    name: 'Jane Smith',
    age: 25,
  },
  // Add more data rows as needed
];

const MyTable = () => {
  const [selectedCellKey, setSelectedCellKey] = useState(null);

  const handleCellClick = (record: any ) => {
    setSelectedCellKey(record.key);
  };

  const columns:ColumnsType<Data>  = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onCell: (record) => ({
        onClick: () => handleCellClick(record),
        style:  {backgroundColor:"red"}
        

      }),

    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    // Add more columns as needed
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default MyTable;