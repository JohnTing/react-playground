import { ColumnType, ColumnsType } from 'antd/lib/table';
import './App.css';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';


type DataSource = {
  key: string;
  name: string;
  codeName: string;
  line: string;
}

const initDataSource: DataSource[] = [
  {
    key: '1',
    name: 'Peter Quill',
    codeName: 'Star Loar',
    line: '',
  },
  {
    key: '2',
    name: 'Gamora',
    codeName: '',
    line: ''
  },
  {
    key: '3',
    name: 'Drax',
    codeName: '',
    line: ''
  },
  {
    key: '4',
    name: 'Rocket',
    codeName: 'Raccoon',
    line: ''
  },
  {
    key: '5',
    name: 'Groot',
    codeName: '',
    line: 'I am Grrot'
  }
];

const  initDatacolumns =
  [
    ["name", "codeName", "line"],
    ["name", "age", "line", "address"],
  ];



function App() {

  // 切換表格
  const [cid, setCid] = useState<number>(0);

  // 紀錄點選的行樹和欄位名
  const [selectedCellIndex, setSelectedCellIndex] = useState<number>(-1);
  const [selectedColumnName, setSelectedColumnName] = useState<string>("");

  // 資料
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  const [dataColumns, setDataColumns] = useState<string[][]>([]);

  const [showColumns, setShowColumns] = useState<ColumnsType<DataSource>[]>([]);
  
  useEffect(() => {
    setDataColumns(initDatacolumns);
    setDataSource(initDataSource);
  }, []);

  useEffect(() => {
    // 儲存多表格，Columns 是多欄位組成的表格，Column 是欄位，就差個 s 
    const columnsList: ColumnsType<DataSource>[] = [];
    dataColumns.forEach(titles => {
      let newColumns: ColumnType<DataSource>[] = [];
      titles.forEach(e => {
        newColumns.push(createNewColumn(e));
      })
      columnsList.push(newColumns)
    });
  
    setShowColumns(columnsList);
  }, [dataColumns, selectedCellIndex, selectedColumnName]);

  // 模擬 api 讀取資料
  async function readData() {
    const value = await fetch("/react-playground/data.json");
    const json: DataSource[] = await value.json();
    setDataSource([...dataSource, ...json]);
  }

  function createNewColumn(name: string) {
    let newColumn: ColumnType<DataSource> = {
      title: name,
      dataIndex: name,
      key: name,
      onCell: (record, rowIndex) => {
        console.log("onCell");
        return {
          onClick: (event) => {
            // 紀錄行數
            setSelectedCellIndex(rowIndex === undefined ? -1 : rowIndex);
            // 紀錄列名，例如對應 title
            // 我這裡 title, dataIndex, key 都一樣所以無所謂，但實際使用時要確認之後判斷時要用哪個參數作為"列名"來判斷
            setSelectedColumnName(name);
            //console.log(rowIndex);
            //console.log(name);
          },
          style: {background:  (selectedCellIndex === rowIndex  && selectedColumnName === name) ? "#00ccc7" : "#00f7be" },
          
        };
      },
    }
    return newColumn;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={readData} >fetch</Button>
        
        <Button onClick={() => { setCid((cid + 1) % showColumns.length) }} >switch</Button>

        <Table dataSource={dataSource} columns={showColumns[cid]} pagination={false} />
      </header>
    </div>
  );
}

export default App;