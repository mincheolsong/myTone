import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { HiLockClosed } from 'react-icons/hi'
import { ErrorMessage } from '@hookform/error-message';
import { useSelector } from 'react-redux';
import { loginUser } from '../../api/url';
import { getRefreshToken, setRefreshToken } from '../../cookie/Cookie';
import { setAuthToken } from '../../store';

import { Button } from 'react-bootstrap'
import './SignIn.css'

function SignIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let state = useSelector((state)=>state)
    // useForm 사용을 위한 선언
    const { register, setValue, formState: { errors }, handleSubmit } = useForm();

    return (
        <div className='login'>
            <h3>회원 로그인</h3>
            <div className="login-box">
                <form onSubmit={ (e)=>{
                        e.preventDefault();
                        axios.post('http://localhost:8000/user/login/', {
                            username: e.target.username.value,
                            password: e.target.password.value,
                        })
                        .then((res)=>{
                            if(res.status==200){
                                alert(res.data.message)
                                localStorage.setItem('UserID',res.data.token.user);
                                //props.change_ID(res.data.token.user);
                                setRefreshToken(res.data.token.refresh_token);
                                dispatch(setAuthToken(res.data.token.access_token));
                                navigate('/');
                            }
                        })
                        .catch((err)=>{
                            if(err.response.status==400){
                                alert('아이디 혹은 비밀번호가 틀렸습니다')
                            }
                            setValue("password", "");
                        })
                    }}>
                    <div className='id-container'>
                        <div className="id">아이디</div>
                        <input
                            {...register("username", { required: "Please Enter Your ID" })}
                            type="text" name="username"
                        />
                        <ErrorMessage
                            name="userid"
                            errors={errors}
                            render={({ message }) =>
                                <p className="text-sm font-medium text-rose-500">
                                    {message}
                                </p>
                            }
                        />
                    </div>
                    <div className='pw-container'>
                        <div className="pw">비밀번호</div>
                        <input
                            {...register("password", { required: "Please Enter Your Password" })}
                            type="password" name="password"
                        />
                        <ErrorMessage
                            name="userid"
                            errors={errors}
                            render={({ message }) =>
                                <p className="text-sm font-medium text-rose-500">
                                    {message}
                                </p>
                            }
                        />
                    </div>
                    <div className="login-button">
                        <input type='submit' value='Login' />
                    </div>
                </form>
            </div>


        </div>
    );

}

export default SignIn;