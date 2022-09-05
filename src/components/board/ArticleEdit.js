import { useSelector } from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import './ArticleEdit.css'
import axios from 'axios'

function ArticleEdit(){
    let navigate = useNavigate();
    let {id} = useParams();
    let [title,setTitle] = useState('');
    let [content,setContent] = useState('');
    let [createAt,setCreateAt] = useState('');
    let [boardId,setBoardId] = useState(0);
    let [user,setUser] = useState('');
    let state = useSelector((state)=>state);
    //const accessToken=localStorage.getItem('accessToken');
    useEffect(()=>{
        axios.get(`/article/${id}`)
        .then((res)=>{
            if(res.status===200){
                //setBoardId(res.data.id)
                setTitle(res.data.title);
                setContent(res.data.content);
                
                //setUser(res.data.user.uername);
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

   function editArticle(){
        
        if(state.token.accessToken!=null){
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token.accessToken}`
                        
            axios.patch(`/article/${id}/`,{
                title:title,
                content:content
            })
            .then((res)=>{
                console.log(res)
                if(res.status==200){
                    alert('수정완료')
                    navigate(`/board/detail/${id}`)
                }
            })
            .catch((err)=>{
                //alert(err.response.data.detail)
                
                //console.log(err.response.status)
                if(err.response.status==403){
                    alert('본인의 게시물만 수정 가능합니다')
                    navigate(-1)
                }
            })
        }else{
            alert('인증토큰이 없습니다')
        }
    }

    return(
        <>
        
        <div className='detail-top'>
            <div className='detail-header'>
            <Form.Group style={{width:'100%', margin:'0'}} className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label >제목</Form.Label>
            <Form.Control type="text"  value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            </Form.Group>

            </div>
            <hr></hr>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>내용</Form.Label>
                <Form.Control style={{minHeight:"300px",minWidth:"500px"}} value={content} onChange={(e)=>{setContent(e.target.value)}} as="textarea" rows={3} />
            </Form.Group>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Button variant="light" onClick={editArticle}>수정완료</Button>
            </div>
        </div>
        </>
    )
}

export default ArticleEdit