import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchHospitalSchedulesAPI as fetchHospitalSchedules,
    addHospitalScheduleAPI as addHospitalSchedule,
    updateHospitalScheduleAPI as updateHospitalSchedule,
    deleteHospitalScheduleAPI as deleteHospitalSchedule
} from "../../api/HospitalAPICalls";  // API 호출 함수 가져오기
import "../../css/hosAdmin/HosSchedule.css"; // CSS 파일 연결

function arrayToTimeString(timeArray) {
    if (!Array.isArray(timeArray) || timeArray.length !== 2) return "00:00";
    const [hour, minute] = timeArray;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function addOneHour(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newHours = (hours + 1) % 24; // 24시간 형식을 유지하기 위해 모듈로 연산
    return `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function HosSchedule() {
    const dispatch = useDispatch();
    const hospitalSchedules = useSelector(state => state.hospitalSchedule?.schedules || []);  // 병원 일정
    const hosId = useSelector(state => state.user.userInfo.hosId);  // 병원 ID
    const [lunchTime, setLunchTime] = useState("");// 점심 시간
    const [currentDate, setCurrentDate] = useState(new Date());  // 현재 날짜
    const [selectedDate, setSelectedDate] = useState(null);  // 선택된 날짜
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태
    const [isAllDay, setIsAllDay] = useState(false);  // 종일 일정 여부
    const [editingEventIndex, setEditingEventIndex] = useState(null);  // 수정할 이벤트 인덱스
    const [startTime, setStartTime] = useState("");  // 시작 시간
    const [endTime, setEndTime] = useState("");  // 종료 시간
    const [description, setDescription] = useState("");  // 일정 설명

    const colors = ['#F0C60A', '#dda4a1', '#a4e390', '#b1f0db', '#9880c6'];  // 다양한 색상 배열
    const endTimeColorMap = {};  // 종료 시간에 따른 색상 매핑 객체

    const closeModal = () => {
        setIsModalOpen(false);  // 모달을 닫기
        setEditingEventIndex(null);  // 수정 상태 초기화
        setStartTime("");  // 시작 시간 초기화
        setEndTime("");  // 종료 시간 초기화
        setDescription("");  // 설명 초기화
        setLunchTime("12:00");  // 점심 시간 초기화
        setIsAllDay(false);  // 종일 상태 초기화
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchHospitalSchedules(hosId));  // 병원 일정 불러오기
        };
        fetchData();
    }, [dispatch, hosId]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();  // 해당 월의 일 수
    const firstDayOfMonth = new Date(year, month, 1).getDay();  // 해당 월의 첫 날 요일

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));  // 이전 달 이동
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));  // 다음 달 이동
    };

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value);
        setCurrentDate(new Date(newYear, month, 1));  // 연도 변경 시 날짜 업데이트
    };

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value) - 1;
        setCurrentDate(new Date(year, newMonth, 1));  // 월 변경 시 날짜 업데이트
    };

    const openModal = (day, eventId = null, isLunchTime = false) => {
        const fullDate = new Date(year, month, day);
        setSelectedDate(fullDate);  // 선택된 날짜 저장
        setIsModalOpen(true);  // 모달 열기

        setDescription("");
        setStartTime("");
        setEndTime("");
        setIsAllDay(false);

        if (eventId !== null) {
            const event = hospitalSchedules.find((schedule) => schedule.scheduleId === eventId);

            if (!event) {
                console.error(`Event with ID ${eventId} not found`);
                return;
            }

            console.log("Event Data: ", event);

            // 1. 휴진일
            if (event.isOkay === false) {
                console.log("휴진일 : ");
                setIsAllDay(true);  // 종일 체크
                setDescription("휴진일");
                setStartTime("00:00");
                setEndTime("00:00");

                console.log("event.isOkay : " + event.isOkay);
                console.log("event.isHoliday : " + event.isHoliday);
            }

            // 2. 점심 시간
            else if (isLunchTime && event.lunchTime && event.isOkay === true) {
                console.log("점심시간 : ");
                const lunchStartTime = arrayToTimeString(event.lunchTime);
                const lunchEndTime = addOneHour(lunchStartTime);

                setDescription("점심시간");
                setStartTime(lunchStartTime);
                setEndTime(lunchEndTime);
                setIsAllDay(false)

                console.log("Lunch Start Time: ", lunchStartTime);
                console.log("Lunch End Time: ", lunchEndTime);
            }

            // 3. 일반 일정
            else if (!isLunchTime && event.startTime && event.endTime && event.isOkay === true) {
                console.log("일반 일정 : ");
                const eventStartTime = arrayToTimeString(event.startTime || [9, 0]);  // 배열을 시간 문자열로 변환
                const eventEndTime = arrayToTimeString(event.endTime || [18, 0]);

                setStartTime(eventStartTime);
                setEndTime(eventEndTime);
                setDescription("진료시간");
                setIsAllDay(false);  // 일반 일정은 종일이 아니므로 false로 설정

                console.log("Start Time: ", eventStartTime);
                console.log("End Time: ", eventEndTime);
            }

            setEditingEventIndex(eventId); // 수정할 이벤트 인덱스 설정
        } else {
            // 새 이벤트 추가 시 폼 초기화
            setStartTime("9:00");
            setEndTime("");
            setDescription("");
            setLunchTime("12:00");  // 점심시간 초기값 설정
            setIsAllDay(false);
            setEditingEventIndex(null);
        }
    };

    const handleAddOrUpdateEvent = async (e) => {
        e.preventDefault();

        const isClosedDay = isAllDay;
        const startTimeValue = isClosedDay ? [0, 0] : startTime.split(':').map(Number);
        const endTimeValue = isClosedDay ? [0, 0] : endTime.split(':').map(Number);
        const lunchTimeValue = isClosedDay ? null : lunchTime.split(':').map(Number);

        // const selectedDateUTC = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));

        // 새로운 이벤트 생성
        // 백으로 전송할 이벤트 데이터
        const newEvent = {
            date: [selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()],
            startTime: startTimeValue,
            endTime: endTimeValue,
            hosId,
            isOkay: !isClosedDay,
            lunchTime: lunchTimeValue
        };

        console.log("Sending event data to backend:", newEvent);

        if (editingEventIndex !== null) {
            await dispatch(updateHospitalSchedule(editingEventIndex, newEvent));  // 일정 수정
        } else {
            await dispatch(addHospitalSchedule(newEvent));  // 새로운 일정 추가
        }

        await dispatch(fetchHospitalSchedules(hosId));  // 스케줄 목록 즉시 갱신
        closeModal();  // 모달 닫기
    };

    const handleDeleteEvent = async (eventId) => {
        await dispatch(deleteHospitalSchedule(eventId));  // 일정 삭제
        await dispatch(fetchHospitalSchedules(hosId));  // 스케줄 목록 즉시 갱신
        closeModal();  // 모달 닫기
    };

    // 배열 [9, 0]을 "09:00" 형식으로 변환하는 함수
    function formatTime(timeArray) {
        if (!timeArray || timeArray.length !== 2) return 'Invalid Time';
        const [hours, minutes] = timeArray;

        // 두 자리로 시간과 분을 포맷
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}`;
    }

    const renderDays = () => {
        const days = [];
        const today = new Date(); // 오늘 날짜 객체
        const maxEventsToShow = 3;
        const prevMonthDays = new Date(year, month, 0).getDate();  // 이전 달의 총 일 수
        const nextMonthDays = 35 - (daysInMonth + firstDayOfMonth);  // 남은 칸에 표시할 다음 달의 일 수

        // 이전 달 날짜 추가
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push(
                <div
                    key={`prev-${i}`}
                    onClick={prevMonth}
                    className="hos-schedul-date-cell hos-schedul-prev-next"
                >
                    {prevMonthDays - i}
                </div>
            );
        }

        // 현재 달 날짜 추가
        for (let day = 1; day <= daysInMonth; day++) {
            const eventList = hospitalSchedules.filter(schedule => {
                const scheduleDate = new Date(schedule.date);  // schedule.date가 Date 객체인 경우
                return scheduleDate.getFullYear() === year &&
                    scheduleDate.getMonth() === month &&
                    scheduleDate.getDate() === day;
            }).map(schedule => {
                const eventdescription = schedule.isOkay === false ? "휴진일" : description;

                return {
                    ...schedule,
                    description: eventdescription,
                };
            });

            const isToday =
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day; // 오늘 날짜 확인

            days.push(
                <div
                    key={day}
                    onClick={() => openModal(day)}
                    className={`hos-schedul-date-cell ${isToday ? 'hos-schedul-today' : ''}`}
                >
                    <span>{day}</span>

                    {/* 일정 목록 표시 */}
                    {eventList.slice(0, maxEventsToShow).map((schedule, index) => {
                        const startTimeString = formatTime(schedule.startTime);  // startTime 배열을 변환
                        const endTimeString = formatTime(schedule.endTime);      // endTime 배열을 변환

                        // 종료 시간에 따른 색상 매핑: endTimeColorMap에 없는 경우 색상을 할당
                        if (!endTimeColorMap[endTimeString]) {
                            const randomColor = colors[Object.keys(endTimeColorMap).length % colors.length];  // 고정된 순서로 색상 할당
                            endTimeColorMap[endTimeString] = randomColor;
                        }
                        const eventColor = endTimeColorMap[endTimeString];

                        return (
                            <div key={index}>
                                {/* 일반 일정 표시 */}
                                {schedule.isOkay === true && (
                                    <div
                                        className="hos-schedul-event"
                                        style={{ backgroundColor: eventColor }}  // 종료 시간에 따른 색상 적용
                                        onClick={(e) => { e.stopPropagation(); openModal(day, schedule.scheduleId, false); }}
                                    >
                                        <div className="hos-schedul-event-strip">
                                            <p>{`${startTimeString} - ${endTimeString}`}</p>
                                        </div>
                                    </div>
                                )}

                                {/* 점심시간 표시 */}
                                {schedule.lunchTime && schedule.isOkay === true && (
                                    <div
                                        className="hos-schedul-event"
                                        style={{ backgroundColor: '#84a4cb' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(day, schedule.scheduleId, true);  // 클릭 시 모달을 열기
                                        }}
                                    >
                                        <div className="hos-schedul-event-strip">
                                            <p>점심시간</p>
                                        </div>
                                    </div>
                                )}

                                {/* 휴진일 일정 표시 */}
                                {schedule.isOkay === false && (
                                    <div
                                        className="hos-schedul-event"
                                        style={{ backgroundColor: '#FFCCCB' }}  // 휴진일 색상
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(day, schedule.scheduleId, false);  // 휴진일 클릭
                                        }}
                                    >
                                        <div className="hos-schedul-event-strip">
                                            <p>{schedule.description}</p>
                                        </div>
                                    </div>

                                )}
                            </div>
                        );
                    })}

                    {/* 일정이 더 있을 때 +n 표시 */}
                    {eventList.length > maxEventsToShow && (
                        <div className="hos-schedul-more-events">
                            +{eventList.length - maxEventsToShow} more
                        </div>
                    )}
                </div>
            );
        }

        // 다음 달 날짜 추가
        for (let i = 1; i <= nextMonthDays; i++) {
            days.push(
                <div
                    key={`next-${i}`}
                    onClick={nextMonth}
                    className="hos-schedul-date-cell hos-schedul-prev-next"
                >
                    {i}
                </div>
            );
        }

        return days;
    };


    return (
        <div className="hos-schedul-calendar-container">
            <h2>병원 일정 관리</h2>
            <div className="hos-schedul-select-container">
                <select value={year} onChange={handleYearChange}>
                    {/* 2020년부터 2030년까지 선택 가능하도록 예시 */}
                    {[...Array(11)].map((_, i) => (
                        <option key={i} value={2020 + i}>{2020 + i}년</option>
                    ))}
                </select>

                <select value={month + 1} onChange={handleMonthChange}>
                    {[...Array(12)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}월</option>
                    ))}
                </select>
            </div>
            <div className="hos-schedul-calendar-grid">
                <div className="hos-schedul-day-header">일</div>
                <div className="hos-schedul-day-header">월</div>
                <div className="hos-schedul-day-header">화</div>
                <div className="hos-schedul-day-header">수</div>
                <div className="hos-schedul-day-header">목</div>
                <div className="hos-schedul-day-header">금</div>
                <div className="hos-schedul-day-header">토</div>
                {renderDays()}
            </div>

            {isModalOpen && (
                <div className="hos-schedul-modal">
                    <div className="hos-schedul-modal-content">
                        <button className="hos-schedul-close-x" onClick={closeModal}>X</button>
                        <h3>{editingEventIndex !== null ? "일정 수정" : "일정 추가"}</h3>
                        <form onSubmit={handleAddOrUpdateEvent}>
                            <label className="form-label-time-name">
                                <input type="checkbox" checked={isAllDay} onChange={() => {
                                    setIsAllDay(!isAllDay);
                                    console.log("종일 선택 여부 : ", !isAllDay);
                                }} />
                                종일
                            </label>
                            {!isAllDay && (
                                <>
                                    <label>시작 시간</label>
                                    <select value={startTime} className="form-select-time-choice" onChange={(e) => setStartTime(e.target.value)}>
                                        {[...Array(24)].map((_, i) => (
                                            <option key={i} value={`${i < 10 ? '0' : ''}${i}:00`}>{i}:00</option>
                                        ))}
                                    </select>
                                    <label>종료 시간</label>
                                    <select value={endTime} className="form-select-time-choice2" onChange={(e) => setEndTime(e.target.value)}>
                                        {[...Array(24)].map((_, i) => (
                                            <option key={i} value={`${i < 10 ? '0' : ''}${i}:00`}>{i}:00</option>
                                        ))}
                                    </select>
                                </>
                            )}
                            <textarea
                                value={isAllDay ? "휴진일" : description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                disabled={isAllDay}
                            />
                            <button className="hos-schedule-save-button" type="submit">저장</button>
                            {editingEventIndex !== null && (
                                <button type="button" onClick={() => handleDeleteEvent(editingEventIndex)}>삭제</button>
                            )}
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}

export default HosSchedule;
