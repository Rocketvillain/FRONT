import '../../css/component/MyPage.css'
import React, { useState } from 'react';

//  마이페이지 내 정보 조회

function MyInfo() {

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0])); // 선택한 이미지 미리보기
    };

    return (
        <div className="page-content">
            <div className='myinfo'>
                <h1>개인 정보</h1>
                <div className="info-section">
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
                    <p className="info-note">*비밀번호는 반드시 특수문자와 함께 8자리 이상 입력해주세요.</p>
                </div>
                <div className="button-container">
                    <p style={{color: 'red'}}>※이메일 또는 전화번호를 통해 예약 메시지를 수신할 수 있습니다.</p>
                    <p style={{color: 'red'}}>※정보를 수정하신 후 확인 버튼을 클릭하셔야 정보 수정이 완료됩니다.</p>
                    <p style={{color: 'blue'}}>※회원 이미지는 선택사항입니다.</p>
                    <button className='checkbutton'>확인</button>
                </div>
                <div className='profile-image-container'>
                    <label>프로필 이미지</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {image && <img src={image} alt="Profile" className="profile-image-preview" />}
                    <button type="submit" className='updatebutton'>등록</button>
                </div>
            </div>
        </div>
    );
}

export default MyInfo;