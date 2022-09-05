import {useState, useEffect} from 'react'
import axios from 'axios';
import {Button, Spinner} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './ImgUpload.css';
import Spinner_fuc from './Spinners';

function ImgUpload() {
  let [image,setImage] = useState('');
  let accessToken=localStorage.getItem('accessToken');
  let navigate = useNavigate();

  const [loading,setLoading] = useState(false);

  let onLoadFile = (e)=>{ // 이미지
    const file = e.target.files;
    setImage(file);
  }

  return(
    <div className="ImgUpload_BG">
      {
        loading ? <Spinner_fuc></Spinner_fuc> : 
        <div className="container">
            <h1 className="ImgUpload_Title">원하는 이미지를 선택하세요.</h1>
            <form>
              <input type='file' accept="img/*" onChange={onLoadFile}></input> 
            </form>

            <Button style={{backgroundColor: "#CD5C5C", color:"white", 
                            marginTop:"25px", border:"none", marginBottom:"30px"}}
                    onClick={() => {
                      setLoading(true);
                      const formdata = new FormData();
                      formdata.append('image',image[0]); //이미지
             
                      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                             
                      axios.post('/image/',formdata,{
                        headers : {
                          "Content-Type" : "multipart/form-data"
                        }
                      })            
                      .then((res)=>{
                        if(res.status==201){
                            let personal = res.data.personal;
                            navigate(`/Result/${personal}`);
                        }
                      })
                      .catch((err)=>{
                        if(err.response.status==401){
                          alert("로그인된 사용자만 가능합니다.");
                          navigate('/signin');
                        }
                        else if(err.response.status==500){
                          alert("이미지를 인식하기 어렵습니다.");
                        }
                      })
                             
                    }}>결과 확인</Button>
          <div className="sub_text">사진에 따라 이미지 인식이 어려울 수 있습니다😥</div>
        </div>

      }
    </div>
  );
}

export default ImgUpload