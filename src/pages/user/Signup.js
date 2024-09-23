import React, { useState, useEffect } from 'react';
import '../../css/Signup.css'; // 통합된 CSS 파일 연결

function Signup() {
    const [activeTab, setActiveTab] = useState('user');
    const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태
    const [verificationCode, setVerificationCode] = useState('');
    const [inputVerificationCode, setInputVerificationCode] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordMatched, setIsPasswordMatched] = useState(false);

    const switchTab = (tab) => {
        setActiveTab(tab);
    };

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
        species: '',
        gender: '',
        hospitalName: '',
        address: '',
        businessNo: '',
        owner: '',
        category: [],
    });

    const [isHospitalNameEntered, setIsHospitalNameEntered] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const newCategory = checked
                ? [...formData.category, value]
                : formData.category.filter((category) => category !== value);
            setFormData({
                ...formData,
                category: newCategory,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });

            if (name === 'hospitalName') {
                setIsHospitalNameEntered(value.trim() !== '');
            }
        }
    };

    // 비밀번호 유효성 검사 함수
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/; // 8자리 이상, 특수문자 포함
        return passwordRegex.test(password);
    };

    // 비밀번호 유효성 및 확인 상태 업데이트
    useEffect(() => {
        if (formData.password) {
            if (validatePassword(formData.password)) {
                setPasswordMessage('✔ 비밀번호가 유효합니다.');
                setIsPasswordValid(true);
            } else {
                setPasswordMessage('비밀번호는 특수 문자를 포함해 8자리 이상이어야 합니다.');
                setIsPasswordValid(false);
            }
        }

        if (formData.confirmPassword) {
            if (formData.password === formData.confirmPassword) {
                setConfirmPasswordMessage('✔ 비밀번호가 일치합니다.');
                setIsPasswordMatched(true);
            } else {
                setConfirmPasswordMessage('일치하지 않는 비밀번호입니다.');
                setIsPasswordMatched(false);
            }
        }
    }, [formData.password, formData.confirmPassword]);

    // 이메일 인증 코드 전송
    const sendEmailVerification = async () => {
        if (!formData.email) {
            setEmailMessage('이메일을 입력하세요.');
            return;
        }

        const response = await fetch('/api/send-email-verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email }),
        });

        if (response.ok) {
            setEmailMessage('인증 코드가 이메일로 발송되었습니다.');
        } else {
            setEmailMessage('인증 코드 발송에 실패했습니다.');
        }
    };

    // 이메일 인증 코드 확인
    const verifyEmailCode = async () => {
        const response = await fetch('/api/verify-email-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email, code: inputVerificationCode }),
        });

        if (response.ok) {
            setIsEmailVerified(true);
            setEmailMessage('이메일 인증에 성공했습니다.');
        } else {
            setEmailMessage('인증 코드가 일치하지 않습니다.');
        }
    };

    // 폼 제출 시 유효성 검사
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isPasswordValid) {
            setErrorMessage("비밀번호는 특수 문자를 포함해 8자리 이상이어야 합니다.");
            return;
        }

        if (!isPasswordMatched) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        setErrorMessage(''); // 오류 메시지 초기화
        console.log('Form Data:', formData);
    };

    return (
        <div>
            <div className="signup-container">
                <div className="signup-tabs">
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

                {activeTab === 'user' && (
                    <div className="signup-form">
                        <h2> </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="user-info-container">
                                <div className="user-info">
                                    <div className="form-input-box">
                                        <label>ID</label>
                                        <div className="input-with-button">
                                            <input
                                                type="text"
                                                name="id"
                                                value={formData.id}
                                                onChange={handleChange}
                                                required
                                                placeholder="아이디를 입력하세요"
                                            />
                                            <button className="duplicate-check">중복확인</button>
                                        </div>
                                    </div>
                                    <div className="form-input-box">
                                        <label>PASSWORD</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="비밀번호를 입력하세요"
                                        />
                                        <p className={`password-message ${isPasswordValid ? 'valid' : 'invalid'}`}>
                                            {passwordMessage}
                                        </p>
                                    </div>
                                    <div className="form-input-box">
                                        <label>CONFIRM PASSWORD</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            placeholder="비밀번호를 한 번 더 입력하세요"
                                        />
                                        <p className={`password-message ${isPasswordMatched ? 'valid' : 'invalid'}`}>
                                            {confirmPasswordMessage}
                                        </p>
                                    </div>

                                    {/* 오류 메시지 표시 */}
                                    {errorMessage && <p className="changePWD-error-message">{errorMessage}</p>}

                                    <div className="form-input-box">
                                        <label>NAME</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="성함을 입력하세요"
                                        />
                                    </div>
                                    <div className="form-input-box">
                                        <label>PHONE</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="핸드폰 번호를 입력하세요 '-'포함"
                                        />
                                    </div>
                                    <div className="form-input-box">
                                        <label>EMAIL</label>
                                        <div className="input-with-button2">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="이메일을 입력하세요 '@'포함"
                                            />
                                            <button type="button" className="duplicate-check" onClick={sendEmailVerification}>
                                                인증
                                            </button>
                                        </div>
                                        {emailMessage && <p>{emailMessage}</p>}
                                    </div>

                                    {/* 인증 코드 입력 필드 */}
                                    {verificationCode && (
                                        <div className="form-input-box">
                                            <label>인증 코드</label>
                                            <input
                                                type="text"
                                                value={inputVerificationCode}
                                                onChange={(e) => setInputVerificationCode(e.target.value)}
                                                placeholder="인증 코드를 입력하세요"
                                            />
                                            <button type="button" onClick={verifyEmailCode}>코드 확인</button>
                                        </div>
                                    )}

                                    {isEmailVerified && <p>이메일 인증이 완료되었습니다.</p>}
                                </div>
                                <div className="pet-info">
                                    <div className="form-input-box">
                                        <label>MY PET</label>
                                        <input
                                            type="text"
                                            name="petName"
                                            value={formData.petName}
                                            onChange={handleChange}
                                            placeholder="반려동물 이름을 입력하세요"
                                        />
                                    </div>

                                    {formData.petName && (
                                    <>
                                        <div className="form-input-box">
                                            <label>AGE</label>
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                placeholder="반려동물 나이를 입력하세요"
                                            />
                                        </div>
                                        <div className="form-input-box">
                                            <label>WEIGHT(kg)</label>
                                            <input
                                                type="number"
                                                name="weight"
                                                value={formData.weight}
                                                onChange={handleChange}
                                                placeholder="반려동물 몸무게를 입력하세요"
                                            />
                                        </div>
                                        <div className="form-input-box species-box">
                                            <label>SPECIES</label>
                                            <div className="species-radio">
                                                <input
                                                    type="radio"
                                                    name="species"
                                                    value="dog"
                                                    checked={formData.species === 'dog'}
                                                    onChange={handleChange}
                                                />
                                                <label>DOG</label>
                                                <input
                                                    type="radio"
                                                    name="species"
                                                    value="cat"
                                                    checked={formData.species === 'cat'}
                                                    onChange={handleChange}
                                                />
                                                <label>CAT</label>
                                                <input
                                                    type="radio"
                                                    name="species"
                                                    value="other"
                                                    checked={formData.species === 'other'}
                                                    onChange={handleChange}
                                                />
                                                <label>OTHER</label>
                                            </div>
                                        </div>
                                        <div className="form-input-box">
                                            <label>KIND</label>
                                            <input
                                                type="text"
                                                name="kind"
                                                value={formData.kind}
                                                onChange={handleChange}
                                                placeholder="반려동물 종을 입력하세요 예) 말티즈"
                                            />
                                        </div>
                                        <div className="form-input-box gender-box">
                                            <label>GENDER</label>
                                            <div className="gender-radio">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={formData.gender === 'male'}
                                                    onChange={handleChange}
                                                />
                                                <label>남</label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    checked={formData.gender === 'female'}
                                                    onChange={handleChange}
                                                />
                                                <label>여</label>
                                            </div>
                                        </div>
                                    </>
                                    )}
                                </div>
                            </div>
                        </form>
                        <button type="submit" className="signup-user-btn">
                            회원가입
                        </button>
                    </div>
                )}

                {activeTab === 'hospital' && (
                    <div className="signup-form hospital-form">
                        <h2> </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="user-info-container">
                                <div className="user-info">
                                    <div className="form-input-box">
                                        <label>ID</label>
                                        <div className="input-with-button">
                                            <input
                                                type="text"
                                                name="id"
                                                value={formData.id}
                                                onChange={handleChange}
                                                required
                                                placeholder="아이디를 입력하세요"
                                            />
                                            <button className="duplicate-check">중복확인</button>
                                        </div>
                                    </div>
                                    <div className="form-input-box">
                                        <label>PASSWORD</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="비밀번호를 입력하세요"
                                        />
                                        <p className={`password-message ${isPasswordValid ? 'valid' : 'invalid'}`}>
                                            {passwordMessage}
                                        </p>
                                    </div>
                                    <div className="form-input-box">
                                        <label>CONFIRM PASSWORD</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            placeholder="비밀번호를 한 번 더 입력하세요"
                                        />
                                        <p className={`password-message ${isPasswordMatched ? 'valid' : 'invalid'}`}>
                                            {confirmPasswordMessage}
                                        </p>
                                    </div>

                                    {/* 오류 메시지 표시 */}
                                    {errorMessage && <p className="changePWD-error-message">{errorMessage}</p>}

                                    <div className="form-input-box">
                                        <label>NAME</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="성함을 입력하세요"
                                        />
                                    </div>
                                    <div className="form-input-box">
                                        <label>PHONE</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="핸드폰 번호를 입력하세요 '-'포함"
                                        />
                                    </div>
                                    <div className="form-input-box">
                                        <label>EMAIL</label>
                                        <div className="input-with-button2">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="이메일을 입력하세요 '@'포함"
                                            />
                                            <button type="button" className="duplicate-check" onClick={sendEmailVerification}>
                                                인증
                                            </button>
                                        </div>
                                        {emailMessage && <p>{emailMessage}</p>}
                                    </div>
                                </div>

                                <div className="hospital-info">
                                    <div className="form-input-box">
                                        <label>HOSPITAL NAME</label>
                                        <input
                                            type="text"
                                            name="hospitalName"
                                            value={formData.hospitalName}
                                            onChange={handleChange}
                                            placeholder="병원 이름을 입력하세요"
                                            required
                                        />
                                    </div>

                                    {isHospitalNameEntered && (
                                    <>
                                        <div className="form-input-box">
                                            <label>ADDRESS</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="병원 주소를 입력하세요"
                                            />
                                        </div>
                                        <div className="form-input-box">
                                            <label>BUSINESS_NO</label>
                                            <input
                                                type="text"
                                                name="businessNo"
                                                value={formData.businessNo}
                                                onChange={handleChange}
                                                placeholder="사업자 번호를 입력하세요"
                                            />
                                        </div>
                                        <div className="form-input-box">
                                            <label>OWNER</label>
                                            <input
                                                type="text"
                                                name="owner"
                                                value={formData.owner}
                                                onChange={handleChange}
                                                placeholder="대표자 이름을 입력하세요"
                                            />
                                        </div>
                                        <div className="form-input-box category-section">
                                            <label>CATEGORY</label>
                                            <div className="category-item">
                                                <label>진료</label>
                                                <input
                                                    type="checkbox"
                                                    name="category"
                                                    value="진료"
                                                    checked={formData.category.includes('진료')}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="category-item">
                                                <label>수술</label>
                                                <input
                                                    type="checkbox"
                                                    name="category"
                                                    value="수술"
                                                    checked={formData.category.includes('수술')}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="category-item">
                                                <label>미용</label>
                                                <input
                                                    type="checkbox"
                                                    name="category"
                                                    value="미용"
                                                    checked={formData.category.includes('미용')}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </>
                                    )}
                                </div>
                            </div>
                        </form>
                        <button type="submit" className="signup-user-btn">
                            병원 회원가입
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;
