import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AntdTableCopyRow from './pages/AntdTableCopyRow';

function App() {
  return (
    <div className="App">
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route index element={<AntdTableCopyRow />} />
          <Route path='/table' element={<AntdTableCopyRow />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
