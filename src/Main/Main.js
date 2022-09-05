import './Main.css';
import {Button} from 'react-bootstrap';
import MainImg from '../img/main_img.jpg';
import {useNavigate} from 'react-router-dom'
import CosmeticIcon from '../img/cosmetic_icon.png';
import NoticeIcon from '../img/noticeboard_icon.png';
import PaletteIcon from '../img/palette_icon.png';
import MainSubImg from '../img/main_sub_img.jpg';

function Main() {
    let navigate = useNavigate();

    return(
        <>
            <div>
                <div className="MainImg" style={{backgroundImage: `url(${MainImg})`}}>
                    <div className="MainText">Personal Color Test</div>
                    <Button className="TestBtn" style={{backgroundColor: "#CD5C5C", border:"none"}}
                        onClick={()=>{navigate('/image')}}
                    >GO TEST</Button>
                </div>
            </div>
            <div className="SupportInfoBG">
                <div className="SupportInfoTop">
                    <h3 className="SupportInfoTitle">Personal Color is...</h3>
                    <p className="SupportInfoText">개인마다 가지고 있는 고유의 색이 다르기 때문에 <br/>
                    개인에게 어울리는 색이나 그렇지 못한 색을 구분하여 찾아낼 수 있습니다.</p>
                    <img src={MainSubImg} className="MainSubImg"/>
                </div>
            </div>
            <div className="service_list_BG">
                <ul className="service_list_container"> 
                    <li className = "list_item">
                        <img src={PaletteIcon} className="sub_icon"/>
                        <h5 style={{color:"#CD5C5C"}}>1</h5>
                        <h5>퍼스널 컬러 진단</h5>
                        <p>이미지를 업로드하면 AI 서비스를 통해<br/>퍼스널 컬러를 검사받을 수 있습니다.</p>
                    </li>
                    <li className = "list_item">
                        <img src={NoticeIcon} className="sub_icon"/>
                        <h5 style={{color:"#CD5C5C"}}>2</h5>
                        <h5>게시판 공유</h5>
                        <p>본인의 퍼스널 컬러를 게시판에 공유하여<br/>다양한 의견을 주고받을 수 있습니다.</p>                    
                    </li>
                    <li className = "list_item">
                        <img src={CosmeticIcon} className="sub_icon"/>  
                        <h5 style={{color:"#CD5C5C"}}>3</h5>
                        <h5>화장품 추천 서비스</h5>
                        <p>본인의 퍼스널 컬러에 맞는<br/>화장품을 추천해드립니다.</p>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Main;
