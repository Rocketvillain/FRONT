import React from 'react';
import UserHeader from '../../components/commons/header/UserHeader';
import '../../css/Expenses.css';

function Expenses() {
    return (
        <>
            <UserHeader />
            <div className="expenses-container">
                <h1>강남 동물병원 평균 진료비 보기</h1>
                
                <section className="expenses-section">
                    <h2>[강아지]</h2>
                    <table className="expenses-table">
                        <thead>
                            <tr>
                                <th>견종</th>
                                <th>목욕</th>
                                <th>부분미용</th>
                                <th>전체미용</th>
                                <th>위생미용</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>소형견</td>
                                <td>15,000 ~</td>
                                <td>25,000 ~</td>
                                <td>30,000 ~</td>
                                <td>25,000 ~</td>
                            </tr>
                            <tr>
                                <td>중형견</td>
                                <td>20,000 ~</td>
                                <td>30,000 ~</td>
                                <td>35,000 ~</td>
                                <td>25,000 ~</td>
                            </tr>
                            <tr>
                                <td>대형견</td>
                                <td colspan="4">병원과 상담필요</td> {/* colspan으로 열 합치기 */}
                            </tr>
                            <tr>
                                <td>약욕</td>
                                <td colspan="4">소형견(목욕비) + 10,000원  |  대형견 및 특수견(목욕비) + 20,000원</td>
                            </tr>
                            <tr>
                                <td>염색</td>
                                <td colspan="4">부위당 5,000원  |  볼터치 3,000원</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>*기장  추가, 털 엉킴, 길이에 따라 추가비용 5,000원이 발생하며, 4KG, 7KG, 10KG, 13KG 초과 시 추가비용 5,000원이 발생합니다.<br/>
                            보다 더 자세한 미용상담/가격은 미용실에 별도 문의 바라며, 견종별 스타일에 따른 가격차이가 발생할 수 있으니 미리 예약 바랍니다.</p>
                </section>

                <section className="expenses-section">
                    <h2>[고양이]</h2>
                    <table className="expenses-table">
                        <thead>
                            <tr>
                                <th>고양이 무게</th>
                                <th>미용</th>
                                <th colspan="2">목욕</th>
                                <th>마취비</th>
                                <th>마취 전 검사</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>~ 5KG</td>
                                <td>55,000원</td>
                                <td>단모</td>
                                <td>25,000원</td>
                                <td>22,000원</td>
                                <td>별도</td>
                            </tr>
                            <tr>
                                <td>5 ~ 10KG</td>
                                <td>65,000원</td>
                                <td>장모</td>
                                <td>30,000원</td>
                                <td>33,000원</td> {/* 마취비 그대로 */}
                                <td>별도</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>*요금 청구는 미용비 + 마취비 입니다. (무마취는 고양이와 미용사의 안전을 위해 하지않습니다)</p>
                </section>

                <section className="expenses-section">
                    <table className="expenses-table">
                        <thead>
                            <tr>
                                <th colspan="2">강아지 예방접종 비용 안내</th> {/* colspan으로 열 합치기 */}
                                <th colspan="2">고양이 예방접종 비용 안내</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>백신 종류</th>
                                <th>예방접종 비용 (견종)</th>
                                <th>백신 종류</th>
                                <th>예방접종 비용 (묘종)</th>
                            </tr>
                            <tr>
                                <td>DHPPL 종합 백신</td>
                                <td>25,000원</td>
                                <td>고양이 범백혈구감소</td>
                                <td>25,000원 ~ 55,000원</td>
                            </tr>
                            <tr>
                                <td>코로나 장염 백신</td>
                                <td>15,000원</td>
                                <td>허피스 바이러스</td>
                                <td>25,000원 ~ 55,000원</td>
                            </tr>
                            <tr>
                                <td>켄넬코프 백신</td>
                                <td>15,000원</td>
                                <td>칼리시 바이러스</td>
                                <td>25,000원 ~ 55,000원</td>
                            </tr>
                            <tr>
                                <td>신종 플루 백신</td>
                                <td>30,000원</td>
                                <td>광견병</td>
                                <td>25,000원 ~ 55,000원</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}

export default Expenses;
