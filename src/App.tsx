import { ColumnType, ColumnsType } from 'antd/lib/table';
import './App.css';
import { Button, Table, message} from 'antd';
import { useState } from 'react';

 

type DataSource= {
  key: string;
  name: string;
  codeName: string;
  line: string;
}

const initDataSource:DataSource[] = [
  {
    key: '1',
    name: 'Peter Quill',
    codeName:'Star Loar',
    line: '',
  },
  {
    key: '2',
    name: 'Gamora',
    codeName:'',
    line: ''
  },
  {
    key: '3',
    name: 'Drax',
    codeName:'',
    line:''
  },
  {
    key: '4',
    name: 'Rocket',
    codeName:'Raccoon',
    line:''
  },
  {
    key: '5',
    name: 'Groot',
    codeName:'',
    line:'I am Grrot'    
  }
];

const columnsTitleData = 
[
  ["name", "codeName", "line"], 

  ["name", "age", "line", "address"], 
];



function App() {
  const [messageApi, contextHolder] = message.useMessage();

  const info = (columnName:string,record:DataSource,rowIndex:number | undefined) => {
    const myJSON = JSON.stringify(record); 
    messageApi.info(`${columnName} ${myJSON}  ${rowIndex}`);
  }; 
  const [cid, setCid] = useState<number>(0);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number>(-1);
  const [selectedColumnName, setSelectedColumnName] = useState<string>("");
  const [dataSource, setDataSource] = useState<DataSource[]>(initDataSource);
  
  async function readData() {
    const value = await fetch("http://localhost:3000/react-playground/data.json");
    const json: DataSource[] = await value.json() ;
    setDataSource( [...dataSource, ...json] );

  }
  const columnList: ColumnsType<DataSource>[] = [];

  columnsTitleData.forEach(element => {
    let newColumn: ColumnType<DataSource>[] = [];

    element.forEach(e => {
      newColumn.push(
        {
          title: e,
          dataIndex: e,
          key: e,
          onCell: (record, rowIndex) => {
            return {
              
                onClick: (event) => {
                  console.log(rowIndex);
                  setSelectedCellIndex(rowIndex === undefined ? -1 : rowIndex );
                  setSelectedColumnName(e);
                },
            };
          },
          render(text, record, rowIndex) {
            // code here
            console.log("rowIndex=" + rowIndex);
            console.log("selectedCellIndex=" + selectedCellIndex);
            return {
              props: {
                style: { 
                  background: (rowIndex === selectedCellIndex && selectedColumnName === e) ? "#00ccc7" : "#00f7be" }
              },
              children: <div>{text}</div>
            };
          }
        }, 
      )
    })
    columnList.push(newColumn)
  });

    
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={readData} >fetch</Button>
        <Button onClick={() => {setCid((cid+1) %2)}} >switch</Button>
      {contextHolder}
        <Table dataSource={dataSource} columns={columnList[cid]} pagination={false}/>
      </header>
    </div>
  );
}

export default App;