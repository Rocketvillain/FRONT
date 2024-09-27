import React, { useState, useEffect } from "react";
import "../../css/hosAdmin/HosSchedul.css"; // CSS 파일 연결

function HosSchedul() {
    const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [events, setEvents] = useState({}); // 날짜별 이벤트 저장 (배열 형태로 여러 개 추가 가능)
    const [isAllDay, setIsAllDay] = useState(false); // 종일 일정 여부
    const [editingEventIndex, setEditingEventIndex] = useState(null); // 수정할 이벤트 인덱스

    const colors = ['#F0C60A', '#dda4a1', '#a4e390', '#84a4cb', '#9880c6']; // 다양한 색상 배열

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("hos-schedul-events")) || {};
        setEvents(storedEvents);
    }, []);

    useEffect(() => {
        localStorage.setItem("hos-schedul-events", JSON.stringify(events));
    }, [events]);

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

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value, 10);
        setCurrentDate(new Date(newYear, month, 1));
    };

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value, 10);
        setCurrentDate(new Date(year, newMonth - 1, 1));
    };

    const openModal = (date, eventIndex = null) => {
        setSelectedDate(date);
        setEditingEventIndex(eventIndex); // 수정할 이벤트 인덱스 설정
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEventIndex(null); // 모달 닫을 때 수정 상태 초기화
    };

    const handleAllDayChange = () => {
        setIsAllDay(!isAllDay);
    };

    const handleAddOrUpdateEvent = (e) => {
        e.preventDefault();
        const form = e.target;
        const startTime = isAllDay ? "종일" : form.startTime.value;
        const endTime = isAllDay ? "종일" : form.endTime.value;
        const description = form.description.value;

        const dateKey = `${year}-${month + 1}-${selectedDate}`;
        const newEvent = {
            startTime,
            endTime,
            description,
            color: colors[Object.keys(events).length % colors.length] // 색상 자동 순환
        };

        if (editingEventIndex !== null) {
            // 수정할 경우
            const updatedEvents = { ...events };
            updatedEvents[dateKey][editingEventIndex] = newEvent;
            setEvents(updatedEvents);
        } else {
            // 새 이벤트 추가할 경우
            setEvents({
                ...events,
                [dateKey]: events[dateKey] ? [...events[dateKey], newEvent] : [newEvent]
            });
        }

        closeModal(); // 일정 추가 또는 수정 후 모달 닫기
    };

    const handleDeleteEvent = () => {
        const dateKey = `${year}-${month + 1}-${selectedDate}`;
        const updatedEvents = { ...events };
        updatedEvents[dateKey].splice(editingEventIndex, 1); // 특정 이벤트 삭제
        if (updatedEvents[dateKey].length === 0) {
            delete updatedEvents[dateKey]; // 해당 날짜에 이벤트가 없으면 삭제
        }
        setEvents(updatedEvents);
        closeModal(); // 삭제 후 모달 닫기
    };

    const renderDays = () => {
        const days = [];
        const prevMonthDays = new Date(year, month, 0).getDate(); // 이전 달의 총 일 수
        const nextMonthDays = 35 - (daysInMonth + firstDayOfMonth); // 남은 칸에 표시할 다음 달의 일 수

        // 한 날짜에 표시할 최대 이벤트 수 (넘으면 +n으로 표시)
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
            const eventList = events[dateKey] || [];
            const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

            days.push(
                <div
                    key={day}
                    onClick={() => openModal(day)}
                    className={`hos-schedul-date-cell ${isToday ? "hos-schedul-today" : ""}`}
                >
                    <span>{day}</span>

                    {/* 일정 목록 표시 */}
                    {eventList.slice(0, maxEventsToShow).map((event, index) => (
                        <div
                            key={index}
                            className="hos-schedul-event"
                            style={{ backgroundColor: event.color }}
                            onClick={(e) => { e.stopPropagation(); openModal(day, index); }} // 일정 클릭 시 모달 열기
                        >
                            <div className="hos-schedul-event-strip">
                                <p>{event.description}</p>
                            </div>
                            {/* 종일이면 "종일", 아니면 시간 표시 */}

                        </div>
                    ))}

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
                    {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
                <select value={month + 1} onChange={handleMonthChange}>
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
                        <p>날짜: {year}년 {month + 1}월 {selectedDate}일</p>
                        <form onSubmit={handleAddOrUpdateEvent}>
                            <label className="hos-schedul-time-label">
                                <input type="checkbox" checked={isAllDay} onChange={handleAllDayChange} />
                                종일
                            </label>
                            {!isAllDay && (
                                <>
                                    <label className="hos-schedul-time-label">시작 시간</label>
                                    <select className="hos-schedul-time-select"
                                        name="startTime">
                                        {[...Array(24)].map((_, i) => (
                                            <option key={i}>{i}:00</option>
                                        ))}
                                    </select>
                                    <label className="hos-schedul-time-label">종료 시간</label>
                                    <select className="hos-schedul-time-select"
                                        name="endTime">
                                        {[...Array(24)].map((_, i) => (
                                            <option key={i}>{i}:00</option>
                                        ))}
                                    </select>
                                </>
                            )}
                            <textarea name="description" rows="4"></textarea>
                            <button type="submit">저장</button>
                            {editingEventIndex !== null && (
                                <button type="button" onClick={handleDeleteEvent}>
                                    삭제
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HosSchedul;
