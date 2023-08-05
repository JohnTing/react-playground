import React from 'react';
import { Select } from 'antd';


export function TestPage () {

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

return () => (
  <>
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'disabled',
          disabled: true,
          label: 'Disabled',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
      ]}
    />
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      disabled
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      loading
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      allowClear
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
  </>
);

}