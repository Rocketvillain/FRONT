// 진료/수술 예약 페이지
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../../css/ReserPage.css";
import { useParams, useNavigate } from 'react-router-dom';
import { hospitalDetailAPI } from '../../api/HospitalAPICalls';
import { getPetInfo } from '../../api/UserAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { LoadReservation } from '../../api/ReservationAPICalls';

function ReserPage() {
    const dispatch = useDispatch();
    const { hosId } = useParams();

    /* 사용자 & 펫 정보 */
    const user = useSelector(state => state.user.userInfo); 
    const pets = useSelector(state => state.user.pets); 
    const [userInfo, setUserInfo] = useState(user);
    const [selectedPet, setSelectedPet] = useState(pets[0] || {}); // 선택된 반려동물 상태
    
    /* 병원 정보 */
    const hospital = useSelector(state => state.hospital.hospital); // 병원 정보 불러오기
    const hospitalSchedules = useSelector(state => state.hospital.schedule) // 병원 일정 불러오기

    /* 예약 정보 */
    const reservations = useSelector(state => state.reservation.Reservations); // 예약 정보 불러오기
    console.log('@@@@@@@@@@@@@',reservations);
    
    const [clinicType, setClinicType] = useState(''); // 선택된 진료 유형 상태


    useEffect(() => {
        dispatch(getPetInfo(user.userId)); // 펫 정보 업데이트
        dispatch(hospitalDetailAPI(hosId)); // 병원 정보 업데이트
        dispatch(LoadReservation(hosId)) // 예약 정보 업데이트
        // 병원 일정 업데이트
    }, [dispatch]); 
    
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태
    const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간 상태
    const [availableTimes, setAvailableTimes] = useState([]); // 선택된 날짜에 예약 가능한 시간대
    const [termsAccepted, setTermsAccepted] = useState(false); // 이용 약관 동의 상태

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // 날짜에 따라 가능한 시간대를 업데이트하는 예시 (여기서는 임의 시간대를 넣음)
        setAvailableTimes(['10:00', '11:00', '12:00', '14:00', '16:00', '19:00']);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    // 사용자 정보 입력 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedPet((prevSelectedPet) => ({
            ...prevSelectedPet,
            [name]: value
        }));
    };

    const handlePetChange = (e) => {
        const selectedName = e.target.value;
        const selectedPet = pets.find(pet => pet.name === selectedName);
        setSelectedPet(selectedPet); // 선택된 반려동물 정보 업데이트
        console.log(selectedPet);
        
    };

    const handleClinicTypeChange = (e) => {
        setClinicType(e.target.value); // 체크된 항목의 값으로 상태 업데이트
    };

    const submitReservation = () => {
    
        const reservationInfo = {
            userId: user.userId,
            hosId: hosId,
            // typeId: typeId,
            // reservationTime: selectedDate,
            petId: selectedPet.petId,
            // description: description,
        }
    };

    return (
        <div className="reser-container">
            <h1>{ hospital.name }</h1>
            <h1 className="reser-page-title">🩺 진료 및 수술 예약 🩺</h1>

            {/* 이용 약관 동의 섹션 (맨 위로 이동) */}
            <div className="reser-terms-section">
                <h3>이용 약관</h3>
                <p>
                    본 서비스를 이용하기 위해 아래 약관에 동의해 주셔야 합니다. 예약 취소는 예약 하루 전까지 가능합니다.
                </p>
                <p>
                    1. . 본인은 진료 및 백신접종 도중에 불가항력적으로 합병증이 발생하거나, 동물의 특이체질로 인하여 우발적인 사고가 일어날 수 있다는 것을 사전에 설명을 들었고,
                    상기 진료를 시행하는데 동의하며, 본 동의에 따른 의학적 처리를 담당 수의사 판단에 위임할 것을 서면으로 동의합니다.
                    <br />2. 반려견은 동물등록된 경우에 지원 가능 하며, 미등록견은 등록 후 지원 가능합니다.
                    <br />「수의사법』 제13조의2 및 같은 법 시행규칙 제13조의3에 따라 위와 같이 수의사로부터 수술등중대진료에 관한 설명을 들었으며,
                    <br />수술등 중대진료 및 그 전후에 발생할 수 있는 어떤 일에 대해서도 일체의 민형사상 이의를 제기하지 않을 것을 서약하며,
                    <br />수술등 중대진료와 관련한 수의학적 처리를 담당 수의사에게 위임할 것을 서면으로 동의합니다.
                </p>
                <div className="reser-form-group">
                    <label>
                        <input
                            className='reser-term-section-check'
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={handleTermsChange}
                        />
                        이용 약관에 동의합니다.
                    </label>
                </div>
            </div>

            {/* 약관에 동의해야 날짜 선택과 이후의 폼이 활성화됨 */}
            <div className={`reser-reservation-form ${termsAccepted ? '' : 'disabled-form'}`}>
                <div className="reser-calendar-section">
                    <h3>날짜 선택</h3>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy/MM/dd"
                        disabled={!termsAccepted} // 약관에 동의하지 않으면 달력 비활성화
                    />
                </div>

                {selectedDate && termsAccepted && (
                    <div className="reser-time-selection">
                        <h3>예약 시간 선택</h3>
                        <div className="reser-time-buttons">
                            {availableTimes.map((time) => (
                                <button
                                    key={time}
                                    className={`reser-time-button ${selectedTime === time ? 'selected' : ''}`}
                                    onClick={() => handleTimeClick(time)}
                                    disabled={!termsAccepted} // 약관에 동의하지 않으면 시간 버튼 비활성화
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 입력 폼 */}
                <div className="reser-input-form">
                    <div className="reser-form-group">
                        <label>예약자 성함</label>
                        <input className='reser-form' type="text" value={userInfo.userName} disabled />
                    </div>
                    <div className="reser-form-group">
                        <label>예약자 전화번호</label>
                        <input className='reser-form' type="text"  value={userInfo.phone} disabled />
                    </div>
                    <div className="reser-form-group">
                        <label>반려동물 이름</label>
                        <select className='reser-form' name='petName' onChange={(e) => handlePetChange(e)}>
                            {pets.map((pet, index) => (
                                <option key={index} value={pet.name}>
                                    {pet.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="reser-form-group">
                        <label>반려동물 종류</label>
                        <input className='reser-form' type="text" value={selectedPet.kind || ''} disabled />
                    </div>
                    <div className="reser-form-group">
                        <label>반려동물 몸무게</label>
                        <input className='reser-form' type="text" placeholder="몸무게를 입력하세요" value={selectedPet.weight || ''} name='weight' onChange={handleInputChange}/>
                    </div>
                    <div className="reser-form-group">
                        <label>반려동물 성별</label>
                        <input className='reser-form' value={selectedPet.gender || ''} disabled />
                    </div>
                    <div className="reser-form-group">
                        <label>반려동물 나이</label>
                        <input className='reser-form' type="text" placeholder="나이를 입력하세요" value={selectedPet.age || ''} name='age' onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        {/* 라디오 버튼 그룹 */}
                        <div className="reser-form-group-check">
                            <label>유형 선택</label>
                            <div className="reser-checkbox-group">
                                <label>
                                    <input 
                                        type="radio" 
                                        name="clinicType" 
                                        value="진료" 
                                        checked={clinicType === '진료'} 
                                        onChange={handleClinicTypeChange} 
                                    /> 진료
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="clinicType" 
                                        value="수술" 
                                        checked={clinicType === '수술'} 
                                        onChange={handleClinicTypeChange} 
                                    /> 수술
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="reser-form-group">
                    </div>
                    <div className="reser-form-group">
                        <label>상세 내용</label>
                        <textarea placeholder="요청 사항을 입력하세요"></textarea>
                    </div>
                </div>
                <button className="reser-submit-button" onSubmit={submitReservation}>예약</button>
            </div>
        </div>
    );
}

export default ReserPage;
