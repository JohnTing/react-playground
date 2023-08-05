import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TestPage from './pages/TestPage';

function App() {
  return (
    <div className="App">
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route index element={<TestPage></TestPage>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
