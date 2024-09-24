import { NavLink } from "react-router-dom";
import '../../../css/component/HosHeader.css'
import { useDispatch } from "react-redux";
import { resetLoginUser } from "../../../modules/UserModule";

function HosHeader() {

    const dispatch = useDispatch(); 
    
    const activeStyle = {
        color: 'white'
    }

    const handleLogout = () => {

        // 로그인 상태를 리셋하는 액션을 디스패치
        dispatch(resetLoginUser());

        // 로그아웃 후 메인 페이지로 리다이렉트
        window.location.href = '/';
    };

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
            {/* 로그아웃 버튼에 onClick 이벤트 추가 */}
            <div className="logout-hoscontainer" onClick={handleLogout}>
                <img src="/images/signup_logout_1.png" alt="로그아웃 아이콘" />
                <span>LOGOUT</span>
            </div>
        </div>
    )
}

export default HosHeader;