import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
// import LoginForm from "./pages/LoginForm";
import AdminMain from "./pages/AdminMain";
import AdminLayout from "./layouts/AdminLayout";
import HosLayout from "./layouts/HosLayout";
import HosAdminMain from "./pages/HosAdminMain";
import Main from "./pages/Main";
import Layout from "./layouts/Layout";
import UserLayout from "./layouts/UserLayout";
import UserMain from "./pages/UserMain";
import Expenses from "./pages/user/Expenses";

function App() {
  // const token = localStorage.getItem('token');
  // const role = localStorage.getItem('role');

  // if (!token) {
  //   return <LoginForm />;
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="" element />
          <Route path="/expenses" element={<Expenses/>} />

        </Route>
        {/* <Route path="/myinfo" element={<MypageLayout/>}>
          <Route index element={<Myinfo />} />
          <Route path="/reserstatus" element />
          <Route path="/clinichistory" element />
          <Route path="/myreviews" element />
          <Route path="/myinfo/mypet" element={<Mypet/>} />
        </Route> */}

        {/* {role === 'admin' && <Route path="/" element={<AdminMain />} />}
        {role === 'hosadmin' && <Route path="/" element={<HosAdminMain />} />}
        {role === 'user' && <Route path="/" element={<UserMain />} />}
        <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

