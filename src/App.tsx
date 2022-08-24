import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page2 from './pages/Page2';


function App() {
  return (
    <div className="App">
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route index element={<Page2 />} />
          <Route path='/page2' element={<Page2 />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
