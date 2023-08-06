import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import AntdTableCopyRow from '../compoments/AntdTableCopyRow';


interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
}



export default function Pages() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data.json', {method: 'GET'})
    .then((value) => value.json())
    .then((data : DataType[]) => {
      console.log(data);

      data.forEach((v, i, a) => {
        v.key = i;
      });

      setDataSource(data);
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <AntdTableCopyRow dataSource={dataSource}/>
      </Modal>
    </>
  );
};