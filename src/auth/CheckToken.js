import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, removeRefreshToken } from '../cookie/Cookie';
import { requestToken } from '../api/url';
import { deleteAuthToken, setAuthToken } from '../store';

export function CheckToken(key){
    const [isAuth,setIsAuth] = useState('Loading');
    const {authenticated,expireTime} = useSelector(state=>state.token);
    const refreshToken = getRefreshToken();
    const dispatch = useDispatch();

    useEffect(()=>{
        const checkAuthToken = async ()=>{
            if(refreshToken==undefined){
                dispatch(deleteAuthToken());
                setIsAuth('Failed');
            }else{
                if (authenticated && new Date().getTime() < expireTime){
                    setIsAuth('Success');
                }else{
                    const response = await requestToken(refreshToken);

                    if(response.status){
                        const token = response.access_token;
                        dispatch(setAuthToken(token));
                        setIsAuth('Success')
                    }else{
                        dispatch(deleteAuthToken());
                        removeRefreshToken();
                        setIsAuth('Failed');
                    }
                }
            }
        }

        checkAuthToken();

    },[refreshToken,dispatch,key])

    return{
        isAuth
    };
}