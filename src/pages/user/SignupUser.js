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

    const [showPetInfo, setShowPetInfo] = useState(false);  // 펫 정보 입력란 표시 여부
    const [filteredPets, setFilteredPets] = useState([]);  // 필터링된 펫 목록
    const petsList = ['Cat', 'Dog', 'Rabbit'];  // 펫 리스트 (필요에 따라 확장 가능)

    // 입력값 변경 시 폼 데이터 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // MyPet 필드에서 입력 시 자동으로 드롭다운 필터링
        if (name === 'petName') {
            if (value !== '') {
                const filtered = petsList.filter(pet => pet.toLowerCase().includes(value.toLowerCase()));
                setFilteredPets(filtered);
                setShowPetInfo(true);
            } else {
                setShowPetInfo(false);
            }
        }
    };

    // 드롭다운에서 펫 선택 시 입력 필드 자동 채우기
    const handlePetSelect = (pet) => {
        setFormData({
            ...formData,
            petName: pet,
        });
        setShowPetInfo(false);  // 드롭다운 숨기기
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 제출 로직
        console.log("회원 정보:", formData);
    };

    return (
        <div className="signup-user-container">
            <div className="user-form-box">
                {/* 유저 등록 폼 */}
                <div className="user-register">
                    <h2>유저등록</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="user-input-box">
                            <label>ID</label>
                            <input 
                                type="text" 
                                name="id" 
                                value={formData.id} 
                                onChange={handleChange} 
                                required 
                            />
                            <button className="user-duplicate-check">중복확인</button>
                        </div>
                        <div className="user-input-box">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="user-input-box">
                            <label>Password 확인</label>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="user-input-box">
                            <label>Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="user-input-box">
                            <label>Phone</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="user-input-box">
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </form>
                </div>

                {/* 병원 등록(펫 정보) 폼 */}
                <div className="user-pet-register">
                    <h2>병원등록</h2>
                    <div className="user-input-box">
                        <label>MyPet</label>
                        <div className="user-dropdown">
                            <input 
                                type="text" 
                                name="petName" 
                                value={formData.petName} 
                                onChange={handleChange} 
                                placeholder="Enter pet name" 
                            />
                            {/* 펫 이름 입력 시 드롭다운 표시 */}
                            {showPetInfo && filteredPets.length > 0 && (
                                <div className="user-dropdown-menu">
                                    {filteredPets.map((pet, index) => (
                                        <div 
                                            key={index} 
                                            className="user-dropdown-item" 
                                            onClick={() => handlePetSelect(pet)}
                                        >
                                            {pet}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 선택 사항: 펫 정보 입력란 */}
                    {formData.petName && (
                        <>
                            <div className="user-input-box">
                                <label>Age</label>
                                <input 
                                    type="number" 
                                    name="age" 
                                    value={formData.age} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="user-input-box">
                                <label>Kind</label>
                                <input 
                                    type="text" 
                                    name="kind" 
                                    value={formData.kind} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="user-input-box">
                                <label>Weight (kg)</label>
                                <input 
                                    type="number" 
                                    name="weight" 
                                    value={formData.weight} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="user-input-box">
                                <label>Gender</label>
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="male" 
                                    onChange={handleChange} 
                                /> 남
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="female" 
                                    onChange={handleChange} 
                                /> 여
                            </div>
                        </>
                    )}
                </div>
            </div>
            <button className="signup-user-btn">회원가입</button>
        </div>
    );
}

export default SignupUser;
