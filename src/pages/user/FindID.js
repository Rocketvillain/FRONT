import '../../css/user/FindID.css';
import { useState } from 'react';
import AlertMessage1 from '../../components/commons/AlertMessage1';
import { useNavigate } from 'react-router-dom';

function FindID() {

    const navigate = useNavigate();

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
    const onClickHandler =  async () => {
        const { name, phone } = findIDInfo;

        // 입력값 유효성 검사
        if (!name || !phone) {
            setShowAlert(true); // 경고 메시지 표시
            return;
        }

        /* findIDInfo에 담긴 정보를 통해 userId 조회 */
        // dispatch(callLoginAPI(loginInfo));

     
        
        const url = `http://localhost:8080/auth/find-id?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`
    
        try{
            const response = await fetch(url, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
               
                if (data && data.results) {
                    alert('사용자 ID: ' + data.results.userId); // 사용자 ID 표시
                } else {
                    alert('사용자 ID를 찾을 수 없습니다.');
                }
            } else {
                const errorData = await response.json();
                alert(errorData.message); // 오류 메시지 표시
            }
        } catch (error) {
            console.log('ID 찾기 실패: ' , error);
            setShowAlert(true); // 경고 메시지
        }

    }

    const handleBackClick = () => {
        navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
    };

    return (
        <>
            <div className="login-wrap">
                <span id='span1'>ID 찾기</span>
                <span id='HealingPets2'>Healing Pets🍃</span>
                <div className='form-group2'>
                <input type="text" name="name" id='loginForm1' value={ findIDInfo.name } onChange={ onChangeHandler } placeholder="NAME" /> &nbsp;&nbsp;&nbsp;
                <input type="text" name="phone" id='loginForm2' value={ findIDInfo.phone } onChange={ onChangeHandler } placeholder="PHONE" />
                <button id='login-button' onClick={onClickHandler}>검색</button>
                </div>
                {showAlert && (
                    <AlertMessage1/>
                )}
                <button className="back-button" onClick={handleBackClick}>↩</button>
            </div>
        </>
    )
}

export default FindID