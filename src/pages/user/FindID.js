import '../../css/user/FindID.css';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AlertMessage1 from '../../components/commons/AlertMessage1';

function FindID() {

    const dispatch = useDispatch();

    /* input 태그 입력 값 state 관리 */
    const [findIDInfo, setFindIDInfo] = useState(
        {
            name : '',
            phone : ''
        }
    );

    /* 경고 메시지 표시 여부 관리 */
    const [showAlert, setShowAlert] = useState(false);

    /* 입력 값 변경 시 이벤트 핸들러 */
    const onChangeHandler = (e) => {
        setFindIDInfo(
            {
                ...findIDInfo,
                [e.target.name] : e.target.value
            }
        );
        setShowAlert(false);
    }

    /* 찾기 버튼 클릭 시 동작 */
    const onClickHandler = () => {
        const { name, phone } = findIDInfo;

        // 입력값 유효성 검사
        if (!name || !phone) {
            setShowAlert(true); // 경고 메시지 표시
            return;
        }

        /* findIDInfo에 담긴 정보를 통해 userId 조회 */
        // dispatch(callLoginAPI(loginInfo));

    }

    return (
        <>
            <div className="login-wrap">
                <span id='span1'>ID 찾기</span>
                <span id='HealingPets2'>Healing Pets🍃</span>
                <input type="text" name="name" id='loginForm1' value={ findIDInfo.name } onChange={ onChangeHandler } placeholder="이름" /> &nbsp;&nbsp;&nbsp;
                <input type="text" name="phone" id='loginForm2' value={ findIDInfo.phone } onChange={ onChangeHandler } placeholder="전화번호" />
                <button id='login-button' onClick={onClickHandler}>검색</button>
                {showAlert && (
                    <AlertMessage1/>
                )}
            </div>
        </>
    )
}

export default FindID