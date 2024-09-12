//  마이페이지 마이 펫 페이지
import '../../css/component/MyPage.css';

function MyPet() {
    const pets = [
        { id: 1, name: "바둑이", type: "강아지", gender: "남", weight: 12.4, age: 6, kind: "웰시코기" },
        { id: 2, name: "나비", type: "고양이", gender: "여", weight: 3.5, age: 4, kind: "코리안숏헤어" }
    ];

    return (
        <div className="page-content">
            <h2>마이 펫</h2>
            {pets.map((pet) => (
                <div className="pet-card" key={pet.id}>
                    <img src={`/images/${pet.name}.png`} alt={pet.name} className="pet-image" />
                    <div className="pet-info">
                        <p>이름: {pet.name}</p>
                        <p>종: {pet.type}</p>
                        <p>성별: {pet.gender}</p>
                        <p>체중: {pet.weight}kg</p>
                        <p>나이: {pet.age}</p>
                        <p>품종: {pet.kind}</p>
                        <div className="button-group">
                            <button className="update-btn">수정</button>
                            <button className="delete-btn">삭제</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyPet;