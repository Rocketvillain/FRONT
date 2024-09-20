import '../../css/user/ChangePWD.css';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AlertMessage1 from '../../components/commons/AlertMessage1';

function ChangePWD() {

    const dispatch = useDispatch();

    /* input 태그 입력 값 state 관리 */
    const [changePWDInfo, setChangePWDInfo] = useState(
        {
            id : '',
            name : '',
            email : ''
        }
    );

    /* 경고 메시지 표시 여부 관리 */
    const [showAlert, setShowAlert] = useState(false);

    /* 입력 값 변경 시 이벤트 핸들러 */
    const onChangeHandler = (e) => {
        setChangePWDInfo(
            {
                ...changePWDInfo,
                [e.target.name] : e.target.value
            }
        );
        setShowAlert(false);
    }

    /* 찾기 버튼 클릭 시 동작 */
    const onClickHandler = () => {
        const { id, name, email } = changePWDInfo;

        // 입력값 유효성 검사
        if (!id || !name || !email) {
            setShowAlert(true); // 경고 메시지 표시
            return;
        }

        /* findIDInfo에 담긴 정보를 통해 userId 조회 */
        // dispatch(callLoginAPI(loginInfo));

    }

    return (
        <>
            <div className="login-wrap">
                <span id='span1'>비밀번호 변경</span>
                <span id='HealingPets2'>Healing Pets🍃</span>
                <input type="text" name="id" id='loginForm3' value={ changePWDInfo.id } onChange={ onChangeHandler } placeholder="ID" /> &nbsp;&nbsp;&nbsp;
                <input type="text" name="name" id='loginForm4' value={ changePWDInfo.name } onChange={ onChangeHandler } placeholder="NAME" /> &nbsp;&nbsp;&nbsp;
                <input type="text" name="email" id='loginForm2' value={ changePWDInfo.email } onChange={ onChangeHandler } placeholder="EMAIL" />
                <button id='login-button' onClick={onClickHandler}>확인</button>
                {showAlert && (
                    <AlertMessage1/>
                )}
            </div>
        </>
    )
}

export default ChangePWD