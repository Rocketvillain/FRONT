import axios from 'axios';

const DOMAIN = 'http://localhost:8080';

export const request = async (method, url, data) => {
    return await axios({
        method,
        url: `${DOMAIN}${url}`,
        data,
        headers: {
            'Content-Type': 'application/json', // JSON으로 요청한다는 것을 명시
        },
    })
    .then(res => res.data)
    .catch(error => {
        console.log(error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록
    });
};
