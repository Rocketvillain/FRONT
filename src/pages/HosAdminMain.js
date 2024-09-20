// 병원관리자 메인 페이지
import { NavLink } from "react-router-dom"
import '../css/HosAdminMain.css';

function HosAdminMain() {

    return(
        <>
        <div className="hosadminmain-container">
            <ul className="hosadminnav-list">
                <li className="hosadminnav-item">
                    <NavLink to="/hospitalview">
                        <img src="/images/main4.png" alt="예약관리" />
                        <span>예약관리</span>
                    </NavLink>
                </li>
                <li className="hosadminnav-item">
                    <NavLink to="/reserstatus">
                        <img src="/images/main1.png" alt="후기조회" />
                        <span>후기조회</span>
                    </NavLink>
                </li>
                <li className="hosadminnav-item">
                    <NavLink to="/expenses">
                        <img src="/images/main1.png" alt="일정관리" />
                        <span>일정관리</span>
                    </NavLink>
                </li>
            </ul>
        </div>
        <div className="footer-container">
            우리 가족을 위한 최고의 서비스, 강남구 동물병원의 정보를 한 눈에!
        </div>
        </>
    )
}

export default HosAdminMain;