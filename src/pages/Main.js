import { NavLink } from "react-router-dom"
import '../css/Main.css';

function Main() {

    return (
        <>
        <div className="main-container">
            <ul className="nav-list">
                <li className="nav-item">
                    <NavLink to="/hospitalview">
                        <img src="/images/main1.png" alt="병원 검색하기" />
                        <span>병원 검색하기</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/reserstatus">
                        <img src="/images/main2.png" alt="병원 예약하기" />
                        <span>병원 예약하기</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/expenses">
                        <img src="/images/main3.png" alt="진료비 확인하기" />
                        <span>진료비 확인하기</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/beautyreserpage">
                        <img src="/images/main3.png" alt="미용 예약" />
                        <span>미용 예약</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/reserpage">
                        <img src="/images/main2.png" alt="진료 및 수술 예약" />
                        <span>진료 및 수술 예약</span>
                    </NavLink>
                </li>
            </ul>
        </div>
        <div className="footer-container">
            우리 가족을 위한 최고의 서비스, 경기도 동물병원의 정보를 한 눈에!
        </div>
        </>
    )
}

export default Main;                                     