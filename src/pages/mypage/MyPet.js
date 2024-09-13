import '../../css/component/MyPage.css';
import React, { useState, useEffect } from 'react';

function MyPet() {
    // 기본 펫 정보 (바둑이와 나비)
    const defaultPets = [
        { id: 1, name: "바둑이", type: "강아지", gender: "남", weight: 12.4, age: 6, kind: "웰시코기", image: '/images/바둑이.png' },
        { id: 2, name: "나비", type: "고양이", gender: "여", weight: 3.5, age: 4, kind: "코리안숏헤어", image: '/images/나비.png' }
    ];

    const [pets, setPets] = useState(defaultPets); // 기본 펫 정보를 상태로 사용
    const [newImage, setNewImage] = useState('/images/defaultPet.png'); // 새 펫 이미지 상태
    const [editMode, setEditMode] = useState(null); // 수정 모드 상태
    const [newPet, setNewPet] = useState({ // 새로운 펫 정보 초기화
        id: null,
        name: '',
        type: '',
        gender: '',
        weight: '',
        age: '',
        kind: '',
        image: '/images/defaultPet.png'
    });

    // 로컬 스토리지에서 저장된 펫 불러오기 + 기본 펫 복원
    useEffect(() => {
        const savedPets = JSON.parse(localStorage.getItem('pets'));
        if (savedPets) {
            // 기본 펫이 없을 경우 추가
            const petsWithDefaults = [...defaultPets, ...savedPets.filter(pet => !defaultPets.some(defaultPet => defaultPet.id === pet.id))];
            setPets(petsWithDefaults);
        } else {
            setPets(defaultPets); // 기본 펫 로드
        }
    }, []);

    // 파일 선택 시 처리 및 로컬 스토리지에 저장
    const handleFileChange = (event, id = null) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (id !== null) {
                    const updatedPets = pets.map((pet) => {
                        if (pet.id === id) {
                            return { ...pet, image: reader.result };
                        }
                        return pet;
                    });
                    setPets(updatedPets);
                    localStorage.setItem('pets', JSON.stringify(updatedPets));
                } else {
                    setNewImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // 새 펫을 추가하는 함수
    const handleAddPet = () => {
        const newPetWithId = { ...newPet, id: pets.length + 1 };
        const updatedPets = [...pets, newPetWithId];
        setPets(updatedPets);
        localStorage.setItem('pets', JSON.stringify(updatedPets));
        setNewPet({ // 새 펫 정보 초기화
            id: null,
            name: '',
            type: '',
            gender: '',
            weight: '',
            age: '',
            kind: '',
            image: '/images/defaultPet.png'
        });
    };

    // 수정 모드 활성화 및 저장
    const handleEditToggle = (id) => {
        if (editMode === id) {
            setEditMode(null);
            localStorage.setItem('pets', JSON.stringify(pets)); // 저장 시 로컬 스토리지에 업데이트
        } else {
            setEditMode(id);
        }
    };

    // 파일 선택 창 열기
    const handleFileInputClick = (id) => {
        document.getElementById(`fileInput-${id}`).click();
    };

    // handleInfoChange 함수 정의 (각 필드 업데이트 처리)
    const handleInfoChange = (id, field, value) => {
        const updatedPets = pets.map((pet) => {
            if (pet.id === id) {
                return { ...pet, [field]: value }; // 필드 업데이트
            }
            return pet;
        });
        setPets(updatedPets);
    };

    // 삭제 기능
    const handleDeletePet = (id) => {
        const updatedPets = pets.filter((pet) => pet.id !== id);
        setPets(updatedPets);
        localStorage.setItem('pets', JSON.stringify(updatedPets));
    };

    return (
        <div className="page-content">
            <h2>마이 펫</h2>
            {pets.map((pet) => (
                <div className="pet-card" key={pet.id}>
                    <img
                        src={pet.image || `/images/${pet.name}.png`}  // 기본 경로 유지
                        alt={pet.name}
                        className="pet-image"
                        onClick={() => handleFileInputClick(pet.id)}
                    />
                    <input
                        type="file"
                        id={`fileInput-${pet.id}`}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFileChange(event, pet.id)}
                    />
                    <div className="pet-info">
                        <p>이름:
                            {editMode === pet.id ? (
                                <input
                                    type="text"
                                    value={pet.name}
                                    onChange={(e) => handleInfoChange(pet.id, 'name', e.target.value)}
                                />
                            ) : pet.name}
                        </p>
                        <p>종: 
                            {editMode === pet.id ? (
                                <input
                                    type="text"
                                    value={pet.type}
                                    onChange={(e) => handleInfoChange(pet.id, 'type', e.target.value)}
                                />
                            ) : pet.type}
                        </p>
                        <p>성별:
                            {editMode === pet.id ? (
                                <input
                                    type="text"
                                    value={pet.gender}
                                    onChange={(e) => handleInfoChange(pet.id, 'gender', e.target.value)}
                                />
                            ) : pet.gender}
                        </p>
                        <p>체중:
                            {editMode === pet.id ? (
                                <input
                                    type="number"
                                    value={pet.weight}
                                    onChange={(e) => handleInfoChange(pet.id, 'weight', e.target.value)}
                                />
                            ) : `${pet.weight}kg`}
                        </p>
                        <p>나이:
                            {editMode === pet.id ? (
                                <input
                                    type="number"
                                    value={pet.age}
                                    onChange={(e) => handleInfoChange(pet.id, 'age', e.target.value)}
                                />
                            ) : pet.age}
                        </p>
                        <p>품종:
                            {editMode === pet.id ? (
                                <input
                                    type="text"
                                    value={pet.kind}
                                    onChange={(e) => handleInfoChange(pet.id, 'kind', e.target.value)}
                                />
                            ) : pet.kind}
                        </p>
                        <div className="button-group">
                            <button className="update-btn" onClick={() => handleEditToggle(pet.id)}>
                                {editMode === pet.id ? '저장' : '수정'}
                            </button>
                            <button className="delete-btn" onClick={() => handleDeletePet(pet.id)}>삭제</button>
                        </div>
                    </div>
                </div>
            ))}

            {/* 빈 카드 (+ 버튼만 표시) */}
            <div className="pet-card empty-card">
                <div className="add-pet-container">
                    <button className="add-pet-btn" onClick={handleAddPet}>+</button>
                </div>
            </div>
        </div>
    );
}

export default MyPet;
