import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import MypageLayout from "./layouts/Mypagelayout";
import Myinfo from "./pages/mypage/Myinfo";
import Mypet from "./pages/mypage/Mypet";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="" element />
            <Route path="" element />
          </Route>
          <Route path="/myinfo" element={<MypageLayout/>}>
            <Route index element={<Myinfo />} />
            {/* <Route path="/reserstatus" element />
            <Route path="/clinichistory" element />
            <Route path="/myreviews" element /> */}
            <Route path="/myinfo/mypet" element={<Mypet/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
