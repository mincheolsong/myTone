import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { addArticle } from '../../store.js'
import {Dropdown,Button,Form} from 'react-bootstrap'
import { removeRefreshToken } from '../../cookie/Cookie.js';
import { deleteAuthToken } from '../../store.js';
import './ArticlePost.css'
import axios from 'axios';
function ArticlePost() {
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [image,setImage] = useState(); // 이미지
    let [category,setCategory] = useState(1);
    let state = useSelector((state)=>state);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    
    //const accessToken=localStorage.getItem('accessToken');

    let onLoadFile = (e)=>{ // 이미지
        
        let file = e.target.files;
        
        setImage(file);
        //console.log(image)
    }

    
    return (
        <div className='post-top'>
            <div className="post-header">
                
                <Form.Group style={{width:'100%'}} className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label >제목</Form.Label>
                    <Form.Control  type="text"  value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                </Form.Group>

                <Dropdown style={{marginTop:'15px'}} >
                    <Dropdown.Toggle variant="light" id='dropdown-basic'>
                        {
                        category=='1'
                        ?'여름 쿨톤'
                        :category=='2'
                        ?'겨울 쿨톤'
                        :category=='3'
                        ?'가을 웜톤'
                        :'봄 웜톤'
                        }
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        
                        <Dropdown.Item onClick={()=>{setCategory(1)}}>여름 쿨톤</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setCategory(2)}}>겨울 쿨톤</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setCategory(3)}}>가을 웜톤</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setCategory(4)}}>봄 웜톤</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <br></br>
            {/* <div style={{width:'100%', height:'75%',marginBottom:'15px'}}>
                <textarea style={{width:'100%', height:'100%'}} name="content" onChange={(e) => { setContent(e.target.value) }} placeholder="내용을 입력해 주세요"></textarea>
            </div> */}
             <Form.Group style={{width:'100%'}} className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>내용</Form.Label>
                <Form.Control style={{minHeight:"300px",minWidth:"500px"}} value={content} onChange={(e)=>{setContent(e.target.value)}} as="textarea" rows={3} />
            </Form.Group>
            <form style={{marginBottom:'15px'}}>
                <input type='file' accept="img/*" multiple onChange={onLoadFile}></input>
            </form>
            <Button style={{backgroundColor: "#CD5C5C", color:"white", 
                        marginTop:"25px", border:"none", marginBottom:"30px"}} onClick={() => {
                const formdata = new FormData();
                
                if(image!=undefined && image.length>0){
                    for(let i=0;i<image.length;i++){
                        formdata.append('image',image[i]); //이미지
                    }
                }
                
                formdata.append('title',title);
                formdata.append('content',content);
                formdata.append('board',parseInt(category));

                // var object={}
                // formdata.forEach((value,key)=>{
                //     object[key]=value
                // })
                // console.log(object.images)

                // const id = 1;
                // const image = object.images.
                axios.defaults.headers.common['Authorization'] = `Bearer ${state.token.accessToken}`
                
                axios.post('/article/',formdata,{
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                })            
                .then((res)=>{
                    if(res.status==201){
                        alert(res.statusText)

                        navigate('/board/list')
                        //window.location.reload();
                    }
                })
                .catch((err)=>{
                    console.log(err.response.status)
                    if(err.response.status==401){
                        removeRefreshToken();
                        dispatch(deleteAuthToken());
                        alert('로그인이 만료되었습니다. 다시 로그인 해주세요')
                        // localStorage.removeItem('userId')
                        navigate('/signin')
                        window.location.reload()
                    }
                    
                    
                })
                
                }}>작성완료</Button>
        </div>
    )
}
export default ArticlePost