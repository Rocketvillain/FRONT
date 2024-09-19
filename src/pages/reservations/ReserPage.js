// 진료/수술 예약 페이지
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../../css/ReserPage.css"; // CSS 파일 추가

function ReserPage() {
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

    return (
        <div className="range-reser-container">
            <h1 className="page-title">🩺진료 및 수술 예약🩺</h1>

            {/* 이용 약관 동의 섹션 (맨 위로 이동) */}
            <div className="terms-section">
                <h3>이용 약관</h3>
                <p>
                    본 서비스를 이용하기 위해 아래 약관에 동의해 주셔야 합니다. 예약 취소는 예약 하루 전까지 가능합니다.
                </p>
                <p>
                    1. . 본인은 진료 및 백신접종 도중에 불가항력적으로 합병증이 발생하거나, 동물의 특이체질로 인하여 우발적인 사고가 일어날 수 있다는 것을 사전에 설명을 들었고,
                    <br/>상기 진료를 시행하는데 동의하며, 본 동의에 따른 의학적 처리를 담당 수의사 판단에 위임할 것을 서면으로 동의합니다.
                    <br/>2. 반려견은 동물등록된 경우에 지원 가능 하며, 미등록견은 등록 후 지원 가능합니다.
                    <br/>「수의사법』 제13조의2 및 같은 법 시행규칙 제13조의3에 따라 위와 같이 수의사로부터 수술등중대진료에 관한 설명을 들었으며,
                    <br/>수술등 중대진료 및 그 전후에 발생할 수 있는 어떤 일에 대해서도 일체의 민형사상 이의를 제기하지 않을 것을 서약하며,
                    <br/>수술등 중대진료와 관련한 수의학적 처리를 담당 수의사에게 위임할 것을 서면으로 동의합니다.
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
                            <label>유형 선택</label>
                            <div className="checkbox-group">
                                <label>
                                    <input type="checkbox" name="service" value="진료" disabled={!termsAccepted} /> 진료
                                </label>
                                <label>
                                    <input type="checkbox" name="service" value="수술" disabled={!termsAccepted} /> 수술
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

export default ReserPage;
