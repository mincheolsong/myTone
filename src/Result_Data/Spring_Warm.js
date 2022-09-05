import { Button } from 'react-bootstrap';
import './Spring_Warm.css';
import spring_Img from '../img/spring_main_img.jpg';
import spring_color_Img from '../img/spring_color.jpg';
import {useNavigate} from 'react-router-dom'

function Spring_Warm(){
    let navigate = useNavigate();
    let colorID = 4;

    return(
        <>
            <div className="spring_title_BG">
                <h4 className="title">테스트 결과는 <div className="result_title">봄 웜(Spring Warm)</div> 입니다.</h4>
                <img src={spring_Img} className="spring_Img"></img>
                <div>
                    <Button className="share_btn" style={{backgroundColor: "#CD5C5C", border:"none"}}
                    onClick={()=>{navigate('/post')}}>공유하기</Button>
                    <Button className="cosmetic_btn" style={{backgroundColor: "#CD5C5C", border:"none"}}
                     onClick={()=>{navigate(`/cosmetic/${colorID}`)}}>화장품 추천</Button>
                </div>
            </div>
            <div className="spring_content_BG">
                <h4 className="sub_title">특징</h4>
                <h5 className="test_content">
                기본 색은 노란빛을 지닌 색으로 주로 채도가 높은 색상이 잘 어울리는 것이 특징입니다 <br/>
                따뜻한 톤을 이루고 있으며 대체로 밝은 이미지입니다<br/>
                또한 화사하고 생동감을 주어 사랑스럽고 귀여운 이미지가 느껴져요<br/><br/>
                옐로 베이스의 피부 톤과 노란빛이 도는 밝은 갈색 눈동자가 특징이에요<br/>
                헤어 역시 밝은 브라운 색 또는 갈색이나 주황빛의 색이 잘 어울린답니다<br/>
                </h5>
                <br/><br/>
                <h4 className="sub_title">대표 컬러</h4>
                <h5 className="test_content">
                노란색이 선명한 핑크, 피치 그린 등의 컬러가 잘 어울린답니다<br/>
                칙칙한 느낌의 어두운 계열의 컬러들은 피하는게 좋아요<br/>
                <div style={{textAlign: 'center', marginTop:'50px'}}>
                    <img src = {spring_color_Img} style={{height:'180px', width:'320px', textAlign:'center',}}/>
                </div>
                </h5>
                <br/><br/>
                <br/><br/>
                <h4 className="sub_title">대표 연예인</h4>
                <h5 className="test_content">
                박보영, 손나은, 수지, 송혜교
                </h5>
            </div>
        </>
    );
}

export default Spring_Warm;