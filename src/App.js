import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
// import LoginForm from "./pages/LoginForm";
import Main from "./pages/Main";
import Layout from "./layouts/Layout";
import MyPageLayout from "./layouts/MyPageLayout";
import MyInfo from "./pages/mypage/MyInfo";
import MyPet from "./pages/mypage/MyPet";
import Expenses from "./pages/user/Expenses";
import ReserStatus from "./pages/mypage/ReserStatus";
import MyReviews from "./pages/mypage/MyReviews";
import ClinicHistory from "./pages/mypage/ClinicHistory";


function App() {
  // const token = localStorage.getItem('token');
  // const role = localStorage.getItem('role');

  // if (!token) {
  //   return <LoginForm />;
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="" element />
          <Route path="/expenses" element={<Expenses/>} />

        </Route>
        <Route path="/myinfo" element={<MyPageLayout />}>
          <Route index element={<MyInfo />} />
          <Route path="/myinfo/myinfo" element={<MyInfo />} />
          <Route path="/myinfo/reserstatus" element={<ReserStatus/>} />
            <Route path="/myinfo/clinichistory" element={<ClinicHistory/>} />
            <Route path="/myinfo/myreviews" element={<MyReviews/>} />
          <Route path="/myinfo/mypet" element={<MyPet />} />
        </Route>
        {/* {role === 'admin' && <Route path="/" element={<AdminMain />} />}
        {role === 'hosadmin' && <Route path="/" element={<HosAdminMain />} />}
        {role === 'user' && <Route path="/" element={<UserMain />} />}
        <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;

