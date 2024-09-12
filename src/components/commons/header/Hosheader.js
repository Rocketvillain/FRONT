import { NavLink } from "react-router-dom";
import '../../../css/HosHeader.css'

function HosHeader() {
    const activeStyle = {
        backgroundColor: 'white',
        color: 'black'
    }
    return(
        <div className="hosheader-container">
            <ul className="hosnav-list">
                <li className="hosnav-item">
                    <NavLink to="/" exact>
                        <img className="mainImage" src="/images/logo.png" alt="메인 이미지" />
                    </NavLink>
                </li>
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
                <li className="hosnav-item">
                    <NavLink to="/logout" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <span>Logout</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default HosHeader;