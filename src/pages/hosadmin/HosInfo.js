// 병원관리자 마이페이지(병원정보 조회, 수정)
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from "react-router-dom";
import { hospitalDetailAPI, updateHospitalAPI } from '../../api/HospitalAPICalls';
import '../../css/HosInfo.css';

function HosInfo() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 유저 아이디
    const userHosId = useSelector(state => state.user.userInfo.hosId); 
    // 유저 데이터
    const user = useSelector(state => state.user)    
    // 병원 데이터
    const hospital = useSelector(state => state.hospital.hospital);
    
    useEffect(() => {
        dispatch(hospitalDetailAPI(userHosId));
    }, [dispatch]);
    
    const [hospitalData, setHospitalData] = useState({
        name: hospital.name,
        address: hospital.address,
        ownerName: hospital.ownerName,
        businessNo: hospital.businessNo,
        info: hospital.info,
        ownerImage: hospital.ownerImage,
        infoImage: hospital.infoImage
    });
    

     // 입력 필드 값 변경 시 상태 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospitalData({
            ...hospitalData,
            [name]: value // 해당 입력 필드의 값 업데이트
        });
    };

    // 이미지 파일 선택 핸들러 추가
    const handleImageChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    
    // 선택한 이미지를 상태에 저장
    setHospitalData({
        ...hospitalData,
        [name]: file // 파일 객체 저장
        });
    };

    // 저장 버튼 클릭 시 API 호출하여 병원 정보 수정
    const handleSubmit = async () => {
        
        console.log("hosId : ", userHosId);
        console.log("hospitalData : ", hospitalData);
        
        await dispatch(updateHospitalAPI(userHosId, hospitalData)); // 수정된 병원 정보를 서버로 전송
        
        alert('병원 정보가 수정되었습니다.');

        navigate('/hosinfo');
    };


    return (
        <div className="hos-info-container">
            <div className="hos-info-content">
                <div className="hos-info-header">
                    <h2>병원 정보</h2>
                    <img src="/images/logo2.png" alt="Healing Pets Logo" className="hos-logo" />
                </div>
                
                <table className="hos-info-table">
                    <tbody>
                        <tr>
                            <th>아이디</th>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.userInfo.userId}</td>                            
                        </tr>
                        <tr>
                        <th>병원 이름</th>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={hospitalData.name}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <input
                                    type="text"
                                    name="address"
                                    value={hospitalData.address}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>대표자 이름</th>
                            <td>
                                <input
                                    type="text"
                                    name="ownerName"
                                    value={hospitalData.ownerName}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>사업자 등록 번호</th>
                            <td>
                                <input
                                    type="text"
                                    name="businessNo"
                                    value={hospitalData.businessNo}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>병원소개</th>
                            <td>
                                <textarea
                                    name="info"
                                    value={hospitalData.info}
                                    onChange={handleChange}
                                ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="image-upload-section">
                    <div className="image-upload">
                        <img
                            src={`/${hospitalData.ownerImage}`}
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
                            src={`/${hospitalData.infoImage}`}
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
                    <button type="button" className="submit-button" onClick={handleSubmit}>
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HosInfo;
