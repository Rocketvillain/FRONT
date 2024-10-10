import { addReview, allReview, deletereview, reviewDetail, reviewDetailByUser, updateReview, } from "../modules/ReviewModule";
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
            console.error('API error : ', error);
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
            console.error('API error : ', error);
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
            console.error('API error : ', error);
        }
    };

}

// 리뷰 등록 API 호출
export function addReviewAPI(createReviewDTO) {
    return async (dispatch) => {
        try {
            const result = await request('POST', '/api/v1/review/', createReviewDTO);
            dispatch(addReview(result.results.review));
        } catch (error) {
            console.error('Error adding add review : ', error);
            
        }
    };
}

// 리뷰 수정 API 호출
export function updatedReviewAPI(reviewId, createReviewDTO) {
    return async (dispatch) => {
        try {
            const result = await request('PUT', `/api/v1/review/${reviewId}`, createReviewDTO);
            dispatch(updateReview(result.results.review));
        } catch (error) {
            console.error('Error adding update review : ', error);
            
        }
    };
}

// 리뷰 삭제 API 호출
export function deletedReviewAPI(reviewId){
    return async (dispatch) => {
        try {
            await request('DELETE', `/api/v1/review/${reviewId}`);
            dispatch(deletereview(reviewId))
        } catch (error) {
            console.error('Error adding delete review : ', error);
            
        }
    }
}