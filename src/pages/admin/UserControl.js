import React, { useState } from 'react';
import '../../css/admin/UserControl.css'; // CSS 파일을 추가합니다.

function UserControl() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false); // 검색이 진행 중인지 여부를 관리
    const [showConfirmModal, setShowConfirmModal] = useState(false); // 삭제 확인 모달 상태
    const [showCompleteModal, setShowCompleteModal] = useState(false); // 삭제 완료 모달 상태
    const [memberToDelete, setMemberToDelete] = useState(null); // 삭제할 멤버 상태
    const membersPerPage = 5; // 한 페이지에 보여줄 멤버 수
    const [members, setMembers] = useState([
        { id: '001', role: '관리자', userId: 'ohgiraffers', name: '권순혁', phone: '070-1234-5678', email: 'ohgi@gmail.com', businessNo: null },
        { id: '002', role: '병원 관리자', userId: 'hospital', name: '박호찬', phone: '02-2345-6789', email: 'hos@gmail.com', businessNo: '124-45-10901' },
        { id: '003', role: '병원 관리자', userId: 'hospizza', name: '박동운', phone: '02-9876-5432', email: 'hos@gmail.com', businessNo: '124-45-10902' },
        { id: '004', role: '회원', userId: 'user123', name: '지동혁', phone: '010-9753-2546', email: 'user@gmail.com', businessNo: null },
        { id: '005', role: '회원', userId: 'kingwe', name: '위쌈바', phone: '010-8754-2365', email: 'king@gmail.com', businessNo: null },
        { id: '006', role: '회원', userId: 'queenkim', name: '김강효', phone: '010-4657-7890', email: 'queen@gmail.com', businessNo: null },
        { id: '007', role: '회원', userId: 'jackyang', name: '양하윤', phone: '010-1542-2674', email: 'jack@gmail.com', businessNo: null }
        // 추가 멤버 데이터
    ]);

    const [filteredMembers, setFilteredMembers] = useState(members); // 처음에는 전체 회원 목록을 표시
    const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

    // 검색 실행 처리
    const handleSearch = () => {
        const filtered = members.filter(member =>
            member.userId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMembers(filtered);
        setIsSearching(true); // 검색이 진행되었음을 표시
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    // Enter 키를 눌렀을 때 검색 실행
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 검색어 변경 처리
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    // 삭제 모달 열기
    const openConfirmModal = (member) => {
        setMemberToDelete(member); // 삭제할 멤버 설정
        setShowConfirmModal(true); // 삭제 확인 모달 열기
    };

    // 멤버 삭제
    const handleDelete = () => {
        const updatedMembers = members.filter(member => member.id !== memberToDelete.id);
        setMembers(updatedMembers);
        setFilteredMembers(updatedMembers); // 삭제 후에도 검색된 목록을 갱신
        setShowConfirmModal(false); // 삭제 확인 모달 닫기
        setShowCompleteModal(true); // 삭제 완료 모달 열기
    };

    // 삭제 완료 모달 닫기
    const closeCompleteModal = () => {
        setShowCompleteModal(false); // 삭제 완료 모달 닫기
    };

    // 페이징 처리
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

    return (
        <div className="user-control-container">
            <h2 className="user-control-title">회원 목록</h2>
            <div className="user-control-search-bar">
                <input
                    type="text"
                    className="user-control-search-input"
                    placeholder="아이디로 검색"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress} // Enter 키 처리
                />
                <button
                    className="user-control-search-button"
                    onClick={handleSearch} // 검색 버튼 클릭 시 검색 실행
                >
                    검색
                </button>
            </div>

            <table className="user-control-table">
                <thead>
                    <tr>
                        <th>회원번호</th>
                        <th>역할</th>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>이메일</th>
                        <th>사업자 번호</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMembers.length > 0 ? (
                        currentMembers.map(member => (
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.role}</td>
                                <td>{member.userId}</td>
                                <td>{member.name}</td>
                                <td>{member.phone}</td>
                                <td>{member.email}</td>
                                <td>{member.businessNo ? member.businessNo : 'N/A'}</td>
                                <td>
                                    <button
                                        className="user-control-delete-button"
                                        onClick={() => openConfirmModal(member)} // 삭제 모달 열기
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">
                                {isSearching ? '검색 결과가 없습니다.' : '회원 목록이 없습니다.'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="user-control-pagination">
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    ◀
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? "user-control-active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    ▶
                </button>
            </div>

            {/* 삭제 확인 모달 */}
            {showConfirmModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>삭제하시겠습니까?</p>
                        <div className="modal-buttons">
                            <button onClick={handleDelete}>확인</button>
                            <button onClick={() => setShowConfirmModal(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 삭제 완료 모달 */}
            {showCompleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>삭제가 완료되었습니다.</p>
                        <div className="modal-buttons">
                            <button onClick={closeCompleteModal}>확인</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserControl;
