import { Button } from 'react-bootstrap';
import './Winter_Cool.css';
import winter_Img from '../img/winter_main_img.jpg';
import winter_color_Img from '../img/winter_color.jpg';
import {useNavigate} from 'react-router-dom'

function Winter_Cool(){
    let navigate = useNavigate();
    let colorID = 2;

    return(
        <>
            <div className="winter_title_BG">
                <h4 className="title">테스트 결과는 <div className="result_title">겨울 쿨(Winter Cool)</div> 입니다.</h4>
                <img src={winter_Img} className="winter_Img"></img>
                <div>
                    <Button className="share_btn" style={{backgroundColor: "#CD5C5C", border:"none"}}
                    onClick={()=>{navigate('/post')}}>공유하기</Button>
                    <Button className="cosmetic_btn" style={{backgroundColor: "#CD5C5C", border:"none"}}
                    onClick={()=>{navigate(`/cosmetic/${colorID}`)}}>화장품 추천</Button>
                </div>
            </div>
            <div className="winter_content_BG">
                <h4 className="sub_title">특징</h4>
                <h5 className="test_content">
                겨울 쿨톤은 한국에서 가장 비율이 적으며 컬러 팔레트가 좁은 편입니다 <br/>
                홍조 없는 하얀 피부와 푸른빛이 도는 어두운 갈색이나 밝은 검정 머리가 특징입니다 <br/>
                그래서 모던하며 도시적이고 세련된 이미지가 느껴져요<br/><br/>
                원 포인트 메이크업이 가장 잘 어울려요<br/>
                예를 들어 아이 메이크업을 강조한다면 립은 자연스러운 것이 좋습니다<br/><br/>
                염색할 때는 블랙, 다크 브라운 계열의 컬러로 하는걸 추천해요<br/><br/>
                컬러감 확실하고 선명한 고채도의 비비드한 색상을 잘 소화하여 화려한 이미지를 줍니다<br/>
                </h5>
                <br/><br/>
                <h4 className="sub_title">대표 컬러</h4>
                <h5 className="test_content">
                푸른색과 검은색을 바탕으로 한 차갑고 채도가 높은 컬러가 어울려요<br/>
                옐로우 기가 도는 브라운은 피하는 것이 좋아요<br/>
                <div style={{textAlign: 'center', marginTop:'50px'}}>
                    <img src = {winter_color_Img} style={{height:'180px', width:'320px', textAlign:'center',}}/>
                </div>
                </h5>
                <br/><br/>
                <br/><br/>
                <h4 className="sub_title">대표 연예인</h4>
                <h5 className="test_content">
                김혜수 현아 디오 카리나
                </h5>
            </div>
        </>
    );
}

export default Winter_Cool;