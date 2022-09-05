import './UserInfo.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

function UserInfo() {
    let navigate = useNavigate();

    const userID = useParams();
    const [userInfo, setUserInfo] = useState([]);
 
    useEffect(() => {
        axios.get('/user/' + userID.id)
            .then((result)=>{
                setUserInfo(result.data);
            })
    },[]);

    //const user_date = userInfo.created_at?.split('T');
    
    return(
        <div className="userInfo_container">
            <h3 className="user_name_title">{userInfo.username}님의 정보</h3>
            <div className="userInfo_item">
                <p>사용자 이름 : {userInfo.username}</p>
                <p>닉네임 : {userInfo.nickname}</p>
                <p>성별 : {userInfo.gender == 'F' ? '여성' : '남성'}</p>
                
                <Button style={{backgroundColor: "#CD5C5C", color:"white", 
                        border:"none", marginTop:"20px"}} 
                        onClick={()=>{navigate(`/userInfo/${userID.id}/update`)}}>정보 수정</Button>
            </div>
        </div>
    );
}

export default UserInfo;