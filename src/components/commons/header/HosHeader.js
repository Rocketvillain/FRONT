import { NavLink } from "react-router-dom";
import '../../../css/component/HosHeader.css';

function HosHeader() {
    const activeStyle = {
        color: 'white'
    }
    return(
        <div className="hosheader-container">
            <div className="logo-hoscontainer">
                <NavLink to="/" exact className="logo-hoslink">
                    <img className="mainImage" src="/images/logo.png" alt="메인 이미지" />
                    <span>Healing Pets</span>
                </NavLink>
            </div>
            <ul className="hosnav-list">
                <li className="hosnav-item">
                    <NavLink to="/hospitalview" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>예약관리</span>
                    </NavLink>
                </li>
                <li className="hosnav-item">
                    <NavLink to="/reserstatus" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>후기조회</span>
                    </NavLink>
                </li>
                <li className="hosnav-item">
                    <NavLink to="/expenses" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>일정관리</span>
                    </NavLink>
                </li>
                <li className="hosnav-item">
                    <NavLink to="/review" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>병원관리</span>
                    </NavLink>
                </li>
            </ul>
            <NavLink to="/logout" className="logout-hoscontainer" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                <img src="/images/signup_logout_1.png" alt="로그아웃 아이콘" />
                <span>LOGOUT</span>
            </NavLink>
        </div>
    )
}

export default HosHeader;