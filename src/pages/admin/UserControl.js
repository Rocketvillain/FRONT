import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetAllUsersAPI, adminDeactivateUserAPI } from '../../api/AdminAPICalls';
import '../../css/admin/UserControl.css'; // CSS 파일을 추가합니다.

function UserControl() {
    const dispatch = useDispatch();
    const members = useSelector((state) => state.user.users)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false); // 검색이 진행 중인지 여부를 관리
    const [showConfirmModal, setShowConfirmModal] = useState(false); // 삭제 확인 모달 상태
    const [showCompleteModal, setShowCompleteModal] = useState(false); // 삭제 완료 모달 상태
    const [memberToDelete, setMemberToDelete] = useState(null); // 삭제할 멤버 상태
    const membersPerPage = 10; // 한 페이지에 보여줄 멤버 수
    const [filteredMembers, setFilteredMembers] = useState(members); // 처음에는 전체 회원 목록을 표시
    const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

    // 한 번에 보여줄 페이지 버튼의 개수
    const paginationGroupSize = 7;

    // 현재 페이지 그룹의 시작과 끝 계산
    const startPage = Math.floor((currentPage - 1) / paginationGroupSize) * paginationGroupSize + 1;
    const endPage = Math.min(startPage + paginationGroupSize - 1, totalPages);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 호출
        dispatch(adminGetAllUsersAPI());
    }, [dispatch]);

    useEffect(() => {
        setFilteredMembers(members); // 검색되지 않은 상태에서는 전체 멤버 표시
    }, [members]);

    // 검색 실행 처리
    const handleSearch = () => {
        const filtered = members.filter(member =>
            member.userId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log('filtered', filtered);

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

    // ◀ 버튼: 이전 페이지로 이동
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // ▶ 버튼: 다음 페이지로 이동
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 삭제 모달 열기
    const openConfirmModal = (member) => {
        setMemberToDelete(member); // 삭제할 멤버 설정
        setShowConfirmModal(true); // 삭제 확인 모달 열기
        console.log("member : ", member);

    };

    // 멤버 삭제
    const handleDelete = async () => {
        dispatch(adminDeactivateUserAPI(memberToDelete.userId)); // Redux를 통해 상태를 secession으로 변경
        setShowConfirmModal(false);
        setShowCompleteModal(true); // 삭제 완료 모달 표시

        console.log("memberToDelete.userId", memberToDelete.userId);

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
                        <th>아이디</th>
                        <th>역할</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>이메일</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMembers.length > 0 ? (
                        currentMembers.map(member => (
                            <tr key={member.userId}>
                                <td className={member.userState === 'secession' ? 'user-control-dark' : ''}>
                                    {member.userId}
                                </td>
                                <td className={member.userState === 'secession' ? 'user-control-dark' : ''}>
                                    {member.userRole}
                                </td>
                                <td className={member.userState === 'secession' ? 'user-control-dark' : ''}>
                                    {member.name}
                                </td>
                                <td className={member.userState === 'secession' ? 'user-control-dark' : ''}>
                                    {member.phone}
                                </td>
                                <td className={member.userState === 'secession' ? 'user-control-dark' : ''}>
                                    {member.email}
                                </td>
                                <td>
                                    {member.userState === 'secession' ? (
                                        <span className='user-control-secession'>탈퇴</span> // user_state가 'secession'일 경우 '탈퇴' 표시
                                    ) : (
                                        <button
                                            className="user-control-delete-button"
                                            onClick={() => openConfirmModal(member)} // 삭제 모달 열기
                                        >
                                            탈퇴
                                        </button>
                                    )}
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
                <button onClick={handleFirstPage} disabled={currentPage === 1 || filteredMembers.length === 0}>
                    ◁◁
                </button>
                <button onClick={handlePrevPage} disabled={currentPage === 1 || filteredMembers.length === 0}>
                    ◀
                </button>
                {[...Array(endPage - startPage + 1)].map((_, index) => (
                    <button
                        key={startPage + index}
                        onClick={() => handlePageChange(startPage + index)}
                        className={startPage + index === currentPage ? "user-control-active" : ""}
                    >
                        {startPage + index}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages || filteredMembers.length === 0}>
                    ▶
                </button>
                <button onClick={handleLastPage} disabled={currentPage === totalPages || filteredMembers.length === 0}>
                    ▷▷
                </button>
            </div>

            {/* 삭제 확인 모달 */}
            {showConfirmModal && (
                <div className="user-control-modal">
                    <div className="user-control-modal-content">
                        <p>탈퇴하시겠습니까?</p>
                        <div className="user-control-modal-buttons">
                            <button onClick={handleDelete}>확인</button>
                            <button onClick={() => setShowConfirmModal(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 삭제 완료 모달 */}
            {showCompleteModal && (
                <div className="user-control-modal">
                    <div className="user-control-modal-content">
                        <p>탈퇴가 완료되었습니다.</p>
                        <div className="user-control-modal-buttons">
                            <button onClick={closeCompleteModal}>확인</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserControl;
