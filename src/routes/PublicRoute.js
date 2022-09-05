//
import { Navigate, Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';

//
import { CheckToken } from '../auth/CheckToken';
import LoadingModal from '../components/LoadingModal';


export default function PublicRoute() {
    const location = useLocation();
    const { isAuth } = CheckToken(location.key);

    if (isAuth === 'Success') {
        return (
            <Outlet/>
        )
    } else if (isAuth==='Loading') {
        return <LoadingModal />
    }

    return <Outlet />
}