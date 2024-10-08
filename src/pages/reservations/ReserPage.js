// 진료/수술 예약 페이지
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/ReserPage.css";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchHospitalSchedulesAPI, hospitalDetailAPI } from '../../api/HospitalAPICalls';
import { getPetInfo, updatePetInfo } from '../../api/UserAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { CreateReservation, LoadReservation } from '../../api/ReservationAPICalls';
import ko from 'date-fns/locale/ko';

function ReserPage() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { hosId } = useParams();

    /* 사용자 & 펫 정보 */
    const user = useSelector(state => state.user.userInfo); 
    const pets = useSelector(state => state.user.pets); 
    const [userInfo, setUserInfo] = useState(user);
    const [selectedPet, setSelectedPet] = useState(pets[0] || {}); // 선택된 반려동물 상태
    
    /* 병원 및 병원 일정정보 */
    const hospital = useSelector(state => state.hospital.hospital); // 병원 정보 불러오기
    const hospitalSchedules = useSelector(state => state.hospitalSchedule.schedules) // 병원 일정 불러오기

    const [disabledDates, setDisabledDates] = useState([]); // 비활성화할 날짜 배열

    /* 예약 정보 */
    const reservations = useSelector(state => state.reservation.reservations); // 예약 정보 불러오기
    const [clinicType, setClinicType] = useState(''); // 선택된 진료 유형 상태
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태
    const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간 상태
    const [availableTimes, setAvailableTimes] = useState([]); // 선택된 날짜에 예약 가능한 시간대
    const [termsAccepted, setTermsAccepted] = useState(false); // 이용 약관 동의 상태
    const [description, setDescription] = useState();

    useEffect(() => {
        dispatch(getPetInfo(user.userId)); // 펫 정보 업데이트
        dispatch(hospitalDetailAPI(hosId)); // 병원 정보 업데이트
        dispatch(LoadReservation(hosId)) // 예약 정보 업데이트
        dispatch(fetchHospitalSchedulesAPI(hosId)) // 병원 일정 업데이트
    }, [dispatch]); 

    useEffect(() => {
        // 병원 일정 업데이트 후 disabledDates 설정
        const disabledDatesArray = hospitalSchedules
            .filter(schedule => !schedule.isOkay)
            .map(schedule => new Date(schedule.date[0], schedule.date[1] - 1, schedule.date[2]).toISOString().split('T')[0]);

        setDisabledDates(disabledDatesArray);
        
    }, [hospitalSchedules]);
    
    const handleDateChange = (date) => {
        console.log('date!!!!!', date);
        
        setSelectedDate(date);

        // 선택한 날짜를 YYYY-MM-DD 형식으로 변환
        const selectedDateString = date.toISOString().split('T')[0];

        // 해당 날짜에 맞는 일정 찾기
        const scheduleForSelectedDate = hospitalSchedules.find(schedule => {
            // schedule.date를 Date 객체로 변환
            const scheduleDate = new Date(schedule.date[0], schedule.date[1] - 1, schedule.date[2]);
            const scheduleDateString = scheduleDate.toISOString().split('T')[0];
            return scheduleDateString === selectedDateString;
        });

        if (scheduleForSelectedDate && !scheduleForSelectedDate.isOkay) {
            setAvailableTimes([]); // 휴진일이면 시간도 비워줌
        } else {
            // 정상 처리 로직
            setAvailableTimes([]); // 해당 날짜에 일정이 없을 경우
        }

        if (scheduleForSelectedDate) {
            const { startTime, endTime, lunchTime } = scheduleForSelectedDate;

            // startTime과 endTime을 시간으로 변환 (예: [9, 0] -> 09:00)
            const startHour = startTime[0];
            const endHour = endTime[0];
            const lunchStartHour = lunchTime[0];

            const availableTimes = [];

            // 1시간 간격으로 시간 배열 생성
            for (let hour = startHour; hour <= endHour; hour++) {
                // 점심 시간 제외
                if (hour === lunchStartHour) {
                    continue; // 점심 시간 시작 시 제외
                }
                availableTimes.push(`${String(hour).padStart(2, '0')}:00`); // 정각으로 추가
            }

            // 예약 정보에서 선택한 날짜와 일치하는 예약 시간 제외
            const reservedTimes = reservations
                .filter(reservation => {
                    const reservationDate = new Date(reservation.reservationTime[0], reservation.reservationTime[1] - 1, reservation.reservationTime[2]);
                    const reservationDateString = reservationDate.toISOString().split('T')[0];
                    return reservationDateString === selectedDateString;
                })
                .map(reservation => reservation.reservationTime[3]); // 예약된 시간(4번째 인덱스) 추출

            // availableTimes에서 예약된 시간 제거
            const filteredAvailableTimes = availableTimes.filter(time => {
                const hour = parseInt(time.split(':')[0], 10); // 시간 부분만 추출
                return !reservedTimes.includes(hour); // 예약된 시간이 아닐 경우만 포함
            });

            setAvailableTimes(filteredAvailableTimes);
        } else {
            setAvailableTimes([]); // 해당 날짜에 일정이 없을 경우
        }
    };

    // 날짜 셀을 커스터마이즈하여 '휴진일' 표시
    const renderDayContents = (day, date) => {
        
        const dateObject = new Date(date); // 전체 날짜 정보를 갖는 date를 사용

        // 휴진일 확인
        const dayString = dateObject.toISOString().split('T')[0];
        const isDisabledDate = disabledDates.includes(dayString);

        return (
            <div className="reser-calendar-day">
                <div className='reser-calendar-days' style={{ color: isDisabledDate ? 'red' : 'black' }}>{day}</div>
                {isDisabledDate && <div className="reser-holiday">휴무일</div>}
            </div>
        );
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
        const selectedPet = pets.find(pet => pet.petName === selectedName);
        setSelectedPet(selectedPet); // 선택된 반려동물 정보 업데이트
        console.log(selectedPet);
        
    };

    const handleClinicTypeChange = (e) => {
        setClinicType(e.target.value); // 체크된 항목의 값으로 상태 업데이트
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const submitReservation = (e) => {

        if(!selectedDate){
            alert("캘린더에서 날짜를 선택해주세요!");
            return;
        }

        if(!selectedTime){
            alert("예약하실 시간대를 선택해주세요!");
            return;
        }

        if(!selectedPet.weight){
            alert("반려동물 몸무게를 입력해주세요!");
            return;
        }

        if(!selectedPet.age){
            alert("반려동물 나이를 입력해주세요!");
            return;
        }

        if(!clinicType){
            alert("유형을 선택해주세요!");
            return;
        }

        const typeId = hospital.clinicType.find(clinic => { return clinic.clinicName === clinicType }).typeId;

        const [hour, minute] = selectedTime.split(':').map(Number);

        console.log('hour',hour);
        

        // selectedDate를 기반으로 새로운 Date 객체 생성
        const reservationDateTime = new Date(selectedDate);
        reservationDateTime.setHours(hour+9); // 시간 설정 (한국 시간처럼 반영)

        console.log('reservationDateTime',reservationDateTime);
        
        /* 펫 수정 상태 DB 반영 */
        dispatch(updatePetInfo(selectedPet.petId, selectedPet));

        /* 예약 등록 하기 */
        const reservationInfo = {
            userId: user.userId,
            hosId: hosId,
            typeId: typeId,
            reservationTime: reservationDateTime.toISOString(),
            petId: selectedPet.petId,
            specificDescription: description,
        }

        dispatch(CreateReservation(reservationInfo));

        alert(`${hospital.name} ${hour}시에 ${clinicType} 예약하셨습니다!`);

        navigate('/');

        console.log('reservationInfo', reservationInfo);
        
    };

    /* DatePicker 설정 */ 
    registerLocale('ko', ko);
    const minDate = new Date(2023, 0, 1);
    const maxDate = new Date(2025, 11, 31);

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
                        locale="ko"
                        inline
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy.MM.dd"
                        minDate={minDate}
                        maxDate={maxDate}
                        filterDate={(date) => !disabledDates.includes(date.toISOString().split('T')[0])} // 비활성화 날짜 필터링
                        renderDayContents={renderDayContents} // 커스텀 날짜 렌더링
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
                                <option key={index} value={pet.petName}>
                                    {pet.petName}
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
                        <textarea placeholder="요청 사항을 입력하세요" onChange={handleDescriptionChange}></textarea>
                    </div>
                </div>
                <button type='submit' className="reser-submit-button" onClick={submitReservation}>예약</button>
            </div>
        </div>
    );
}

export default ReserPage;
