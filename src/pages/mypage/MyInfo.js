import '../../css/component/MyPage.css';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

// 마이페이지 내 정보 조회

function MyInfo() {
    const [image, setImage] = useState(null); // 미리보기 이미지
    const [userInfo, setUserInfo] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        pwd: '', // 사용자가 비밀번호를 수정할 때만 이 값을 업데이트
        profileImage: '' // 프로필 이미지 경로
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const buttonRef = useRef(null);
    const [buttonPosition, setButtonPosition] = useState({ right: 0, bottom: 0 });
    const pageContentRef = useRef(null);
    const [originalPassword, setOriginalPassword] = useState(''); // 기존 비밀번호를 따로 저장

    // 프로필 이미지 변경 핸들러
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('profileImage', file);

            // 서버로 이미지 파일 업로드
            fetch('/api/uploadProfileImage', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // 업로드된 이미지 경로를 상태로 저장
                    setUserInfo((prevUserInfo) => ({
                        ...prevUserInfo,
                        profileImage: data.imageUrl
                    }));
                    setImage(data.imageUrl); // 미리보기 이미지 설정
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

    // 사용자 정보를 가져오는 함수
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = localStorage.getItem('userId'); // 사용자 ID를 localStorage에서 가져옴
                if (!userId) {
                    setError("로그인 정보가 없습니다. 다시 로그인해주세요.");
                    setLoading(false);
                    return;
                }
                
                const response = await fetch(`/api/userInfo?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
                }

                const data = await response.json();
                setUserInfo({
                    id: data.id || '',
                    name: data.name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    pwd: '', // 비밀번호는 클라이언트로 가져오지 않음
                    profileImage: data.profileImage || '/images/beforeUser.png' // 서버에서 받은 프로필 이미지 URL
                });
                setImage(data.profileImage); // 프로필 이미지 미리보기 설정
                setOriginalPassword(data.pwd); // 서버에서 받은 비밀번호 저장
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    // 사용자 입력 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value
        }));
    };

    // 정보 수정 후 서버에 저장하는 함수
    const handleSave = async () => {
        try {
            // 비밀번호 입력 필드가 비어있다면, 기존 비밀번호를 유지
            const updatedInfo = { ...userInfo, pwd: userInfo.pwd || originalPassword };

            const response = await fetch(`/api/updateUserInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedInfo),
            });

            if (!response.ok) {
                throw new Error('정보 수정에 실패했습니다.');
            }

            alert('정보가 성공적으로 수정되었습니다.');
        } catch (error) {
            console.error('정보 수정 중 오류 발생:', error);
            alert('정보 수정 중 오류가 발생했습니다.');
        }
    };

    useLayoutEffect(() => {
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

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>오류 발생: {error}</p>;
    }

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
                <button className="checkbutton" onClick={handleSave}>확인</button>
            </div>
        </div>
    );
}

export default MyInfo;
