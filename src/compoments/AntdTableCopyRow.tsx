


import { Button, Divider, Input, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface DataType {
    key: number;
    name: string;
    age: number;
    address: string;
}

const data: DataType[] = [
    {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 4,
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
];

// rowSelection object indicates the need for row selection

type PropType = {dataSource:DataType[], onChange: (dataSource:DataType[]) => void}


export default function AntdTableCopyRow(props: PropType) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [dataSource, setDataSource] = useState<DataType[]>([]);

    const [selectedColorRow, setSelectedColorRow] = useState<React.Key | null>(null);

    useEffect(() => {
        setDataSource(props.dataSource);
    }, []);


    function editChange(e: ChangeEvent<HTMLInputElement>, type: keyof DataType, index: number) {
        let newDataSource = [...dataSource]
        console.log(type);
        (newDataSource[index][type] as string) = e.target.value;

        console.log(newDataSource[index]);
        setDataSource(newDataSource);
        props.onChange(newDataSource);
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text: string, record, index) => {
                const disabled = !(selectedRowKeys as number[]).includes(record.key)
                if (disabled) {
                    return text;
                }
                return <input readOnly={disabled} onChange={e => editChange(e, "name", index)} value={text} />
            },
            width: "240px"
        },
        {
            title: 'Age',
            dataIndex: 'age',
            align: "right"
        },
        {
            title: 'Address',
            dataIndex: 'address',
            align: "right"
        },
    ];



    const rowSelection: TableRowSelection<DataType> = {
        type: 'checkbox',
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
        },
    };

    function copy() {
        let topIndex = 0;
        for (const d of dataSource) {
            topIndex = Math.max(d.key, topIndex);
        }
        let data: DataType[] = [];
        let selectedKeys = selectedRows.map(v => v.key);
        let srdId = 0;
        for (const d of dataSource) {
            data.push(d);
            if (selectedKeys[srdId] === d.key) {
                srdId += 1;
                const newdata = Object.assign({}, d);
                newdata.key = ++topIndex;
                data.push(newdata);
            }
        }
        console.log(data);
        setDataSource(data);
    }

    return (
        <div>
            <Button onClick={copy}>Copy</Button>
            <Table
                rowSelection={{
                    selectedRowKeys,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}

                rowClassName={(record, index) => record.key === selectedColorRow ? "johnting-row-selected" : ""}


                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => { setSelectedColorRow(record.key); }, // click row
                    };
                }}
            />
        </div>
    );
};


