import { NavLink } from "react-router-dom"
import '../css/Main.css';

function Main() {

    return(
        <>
        <div className="main-container">
            <ul className="nav-list">
                <li className="nav-item">
                    <NavLink to="/hospitalview">
                        <img src="/images/main1.png" alt="병원 검색하기" />
                        <span>병원검색</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/reserstatus">
                        <img src="/images/main2.png" alt="병원 예약하기" />
                        <span>병원예약</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/expenses">
                        <img src="/images/main2.png" alt="평균 진료비 보기" />
                        <span>평균 진료비 보기</span>
                    </NavLink>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Main;