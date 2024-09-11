import '../../css/component/Mypage.css'
import React, { useState } from 'react';

//  마이페이지 내 정보 조회

function Myinfo() {

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0])); // 선택한 이미지 미리보기
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 폼 제출 로직 추가
        console.log('폼 제출됨');
    };

    return (
        <div className="info-page">
            <div className='myinfo'>
                <h1>개인 정보</h1>
                <hr />
                <label>ID</label>
                <input name="ID" type="text" style={{ marginLeft: '58px' }} />
                <br />
                <br />
                <label>NAME</label>
                <input name="name" type="text" style={{ marginLeft: '28px' }} />
                <br />
                <br />
                <label>EMAIL</label>
                <input name="email" type="text" style={{ marginLeft: '28px' }} />
                <br />
                <br />
                <label>PHONE</label>
                <input name="phone" type="text" style={{ marginLeft: '20px' }} />
                <br />
                <br />
                <label>PWD</label>
                <input name="pwd" type="password" style={{ marginLeft: '37px' }} />
                <h4 style={{ color: 'red', fontSize: 13 }}>*비밀번호는 반드시 특수문자와 함께 8자리 이상 입력해주세요.</h4>
                <hr />
                <div className='button-container'>
                    <h4 style={{ color: 'red', fontSize: 13 }}>※이메일 또는 전화번호를 통해 예약 메세지를 수신할 수 있습니다.</h4>
                    <h4 style={{ color: 'red', fontSize: 13 }}>※정보를 수정하신 후 확인 버튼을 클릭하셔야 정보 수정이 완료됩니다.</h4>
                    <h4 style={{ color: 'blue', fontSize: 13 }}>※회원 이미지는 선택사항입니다.</h4>
                </div>
                <button className='checkbutton'>확인</button>
                <div className='profile-image-container' style={{ marginLeft: '20px', textAlign: 'center', borderBlockColor: '#28467A' }}>
                    <label>프로필 이미지</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ margin: '10px 0' }} />
                    {image && <img src={image} alt="Profile" style={{ width: '300px', height: '400px' }} />}
                    <div style={{ marginTop: '10px', width: '120px', height: '40px', border: 'white' }}>
                        <button type="submit" className='checkbutton'>등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myinfo;