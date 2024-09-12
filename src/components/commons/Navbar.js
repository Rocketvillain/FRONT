import { NavLink } from "react-router-dom"
import '../../css/component/Mypage.css'


function Navbar() {

    const activeStyle = {
        color: 'black'
    }

    return (
        <div className="mypage-container">
            <ul className="mypage-nav-list">
            <h1 style={{color:'white', marginLeft:'25px'}}>마이페이지</h1>
                <li className="mypage-nav-item">
                    <NavLink to="/myinfo" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>나의 정보</span>
                    </NavLink>
                </li>
                <li className="mypage-nav-item">
                    <NavLink to="/myinfo/reserstatus" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>예약 현황</span>
                    </NavLink>
                </li>
                <li className="mypage-nav-item">
                    <NavLink to="/myinfo/clinichistory" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>진료 기록</span>
                    </NavLink>
                </li>
                <li className="mypage-nav-item">
                    <NavLink to="/myinfo/myreviews" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>나의 후기</span>
                    </NavLink>
                </li>
                <li className="mypage-nav-item">
                    <NavLink to="/myinfo/mypet" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>마이펫</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;