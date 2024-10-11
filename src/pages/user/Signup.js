import React, { useState, useEffect } from 'react';
import '../../css/Signup.css'; // 통합된 CSS 파일 연결
import axios from 'axios';

function Signup() {
    const [activeTab, setActiveTab] = useState('user');
    const [verificationCode, setVerificationCode] = useState(''); // 인증 코드 상태 추가
    const [isCodeSent, setIsCodeSent] = useState(false); // 코드 전송 여부 상태
    const [isVerified, setIsVerified] = useState(false); // 인증 상태 추가
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가
    const [isDuplicate, setIsDuplicate] = useState(true); // 아이디 중복 검사 
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordMatched, setIsPasswordMatched] = useState(false);
    const switchTab = (tab) => {
        setActiveTab(tab);
    };

    const [formData, setFormData] = useState({
        userId: '',
        userPwd: '',
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
        ownerName: '',
        clinicType: [],
    });

    const [isHospitalNameEntered, setIsHospitalNameEntered] = useState(false);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const newClinicType = checked
                ? [...formData.clinicType, { clinicName: value }]
                : formData.clinicType.filter(clinic => clinic.clinicName !== value);
            setFormData({
                ...formData,
                clinicType: newClinicType,
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

    // 아이디 중복 확인 검사
    const handleCheckDuplicate = async () => {
        if (!formData.userId) {
            alert('ID를 입력하세요.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/auth/check-duplicate', {
                params: { userId: formData.userId }
            });
            if (response.data) {
                alert('이 ID는 이미 사용 중입니다.');
                setIsDuplicate(true);
            } else {
                alert('사용 가능한 ID입니다.');
                setIsDuplicate(false);
            }
        } catch (error) {
            console.error('중복 확인 실패:', error);
            alert('중복 확인 중 오류가 발생했습니다.');
        }
    };

    // 비밀번호 유효성 검사 함수
    const validatePassword = (userPwd) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/; // 8자리 이상, 특수문자 포함
        return passwordRegex.test(userPwd);
    };

    // 비밀번호 유효성 및 확인 상태 업데이트
    useEffect(() => {
        if (formData.userPwd) {
            if (validatePassword(formData.userPwd)) {
                setPasswordMessage('✔ 비밀번호가 유효합니다.');
                setIsPasswordValid(true);
            } else {
                setPasswordMessage('비밀번호는 특수 문자를 포함해 8자리 이상이어야 합니다.');
                setIsPasswordValid(false);
            }
        }

        if (formData.confirmPassword) {
            if (formData.userPwd === formData.confirmPassword) {
                setConfirmPasswordMessage('✔ 비밀번호가 일치합니다.');
                setIsPasswordMatched(true);
            } else {
                setConfirmPasswordMessage('일치하지 않는 비밀번호입니다.');
                setIsPasswordMatched(false);
            }
        }
    }, [formData.userPwd, formData.confirmPassword]);

    // 이메일 인증 코드 전송
    const handleSendVerificationCode = async () => {
        if (!formData.email) {
            alert('이메일 주소를 입력하세요.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/send-code', {
                email: formData.email // 보내는 데이터가 맞는지 확인
            });
            alert(response.data);
            setIsCodeSent(true);
        } catch (error) {
            console.error('인증 코드 전송 실패:', error);
            alert('인증 코드 전송 실패: ' + error.message);
        }
    };

    // 이메일 인증 코드 확인
    const handleVerifyCode = async () => {
        try {
            // 인증 코드 확인 요청
            await axios.post('http://localhost:8080/auth/verify-code', { email: formData.email, code: verificationCode }); //수정
            alert('인증에 성공했습니다'); //인증 결과 메시지 표시
            setIsVerified(true); // 인증 성공 시 상태 업데이트
        } catch (error) {
            console.error('인증 코드 확인 실패: ', error);
            alert('인증에 실패했습니다');
            setIsVerified(false); //인증 실패시 상태 업데이트
        }
    };

    // 폼 제출 시 유효성 검사
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 제출 동작 방지
        console.log("handleSubmit 동작함...");


        if (isDuplicate) {
            alert("아이디 중복확인을 해주세요");
            return;
        }

        if (!formData.userId) {
            alert("ID를 반드시 입력해주세요")
            return;
        }


        if (!formData.userPwd) {
            alert("비밀번호를 반드시 입력해주세요")
            return;
        }

        if (!isPasswordValid) {
            setErrorMessage("비밀번호는 특수 문자를 포함해 8자리 이상이어야 합니다.");
            return;
        }

        if (!isPasswordMatched) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!formData.name) {
            alert("성함을 반드시 입력해주세요")
            return;
        }

        if (!formData.phone) {
            alert("전화번호를 반드시 입력해주세요")
            return;
        }

        if (!isVerified) {
            alert('인증이 완료되지 않았습니다. 인증 후 다시 진행해주세요.');
            return;
        }

        const formDataToSubmit = {
            userId: formData.userId,
            userPwd: formData.userPwd,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            petInfo: formData ? {  // 펫 정보를 UserDTO에 포함, petName이 있으면
                petName: formData.petName,
                age: formData.age,
                weight: formData.weight,
                species: formData.species,
                kind: formData.kind,
                gender: formData.gender,
            } : null // petName이 없으면
        };

        try {
            await axios.post('http://localhost:8080/auth/signup', formDataToSubmit);

            alert('회원가입 성공');

            //로그인 페이지로 이동
            window.location.href = '/login';


        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입 실패: ' + error.message);
        }

        setErrorMessage(''); // 오류 메시지 초기화
        console.log('Form Data:', formData);

    };


    const handleSubmit2 = async (e) => {
        e.preventDefault(); // 기본 제출 동작 방지
        console.log("handleSubmit 동작함...");


        if (isDuplicate) {
            alert("아이디 중복확인을 해주세요");
            return;
        }

        if (!formData.userId) {
            alert("ID를 반드시 입력해주세요")
            return;
        }


        if (!formData.userPwd) {
            alert("비밀번호를 반드시 입력해주세요")
            return;
        }

        if (!isPasswordValid) {
            setErrorMessage("비밀번호는 특수 문자를 포함해 8자리 이상이어야 합니다.");
            return;
        }

        if (!isPasswordMatched) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!formData.name) {
            alert("성함을 반드시 입력해주세요")
            return;
        }

        if (!formData.phone) {
            alert("전화번호를 반드시 입력해주세요")
            return;
        }

        if (!isVerified) {
            alert('인증이 완료되지 않았습니다. 인증 후 다시 진행해주세요.');
            return;
        }

        if (!formData.hospitalName) {
            alert("병원이름을 반드시 입력해주세요")
            return;
        }

        if (!formData.address) {
            alert("병원주소를 반드시 입력해주세요")
            return;
        }

        if (!formData.businessNo) {
            alert("사업자 번호를 반드시 입력해주세요")
            return;
        }

        if (!formData.ownerName) {
            alert("대표자 이름을 반드시 입력해주세요")
            return;
        }

        console.log('Clinic Type:', formData.clinicType);

        if (formData.clinicType.length === 0) { // 수정된 부분
            alert("카테고리를 반드시 설정해주세요");
            return;
        }


        const formDataToSubmit2 = {
            userId: formData.userId,
            userPwd: formData.userPwd,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            hosInfo: {
                hospitalName: formData.hospitalName,
                address: formData.address,
                businessNo: formData.businessNo,
                ownerName: formData.ownerName,
                clinicType: formData.clinicType,
            }


        }


        try {
            await axios.post('http://localhost:8080/auth/signup2', formDataToSubmit2);

            alert('회원가입 성공');

            //로그인 페이지로 이동
            window.location.href = '/login';


        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입 실패: ' + error.message);
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

                        <div className="user-info-container">
                            <div className="user-info">
                                <div className="form-input-box">
                                    <label>ID</label>
                                    <div className="input-with-button">
                                        <input
                                            type="text"
                                            name="userId"
                                            value={formData.userId}
                                            onChange={handleChange}
                                            required
                                            placeholder="아이디를 입력하세요"
                                        />
                                        <button className="duplicate-check" onClick={handleCheckDuplicate}>중복확인</button>
                                    </div>
                                </div>
                                <div className="form-input-box">
                                    <label>PASSWORD</label>
                                    <input
                                        type="password"
                                        name="userPwd"
                                        value={formData.userPwd}
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
                                        <button type="button" className="duplicate-check" onClick={handleSendVerificationCode}>
                                            인증
                                        </button>
                                    </div>

                                </div>

                                {/* 인증 코드 입력 필드 */}
                                {isCodeSent && (
                                    <div className="form-input-box">
                                        <label>인증 코드</label>
                                        <input
                                            type="text"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            placeholder="인증 코드를 입력하세요"
                                        />
                                        <button className='signup-code-check-button' type="button" onClick={handleVerifyCode}>코드 확인</button>
                                    </div>
                                )}

                            </div>

                            {/* 펫 정보 입력 */}
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
                                                <label>dog</label>
                                                <input
                                                    type="radio"
                                                    name="species"
                                                    value="cat"
                                                    checked={formData.species === 'cat'}
                                                    onChange={handleChange}
                                                />
                                                <label>cat</label>
                                                <input
                                                    type="radio"
                                                    name="species"
                                                    value="other"
                                                    checked={formData.species === 'other'}
                                                    onChange={handleChange}
                                                />
                                                <label>other</label>
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
                                                    value="남"
                                                    checked={formData.gender === '남'}
                                                    onChange={handleChange}
                                                />
                                                <label>남</label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="여"
                                                    checked={formData.gender === '여'}
                                                    onChange={handleChange}
                                                />
                                                <label>여</label>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="signup-user-btn" onClick={handleSubmit}>
                            회원가입
                        </button>
                    </div>
                )}

                {activeTab === 'hospital' && (
                    <div className="signup-form hospital-form">
                        <h2> </h2>
                        <div className="user-info-container">
                            <div className="user-info">
                                <div className="form-input-box">
                                    <label>ID</label>
                                    <div className="input-with-button">
                                        <input
                                            type="text"
                                            name="userId"
                                            value={formData.userId}
                                            onChange={handleChange}
                                            required
                                            placeholder="아이디를 입력하세요"
                                        />
                                        <button className="duplicate-check" onClick={handleCheckDuplicate}>중복확인</button>
                                    </div>
                                </div>
                                <div className="form-input-box">
                                    <label>PASSWORD</label>
                                    <input
                                        type="password"
                                        name="userPwd"
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
                                        <button type="button" className="duplicate-check" onClick={handleSendVerificationCode}>
                                            인증
                                        </button>
                                    </div>

                                    {/* 인증 코드 입력 필드 */}
                                    {isCodeSent && (
                                        <div className="form-input-box">
                                            <label>인증 코드</label>
                                            <input
                                                type="text"
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                placeholder="인증 코드를 입력하세요"
                                            />
                                            <button className='signup-code-check-button' type="button" onClick={handleVerifyCode}>코드 확인</button>
                                        </div>
                                    )}

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
                                                name="ownerName"
                                                value={formData.ownerName}
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
                                                    name="clinicType"
                                                    value="진료"
                                                    checked={formData.clinicType.some(clinic => clinic.clinicName === '진료')}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="category-item">
                                                <label>수술</label>
                                                <input
                                                    type="checkbox"
                                                    name="clinicType"
                                                    value="수술"
                                                    checked={formData.clinicType.some(clinic => clinic.clinicName === '수술')}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="category-item">
                                                <label>미용</label>
                                                <input
                                                    type="checkbox"
                                                    name="clinicType"
                                                    value="미용"
                                                    checked={formData.clinicType.some(clinic => clinic.clinicName === '미용')}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="signup-user-btn" onClick={handleSubmit2}>
                            병원 회원가입
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;
