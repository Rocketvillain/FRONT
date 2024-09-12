// 병원관리자 메인 페이지
import { NavLink } from "react-router-dom"
import '../css/Hosadminmain.css';

function Hosadminmain() {

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
        </>
    )
}

export default Hosadminmain;