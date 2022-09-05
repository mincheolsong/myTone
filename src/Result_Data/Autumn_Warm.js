import { Button } from 'react-bootstrap';
import './Autumn_Warm.css';
import autumn_Img from '../img/Autumn_main_img.jpg';
import autumn_color_Img from '../img/autumn_color.jpg';
import {useNavigate} from 'react-router-dom'

function Autumn_Warm(){
    let navigate = useNavigate();
    let colorID = 3;

    return(
        <>
            <div className="autumn_title_BG">
                <h4 className="title">테스트 결과는 <div className="result_title">가을 웜(Autumn Warm)</div> 입니다.</h4>
                <img src={autumn_Img} className="autumn_Img"></img>
                <div>
                    <Button className="share_btn" style={{backgroundColor: "#CD5C5C", border:"none"}}
                    onClick={()=>{navigate('/post')}}>공유하기</Button>
                    <Button className="cosmetic_btn" style={{backgroundColor: "#CD5C5C", border:"none"}}
                    onClick={()=>{navigate(`/cosmetic/${colorID}`)}}>화장품 추천</Button>
                </div>
            </div>
            <div className="autumn_content_BG">
                <h4 className="sub_title">특징</h4>
                <h5 className="test_content">
                그윽한 붉은 계열과 오렌지 빛이 잘 어울린다는 것이 특징입니다 <br/>
                카멜, 와인, 브라운 의상이 어울려 차분하고 지적이며 깊이 있는 이미지가 느껴집니다 <br/><br/>
                음영과 색조 화장이 가장 잘 어울리는 유형입니다 <br/>
                그래서 차분한 피치부터 어두운 고동색까지 다양한 섀도 활용이 가능하답니다 <br/>
                립은 누디한 핑크나 오렌지 색상, 헤어는 골드브라운과 밀크 베이지, 밀크 브라운이 잘 어울려요<br/>
                </h5>
                <br/><br/>
                <h4 className="sub_title">대표 컬러</h4>
                <h5 className="test_content">
                브론즈나 브라운 등 따뜻하고 무게감 있는 가을 느낌의 컬러가 잘 어울립니다<br/>
                비비드 색깔이나 파스텔 톤은 피하는게 좋아요<br/>
                <div style={{textAlign: 'center', marginTop:'50px'}}>
                    <img src = {autumn_color_Img} style={{height:'180px', width:'320px', textAlign:'center',}}/>
                </div>
                </h5>
                <br/><br/>
                <br/><br/>
                <h4 className="sub_title">대표 연예인</h4>
                <h5 className="test_content">
                로제, 이효리, 전지현, 송지효
                </h5>
            </div>
        </>
    );
}

export default Autumn_Warm;
