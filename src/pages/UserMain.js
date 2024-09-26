import { NavLink } from "react-router-dom"
import '../css/UserMain.css';

import { useDispatch, useSelector } from "react-redux";

function UserMain() {

    const testHandler = () => {
        
        const userInfoString = localStorage.getItem('userInfo');

        // userInfo가 null이 아닌 경우에만 파싱
        if (userInfoString) {
            // JSON 문자열을 객체로 변환
            const userInfo = JSON.parse(userInfoString);
            console.log(userInfo); // 객체 출력

            // userId 접근
            const userId = userInfo.userId; // 객체의 userId 프로퍼티에 접근
            console.log(userId);
        } else {
            console.log('userInfo가 존재하지 않습니다.');
        }
        
    }

    return(
        <>
        <div className="user-main-container">
            <ul className="usernav-list">
                <li className="usernav-item">
                    <NavLink to="/hospitalview">
                        <img src="/images/main1.png" alt="병원 검색하기" />
                        <span>병원검색</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/hosreser">
                        <img src="/images/main2.png" alt="병원 예약하기" />
                        <span>병원예약</span>
                    </NavLink>
                </li>
                <li className="usernav-item">
                    <NavLink to="/expenses">
                        <img src="/images/main2.png" alt="평균 진료비 보기" />
                        <span>평균 진료비 보기</span>
                    </NavLink>
                </li>
                
                <button onClick={testHandler}>test</button>
            </ul>
        </div>
        <div className="footer-container">
            우리 가족을 위한 최고의 서비스, 강남구 동물병원의 정보를 한 눈에!
        </div>
        </>
    )
}

export default UserMain;                                     