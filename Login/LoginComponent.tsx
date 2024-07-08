
import { useState } from 'react'
import InputFloatLabel from "../FloatingLabelInput/InputFloatLabel";
import "./Login.scss";
import { LoginCommand } from '../../Model/Login/LoginModel';
import ButtonComponent from '../Button/ButtonComponent';
import { LoginService } from './LoginService';
import { useNavigate } from 'react-router-dom';
import { SetToLocalStorage } from '../../Services/Storage/LocalStorage/LocalStorageService';
import { InputModeTypes } from '../FloatingLabelInput/FloatingLabelProps';
import ToastService from '../../Services/Toast/ToastService';
import { ToastInterface, ToastMode } from '../../Services/Toast/ToastProps';
import { SharedUserService } from '../../Services/SharedService/SharedUserService';
import { useAppDispatch } from '../../Services/Store/ReduxHooks';
import { SetUserInfo } from '../../Services/Store/Slice/User/UserSlice';
import { CompanyService } from '../../Services/SharedService/CompanyService';
import { SetCompanyValue } from '../../Services/Store/Slice/Company/CompanySlice';
import PasswordInput from '../FloatingLabelInput/PasswordInput';
import { useTranslation } from 'react-i18next'
import { userRoles } from '../../Services/Store/Slice/Roles/RolesSlice';


function LoginComponent() {
  const{t}=useTranslation()
  const [login, SetLogin] = useState<LoginCommand>({
    phoneNumber: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(false)
  const dispatcher = useAppDispatch()
  const navigate = useNavigate()
  const [IsOtp, SetIsOtp] = useState<boolean>(false)
  const loginService = new LoginService()

  const handeLogin = () => {
    setLoading(true)
    let params: LoginCommand;
    if (IsOtp === true) {
      params = {
        phoneNumber: login.phoneNumber,
        password: null
      }
    }
    else {
      params = {
        phoneNumber: login.phoneNumber,
        password: login.password
      }
    }


    loginService.Login(params).then((result) => {




      if (result) {

        if (result?.token === null) {
          const toast: ToastInterface = {
            Mode: ToastMode.Success,
            Message: `${t('otpSend')}`
          }
          ToastService(toast)
          SetToLocalStorage('COM', params.phoneNumber)
          navigate('/verify')
          setLoading(false)

        }
        else {
          const toast: ToastInterface = {
            Mode: ToastMode.Success,
            Message: `${t('loginSuccess')}`
          }
          ToastService(toast)
          SetToLocalStorage('COM', params.phoneNumber)
          SetToLocalStorage('token', String(result.token))
          SetToLocalStorage('refresh', String(result.refresh))

          const userService = new SharedUserService()
          const Companies=new CompanyService()
          userService.GetUserInfo(null).then(res => {

            if (res && res.customer) {
              dispatcher(SetUserInfo(res.customer))
              userService.GetUserRoles({UserId:res.customer.id!}).then(res=>{
                if(res){
                  dispatcher(userRoles(res.userRoleIds))
                }
              })

            }
          })

          Companies.GetChildCompanies().then(res=>{
            if(res?.companies){
              dispatcher(SetCompanyValue(res.companies))
            }
          })

          navigate('/')
          setLoading(false)

        }
      }

      else {
        setLoading(false)
      }


    })


  }


  return (
    <div className="loginComponent">
      <div className='loginWraper'>
      <div className="loginPicture col-xl-9 col-lg-9 col-md-8 col-sm-6"></div>

        <form className="loginForm form-group col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
          <h4 className='text-center mb-4'>{IsOtp === false ? `${t('loginWithPass')}` : `${t('loginWithVerify')} `}</h4>
          <div className='mt-4 rounded'>
            <InputFloatLabel Type="text" Label={t('phone')} Value={login.phoneNumber} InputMode={InputModeTypes.numeric} Onchange={(e) => SetLogin({ ...login, phoneNumber: e.target.value })} />
          </div>
          {IsOtp === false ? <div className='mt-2 rounded'>
            <PasswordInput  Label={t('password')} Value={login.password ? login.password : ''}  Onchange={(e) => SetLogin({ ...login, password: e.target.value })} />
          </div> : ''}
          <div className='mt-2 mb-4 rounded d-flex justify-content-around'>
            <ButtonComponent Name={t('login')} Class={['btn', 'btn-outline-success']} Onclick={() => handeLogin()} loading={loading} setLoading={setLoading} IsDisable={loading} />
            <ButtonComponent Name={t('cancel')} Class={['btn', 'btn-outline-danger']} />
          </div>
          <hr />
          <div className="text-center">
            <ButtonComponent Name={IsOtp === false ?  `${t('loginWithVerify')} `:`${t('loginWithPass')}`} Class={['btn', 'btn-outline-primary']} Onclick={() => SetIsOtp(!IsOtp)} />

          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
