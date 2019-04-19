import axios from '@/axios';

export async function  login(username,passwd) {
    return  axios({
        method: 'post',
        url: '/auth',
        data: {
            username,
            passwd,
        },
    });
}

export async function getUserInfo() {
    return  axios({
        method: 'get',
        url: '/api/user/get_info',
    });
}
