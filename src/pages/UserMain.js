import { NavLink } from "react-router-dom";
import '../css/UserMain.css';

import { useDispatch, useSelector } from "react-redux";

function UserMain() {
    return (
        <>
            <div className="user-main-container">
                <div className="user-main-brand-container">
                    <div className="user-main-brand-background">
                        <img src="/images/main1.png" className="user-main-logo" alt="User Main Logo" />
                        <span className="user-main-title">Healing Pets</span>
                        <img src="/images/main2.png" className="user-main-logo" alt="User Main Logo" />
                    </div>
                </div>
                <ul className="user-main-nav-list">
                    <li className="user-main-nav-item">
                        <NavLink to="/hospitalview">
                            <img src="/images/main1.png" alt="병원 검색" />
                            <span>병원<br />
                                검색하기</span>
                        </NavLink>
                    </li>
                    <li className="user-main-nav-item">
                        <NavLink to="/hosreser">
                            <img src="/images/main2.png" alt="병원 예약" />
                            <span>병원<br />
                                예약하기</span>
                        </NavLink>
                    </li>
                    <li className="user-main-nav-item">
                        <NavLink to="/expenses">
                            <img src="/images/main2.png" alt="평균 진료비" />
                            <span>진료비<br />
                                확인하기</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default UserMain;
