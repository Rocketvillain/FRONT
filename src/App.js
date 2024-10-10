import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
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
import AllReviews from "./pages/hospital/AllReviews";
import UserLayout from "./layouts/UserLayout";
import Login from "./pages/user/Login";
import FindID from "./pages/user/FindID";
import ChangePWD from "./pages/user/ChangePWD";
import Signup from "./pages/user/Signup";
import AdminLayout from "./layouts/AdminLayout";
import UserControl from "./pages/admin/UserControl";
import ReserControl from "./pages/admin/ReserControl";
import UserLayout2 from "./layouts/UserLayout2";
import AdminMain from "./pages/AdminMain";
import HosAdminMain from "./pages/HosAdminMain";
import UserMain from "./pages/UserMain";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import { getUserInfo } from "./api/UserAPICalls";
import FooterLayout from "./layouts/FooterLayout";
import BeautyReserPage from "./pages/reservations/BeautyReserPage";
import ReserPage from "./pages/reservations/ReserPage";
import HospitalView from "./pages/hospital/HospitalView";
import HosDetails from "./pages/hospital/HosDetails";
import HosReser from "./pages/hospital/HosReser";
import HosControl from "./pages/admin/HosControl";
import ReviewControl from "./pages/admin/ReviewControl";
import HosLayout from "./layouts/HosLayout";
import HosInfo from "./pages/hosadmin/HosInfo";
import HosReviewControl from "./pages/hosadmin/HosReviewControl";
import HosSchedule from "./pages/hosadmin/HosSchedule";
import HosReserControl from "./pages/hosadmin/HosReserControl";

function App() {

  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const newToken = useSelector(state => state.user.token);
  const role = newToken ? jwtDecode(newToken).userRole : null;
  const userId = newToken ? jwtDecode(newToken).sub : null;

  useEffect(() => {
    dispatch(getUserInfo(userId));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* 관리자 페이지 */}
        {role === 'ROLE_ADMIN' && (
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<AdminMain />} />
            <Route path="/usercontrol" element={<UserControl />} />
            <Route path="/resercontrol" element={<ReserControl />} />
            <Route path="/hoscontrol" element={<HosControl />} />
            <Route path="/reviewcontrol" element={<ReviewControl />} />
            {/* <Route path="/reportscontrol" element={<ReportsControl />} /> */}
          </Route>
        )}
  
        {/* 병원 관리자 페이지 */}
        {role === 'ROLE_HOSPITAL' && (
          <Route path="/" element={<HosLayout />}>
            <Route index element={<HosAdminMain />} />
            <Route  path="/hosinfo" element={<HosInfo />} />
            <Route path="/hosreviewcontrol" element={<HosReviewControl/>}/>
            <Route path="/hosschedule" element={<HosSchedule/>}/>
            <Route path="/hosresercontrol" element={<HosReserControl/>}/>
          </Route>
        )}
  
        {/* 일반 회원 페이지 */}
        {role === 'ROLE_USER' && (
          <>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<UserMain />} />
              <Route path="/allreviews" element={<AllReviews />} />
              <Route path="/beautyreserpage/:hosId" element={<BeautyReserPage />} />
              <Route path="/reserpage/:hosId" element={<ReserPage />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/hospitalview" element={<HospitalView />} />
              <Route path="/hosdetail/:hosId" element={<HosDetails />} /> {/* 병원 상세 페이지 라우트 */}
            </Route>
  
            <Route path="/myinfo" element={<MyPageLayout />}>
              <Route index element={<MyInfo />} />
              <Route path="/myinfo/myinfo" element={<MyInfo />} />
              <Route path="/myinfo/reserstatus" element={<ReserStatus />} />
              <Route path="/myinfo/clinichistory" element={<ClinicHistory/>} />
              <Route path="/myinfo/myreviews" element={<MyReviews/>} />
              <Route path="/myinfo/mypet" element={<MyPet />} />
            </Route>

            <Route path="/hosreser" element={<UserLayout2 />}>
              <Route index element={<HosReser />} />
            </Route>
          </>
        )}
  
        {/* 기본 Main 페이지 (로그인 안했거나 역할 없음) */}
        {(!role || (role !== 'ROLE_ADMIN' && role !== 'ROLE_HOSADMIN' && role !== 'ROLE_USER')) && (
          <>
            <Route path="/" element={<FooterLayout />}>
              <Route index element={<Main />} />
            </Route>
  
            <Route element={<Layout />} >
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/login" element={<Login />} />
              <Route path="/findID" element={<FindID />} />
              <Route path="/changePWD" element={<ChangePWD />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  
  );
};

export default App;

