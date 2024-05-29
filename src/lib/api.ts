import {get, post,put, del} from '@/lib/HttpHelpers'

export const getBagiBonus = (params?: any) => {
    return get({path: '/bagi-bonus', params: params});
}

export const getBagiBonusById = (id?: any) => {
    return get({path: '/bagi-bonus/' + id});
}

export const postBagiBonus = (params: any) => {
    return post({path: '/bagi-bonus', params});
}

export const putBagiBonus = (id: any,params: any) => {
    return put({path: '/bagi-bonus/' + id, params});
}

export const delBagiBonus = (id: any) => {
    return del({path: '/bagi-bonus/' + id});
}