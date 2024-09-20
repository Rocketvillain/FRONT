import React, { useState } from 'react';
import '../../css/signup/SignupHos.css';

function SignupHos() {
  // 탭 상태 관리 (user: 유저 등록, hospital: 병원 등록)
  const [activeTab, setActiveTab] = useState('user');

  // 탭 변경 함수
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="signup-container">
      <div className="signup-tabs">
        {/* 탭 버튼 */}
        <button 
          className={`tab-button ${activeTab === 'user' ? 'active' : ''}`} 
          onClick={() => switchTab('user')}
        >
          유저 등록
        </button>
        <button 
          className={`tab-button ${activeTab === 'hospital' ? 'active' : ''}`} 
          onClick={() => switchTab('hospital')}
        >
          병원 등록
        </button>
      </div>

      {/* 유저 등록 폼 */}
      {activeTab === 'user' && (
        <div className="signup-form user-form">
          <h2>유저 등록</h2>
          <form>
            <label>ID</label>
            <input type="text" name="id" required />
            <label>PWD</label>
            <input type="password" name="password" required />
            <label>PWD 확인</label>
            <input type="password" name="confirmPassword" required />
            <label>NAME</label>
            <input type="text" name="name" required />
            <label>PHONE</label>
            <input type="tel" name="phone" required />
            <label>EMAIL</label>
            <input type="email" name="email" required />
            <button type="submit">회원가입</button>
          </form>
        </div>
      )}

      {/* 병원 등록 폼 */}
      {activeTab === 'hospital' && (
        <div className="signup-form hospital-form">
          <h2>병원 등록</h2>
          <form>
            <label>HOSPITAL NAME</label>
            <input type="text" name="hospitalName" required />
            <label>ADDRESS</label>
            <input type="text" name="address" required />
            <label>business_No</label>
            <input type="text" name="businessNo" required />
            <label>DIRECTOR</label>
            <input type="text" name="director" required />
            <label>CATEGORY</label>
            <select name="category" required>
              <option value="">카테고리 선택</option>
              <option value="병원">병원</option>
              <option value="클리닉">클리닉</option>
            </select>
            <button type="submit">병원 회원가입</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignupHos;
