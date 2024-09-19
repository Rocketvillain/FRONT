import '../../css/Login.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { callLoginAPI } from '../../api/UserAPICalls';
import { NavLink } from 'react-router-dom';

function Login() {

    const dispatch = useDispatch();
    const result = useSelector(state => state.userReducer);
    const loginStatus = !!localStorage.getItem('isLogin');

    /* input 태그 입력 값 state 관리 */
    const [loginInfo, setLoginInfo] = useState(
        {
            id : '',
            password : ''
        }
    );

    /* 입력 값 변경 시 이벤트 핸들러 */
    const onChangeHandler = (e) => {
        setLoginInfo(
            {
                ...loginInfo,
                [e.target.name] : e.target.value
            }
        );
    }

    /* 로그인 버튼 클릭 시 동작 */
    const onClickHandler = () => {

        /* loginInfo에 대한 유효성 검사 후 호출 */
        dispatch(callLoginAPI(loginInfo));

    }
    
    return (
        <>
        <div className="login-wrap">
            <span id='HealingPets'>Healing Pets🍃</span>
            <input type="text" name="id" id='login-id' value={ loginInfo.id } onChange={ onChangeHandler } placeholder="ID" /> &nbsp;&nbsp;&nbsp;
            <input type="password" name="password" id='login-pwd' value={ loginInfo.password } onChange={ onChangeHandler } placeholder="PWD" />
                <button id='login-button' onClick={onClickHandler}>로그인</button>
                <NavLink to="/findID">
                    <span id='find-ID'>ID 찾기</span>
                </NavLink>
                <NavLink to="/changePWD">
                    <span id='change-PWD'>비밀번호 변경</span>
                </NavLink>
        </div>
        </>
    )
}

export default Login;