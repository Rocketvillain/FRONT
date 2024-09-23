import '../../css/user/Login.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { callLoginAPI } from '../../api/UserAPICalls';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import AlertMessage1 from '../../components/commons/AlertMessage1';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const result = useSelector(state => state.userReducer);
    const [token, setToken] = useState(!!localStorage.getItem('token'));

    /* input 태그 입력 값 state 관리 */
    const [loginInfo, setLoginInfo] = useState(
        {
            userId : '',
            userPwd : ''
        }
    );

    /* 경고 메시지 표시 여부 관리 */
    const [showAlert, setShowAlert] = useState(false);

    /* 입력 값 변경 시 이벤트 핸들러 */
    const onChangeHandler = (e) => {
        setLoginInfo(
            {
                ...loginInfo,
                [e.target.name]: e.target.value
            }
        );
        setShowAlert(false); // 입력값 변경 시 경고 메시지 숨김
    };

    /* 로그인 버튼 클릭 시 동작 */
    const onClickHandler = async () => {
        const { userId, userPwd } = loginInfo;

        // 입력값 유효성 검사
        if (!userId || !userPwd) {
            setShowAlert(true); // 경고 메시지 표시
            return;
        }

        // 로그인 요청을 디스패치()
        const result = await dispatch(callLoginAPI(loginInfo));

        // 로그인 실패 시 처리
        if (typeof result === 'string') {
            alert(result); // alert 메시지로 failType 표시
        } else {
            // 로그인 성공 시 확인
            setToken(!!localStorage.getItem('token'));
        }

    }

    // useEffect를 사용하여 로그인 상태에 따라 네비게이션 처리
    useEffect(() => {
        
        if (token) {
            window.location.href = '/'; // 로그인 성공 시 메인 페이지로 이동
        }
    }, [token, navigate]); // isLoggedIn이 변경될 때마다 실행
    
    return (
        <div className="login-wrap">
            <span id='HealingPets'>Healing Pets🍃</span>

            {/* 입력 필드와 로그인 버튼을 감싸는 form-group */}
            <div className="form-group">
                <input
                    type="text"
                    name="userId"
                    id='loginForm1'
                    value={loginInfo.userId}
                    onChange={onChangeHandler}
                    placeholder="ID"
                />
                <input
                    type="password"
                    name="userPwd"
                    id='loginForm2'
                    value={loginInfo.userPwd}
                    onChange={onChangeHandler}
                    placeholder="PWD"
                />
            <button id='login-button' onClick={onClickHandler}>로그인</button>
            </div>

            {/* 링크를 감싸는 link-group */}
            <div className="link-group">
                <NavLink style={{ textDecoration: 'none'}} to="/findID">
                    <span id='find-ID'>ID 찾기</span>
                </NavLink>
                <NavLink style={{textDecoration: 'none'}} to="/changePWD">
                    <span id='change-PWD'>비밀번호 변경</span>
                </NavLink>
            </div>

            {showAlert && (
                <AlertMessage1/>
            )}
        </div>
    );
}

export default Login;
