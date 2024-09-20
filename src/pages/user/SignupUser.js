//  회원가입(사용자) 페이지
import React, { useState } from 'react';
import '../../css/signup/SignupUser.css'; // 외부 CSS 파일을 import

function SignupUser() {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        email: '',
        petName: '',
        age: '',
        kind: '',
        weight: '',
        gender: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 제출 로직
        console.log("회원 정보:", formData);
    };

    return (
        <div className="signup-user-container">
            <div className="user-form-box">
                <div className="user-register">
                    <h2>유저등록</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="user-input-box">
                            <label>ID</label>
                            <input type="text" name="id" value={formData.id} onChange={handleChange} required />
                            <button className="user-duplicate-check">중복확인</button>
                        </div>
                        <div className="user-input-box">
                            <label>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="user-input-box">
                            <label>Password 확인</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                        <div className="user-input-box">
                            <label>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="user-input-box">
                            <label>Phone</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="user-input-box">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </form>
                </div>
                <div className="user-pet-register">
                    <h2>병원등록</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="user-input-box">
                            <label>MyPet</label>
                            <input type="text" name="petName" value={formData.petName} onChange={handleChange} required />
                        </div>
                        <div className="user-input-box">
                            <label>Age</label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                        </div>
                        <div className="user-input-box">
                            <label>Kind</label>
                            <input type="text" name="kind" value={formData.kind} onChange={handleChange} required />
                        </div>
                        <div className="user-input-box">
                            <label>Weight (kg)</label>
                            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
                        </div>
                        <div className="user-input-box">
                            <label>Gender</label>
                            <input type="radio" name="gender" value="male" onChange={handleChange} /> 남
                            <input type="radio" name="gender" value="female" onChange={handleChange} /> 여
                            <input type="radio" name="gender" value="neutral" onChange={handleChange} /> 중성
                        </div>
                        <button type="submit" className="user-register-btn">등록</button>
                    </form>
                </div>
            </div>
            <button className="signup-user-btn">회원가입</button>
        </div>
    );
}

export default SignupUser;
