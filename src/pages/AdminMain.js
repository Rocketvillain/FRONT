// 관리자 메인 페이지
import { NavLink } from "react-router-dom"
import '../css/AdminMain.css';

function AdminMain() {

    return(
        <>
        <div className="adminmain-container">
            <ul className="adminnav-list">
                <li className="adminnav-item">
                    <NavLink to="/hoscontrol">
                        <img src="/images/main3.png" alt="병원관리" />
                        <span>병원관리</span>
                    </NavLink>
                </li>
                <li className="adminnav-item">
                    <NavLink to="/resercontrol">
                        <img src="/images/main4.png" alt="예약관리" />
                        <span>예약관리</span>
                    </NavLink>
                </li>
                <li className="adminnav-item">
                    <NavLink to="/usercontrol">
                        <img src="/images/main4.png" alt="회원관리" />
                        <span>회원관리</span>
                    </NavLink>
                </li>
            </ul>
        </div>
        <div className="footer-container">
            우리 가족을 위한 최고의 서비스, 강남구 동물병원의 정보를 한 눈에!
        </div>
        </>
    )
}

export default AdminMain;          