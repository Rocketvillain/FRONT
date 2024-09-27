import { NavLink } from "react-router-dom"
import '../css/Main.css';

function Main() {
    return (
        <>
            <div className="main-container">
                <div className="brand-container">
                    <div className="brand-background">
                        <img src="/images/main3.png" className="main-logo" />
                        <span className="main-title">Healing Pets</span>
                        <img src="/images/main4.png" className="main-logo" />
                    </div>
                </div>
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/login">
                            <img src="/images/main1.png" alt="로그인" />
                            <span>병원<br />
                                검색하기</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login">
                            <img src="/images/main2.png" alt="로그인" />
                            <span>병원<br />
                                예약하기</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/expenses">
                            <img src="/images/main3.png" alt="진료비 확인하기" />
                            <span>진료비<br />
                                확인하기</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Main;                                     