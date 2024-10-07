import '../../css/user/Login.css';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { callLoginAPI } from '../../api/UserAPICalls';
import { NavLink, useNavigate } from 'react-router-dom';
import AlertMessage1 from '../../components/commons/AlertMessage1';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* input 태그 입력 값 state 관리 */
    const [loginInfo, setLoginInfo] = useState(
        {
            userId: '',
            userPwd: ''
        }
    );

    /* 경고 메시지 표시 여부 관리 */
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
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

        console.log("result 회원 상태 : ", result);

        // 로그인 실패 또는 탈퇴된 사용자일 때 처리
        if (result === 'secession') {
            setModalMessage('탈퇴 처리된 회원입니다.');
            setShowModal(true); // 경고 메시지 표시
        } else if (result === false || typeof result === 'string') {
            alert(result); // 로그인 실패 메시지 표시
        } else {
            // 로그인 성공 시 메인 페이지로 이동
            navigate('/');
        }
    };

    /* 키보드 엔터 키 눌렀을 때 동작 */
    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            onClickHandler();
        }
    }

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="login-wrap">
            <span id='HealingPets'>Healing Pets🍃</span>

            {/* 입력 필드와 로그인 버튼을 감싸는 form-group */}
            <div className="form-group" onKeyDown={onKeyDownHandler}>
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
                <NavLink style={{ textDecoration: 'none' }} to="/findID">
                    <span id='find-ID'>ID 찾기</span>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to="/changePWD">
                    <span id='change-PWD'>비밀번호 변경</span>
                </NavLink>
            </div>

            {/* 작성하지 않은 칸에 대한 경고 메시지 */}
            {showAlert && (
                <AlertMessage1 />  // 이 컴포넌트는 기본적으로 '작성하지 않은 칸이 있습니다.' 문구를 표시함
            )}

            {/* 탈퇴 회원 모달 창 표시 */}
            {showModal && (
                <div className="login-modal-overlay">
                    <div className="login-modal-content">
                        <span className="login-modal-message">{modalMessage}</span>
                        <button className="login-modal-close-button" onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
