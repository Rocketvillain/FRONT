import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../../css/BeautyReserPage.css"; // CSS 파일 추가

function BeautyReserPage() {
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태
    const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간 상태
    const [availableTimes, setAvailableTimes] = useState([]); // 선택된 날짜에 예약 가능한 시간대
    const [termsAccepted, setTermsAccepted] = useState(false); // 이용 약관 동의 상태

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // 날짜에 따라 가능한 시간대를 업데이트하는 예시 (여기서는 임의 시간대를 넣음)
        setAvailableTimes(['10:00', '11:00', '14:00', '16:00']);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    return (
        <div className="beauty-reser-container">
            <h1 className="page-title">🎀미용 예약🎀</h1>

            {/* 이용 약관 동의 섹션 (맨 위로 이동) */}
            <div className="terms-section">
                <h3>이용 약관</h3>
                <p>
                    본 서비스를 이용하기 위해 아래 약관에 동의해 주셔야 합니다. 예약 취소는 예약 하루 전까지 가능합니다.
                </p>
                <p>
                    1. 전영병 등의 우려로 인해 광견병 예방접종과 기본5종백신 접종 및 항체검사 완료 또한 입양한 날부터 3주, 생후 3개월 이상, <br/>병원 건강검진을 1회 이상 마친 후 미용 가능합니다.
                    <br/>
                    2. 사람에게 공격성이 강한 반려견/반려묘의 경우 아이와 미용사의 안전을 위해 미용 거부 또는 중단될 수 있습니다. 
                    <br/>
                    (미용사 상해 시 배상청구. 미용보다 교육 & 안전이 우선입니다.)
                    <br/>
                    3. 노령견 및 지병이 있거나 수술 후(슬개골 수술 포함) 불편한 경우는 미리 말씀해주셔야 하며, <br/>아이가 협조하지 않으면 미용이 중단될 수 있습니다. 
                    미용이 진행되더라도 상황에 따라 깔끔한 미용은 불가능한 점 인지 바랍니다.<br/> (미용비 환불 불가)
                </p>
                <div className="form-group">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={termsAccepted} 
                            onChange={handleTermsChange} 
                        /> 
                        이용 약관에 동의합니다.
                    </label>
                </div>
            </div>

            {/* 약관에 동의해야 날짜 선택과 이후의 폼이 활성화됨 */}
            <div className={`reservation-form ${termsAccepted ? '' : 'disabled-form'}`}>
                <div className="calendar-section">
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
                    <div className="time-selection">
                        <h3>예약 시간 선택</h3>
                        <div className="time-buttons">
                            {availableTimes.map((time) => (
                                <button
                                    key={time}
                                    className={`time-button ${selectedTime === time ? 'selected' : ''}`}
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
                <div className="input-form">
                    <div className="form-group">
                        <label>예약자 성함</label>
                        <input type="text" placeholder="예약자 성함을 입력하세요" disabled={!termsAccepted} />
                    </div>
                    <div className="form-group">
                        <label>반려동물 몸무게</label>
                        <input type="text" placeholder="몸무게를 입력하세요" disabled={!termsAccepted} />
                    </div>
                    <div className="form-group">
                        <label>예약자 전화번호</label>
                        <input type="text" placeholder="전화번호를 입력하세요" disabled={!termsAccepted} />
                    </div>
                    <div className="form-group">
                        <label>반려동물 종류</label>
                        <input type="text" placeholder="종류를 입력하세요" disabled={!termsAccepted} />
                    </div>
                    <div className="form-group">
                        <label>반려동물 이름</label>
                        <input type="text" placeholder="반려동물 이름을 입력하세요" disabled={!termsAccepted} />
                    </div>
                    <div className="form-group">
                        <label>반려동물 성별</label>
                        <select disabled={!termsAccepted}>
                            <option value="남">남</option>
                            <option value="여">여</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>반려동물 나이</label>
                        <input type="text" placeholder="나이를 입력하세요" disabled={!termsAccepted} />
                    </div>

                    <div className="form-group">
                        {/* 체크박스 그룹 */}
                        <div className="form-group-check">
                            <label>미용 서비스 선택</label>
                            <div className="checkbox-group">
                                <label>
                                    <input type="checkbox" name="service" value="목욕" disabled={!termsAccepted} /> 목욕
                                </label>
                                <label>
                                    <input type="checkbox" name="service" value="염색" disabled={!termsAccepted} /> 염색
                                </label>
                                <label>
                                    <input type="checkbox" name="service" value="전체미용" disabled={!termsAccepted} /> 전체미용(+목욕)
                                </label>
                                <label>
                                    <input type="checkbox" name="service" value="부분미용" disabled={!termsAccepted} /> 부분미용
                                </label>
                                <label>
                                    <input type="checkbox" name="service" value="위생미용" disabled={!termsAccepted} /> 위생미용
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>상세 내용</label>
                            <textarea placeholder="요청 사항을 입력하세요" disabled={!termsAccepted}></textarea>
                        </div>
                    </div>
                </div>
                <button className="submit-button" disabled={!termsAccepted}>예약</button>
            </div>
        </div>
    );
}

export default BeautyReserPage;
