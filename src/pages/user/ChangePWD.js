import '../../css/user/ChangePWD.css';
import { useState } from 'react';
import AlertMessage1 from '../../components/commons/AlertMessage1';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChangePWD() {

    const navigate = useNavigate();

    /* input 태그 입력 값 state 관리 */
    const [changePWDInfo, setChangePWDInfo] = useState(
        {
            userId : '',
            name : '',
            email : ''
        }
    );

    /* 비밀번호 입력 값 state 관리 */
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // 경고 메시지 상태 추가
    const [code, setCode] = useState(''); //경고 메세지 상태 추가
    /* 경고 메시지 표시 여부 관리 */
    const [showAlert, setShowAlert] = useState(false);

    /* 모달창 표시 여부 관리 */
    const [showModal, setShowModal] = useState(false);

    /* 입력 값 변경 시 이벤트 핸들러 */
    const onChangeHandler = (e) => {
        setChangePWDInfo({
            ...changePWDInfo,
            [e.target.name]: e.target.value
        });
        setShowAlert(false);
    };

    /* 비밀번호 변경 시 입력 값 핸들러 */
    const onPasswordChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
        setErrorMessage(''); // 비밀번호 입력 시 오류 메시지 초기화
    };

    /* 찾기 버튼 클릭 시 동작 */
    const onClickHandler = async() => {
        const { userId, name, email } = changePWDInfo;

        // 입력값 유효성 검사
        if (!userId || !name || !email) {
            alert('다시 입력해주세요.')
            setShowAlert(true); // 경고 메시지 표시
            return;
        }

        try{
            // 비밀번호 변경 요청을 위한 데이터
            const payload = { userId : userId, name : name, email: email};

            // 서버에 비밀번호 변경 요청
            await axios.post('http://localhost:8080/auth/request-reset-password', payload);

              alert('인증번호가 전송됬습니다.')
              // 요청이 성공하면 모달을 표시
              setShowModal(true);
        } catch (error) {
            //오류 처리
            setErrorMessage(error.response?.data?.message || '비밀번호 변경 요청에 실패했습니다.');
        }
        
    };

    /* 모달창 닫기 */
    const closeModal = () => {
        setShowModal(false);
        setErrorMessage(''); // 모달 창 닫을 때 오류 메시지 초기화
    };

    /* 비밀번호 변경 유효성 검사 */
    const validatePassword = () => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        return passwordRegex.test(newPassword);
    };

    /* 비밀번호 변경 버튼 클릭 시 동작 */
    const handleChangePassword = async () => {
        if (!validatePassword()) {
            setErrorMessage('비밀번호는 8자리 이상이며, 특수 문자를 포함해야 합니다.'); // 경고 메시지 설정
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.'); // 경고 메시지 설정
            return;
        }

        // 실제 비밀번호 변경 로직
        // dispatch(callChangePasswordAPI({ newPassword }));

        const payload = {
            userId: changePWDInfo.userId,
            name: changePWDInfo.name,
            email: changePWDInfo.email,
            newPassword: newPassword,
            code: code // 인증 코드 추가
        };

        try{

            const response = await axios.put('http://localhost:8080/auth/reset-password',payload);
            alert('비밀번호가 성공적으로 변경되었습니다.');
            navigate('/login'); // 비밀번호 변경 후 로그인 페이지로 이동
        } catch (error) {
            setErrorMessage(error.response?.data.message || '비밀번호 변경에 실패했습니다.');
        }
    };

    const handleBackClick = () => {
        navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
    };

    return (
        <>
            <div className="login-wrap">
                <span id='changePWD-title'>비밀번호 변경</span>
                <span id='changePWD-subtitle'>Healing Pets🍃</span>
                <div className='changePWD-form-group'>
                    <input type="text" name="userId" id='changePWD-id-input' value={ changePWDInfo.userId } onChange={ onChangeHandler } placeholder="ID" /> &nbsp;&nbsp;&nbsp;
                    <input type="text" name="name" id='changePWD-name-input' value={ changePWDInfo.name } onChange={ onChangeHandler } placeholder="NAME" /> &nbsp;&nbsp;&nbsp;
                    <input type="text" name="email" id='changePWD-email-input' value={ changePWDInfo.email } onChange={ onChangeHandler } placeholder="EMAIL" />
                    <button id='changePWD-submit-button' onClick={onClickHandler}>확인</button>
                </div>
                {showAlert && (
                    <AlertMessage1/>
                )}
                <button className="changePWD-back-button" onClick={handleBackClick}>↩</button>
            </div>

            {showModal && (
                <div className="changePWD-modal-container">
                    <div className="changePWD-modal-content">
                        <h2>비밀번호 변경</h2>
                        <p>새로운 비밀번호를 입력해주세요.</p>
                        <input
                            type="text"
                            name="code"
                            value={code}
                            onChange= {(e) => setCode(e.target.value)}
                            placeholder="인증 코드" 
                        ></input>
                        <input
                            type="password"
                            name="newPassword"
                            id="changePWD-new-password-input"
                            value={newPassword}
                            onChange={onPasswordChangeHandler}
                            placeholder="새 비밀번호"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            id="changePWD-confirm-password-input"
                            value={confirmPassword}
                            onChange={onPasswordChangeHandler}
                            placeholder="비밀번호 확인"
                        />
        

                        {/* 경고 메시지 표시 */}
                        {errorMessage && <p className="changePWD-error-message">{errorMessage}</p>}

                        <button className="changePWD-confirm-button" onClick={handleChangePassword}>비밀번호 변경</button>
                        <button className="changePWD-cancel-button" onClick={closeModal}>취소</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChangePWD;
