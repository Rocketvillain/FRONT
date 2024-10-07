import { allReview } from "../modules/ReviewModule";
import { request } from "./Apis";


// 전체 리뷰 API 호출
export function allReviewAPI() {
    console.log('전체 리뷰 리스트 호출...');

    return async (dispatch) => {
        try{
            const result = await request('GET', '/api/v1/review');
            console.log('result : ', result);
            dispatch(allReview(result.results.review));

            

            return result;
            
        }  catch (error) {
            console.log('API error : ', error);
        }
    };
    
}