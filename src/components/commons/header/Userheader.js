// 로그인 후 사용자 헤더
import { NavLink } from "react-router-dom";
import '../../../css/Userheader.css'

function Userheader() {

    const activeStyle = {
        backgroundColor: 'white',
        color: 'black'
    }

    return(
        <div className="userheader-container">
            <ul className="usernav-list">
                <li className="usernav-item">
                    <NavLink to="/" exact>
                        <img className="mainImage" src="/images/logo.png" alt="메인 이미지" />
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/hospitalview" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>병원검색</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>병원예약</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>평균 진료비 보기</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>후기보기</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/logout" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>Logout</span>
                    </NavLink>
                </li>
            </ul>

        </div>

    )
}

export default Userheader;