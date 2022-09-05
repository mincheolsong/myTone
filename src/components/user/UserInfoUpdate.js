import './UserInfoUpdate.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

function UserInfoUpdate() {
    let navigate = useNavigate();
    const userID = useParams();
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        axios.get('/user/' + userID.id)
            .then((result)=>{
                setUserInfo(result.data);
            })
    },[]);
      
    return (
        <div className="userInfoUpdate_BG">
            <form action="/"
                onSubmit={function (e) {
                    e.preventDefault();
                    axios.patch(`/user/${userID.id}/`, {
                        nickname: e.target.nickname.value,
                        gender: e.target.gender.value=="female"?"F":"M"
                    }).then((res) => {
                        if (res.status == 200) { // 수정 성공
                            alert('수정 완료!!');
                            navigate(`/userInfo/${userID.id}`);
                        } else { 
                            alert('수정 실패!!');
                        }
                    }).catch((err) => {
                        alert('정보를 정확히 입력해주세요!');
                    })
                }}>
                <h3 className="update_title">회원 정보 수정</h3>
                <table style={{margin:'0 auto',position:'relative'}}>
                    <tr>
                        <td style={{paddingRight:'10px'}}>닉네임</td>
                        <td>
                            <input type="text" name="nickname" placeholder={userInfo.nickname}></input>
                            </td>
                    </tr>
                    <tr>
                        <td>성별</td>
                        <td style={{display:'flex',justifyContent:'space-evenly', marginTop:"15px"}}>
                            <div><input type='radio' name='gender' value='female'/>여성</div>
                            <div><input type='radio' name='gender' value='male' />남성</div>
                        </td>
                    </tr>
                </table>
                <div style={{display:'flex',justifyContent:'center', marginTop:"30px"}}>
                        <input type="submit" value="수정하기!"></input>
                </div>
            </form>
        </div>
    );
}

export default UserInfoUpdate;