import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreatePasswordPage from './pages/CreatePasswordPage';
import DetailPage from './pages/DetailPage';
import MasterFormPage from './pages/MasterFormPage';
import CommunicationPage from './pages/CommunicationPage';
import { ThemeProvider } from '@mui/material';
import epasoTheme from './muiTheme';
import Layout from './components/Layout/Layout';
import AgreementsPage from './pages/AgreementsPage';
import ToDoListPage from './pages/ToDoListPage';

import Functions  from './components/Functions/Functions'




//Import i18n.ts
import "./i18n";




const root = ReactDOM.createRoot(

    
  document.getElementById('root') as HTMLElement
);


export default function App() {

  globalThis.accessToken=Functions();
  
  return(
    <ThemeProvider theme={epasoTheme}>
      <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path={"/create-account"} element={<CreatePasswordPage />} />
              <Route path={"/login"} element={<LoginPage />} />
              <Route path={"/home"} element={<Layout><HomePage /></Layout>} />
              <Route path={"/master-form"} element={<Layout><MasterFormPage /></Layout>} />
              <Route path={"/detail"} element={<Layout><DetailPage /></Layout>} />
              <Route path={"/communication"} element={<Layout><CommunicationPage /></Layout>} />
              <Route path={"/agreements"} element={<Layout><AgreementsPage /></Layout>} />
              <Route path={"/pending"} element={<Layout><ToDoListPage /></Layout>} />
              <Route path="*" element={<Layout><LoginPage /></Layout>} />
            </Route>
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

root.render(<App />);
