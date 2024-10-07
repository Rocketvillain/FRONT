import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DOMAIN = 'http://localhost:8080';

export const request = async (method, url, data) => {

    return await axios({
        method,
        url: `${DOMAIN}${url}`,
        data,
        headers: {
            'Content-Type': 'application/json', // JSON으로 요청한다는 것을 명시
            'Authorization': localStorage.getItem('token'), // 토큰 request header에 담아주기
            
        },
        
    })
    .then(res => res.data)
    .catch(error => {
        console.log(error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록
    });
};

export const loginRequest = async (method, url, data) => {
    return await axios({
        method,
        url: `${DOMAIN}${url}`,
        data,
        headers: {
            'Content-Type': 'application/json', // JSON으로 요청한다는 것을 명시
        },
    })
    .then(res => res)
    .catch(error => {
        console.log(error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록
    });
};
