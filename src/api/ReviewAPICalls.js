import { allReview, reviewDetail, reviewDetailByUser, } from "../modules/ReviewModule";
import { request } from "./Apis";


// 전체 리뷰 API 호출
export function allReviewAPI() {
    console.log('전체 리뷰 리스트 호출...');

    return async (dispatch) => {
        try{
            const result = await request('GET', '/api/v1/review/one');
            console.log('result : ', result);
            dispatch(allReview(result.results.review));

            return result;
            
        }  catch (error) {
            console.log('API error : ', error);
        }
    };
    
}

// 단일 리뷰 API 호출
export function reviewDetailAPI(hosId) {
    console.log('단일 리뷰 정보 호출...');

    return async (dispatch) => {
        try{
            const result = await request('GET', `/api/v1/review/hospital/${hosId}`);
            console.log('단일 리뷰 정보 호출 result : ', result);

            dispatch(reviewDetail(result.results.review));

            return result;
            
        }  catch (error) {
            console.log('API error : ', error);
        }
    };

}

// 사용자 아이디로 리뷰 API 호출
export function reviewDetailByUserIdAPI(userId) {
    console.log('사용자 아이디로 단일 리뷰 정보 호출...');

    return async (dispatch) => {
        try{
            const result = await request('GET', `/api/v1/review/user/${userId}`);
            console.log('사용자로 리뷰 정보 호출 result : ', result);

            dispatch(reviewDetailByUser(result.results.reviewDTO));

            return result;
            
        }  catch (error) {
            console.log('API error : ', error);
        }
    };

}

// 마이페이지 나의 후기 내용 변경
export function updateReviewContent(reviewInfo) {
    console.log('리뷰 내용 변경...');

    return async () => {
        try{
            const result = await request('PUT', `/api/v1/review/${reviewInfo.reviewId}`,reviewInfo);
            console.log('리뷰 변경 정보 호출 result : ', result);

            return result;
            
        }  catch (error) {
            console.log('API error : ', error);
        }
    };
}

// 후기 삭제
export function deleteReview(reviewId) {
    console.log('리뷰 삭제...');

    return async () => {
        try{
            const result = await request('DELETE', `/api/v1/review/${reviewId}`);

            return result;
            
        }  catch (error) {
            console.log('API error : ', error);
        }
    };
}