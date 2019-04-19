import axios from '@/axios';

/**
 * 获取全部设备
 */
export async function getAllEquip() {
    return  axios({
        method: 'get',
        url: '/api/equip/get_infos',
    });
}
