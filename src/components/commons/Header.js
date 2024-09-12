import { NavLink } from "react-router-dom"
import '../css/Header.css'

function Header() {

    const activeStyle = {
        backgroundColor: 'white',
        color: 'black'
    }

    return (
        <div className="header-container">
        <ul className="nav-list">
            <li className="nav-item">
                <NavLink to="/" exact>
                    <img className="mainImage" src="/images/main.png" alt="메인 이미지" />
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/hospitalview" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>병원검색</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/reserstatus" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>병원예약</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/expenses" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>평균 진료비 보기</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/review" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>후기보기</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>Login</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/signup" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    <span>Signup</span>
                </NavLink>
            </li>
        </ul>
    </div>
    )
}

{/* <div>
<ul>
    <li><NavLink to="/"><img src="/images/main.png"/></NavLink></li>
    <li><NavLink to="/hospitalview" style={({isActive}) => isActive? activeStyle: undefined}>병원검색</NavLink></li>
    <li><NavLink to="/reserstatus" style={({isActive}) => isActive? activeStyle: undefined}>병원예약</NavLink></li>
    <li><NavLink to="/expenses" style={({isActive}) => isActive? activeStyle: undefined}>평균 진료비 보기</NavLink></li>
    <li><NavLink to="/review" style={({isActive}) => isActive? activeStyle: undefined}>후기보기</NavLink></li>
    <li><NavLink to="/login" style={({isActive}) => isActive? activeStyle: undefined}>Login</NavLink></li>
    <li><NavLink to="/signup" style={({isActive}) => isActive? activeStyle: undefined}>Signup</NavLink></li>
</ul>
</div> */}

export default Header;