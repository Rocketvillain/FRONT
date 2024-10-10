import '../../css/component/MyPage.css';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserInfo } from '../../api/UserAPICalls';
import { loadUserInfo } from '../../modules/UserModule';
import { jwtDecode } from 'jwt-decode';

// 마이페이지 내 정보 조회

function MyInfo() {

    const dispatch = useDispatch();
    const [image, setImage] = useState(null); // 미리보기 이미지
    const userData = useSelector((state) => state.user.userInfo); // userInfo 불러오기

    
    const [userInfo, setUserInfo] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        pwd: '',
        pwdCheck: '',
        image: userData.image // 프로필 이미지 경로
    });

    const buttonRef = useRef(null);
    const [buttonPosition, setButtonPosition] = useState({ right: 0, bottom: 0 });
    const pageContentRef = useRef(null);

    // 프로필 이미지 변경 핸들러
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
           
            
            // 서버로 이미지 파일 업로드
            fetch(`http://localhost:8080/api/v1/user/image/${userData.userId}`, {
                method: 'PUT',
                body: formData
            })

            .then(response => response.json())
            .then(data => {
                console.log('data',data);
                
                if (data.httpStatusCode === 200) {
                    // 업로드된 이미지 경로를 상태로 저장
                    setUserInfo((prevUserInfo) => ({
                        ...prevUserInfo,
                        image: 'http://localhost:8080/uploads/' + data.results.user2.image
                    }));
                } else {
                    alert('이미지 업로드에 실패했습니다.');
                }
            })
            .catch(error => {
                console.error('이미지 업로드 오류:', error);
                setImage(null); // 업로드 실패 시 기본 이미지로 되돌리기
            });
        }
    };

    const handleFileInputClick = () => {
        // 등록 버튼을 클릭했을 때 파일 선택 창을 엽니다
        document.getElementById('fileInput').click();
    };

    // 사용자 입력 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value
        }));
    };

    // 정보 수정 후 서버에 저장하는 함수
    const handleSave = () => {

        const { id, name, email, phone, pwd, pwdCheck, image } = userInfo;

        // 비밀번호 유효성 검사
        if (pwd !== pwdCheck) {
            alert('비밀번호를 동일하게 입력하지 않았습니다!')

            return;
        }

        // 입력값 유효성 검사
        if (!name) {
            alert('이름은 공백이 될 수 없습니다!')
            return;
        }
        if (!email) {
            alert('이메일은 공백이 될 수 없습니다!')
            return;
        }
        if (!phone) {
            alert('전화번호는 공백이 될 수 없습니다!')
            return;
        }

        const modifyUserInfo = {
            userId: id,
            name,
            email,
            phone,
            ...(pwd && { userPwd: pwd }) // 비밀번호가 입력된 경우에만 포함
        };

        dispatch(updateUserInfo(id, modifyUserInfo)); // Redux 액션으로 정보 업데이트
        alert('정보가 성공적으로 수정되었습니다.');

    };

    useEffect(() => {

        if (userData) {
        setUserInfo({
            id: userData.userId || '',
            name: userData.userName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            pwd: '', 
            pwdCheck: '',
            
        });
        } 
    }, [userData]);

    return (
        <div className="my-info">
            <h2>개인 정보</h2>

                <div className="info-section">
                    {/* 프로필 이미지 등록 관련 내용 */}
                    <div className="profile-image-container">
                        <label>프로필 이미지</label>
                        <img
                            src={userInfo.image ? 'http://localhost:8080/uploads/'+userInfo.image : '/images/beforeUser.png'}
                            alt="Profile"
                            className="profile-image-preview"
                        />
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }} // 파일 선택 창을 숨김
                        />
                        <button type="button" className="updatebutton" onClick={handleFileInputClick}>등록</button>
                    </div>

                {/* 사용자 정보 입력 폼 */}
                <label>ID</label>
                <input name="id" type="text" value={userInfo.id} disabled />

                <label>NAME</label>
                <input name="name" type="text" value={userInfo.name} onChange={handleInputChange} />

                <label>EMAIL</label>
                <input name="email" type="text" value={userInfo.email} onChange={handleInputChange} />

                <label>PHONE</label>
                <input name="phone" type="text" value={userInfo.phone} onChange={handleInputChange} />

                <label>PWD</label>
                <input name="pwd" type="password" value={userInfo.pwd} onChange={handleInputChange} placeholder="새로운 비밀번호를 입력하세요" />

                <label>PWD 확인</label>
                <input name="pwdCheck" type="password" value={userInfo.pwdCheck} onChange={handleInputChange} placeholder="비밀번호를 다시 입력하세요" />

                {/* ※문구들은 비밀번호 필드 아래로 이동 */}
                    <div className="my-info-note">
                        <p style={{ color: 'red' }}>
                            *비밀번호는 반드시 특수문자와 함께 8자리 이상 입력해주세요.
                        </p>
                        <p style={{ color: 'red' }}>
                            ※이메일 또는 전화번호를 통해 예약 메시지를 수신할 수 있습니다.
                            <br />
                            ※정보를 수정하신 후 확인 버튼을 클릭하셔야 정보 수정이 완료됩니다.
                        </p>
                        <p style={{ color: 'blue' }}>
                            ※회원 이미지는 선택사항입니다.
                        </p>

                    </div>
            </div>

            {/* 확인 버튼 */}
            <div className="my-info-button-container">
                <button className="my-info-checkbutton" onClick={handleSave}>확인</button>
            </div>
        </div>
    );

}

export default MyInfo;
