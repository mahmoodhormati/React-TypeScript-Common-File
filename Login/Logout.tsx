import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Services/Store/ReduxHooks';
import { SetUserInfo } from '../../Services/Store/Slice/User/UserSlice';

const Logout:React.FC = () => {
    const history = useNavigate();
    const dispatch = useAppDispatch();
    
    useEffect(() => {

        redirectTologin()



    }, [])

    const redirectTologin = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem('connect');
        localStorage.removeItem('COM')
      dispatch(SetUserInfo({}))
        sessionStorage.clear()
        
     
        history("/");

    }
    return (null)

};

export default Logout