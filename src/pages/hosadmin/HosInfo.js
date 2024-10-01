// 병원관리자 마이페이지(병원정보 조회, 수정)
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../../css/HosInfo.css';

function HosInfo() {

    const [reserTerm, setReserTerm] = useState("");
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const navigate = useNavigate();

    const hospital = useSelector(state => state.hospital.hospital); 

    // 병원 정보를 API에서 받아오기
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/hospital") // 백엔드 API 엔드포인트
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data)) {
            setHospitals(data);
            setFilteredHospitals(data);
            } else {
            console.error("Received data is not an array:", data);
            setHospitals([]);
            }
        })
        .catch((error) => console.error("Error fetching hospitals:", error));
    }, []);
    
    return (
        <div className="hos-info-container">
            <div className="hos-info-content">
                <div className="hos-info-header">
                    <h2>병원 정보</h2>
                    <img src={`/${hospital.ownerImage}`} alt="Healing Pets Logo" className="hos-logo" />
                </div>
                <table className="hos-info-table">
                    <tbody>
                        <tr>
                            <th>아이디</th>
                            <td>{hospital.userId}</td>
                        </tr>
                        <tr>
                            <th>병원 이름</th>
                            <td>
                                <input
                                    type="text"
                                    value={hospital.name}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <input
                                    type="text"
                                    value={hospital.address}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>대표자 이름</th>
                            <td>
                                <input
                                    type="text"
                                    value={hospital.ownerName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>사업자 등록 번호</th>
                            <td>
                                <input
                                    type="text"
                                    value={hospital.businessNo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>병원소개</th>
                            <td>
                                <textarea
                                    value={hospital.info}
                                ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="image-upload-section">
                    <div className="image-upload">
                        <img
                            src={`/${hospital.ownerImage}`}
                            alt="대표자 이미지"
                            className="image-preview"
                        />
                        <input
                            type="file"
                            id="ceoImageUpload"
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <button
                            type="button"
                            className="image-upload-button"
                        >
                            대표자 이미지 등록
                        </button>
                    </div>
                    <div className="image-upload">
                        <img
                            src={`/${hospital.infoImage}`}
                            alt="병원 이미지"
                            className="image-preview"
                        />
                        <input
                            type="file"
                            id="hospitalImageUpload"
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <button
                            type="button"
                            className="image-upload-button"
                        >
                            병원 이미지 등록
                        </button>
                    </div>
                </div>
                <div className="submit-button-container">
                    <button type="button" className="submit-button">
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HosInfo;
