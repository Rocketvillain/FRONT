import { NavLink } from "react-router-dom"
import '../css/UserMain.css';

function UserMain() {

    return(
        <>
        <div className="user-main-container">
            <ul className="usernav-list">
                <li className="usernav-item">
                    <NavLink to="/hospitalview">
                        <img src="/images/main1.png" alt="병원 검색하기" />
                        <span>병원검색</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/hosreser">
                        <img src="/images/main2.png" alt="병원 예약하기" />
                        <span>병원예약</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/expenses">
                        <img src="/images/main2.png" alt="평균 진료비 보기" />
                        <span>평균 진료비 보기</span>
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

export default UserMain;                                     