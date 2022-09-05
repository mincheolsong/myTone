import { Button } from 'react-bootstrap';
import './Summer_Cool.css';
import summer_Img from '../img/summer_main_img.jpg';
import summer_color_Img from '../img/summer_color.jpg';
import {useNavigate} from 'react-router-dom'

function Summer_Cool(){
    let navigate = useNavigate();
    let colorID = 1;

    return(
        <>
            <div className="summer_title_BG">
                <h4 className="title">테스트 결과는 <div className="result_title">여름 쿨(Summer Cool)</div> 입니다.</h4>
                <img src={summer_Img} className="summer_Img"></img>
                <div>
                    <Button className="share_btn" style={{backgroundColor: "#CD5C5C", border:"none"}}
                    onClick={()=>{navigate('/post')}}>공유하기</Button>
                    <Button className="cosmetic_btn" style={{backgroundColor: "#CD5C5C", border:"none"}}
                    onClick={()=>{navigate(`/cosmetic/${colorID}`)}}>화장품 추천</Button>
                </div>
            </div>
            <div className="summer_content_BG">
                <h4 className="sub_title">특징</h4>
                <h5 className="test_content">
                밝고 투명하면서 붉은 기가 감도는 피부톤이 특징이에요<br/>
                회색을 기반으로 만들어졌기 때문에 여름 쿨톤에게<br/>
                잘 어울리는 색에는 주로 연하고 흐린 색들이 있습니다.<br/><br/>
                특히 화려한 색상보다 은은하면서 밝은 파스텔톤이 잘 어울립니다<br/>
                그래서 시원하고 시크하면서 우아한 이미지를 준답니다<br/><br/>
                짙은 메이크업보다는 가벼운 메이크업이 잘 어울려요<br/>
                립은 베이비 핑크 색이 어울리며,<br/>
                푸른 계열의 옷과 자연 갈색이나 애쉬 브라운 컬러의 헤어가 좋아요<br/>
                </h5>
                <br/><br/>
                <h4 className="sub_title">대표 컬러</h4>
                <h5 className="test_content">
                청량하고 시원한 느낌을 주는 색이 잘 어울린답니다<br/>
                지나친 웜 컬러나 검정색은 피하는게 좋아요<br/>
                <div style={{textAlign: 'center', marginTop:'50px'}}>
                    <img src = {summer_color_Img} style={{height:'180px', width:'320px', textAlign:'center',}}/>
                </div>
                </h5>
                <br/><br/>
                <br/><br/>
                <h4 className="sub_title">대표 연예인</h4>
                <h5 className="test_content">
                아이린, 장원영, 김연아, 손예진
                </h5>
            </div>
        </>
    );
}

export default Summer_Cool;