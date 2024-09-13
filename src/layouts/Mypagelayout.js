import UserHeader from "../components/commons/header/UserHeader";
import Navbar from "../components/commons/Navbar";
import { Outlet } from "react-router-dom";

function MyPageLayout() {

    return(
        <>
        <UserHeader/>
         <div className="container"> {/* 플렉스 컨테이너 */}
                <Navbar />
            <div className="mypage-in"> {/* 인포 페이지 영역 */}
                <Outlet />
            </div>
        </div>
        </>
    )
}
export default MyPageLayout;