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
import HosSchedul from "./pages/hosadmin/HosSchedul";
import HosReserControl from "./pages/hosadmin/HosReserControl";

function App() {

  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const newToken = useSelector(state => state.user.token);
  const [role, setRole] = useState(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userRole; // token이 있는 경우 role 설정
    }
    return null; // token이 없으면 null
  });

  useEffect(() => {
      setToken(newToken)
        if (newToken) {
            const decodedToken = jwtDecode(newToken);
            setRole(decodedToken.userRole);
            const userId = decodedToken.sub;
            dispatch(getUserInfo(userId));
        }
  }, [newToken, dispatch]);

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
            <Route path="/hosschedul" element={<HosSchedul/>}/>
            <Route path="/hosresercontrol" element={<HosReserControl/>}/>
          </Route>
        )}
  
        {/* 일반 회원 페이지 */}
        {role === 'ROLE_USER' && (
          <>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<UserMain />} />
              <Route path="/allreviews" element={<AllReviews />} />
              <Route path="/beautyreserpage" element={<BeautyReserPage />} />
              <Route path="/reserpage/:hosId" element={<ReserPage />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/hospitalview" element={<HospitalView />} />
              <Route path="/hosdetail/:hosId" element={<HosDetails />} /> {/* 병원 상세 페이지 라우트 */}
            </Route>
  
            <Route path="/myinfo" element={<MyPageLayout />}>
              <Route index element={<MyInfo />} />
              <Route path="/myinfo/myinfo" element={<MyInfo />} />
              <Route path="/myinfo/reserstatus" element={<ReserStatus />} />
              <Route path="/myinfo/clinichistory" element={<ClinicHistory addReview={addReview} reviews={reviews} />} />
              <Route path="/myinfo/myreviews" element={<MyReviews reviews={reviews} />} />
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

