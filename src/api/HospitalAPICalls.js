import { allHospital, hospitalDetail} from "../modules/HospitalModule";
import { request } from "./Apis";
import { fetchHospitalSchedules, addHospitalSchedule, updateHospitalSchedule, deleteHospitalSchedule } from "../modules/HospitalScheduleModule";

// 병원 전체 조회 API 호출
export function allHospitalAPI() {
    console.log('api 사용 예시 호출...');

    return async (dispatch) => {
        try {
            const result = await request('GET', '/api/v1/hospital');
            console.log('result : ', result); // 서버에서 받아온 data 정보 
            dispatch(allHospital(result.results.hospital));
            return result; // 포장한 데이터를 반환해주기.
        } catch (error) {
            console.error('API error:', error);
        }
    };
}

// 병원 상세 조회 API 호출
export function hospitalDetailAPI(hosId) {
    console.log('병원 정보 불러오기...');

    return async (dispatch) => {
        try {
            const result = await request('GET', `/api/v1/hospital/${hosId}`);
            console.log('result : ', result); // 서버에서 받아온 data 정보 
            const data = result.results.hospital;
            dispatch(hospitalDetail(data));
            return data; // 포장한 데이터를 반환해주기.
        } catch (error) {
            console.error('API error:', error);
        }
    };
}

// 병원 일정 조회 API 호출
export function fetchHospitalSchedulesAPI(hosId) {
    return async (dispatch) => {
        try {
            const result = await request('GET', `/api/v1/hospital/schedule/${hosId}`);
            console.log('RESULT :', result);
            
            dispatch(fetchHospitalSchedules(result.results.hospitalSchedule));

            // 여기서 result.results.hospitalSchedule을 반환
            // 함수는 병원 일정 데이터를 반환하게 되며, useEffect에서 response로 받을 수 있다.
            return result.results.hospitalSchedule;
        } catch (error) {
            console.error('Error fetching hospital schedules:', error);
            return null;  // 에러 발생 시 null 반환
        }
    };
}


// 병원 일정 등록 API 호출
export function addHospitalScheduleAPI(hospitalScheduleDTO) {
    return async (dispatch) => {
        try {
            const result = await request('POST', '/api/v1/hospital/schedule', hospitalScheduleDTO);
            dispatch(addHospitalSchedule(result.results.hospitalSchedule));
        } catch (error) {
            console.error('Error adding hospital schedule:', error);
        }
    };
}

// 병원 일정 수정 API 호출
export function updateHospitalScheduleAPI(scheduleId, hospitalScheduleDTO) {
    return async (dispatch) => {
        try {
            const result = await request('PUT', `/api/v1/hospital/schedule/${scheduleId}`, hospitalScheduleDTO);
            dispatch(updateHospitalSchedule(result.results.hospitalSchedule));
        } catch (error) {
            console.error('Error updating hospital schedule:', error);
        }
    };
}

// 병원 일정 삭제 API 호출
export function deleteHospitalScheduleAPI(scheduleId) {
    return async (dispatch) => {
        try {
            await request('DELETE', `/api/v1/hospital/schedule/${scheduleId}`);
            dispatch(deleteHospitalSchedule(scheduleId));
        } catch (error) {
            console.error('Error deleting hospital schedule:', error);
        }
    };
}
