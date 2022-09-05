import './Result.css';
import Spring_Warm from '../Result_Data/Spring_Warm';
import Summer_Cool from '../Result_Data/Summer_Cool';
import Autumn_Warm from '../Result_Data/Autumn_Warm';
import Winter_Cool from '../Result_Data/Winter_Cool';
import { useParams } from 'react-router-dom';

function Result() {
    let {PersonalColor} = useParams();
    
    if(PersonalColor == '봄웜톤(spring)'){
        return <Spring_Warm></Spring_Warm>
    }
    else if(PersonalColor == '여름쿨톤(summer)'){
        return <Summer_Cool></Summer_Cool>
    }
    else if(PersonalColor == '가을웜톤(fall)'){
        return <Autumn_Warm></Autumn_Warm>
    }
    else if(PersonalColor == '겨울쿨톤(winter)'){
        return <Winter_Cool></Winter_Cool>
    }
}

export default Result;
