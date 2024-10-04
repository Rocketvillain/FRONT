import axios from 'axios';
import '../../css/component/MyPage.css';
import React, { useState, useEffect } from 'react';

function MyPet() {

    const [pets, setPets] = useState([]); // 기본 펫 정보를 상태로 사용
    //const [newImage, setNewImage] = useState('/images/defaultPet.png'); // 새 펫 이미지 상태
    const [editMode, setEditMode] = useState(null);  // 수정 모드 상태
    const [addPetMode, setAddPetMode] = useState(false); // 추가 모드 상태
    const [newPet, setNewPet] = useState({ //새로운 펫 정보 초기화
        petId: '',
        petName: '',
        species: '',
        gender: '',
        weight: '',
        age: '',
        kind: '',
        image:'',
        userId: ''
    });

    const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
    console.log(token); // 토큰 출력

    // 백엔드 API에서 저장된 펫 불러오기
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/pets/myPet',{
                    headers: {
                    Authorization: `${token}`, // 토큰을 헤더에 포함
                },
              });       
               console.log(response.data);
               
                const petsData = response.data.results.pets || []; 
                
                if(Array.isArray(petsData)){
                const mappedPets = petsData.map(pet => ({

                    petId:pet.petId,
                    petName: pet.petName,
                    species: pet.species || '',
                    gender : pet.gender,
                    weight: pet.weight,
                    age: pet.age,
                    kind: pet.kind || '',
                    image: pet.image || ' ',

                }));

                setPets(mappedPets); //상태 업데이트
                console.log(mappedPets); // 매핑된 펫 정보 확인
                
            } else{
                    console.log("petsData는 배열이 아닙니다.", petsData);
                    setPets([])
                }
            }catch (error) {
                console.error("펫 정보를 불러오는 중 오류 발생", error);
                setPets([]);
            }
        };

        fetchPets(); // 함수 호출
    }, [token]);

    // 새 펫 추가하기
    const handleAddPet = async () => {
        try {
            const formData = new FormData();
            formData.append('petName', newPet.petName);
            formData.append('species', newPet.species);
            formData.append('gender', newPet.gender);
            formData.append('weight', newPet.weight);
            formData.append('age', newPet.age);
            formData.append('kind', newPet.kind);
            formData.append('image', newPet.image); // Base64 URL 또는 파일 객체 추가

            const response = await axios.post('http://localhost:8080/api/v1/pets/create', formData,{
                headers: {
                    Authorization: `${token}`, // 토큰을 헤더에 포함
                }
            }); // 백엔드 API 경로

            const addedPet = response.data.results.pet; 
            setPets([...pets, addedPet]); // 상태 업데이트
            setNewPet({ // 새 펫 정보 초기화
                petName: '',
                species: '',
                gender: '',
                weight: '',
                age: '',
                kind: '',
                image: '',
            });
             setAddPetMode(false); // 추가 모드 종료
        } catch (error) {
            console.error("펫 등록 중 오류 발생", error);
        }
    };

     // 새로운 펫 정보 업데이트
     const handleNewPetChange = (field, value) => {
        setNewPet({ ...newPet, [field]: value });
    };

    // 파일 선택 시 처리 및 로컬 스토리지에 저장
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
                    handleNewPetChange('image', imgUrl); // 이미지 URL 설정
                    // 로컬 스토리지에 이미지 저장 (선택 사항)
                    localStorage.setItem('newPetImage', imgUrl);
                } else {
                    alert("이미지는 180x180 픽셀 이상일 수 없습니다."); // 경고 메시지
                    event.target.value = ""; // 파일 입력 초기화
                }
            };
        };
         reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        }
    };

     // 파일 선택 창 열기
     const handleFileInputClick = (id) => {
        document.getElementById(`fileInput-${id}`).click();
    };

    // 펫 정보 수정하기
    const handleEditToggle = async (petId) => {
        if (editMode === petId) {
            try {
                
                // 수정할 펫 정보 찾기
                const petToUpdate = pets.find(pet => pet.petId === petId);
                console.log('수정할 펫 정보:',petToUpdate);
                
                
                // 서버에 수정 요청 전송
                const response = await axios.put(`http://localhost:8080/api/v1/pets/update/${petId}`, {
                    petId: petToUpdate.petId, // 펫 id는 포함되어 있음
                    petName: petToUpdate.petName,
                    species : petToUpdate.species,
                    gender : petToUpdate.gender,
                    weight: petToUpdate.weight,
                    age: petToUpdate.age,
                    kind: petToUpdate.kind,
                    image: petToUpdate.image || null, // 이미지가 없으면 null로 설정

                },{
                    headers:{
                        Authorization: `${token}`,
                    },

                }); 
                
                
                // 수정된 펫 정보
                const updatedPet = response.data.results.pet; //응답 구조에 변경
                console.log('업데이트 된 펫 조회',updatedPet);
                

                // 상태 업데이트
                const updatedPets = pets.map(pet => (pet.petId === petId ? updatedPet : pet));
                
                setPets(updatedPets);
                setEditMode(null); // 수정 모드 종료
            } catch (error) {
                console.error('펫 수정 중에 오류가 발생했습니다.', error);
            }
        } else {
            setEditMode(petId); // 수정 모드 시작
        }
    };

    // 삭제 기능
    const handleDeletePet = async (petId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/pets/delete/${petId}`,{
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
        <div className="page-content">
            <h2>마이 펫</h2>
            {pets.map((pet) => (
                <div className="pet-card" key={pet.petId}>
                    <img
                        src={pet.image || `/images/${pet.name}.png`}  // 기본 경로 유지
                        alt={pet.petName}
                        className="pet-image"
                    />
                    <div className="pet-info">
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
                        <div className="button-group">
                            <button className="update-btn" onClick={() => handleEditToggle(pet.petId)}>
                                {editMode === pet.petId ? '저장' : '수정'}
                            </button>
                            <button className="pet-delete-btn" onClick={() => handleDeletePet(pet.petId)}>삭제</button>
                        </div>
                    </div>
                </div>
            ))}

            {addPetMode && (
                <div className="add-pet-form" >
                        
                    <div className="create-pet-image">
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
                                />
                            </div>
                        )}
                    </div>

                  <div className ="add-pet-info">
                        <input type="text" placeholder="이름" onChange={(e) => handleNewPetChange('petName', e.target.value)} />
                        <input type="text" placeholder="종" onChange={(e) => handleNewPetChange('species', e.target.value)} />
                        <input type="text" placeholder="성별" onChange={(e) => handleNewPetChange('gender', e.target.value)} />
                        <input type="number" placeholder="체중" onChange={(e) => handleNewPetChange('weight', e.target.value)} />
                        <input type="number" placeholder="나이" onChange={(e) => handleNewPetChange('age', e.target.value)} />
                        <input type="text" placeholder="품종" onChange={(e) => handleNewPetChange('kind', e.target.value)} />
                    <div className="buttond-group">
                        <button className = "create-btn" onClick={handleAddPet}>추가</button>
                        <button className = "cancle-btn" onClick={() => setAddPetMode(false)}>취소</button>
                    </div>
                  </div>
                </div>
            )}

             {/* 빈 카드 (+ 버튼만 표시) */}
             <div className="pet-card empty-card">
                <div className="add-pet-container">
                    <button className="add-pet-btn" onClick={setAddPetMode}>+</button>
                </div>
            </div>

        </div>
    );
}

export default MyPet;
