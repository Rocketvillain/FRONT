import '../../css/user/Login.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { callLoginAPI } from '../../api/UserAPICalls';
import { NavLink, Navigate } from 'react-router-dom';
import AlertMessage1 from '../../components/commons/AlertMessage1';

function Login() {

    const dispatch = useDispatch();
    const result = useSelector(state => state.userReducer);
    const loginStatus = !!localStorage.getItem('isLogin');

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
    const onClickHandler = () => {
        const { userId, userPwd } = loginInfo;

        // 입력값 유효성 검사
        if (!userId || !userPwd) {
            setShowAlert(true); // 경고 메시지 표시
            return;
        }

        /* loginInfo에 대한 유효성 검사 후 호출 */
        dispatch(callLoginAPI(loginInfo));

    }

    /* 로그인 상태인데 호출할 경우 메인으로 */
    if(loginStatus) {
        return <Navigate to="/" replace={ true }/>
    }
    
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
