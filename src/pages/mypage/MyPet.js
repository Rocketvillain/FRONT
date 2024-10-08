import axios from 'axios';
import '../../css/component/MyPage.css';
import React, { useState, useEffect } from 'react';

function MyPet() {

    const [pets, setPets] = useState([]); // 기본 펫 정보를 상태로 사용
    const [editMode, setEditMode] = useState(null);  // 수정 모드 상태
    const [addPetMode, setAddPetMode] = useState(false); // 추가 모드 상태
    const [selectedImage, setSelectedImage] = useState(null);
    const [newPet, setNewPet] = useState({ //새로운 펫 정보 초기화

        petId: '',
        petName: '',
        species: '',
        gender: '',
        weight: '',
        age: '',
        kind: '',
        image: '',
        userId: ''
    });

    const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
    console.log(token); // 토큰 출력


    // 백엔드 API에서 저장된 펫 불러오기
    useEffect(() => {
        const fetchPets = async () => {

            try {
                const response = await axios.get('http://localhost:8080/api/v1/pets/myPet', {
                    headers: {
                        Authorization: `${token}`, // 토큰을 헤더에 포함

                    },
                });
                console.log(response.data);

                const petsData = response.data.results.pets || [];

                if (Array.isArray(petsData)) {


                    const mappedPets = petsData.map(pet => {
                        // const storedImage = localStorage.getItem(`petImage_${pet.petId}`); //localstorage에서 이미지 가져오기

                        return {
                            petId: pet.petId,
                            petName: pet.petName,
                            species: pet.species || '',
                            gender: pet.gender,
                            weight: pet.weight,
                            age: pet.age,
                            kind: pet.kind || '',
                            image: pet.image ? `${pet.image}` : `/images/defaultPet.png`,
                        };
                    });

                    setPets(mappedPets); //상태 업데이트
                    console.log(mappedPets); // 매핑된 펫 정보 확인

                } else {
                    setPets([])
                }
            } catch (error) {
                console.error("펫 정보를 불러오는 중 오류 발생", error);
                setPets([]);
            }
        };

        fetchPets(); // 함수 호출
    }, [token]);

    // 새 펫 추가하기
    const handleAddPet = async () => {
        console.log("선택된 이미지 ", selectedImage);

        try {
            const formData = new FormData();

            // 새로운 펫 정보 객체 생성
            const petInfo = {
                petName: newPet.petName,
                species: newPet.species,
                gender: newPet.gender,
                weight: newPet.weight,
                age: newPet.age,
                kind: newPet.kind,
            };

            // petInfo를 JSON 문자열로 추가
            formData.append('petInfo', JSON.stringify(petInfo));

            // 선택한 이미지를 fromData에 추가
            if (selectedImage) {
                formData.append('image', selectedImage)
            } else {
                console.error("이미지가 선택 x");
            }

            const response = await axios.post('http://localhost:8080/api/v1/pets/create', formData, {
                headers: {
                    Authorization: `${token}`, // 토큰을 헤더에 포함
                    'Content-Type': 'multipart/form-data',
                }
            }); // 백엔드 API 경로

            const addedPet = response.data.results.pet;
            // 새 펫 추가 후 상태 업데이트
            setPets([...pets, { ...addedPet, image: response.data.results.imagePath }]); // 이미지 포함
            setNewPet({
                petId: '',
                petName: '',
                species: '',
                gender: '',
                weight: '',
                age: '',
                kind: '',
                image: '',
            });
            setSelectedImage(null); //선택된 이미지 초기화
            setAddPetMode(false); // 추가 모드 종료
        } catch (error) {
            console.error("펫 등록 중 오류 발생", error);
        }
    };

    // 새로운 펫 정보 업데이트
    const handleNewPetChange = (field, value) => {
        setNewPet({ ...newPet, [field]: value });
    };

    // 파일 선택 시 처리 
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgUrl = e.target.result; // Base64 URL
                const img = new Image();
                img.src = imgUrl;

                img.onload = () => {
                    // 이미지의 너비와 높이를 확인
                    if (img.width < 180 || img.height < 180) {

                        setSelectedImage(file) //실제 파일 객체를 상태에 저장
                        handleNewPetChange('image', imgUrl); // 미리보기용 이미지 URL 설정
                        setNewPet({ ...newPet, image: imgUrl }); // 상태 업데이트
                    } else {
                        alert("이미지는 180x180 픽셀 이상일 수 없습니다."); // 경고 메시지
                        event.target.value = ""; // 파일 입력 초기화
                    }
                };
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        } else {
            console.error("파일이 선택되지 않았습니다.");
        }
    };

    // 펫 정보 수정하기
    const handleEditToggle = async (petId) => {
        if (editMode === petId) {
            try {
                const petToUpdate = pets.find(pet => pet.petId === petId);
                if (!petToUpdate) return;

                const formData = new FormData();
                formData.append('petInfo', new Blob([JSON.stringify({
                    petId: petToUpdate.petId,
                    petName: petToUpdate.petName,
                    species: petToUpdate.species,
                    gender: petToUpdate.gender,
                    weight: petToUpdate.weight,
                    age: petToUpdate.age,
                    kind: petToUpdate.kind,
                })], { type: 'application/json' }));

                if (selectedImage) {
                    formData.append('image', selectedImage)
                } else {
                    console.warn("새로운 이미지가 선택되지 않았습니다."); // 경고 메시지
                }

                const response = await axios.put(`http://localhost:8080/api/v1/pets/update/${petId}`, formData, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                });

                if (response.data && response.data.results && response.data.results.pet) {
                    const updatedPet = response.data.results.pet;
                    setPets(pets.map(pet => (pet.petId === petId ? updatedPet : pet)));
                }

                const updatedPet = response.data.results.pet;
                const updatedPets = pets.map(pet => (pet.petId === petId ? updatedPet : pet));
                setPets(updatedPets);
                setEditMode(null); // 수정 모드 종료
            } catch (error) {
                console.error('펫 수정 중 오류 발생', error);
            }
        } else {
            setEditMode(petId); // 수정 모드 시작
        }
    };

    // 이미지 파일 선택 시 처리
    const handleImageChange = (event, petId) => {
        const file = event.target.files[0];
        console.log("선택된 이미지: ", selectedImage);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgUrl = e.target.result;
                handleInfoChange(petId, 'image', imgUrl); // 상태 업데이트
                setSelectedImage(file); // 선택한 파일을 상태에 저장
            };
            reader.readAsDataURL(file);
        } else {
        }
    };

    // 삭제 기능
    const handleDeletePet = async (petId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/pets/delete/${petId}`, {
                headers: {
                    Authorization: `${token}`, // 토큰을 헤더에 포함
                },
            }); // 백엔드 API 경로
            const updatedPets = pets.filter((pet) => pet.petId !== petId); // 삭제된 펫 제외
            setPets(updatedPets); // 상태 업데이트
        } catch (error) {
            console.log("펫 삭제 중 오류 발생: ", error);
        }
    };

    // handleInfoChange 함수 정의 (각 필드 업데이트 처리)
    const handleInfoChange = (petId, field, value) => {
        const updatedPets = pets.map((pet) => {
            if (pet.petId === petId) {
                return { ...pet, [field]: value }; // 필드 업데이트
            }
            return pet;
        });
        setPets(updatedPets);
    };


    return (
        <div className="my-pet">
            <h2>마이 펫</h2>
            {pets.map((pet) => (
                <div className="my-pet-pet-card" key={pet.petId}>
                    <div>
                        {editMode === pet.petId && (
                            <input
                                type="file"
                                id={`fileInput-${pet.petId}`} //각 쳇에 대한 고유 ID설정
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, pet.petId)}
                            />
                        )}
                        <img
                            src={pet.image || `/images/defaultPet.png`}  // 기본 경로 유지
                            alt={pet.petName}
                            className="my-pet-pet-image"
                        />
                    </div>
                    <div className="my-pet-pet-info">
                        <p>이름:
                            {editMode === pet.petId ? (
                                <input
                                    type="text"
                                    value={pet.petName}
                                    onChange={(e) => handleInfoChange(pet.petId, 'petName', e.target.value)}
                                />
                            ) : pet.petName}
                        </p>
                        <p>종:
                            {editMode === pet.petId ? (
                                <input
                                    type="text"
                                    value={pet.species}
                                    onChange={(e) => handleInfoChange(pet.petId, 'species', e.target.value)}
                                />
                            ) : pet.species}
                        </p>
                        <p>성별:
                            {editMode === pet.petId ? (
                                <input
                                    type="text"
                                    value={pet.gender}
                                    onChange={(e) => handleInfoChange(pet.petId, 'gender', e.target.value)}
                                />
                            ) : pet.gender}
                        </p>
                        <p>체중:
                            {editMode === pet.petId ? (
                                <input
                                    type="number"
                                    value={pet.weight}
                                    onChange={(e) => handleInfoChange(pet.petId, 'weight', e.target.value)}
                                />
                            ) : `${pet.weight}kg`}
                        </p>
                        <p>나이:
                            {editMode === pet.petId ? (
                                <input
                                    type="number"
                                    value={pet.age}
                                    onChange={(e) => handleInfoChange(pet.petId, 'age', e.target.value)}
                                />
                            ) : pet.age}
                        </p>
                        <p>품종:
                            {editMode === pet.petId ? (
                                <input
                                    type="text"
                                    value={pet.kind}
                                    onChange={(e) => handleInfoChange(pet.petId, 'kind', e.target.value)}
                                />
                            ) : pet.kind}
                        </p>
                        <div className="my-pet-button-group">
                            <button className="my-pet-update-btn" onClick={() => handleEditToggle(pet.petId)}>
                                {editMode === pet.petId ? '저장' : '수정'}
                            </button>
                            <button className="my-pet-delete-btn" onClick={() => handleDeletePet(pet.petId)}>삭제</button>
                        </div>
                    </div>
                </div>
            ))}
    
            {addPetMode && (
                <div className="my-pet-add-pet-form">
                    <div className="my-pet-create-pet-image">
                        {/* 이미지 업로드 입력 필드 */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
    
                        {/* 이미지 미리보기 */}
                        {newPet.image && (
                            <div>
                                <img
                                    src={newPet.image}
                                    alt="미리보기"
                                    className="my-pet-preview-image"
                                />
                            </div>
                        )}
                    </div>
    
                    <div className="my-pet-add-pet-info">
                        <input type="text" placeholder="이름" onChange={(e) => handleNewPetChange('petName', e.target.value)} /><br/>
                        <input type="text" placeholder="종" onChange={(e) => handleNewPetChange('species', e.target.value)} /><br/>
                        <input type="text" placeholder="성별" onChange={(e) => handleNewPetChange('gender', e.target.value)} /><br/>
                        <input type="number" placeholder="체중" onChange={(e) => handleNewPetChange('weight', e.target.value)} /><br/>
                        <input type="number" placeholder="나이" onChange={(e) => handleNewPetChange('age', e.target.value)} /><br/>
                        <input type="text" placeholder="품종" onChange={(e) => handleNewPetChange('kind', e.target.value)} /><br/>
                        <div className="my-pet-buttond-group">
                            <button className="my-pet-create-btn" onClick={handleAddPet}>추가</button>
                            <button className="my-pet-cancel-btn" onClick={() => setAddPetMode(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}
    
            {/* 빈 카드 (+ 버튼만 표시) */}
            <div className="my-pet-pet-card my-pet-empty-card">
                <div className="my-pet-add-pet-container">
                    <button className="my-pet-add-pet-btn" onClick={setAddPetMode}>+</button>
                </div>
            </div>
        </div>
    );
    
}

export default MyPet;
