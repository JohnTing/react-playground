import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AntdTableCopyRow from './pages/AntdTableCopyRow';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route index element={<AntdTableCopyRow />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
