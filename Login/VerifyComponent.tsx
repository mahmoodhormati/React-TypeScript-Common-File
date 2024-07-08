import { useState } from 'react'
import { VerificationCommand } from '../../Model/Login/LoginModel'
import { GetItemFromLocalStorage, SetToLocalStorage } from '../../Services/Storage/LocalStorage/LocalStorageService'
import ButtonComponent from '../Button/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import './Verify.scss'
import OtpInputComponent from '../OtpInput/OtpInputComponent'
import { LoginService } from './LoginService'
import ToastService from '../../Services/Toast/ToastService'
import { ToastInterface, ToastMode } from '../../Services/Toast/ToastProps'
import { SharedUserService } from '../../Services/SharedService/SharedUserService'
import { CompanyService } from '../../Services/SharedService/CompanyService'
import { useAppDispatch } from '../../Services/Store/ReduxHooks'
import { SetUserInfo } from '../../Services/Store/Slice/User/UserSlice'
import { SetCompanyValue } from '../../Services/Store/Slice/Company/CompanySlice'
import { useTranslation } from 'react-i18next'
import { userRoles } from '../../Services/Store/Slice/Roles/RolesSlice'


function VerifyComponent() {
    const{t}=useTranslation()
    const verifyService=new LoginService()
    const [Verify, Setverify] = useState<VerificationCommand>({
        phoneNumber: GetItemFromLocalStorage('COM') !== undefined ? String(GetItemFromLocalStorage('COM')) : null,
        verificationCode: ''
    })

    const[IsSubmit,setIsSubmit]=useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatcher = useAppDispatch()


    const handelChange=(value:string)=>{Setverify({...Verify,verificationCode:value})

    value.length===5?setIsSubmit(true):setIsSubmit(false)

}





    const navigate = useNavigate()
    const handelVerify = () => {
        setLoading(true)
        verifyService.Verify(Verify)
        .then((result)=>{
            if(result){
            setIsSubmit(false)

            const toast:ToastInterface={
                Mode:ToastMode.Success,
                Message:`${t('loginSuccess')}`
            }
            ToastService(toast)
         
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
    else{
        setLoading(false)
        setIsSubmit(false)
    }
    }
        
        )
        

    }
    if(Verify.verificationCode.length>4 && IsSubmit){

        handelVerify()
        setIsSubmit(false)
    }
    return (
        <div className="loginComponent">
            <div className='loginWraper'>
            <div className="loginPicture col-xl-9 col-lg-9 col-md-8 col-sm-6"></div>
                <form className="loginForm form-group col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
                    <h4 className='text-center mb-4'>{t('loginWithVerify')}</h4>
                    <div className='mt-4 rounded'>
                    <OtpInputComponent Value={Verify.verificationCode} valueLength={5} OnChange={handelChange}/>
                    </div>

                    <div className='mt-2 mb-4 rounded d-flex justify-content-around'>
                        <ButtonComponent Name={t('login')} Class={['btn', 'btn-outline-success']} IsDisable={loading} Onclick={() => handelVerify()}  />
                        <ButtonComponent Name={t('cancel')} Class={['btn', 'btn-outline-danger']} Onclick={() => navigate('/login')} />
                    </div>
                    <hr />

                </form>
                
            </div>
        </div>
    )
}

export default VerifyComponent