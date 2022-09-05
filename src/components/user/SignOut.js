import { useDispatch } from 'react-redux';
import {Button} from 'react-bootstrap'
import { getRefreshToken,removeRefreshToken } from '../../cookie/Cookie';
import { deleteAuthToken } from '../../store';

function SignOut(){

    const dispatch = useDispatch();
    
    function logout(){
        removeRefreshToken();
        dispatch(deleteAuthToken());
        localStorage.removeItem('UserID')
        window.location.reload()
        alert('로그아웃 되었습니다');
    }
   

    return(
        <>
            <Button style={{backgroundColor: "transparent", border:"none", color:"#CD5C5C"}} onClick={logout             
            }>SIGN OUT</Button>
        </>
    )
}

export default SignOut