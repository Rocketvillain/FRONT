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
    const hospitalSchedules = useSelector(state => state.hospitalSchedule?.schedules || []);
    const hosId = useSelector(state => state.user.userInfo.hosId);
    
    const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [isAllDay, setIsAllDay] = useState(false); // 종일 일정 여부
    const [editingEventIndex, setEditingEventIndex] = useState(null); // 수정할 이벤트 인덱스
    const [startTime, setStartTime] = useState(""); // 시작 시간
    const [endTime, setEndTime] = useState(""); // 종료 시간
    const [description, setDescription] = useState(""); // 일정 설명
    

    const colors = ['#F0C60A', '#dda4a1', '#a4e390', '#84a4cb', '#9880c6']; // 다양한 색상 배열

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchHospitalSchedules(hosId));
        };
        fetchData();
    }, [dispatch, hosId]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date(); // 오늘 날짜

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 일 수
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 해당 월의 첫 날 요일

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const openModal = (day, eventId = null) => {
        // 선택한 연도, 월, 일로 정확한 날짜를 생성
        const fullDate = new Date(year, month, day);  
        setSelectedDate(fullDate);  // 정확한 날짜 설정
        setIsModalOpen(true);
    
        if (eventId !== null) {
            const event = hospitalSchedules.find((schedule) => schedule.scheduleId === eventId);
    
            // event가 없을 때 기본 처리
            if (!event) {
                console.error(`Event with ID ${eventId} not found`);
                return;
            }
    
            // startTime과 endTime이 정의되어 있지 않으면 기본값으로 설정
            const [startHour, startMinute] = event.startTime ? event.startTime : [0, 0];
            const [endHour, endMinute] = event.endTime ? event.endTime : [0, 0];
            setStartTime(`${startHour < 10 ? '0' : ''}${startHour}:${startMinute < 10 ? '0' : ''}${startMinute}`);
            setEndTime(`${endHour < 10 ? '0' : ''}${endHour}:${endMinute < 10 ? '0' : ''}${endMinute}`);
            
            setDescription(event.description || ""); 
            setIsAllDay(event.startTime === "종일");
            setEditingEventIndex(eventId);
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
        setIsModalOpen(false);
        setEditingEventIndex(null); // 모달 닫을 때 수정 상태 초기화
    };

    const handleAddOrUpdateEvent = (e) => {
        e.preventDefault();
    
        // 점심시간 자동 설정 로직 (모든 일정에 자동 추가)
        const lunchEvent = {
            date: selectedDate.toISOString().slice(0, 10),  // 'YYYY-MM-DD' 형식
            startTime: "12:00",  // 점심시간 시작
            endTime: "13:00",  // 점심시간 종료
            description: "점심시간",
            hosId,
            isOkay: true
        };
    
        // 휴진일 설정 로직
        const isClosedDay = description === "휴진일";
        const startTimeValue = isAllDay || isClosedDay ? "종일" : startTime;
        const endTimeValue = isAllDay || isClosedDay ? "종일" : endTime;
    
        const newEvent = {
            date: selectedDate.toISOString().slice(0, 10),  // 'YYYY-MM-DD' 형식으로 변환하여 정확한 날짜 전달
            startTime: startTimeValue,
            endTime: endTimeValue,
            description,
            hosId,
            isOkay: !isClosedDay  // 휴진일이면 false, 정상 운영일이면 true
        };
    
        if (editingEventIndex !== null) {
            // 기존 이벤트 수정 시
            dispatch(updateHospitalSchedule(editingEventIndex, newEvent));
        } else {
            // 새로운 일정 추가 시
            dispatch(addHospitalSchedule(newEvent));
            
            // 자동으로 점심시간 일정도 추가
            dispatch(addHospitalSchedule(lunchEvent));
        }
    
        closeModal();  // 일정 추가 후 모달 닫기
    };
    
    

    const handleDeleteEvent = (eventId) => {
        dispatch(deleteHospitalSchedule(eventId));
        closeModal(); // 삭제 후 모달 닫기
    };

    const renderDays = () => {
        const days = [];
        const prevMonthDays = new Date(year, month, 0).getDate(); // 이전 달의 총 일 수
        const nextMonthDays = 35 - (daysInMonth + firstDayOfMonth); // 남은 칸에 표시할 다음 달의 일 수
    
        const maxEventsToShow = 3;
    
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
            const dateKey = `${year}-${month + 1}-${day}`;
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
                        const [startHour, startMinute] = event.startTime;  // 시작 시간을 변환하는 부분
                        const [endHour, endMinute] = event.endTime;  // 종료 시간을 변환하는 부분
                        const startTimeString = `${startHour < 10 ? '0' : ''}${startHour}:${startMinute < 10 ? '0' : ''}${startMinute}`;  // 시작 시간 형식 변환
                        const endTimeString = `${endHour < 10 ? '0' : ''}${endHour}:${endMinute < 10 ? '0' : ''}${endMinute}`;  // 종료 시간 형식 변환
                        
                        return (
                            <div
                                key={index}
                                className="hos-schedul-event"
                                style={{ backgroundColor: event.color || '#84a4cb' }}  // 색상 필드가 없을 때 기본 색상 사용
                                onClick={(e) => { e.stopPropagation(); openModal(day, event.scheduleId); }}  // 일정 클릭 시 모달 열기
                            >
                                <div className="hos-schedul-event-strip">
                                    {/* 시작 시간과 종료 시간만 표시 */}
                                    <p>{`${startTimeString} - ${endTimeString}`}</p>  {/* 시간만 표시 */}
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
