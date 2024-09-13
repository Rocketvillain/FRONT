import { NavLink } from "react-router-dom"
import '../../css/component/MyPage.css'


function Navbar() {

    const activeStyle = {
        color: 'black'
    }

    return (
        <div className="mypage-container">
            <ul className="mypage-nav-list">
                <h1 style={{ color: 'white', marginLeft: '15px', margin: '5px' }}>마이페이지</h1>
                <li className="mypage-nav-item">
                    <NavLink
                        to="/myinfo/myinfo"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <span>나의 정보</span>
                    </NavLink>
                </li>
                <li className="mypage-nav-item">
                    <NavLink
                        to=" /myinfo/reserstatus"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <span>예약 현황</span>
                    </NavLink>
                </li>
                <li className="mypage-nav-item">
                    <NavLink
                        to="/myinfo/clinichistory"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <span>진료 기록</span>
                    </NavLink>
                </li>
                <li className="mypage-nav-item">
                    <NavLink
                        to="/myinfo/myreviews"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <span>나의 후기</span>
                    </NavLink>
                </li>
                <li className="mypage-nav-item">
                    <NavLink
                        to="/myinfo/mypet"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <span>마이펫</span>
                    </NavLink>
                </li>
            </ul>
        </div >
    )
}

export default Navbar;