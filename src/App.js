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
import { useState } from "react";
import AllReviews from "./pages/hospital/AllReviews";
import UserLayout from "./layouts/UserLayout";
import BeautyReserPage from "./pages/reservations/BeautyReserPage";
import ReserPage from "./pages/reservations/ReserPage";
import Login from "./pages/user/Login";
import FindID from "./pages/user/FindID";
import ChangePWD from "./pages/user/ChangePWD";
import Signup from "./pages/user/Signup";
import AdminLayout from "./layouts/AdminLayout";
import UserControl from "./pages/admin/UserControl";
import ReserControl from "./pages/admin/ReserControl";


function App() {
  // const token = localStorage.getItem('token');
  // const role = localStorage.getItem('role');

  // if (!token) {
  //   return <LoginForm />;
  // }
  const [reviews, setReviews] = useState([
    { id: 3247, name: '동동구리', hospital: '강남 펫닥', type: '진료', date: '2024.06.23', status: '완료', reviewText: '진료가 매우 만족스러웠습니다.' },
    { id: 3128, name: '동동구리', hospital: '강남 펫닥', type: '미용(위생미용)', date: '2024.05.11', status: '완료', reviewText: '우리 강아지 미용이 정말 마음에 들어요.' },
    { id: 3129, name: '동동구리', hospital: '아프지멍', type: '수술', date: '2023.10.10', status: '완료', reviewText: '의사 선생님이 너무 친절하셨어요. 회복도 빠릅니다.' },
  ]);

  // 리뷰 추가 함수
  const addReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]); // 새 리뷰를 기존 리뷰에 추가
  };




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="" element />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findID" element={<FindID />} />
          <Route path="/changePWD" element={<ChangePWD />} />
          <Route path="/signup" element={<Signup/>}/>
        </Route>

        <Route path="/myinfo" element={<MyPageLayout />}>
          <Route index element={<MyInfo />} />
          <Route path="/myinfo/myinfo" element={<MyInfo />} />
          <Route path="/myinfo/reserstatus" element={<ReserStatus />} />
          <Route path="/myinfo/clinichistory" element={<ClinicHistory addReview={addReview} reviews={reviews} />} />
          <Route path="/myinfo/myreviews" element={<MyReviews reviews={reviews} />} />
          <Route path="/myinfo/mypet" element={<MyPet />} />
        </Route>

        <Route path="/allreviews" element={<UserLayout />}>
          <Route index element={<AllReviews />} />
        </Route>
        <Route path="/expenses" element={<UserLayout />}>
          <Route index element={<Expenses />} />
        </Route>
        <Route path="/beautyreserpage" element={<UserLayout />}>
          <Route index element={<BeautyReserPage />} />
        </Route>
        <Route path="/reserpage" element={<UserLayout />}>
          <Route index element={<ReserPage />} />
        </Route>


        <Route path="/usercontrol" element={<AdminLayout />}>
          <Route index element={<UserControl />} />
        </Route>
        <Route path="/reserrcontrol" element={<AdminLayout />}>
          <Route index element={<ReserControl />} />
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

