import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchHospitalSchedulesAPI as fetchHospitalSchedules,
    addHospitalScheduleAPI as addHospitalSchedule,
    updateHospitalScheduleAPI as updateHospitalSchedule,
    deleteHospitalScheduleAPI as deleteHospitalSchedule
} from "../../api/HospitalAPICalls";  // API 호출 함수 가져오기
import "../../css/hosAdmin/HosSchedule.css"; // CSS 파일 연결

function HosSchedule() {
    const dispatch = useDispatch();
    const hospitalSchedules = useSelector(state => state.hospitalSchedule?.schedules || []);  // 병원 일정
    const hosId = useSelector(state => state.user.userInfo.hosId);  // 병원 ID
    
    const [currentDate, setCurrentDate] = useState(new Date());  // 현재 날짜
    const [selectedDate, setSelectedDate] = useState(null);  // 선택된 날짜
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태
    const [isAllDay, setIsAllDay] = useState(false);  // 종일 일정 여부
    const [editingEventIndex, setEditingEventIndex] = useState(null);  // 수정할 이벤트 인덱스
    const [startTime, setStartTime] = useState("");  // 시작 시간
    const [endTime, setEndTime] = useState("");  // 종료 시간
    const [description, setDescription] = useState("");  // 일정 설명

    const colors = ['#F0C60A', '#dda4a1', '#a4e390', '#84a4cb', '#9880c6'];  // 다양한 색상 배열

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

    const openModal = (day, eventId = null) => {
        const fullDate = new Date(year, month, day);  // 선택한 날짜 설정
        setSelectedDate(fullDate);  // 선택된 날짜 저장
        setIsModalOpen(true);  // 모달 열기
    
        if (eventId !== null) {
            const event = hospitalSchedules.find((schedule) => schedule.scheduleId === eventId);
    
            if (!event) {
                console.error(`Event with ID ${eventId} not found`);
                return;
            }
    
            const [startHour, startMinute] = event.startTime ? event.startTime : [0, 0];
            const [endHour, endMinute] = event.endTime ? event.endTime : [0, 0];
            setStartTime(`${startHour < 10 ? '0' : ''}${startHour}:${startMinute < 10 ? '0' : ''}${startMinute}`);
            setEndTime(`${endHour < 10 ? '0' : ''}${endHour}:${endMinute < 10 ? '0' : ''}${endMinute}`);
            
            setDescription(event.description || "");  // 설명 설정
            setIsAllDay(event.startTime === "종일");
            setEditingEventIndex(eventId);  // 수정할 이벤트 인덱스 설정
        } else {
            // 새 이벤트 추가 시 폼 초기화
            setStartTime("");
            setEndTime("");
            setDescription("");
            setIsAllDay(false);
            setEditingEventIndex(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);  // 모달 닫기
        setEditingEventIndex(null);  // 수정 상태 초기화
    };

    const handleAddOrUpdateEvent = async (e) => {
        e.preventDefault();
    
        const isClosedDay = description === "휴진일";  // 휴진일 설정 여부
    
        // 점심시간 자동 추가 (휴진일이 아닌 경우)
        const lunchTimeEvent = hospitalSchedules.find(event => event.description === "점심시간");
        if (!isClosedDay && lunchTimeEvent) {
            const lunchEvent = {
                date: selectedDate.toISOString().slice(0, 10),  // 'YYYY-MM-DD' 형식
                startTime: lunchTimeEvent.startTime,  // 백엔드에서 가져온 점심시간 시작
                endTime: lunchTimeEvent.endTime,  // 백엔드에서 가져온 점심시간 종료
                description: "점심시간",
                hosId,
                isOkay: true
            };
            await dispatch(addHospitalSchedule(lunchEvent));  // 점심시간 자동 추가
        }
    
        const startTimeValue = isAllDay || isClosedDay ? "종일" : startTime;
        const endTimeValue = isAllDay || isClosedDay ? "종일" : endTime;
    
        const newEvent = {
            date: selectedDate.toISOString().slice(0, 10),  // 'YYYY-MM-DD' 형식
            startTime: startTimeValue,
            endTime: endTimeValue,
            description: isClosedDay ? "휴진일" : description,  // 휴진일이면 '휴진일'로 설정
            hosId,
            isOkay: !isClosedDay  // 휴진일이면 false, 정상 운영일이면 true
        };
    
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

    const renderDays = () => {
        const days = [];
        const prevMonthDays = new Date(year, month, 0).getDate();  // 이전 달의 총 일 수
        const nextMonthDays = 35 - (daysInMonth + firstDayOfMonth);  // 남은 칸에 표시할 다음 달의 일 수

        const maxEventsToShow = 3;  // 표시할 최대 일정 수
    
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
                const [scheduleYear, scheduleMonth, scheduleDay] = schedule.date;  // 배열 구조분해할당으로 date 필드를 변환
                return scheduleYear === year && (scheduleMonth - 1) === month && scheduleDay === day;
            });
    
            days.push(
                <div
                    key={day}
                    onClick={() => openModal(day)}
                    className={`hos-schedul-date-cell`}
                >
                    <span>{day}</span>
    
                    {/* 일정 목록 표시 */}
                    {eventList.slice(0, maxEventsToShow).map((event, index) => {
                        const [startHour, startMinute] = event.startTime;
                        const [endHour, endMinute] = event.endTime;
                        const startTimeString = `${startHour < 10 ? '0' : ''}${startHour}:${startMinute < 10 ? '0' : ''}${startMinute}`;
                        const endTimeString = `${endHour < 10 ? '0' : ''}${endHour}:${endMinute < 10 ? '0' : ''}${endMinute}`;
                        
                        return (
                            <div
                                key={index}
                                className="hos-schedul-event"
                                style={{ backgroundColor: event.color || '#84a4cb' }}
                                onClick={(e) => { e.stopPropagation(); openModal(day, event.scheduleId); }}
                            >
                                <div className="hos-schedul-event-strip">
                                    <p>{`${startTimeString} - ${endTimeString}`}</p>
                                </div>
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
                <select value={year} onChange={(e) => setCurrentDate(new Date(e.target.value, month, 1))}>
                    {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
                <select value={month + 1} onChange={(e) => setCurrentDate(new Date(year, e.target.value - 1, 1))}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>{m}월</option>
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
                            <label>
                                <input type="checkbox" checked={isAllDay} onChange={() => setIsAllDay(!isAllDay)} />
                                종일
                            </label>
                            {!isAllDay && (
                                <>
                                    <label>시작 시간</label>
                                    <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
                                        {[...Array(24)].map((_, i) => (
                                            <option key={i} value={`${i < 10 ? '0' : ''}${i}:00`}>{i}:00</option>
                                        ))}
                                    </select>
                                    <label>종료 시간</label>
                                    <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
                                        {[...Array(24)].map((_, i) => (
                                            <option key={i} value={`${i < 10 ? '0' : ''}${i}:00`}>{i}:00</option>
                                        ))}
                                    </select>
                                </>
                            )}
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4"></textarea>
                            <button type="submit">저장</button>
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
