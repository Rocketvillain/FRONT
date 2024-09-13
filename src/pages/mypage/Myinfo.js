import '../../css/component/MyPage.css'
import React, { useState, useRef,useEffect } from 'react';

// 마이페이지 내 정보 조회

function MyInfo() {
    const [image, setImage] = useState(null); // 기본 프로필 이미지 설정
    const buttonRef = useRef(null);
    const [buttonPosition, setButtonPosition] = useState({ right: 0, bottom: 0 });
    const pageContentRef = useRef(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0])); // 새로운 이미지 미리보기
        }
    };

    const handleFileInputClick = () => {
        // 등록 버튼 클릭 시 파일 선택 창을 띄움
        document.getElementById('fileInput').click();
    };

    useEffect(() => {
        const handleResize = () => {
            if (pageContentRef.current) {
                const pageContentRect = pageContentRef.current.getBoundingClientRect();
                setButtonPosition({
                    right: window.innerWidth - pageContentRect.right + 20, // 오른쪽에 맞춰서 고정
                    bottom: window.innerHeight - pageContentRect.bottom + 20, // 하단에 맞춰서 고정
                });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 처음 렌더링 시 위치 설정

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="page-content">
            <div className="myinfo">
                {/* 개인 정보 헤더 */}
                <h1>개인 정보</h1>

                <div className="info-section">
                    {/* 프로필 이미지 등록 관련 내용 */}
                    <div className="profile-image-container">
                        <label>프로필 이미지</label>
                        <img
                            src={image ? image : '/images/beforeUser.png'}
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
                    <label>ID</label>
                    <input name="ID" type="text" placeholder="user01" disabled />

                    <label>NAME</label>
                    <input name="name" type="text" placeholder="동동구리" />

                    <label>EMAIL</label>
                    <input name="email" type="text" placeholder="user01@gmail.com" />

                    <label>PHONE</label>
                    <input name="phone" type="text" placeholder="010-1234-5678" />

                    <label>PWD</label>
                    <input name="pwd" type="password" placeholder="********" />

                    {/* ※문구들은 비밀번호 필드 아래로 이동 */}
                    <p className="info-note">
                        *비밀번호는 반드시 특수문자와 함께 8자리 이상 입력해주세요.
                        <p style={{ color: 'red' }}>
                            ※이메일 또는 전화번호를 통해 예약 메시지를 수신할 수 있습니다.
                            <br />
                            ※정보를 수정하신 후 확인 버튼을 클릭하셔야 정보 수정이 완료됩니다.
                            <p style={{ color: 'blue' }}>※회원 이미지는 선택사항입니다.</p>
                        </p>
                    </p>
                </div>
            </div>

            {/* 확인 버튼은 page-content 오른쪽 하단에 위치 */}
            <div
                ref={buttonRef}
                className="button-container"
                style={{
                    position: 'fixed',
                    right: `${buttonPosition.right}px`,
                    bottom: `${buttonPosition.bottom}px`,
                }}
            >
                <button className="checkbutton">확인</button>
            </div>
        </div>
    );
}

export default MyInfo;
