// 병원관리자 마이페이지(병원정보 조회, 수정)
import { useState } from "react";
import '../../css/HosInfo.css';
function HosInfo() {

        const [hosInfo, setHosInfo] = useState({
            userId: 'user01',
            hospitalName: '강아지 동물병원',
            address: '서울 구로구 내마음대로 123-24',
            ceoName: '지동동구리',
            businessNumber: '125-45-10882',
            description: '병원 소개 글을 작성하는 곳입니다.',
        });
        const [previewImage, setPreviewImage] = useState({
            ceoImage: null,
            hospitalImage: null,
        });
    
        // 파일 업로드 핸들러
        const handleImageChange = (e, imageType) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                // 미리보기 이미지 설정
                setPreviewImage((prevImages) => ({
                    ...prevImages,
                    [imageType]: URL.createObjectURL(file),
                }));
            }
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
                                <td>{hosInfo.userId}</td>
                            </tr>
                            <tr>
                                <th>병원 이름</th>
                                <td>
                                    <input
                                        type="text"
                                        value={hosInfo.hospitalName}
                                        onChange={(e) => setHosInfo({ ...hosInfo, hospitalName: e.target.value })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    <input
                                        type="text"
                                        value={hosInfo.address}
                                        onChange={(e) => setHosInfo({ ...hosInfo, address: e.target.value })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>대표자 이름</th>
                                <td>
                                    <input
                                        type="text"
                                        value={hosInfo.ceoName}
                                        onChange={(e) => setHosInfo({ ...hosInfo, ceoName: e.target.value })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>사업자 등록 번호</th>
                                <td>
                                    <input
                                        type="text"
                                        value={hosInfo.businessNumber}
                                        onChange={(e) => setHosInfo({ ...hosInfo, businessNumber: e.target.value })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>병원소개</th>
                                <td>
                                    <textarea
                                        value={hosInfo.description}
                                        onChange={(e) => setHosInfo({ ...hosInfo, description: e.target.value })}
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="image-u pload-section">
                        <div className="image-upload">
                            <img
                                src={previewImage.ceoImage || '/images/defaultProfile.png'}
                                alt="대표자 이미지"
                                className="image-preview"
                            />
                            <input
                                type="file"
                                id="ceoImageUpload"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'ceoImage')}
                                style={{ display: 'none' }}
                            />
                            <button
                                type="button"
                                className="image-upload-button"
                                onClick={() => document.getElementById('ceoImageUpload').click()}
                            >
                                대표자 이미지 등록
                            </button>
                        </div>
                        <div className="image-upload">
                            <img
                                src={previewImage.hospitalImage || '/images/defaultHospital.png'}
                                alt="병원 이미지"
                                className="image-preview"
                            />
                            <input
                                type="file"
                                id="hospitalImageUpload"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'hospitalImage')}
                                style={{ display: 'none' }}
                            />
                            <button
                                type="button"
                                className="image-upload-button"
                                onClick={() => document.getElementById('hospitalImageUpload').click()}
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
