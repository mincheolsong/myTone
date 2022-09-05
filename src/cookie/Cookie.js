// refreshToken을 저장하는 쿠키

import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken)=>{
    //const today = new Date();
    //const expireDate = today.setDate(today.getDate() + 7);

    return cookies.set('refresh_token',refreshToken,{sameSite:'strict',path:"/"});
};

export const getRefreshToken = ()=>{
    return cookies.get('refresh_token');
};

export const removeRefreshToken = ()=>{
    console.log('cookie삭제')
    return cookies.remove('refresh_token',{sameSite:'strict',path:"/"})
}
