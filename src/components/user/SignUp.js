import { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from 'react-bootstrap'
import './SignUp.css'
import { useNavigate } from 'react-router';
    function SignUp() {
        let [passwordModal, setPasswordModal] = useState(false)
        let [pw1, setPw1] = useState('')
        let [pw2, setPw2] = useState('')
        let navigate = useNavigate();
        useEffect(() => {
            if (pw1 != pw2 && pw2.length > 0) {
                setPasswordModal(true)
            }
            else {
                setPasswordModal(false)
            }
        }, [pw1, pw2])
        return (
            <div className="signUp">
                <h2>
                    회원가입
                </h2>
                <Form action="/" className="form-top"
                    onSubmit={function (e) {
                        e.preventDefault();
                        axios.post('/user/register/', {
                            username: e.target.username.value,
                            password1: e.target.password1.value,
                            password2: e.target.password2.value,
                            nickname: e.target.nickname.value,
                            gender: e.target.gender.value == 'femail' ? 'W' : 'M'
                        }).then((res) => {
                            if (res.status == 200) { // 가입 성공
                                alert(res.data.message);
                                navigate('/signin')
                            } else { // 가입 실패
                                alert('가입 실패!!');
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    }}>
                    <div>
                        <Form.Label>아이디</Form.Label>
                        <Form.Control type="text" name="username" placeholder="아이디 입력" />
                    </div>
                    <div>
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control type="password" name="password1" placeholder="비밀번호 입력" onChange={(e) => { setPw1(e.target.value) }} />
                    </div>
                    <div>
                        <Form.Label>비밀번호 재입력</Form.Label>
                        <Form.Control type="password" name="password2" placeholder="비밀번호 재입력" onChange={(e) => { setPw2(e.target.value) }} />
                        {
                            passwordModal == true ? <div style={{ marginTop: '16px' }} className="alert alert-warning">일치하는 비밀번호를 입력해주세요</div> : null
                        }
                    </div>
                    <div>
                        <Form.Label>닉네임</Form.Label>
                        <Form.Control type="text" name="nickname" placeholder="닉네임" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Form.Check inline type='radio' name='gender' label='여성' value='female' />
                        <Form.Check inline type='radio' name='gender' label='남성' value='male' />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="success" type="submit">가입하기</Button>
                    </div>
                </Form>

            </div>
        );

    }



    export default SignUp