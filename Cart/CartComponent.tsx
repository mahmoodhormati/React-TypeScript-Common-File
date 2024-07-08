import { useEffect, useReducer, useState } from 'react'
import { CartProps } from './CartProps'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../Services/Store/ReduxHooks'
import { DeleteFromCartCommand, ShoppingCartItem, ShoppingCartItemResponse } from '../../Model/Cart/CartModel'
import { configure } from '../../Services/HttpClient/GlobalUrl'
import { formatter } from '../../../../../AfraHolding/src/Utils/Formatter'
import { convertEnumToArray } from '../../Utils/DescriptionArray'
import { MeasureUnit } from '../../Enum/MeasurUnitEnum'
import ButtonComponent from '../Button/ButtonComponent'
import { ToastInterface, ToastMode } from '../../Services/Toast/ToastProps'
import ToastService from '../../Services/Toast/ToastService'
import { Increase } from '../../Services/Store/Slice/Counter/CounterSlice'
import { useNavigate } from 'react-router-dom'
import { OrderFactory } from '../../../Admin/Sale/Orders/OrderFactory'
import { OrderService } from '../../../Admin/Sale/Orders/OrderService'

const CartComponent = ({ SetcartLenght, Setshow, show, }: CartProps) => {
    const { t: translate } = useTranslation()

    const lang = useAppSelector(state => state.Language)
    const [CartItems, SetCartItems] = useState<Array<ShoppingCartItem>>()
    const user = useAppSelector(state => state.User)
    const orderFactoryService = new OrderFactory()
    const orderService = new OrderService()
    const dispatch=useAppDispatch()
    const navigate=useNavigate()
    const [updateValue, ForceUpdate] = useReducer(x => x + 1, 0)


    const getcartItem = () => {
        orderFactoryService.GetCartItemsWithAttachmnet({ CustomerId: user.customer?.id! }).then(res => {
            if (res) {
                SetCartItems(res)
                SetcartLenght(res?.length!)
                
            }
        })
    }


    const Total=()=>{
        let sum=0
        if(CartItems && CartItems.length>0){
            CartItems.map(i=>sum+=i.price)
        }
        return sum
    }


    useEffect(() => {
        getcartItem()
    }, [show,updateValue])

    const handelDelete = (id?:number) => {

        let params:DeleteFromCartCommand
        if(id){
            params={customerId:user.customer?.id!,productSupplyId:id}
        }
        else{
            params={customerId:user.customer?.id!}
        }

        orderService.DeleteCart(params).then(res=>{
            if(res){
                const toast: ToastInterface = {
                    Mode: ToastMode.Success,
                    Message: `${translate('hBdeleted')}`
                }
                ToastService(toast)
                ForceUpdate()
                dispatch(Increase())
                
            }
        })

    }
   
    const handelSubmit = () => {
        if(CartItems && CartItems.length>0){
            orderService.SetOrder({CustomerId:user.customer?.id!}).then(res=>{
                if(res){
                    const toast: ToastInterface = {
                        Mode: ToastMode.Success,
                        Message: `${translate('hBadded')}`
                    }
                    ToastService(toast)
                    ForceUpdate()
                    dispatch(Increase())
                navigate('/client/orders')

                }
            })
        }

    }

    if(CartItems && CartItems.length>0){

    return (
        <div className='myCartComponent'>
            <h5 className='text-center'>{translate('shoppingCart')}</h5>
            {CartItems?.map((item: ShoppingCartItem, Index: number) => (<>
                <div className="d-flex justify-content-around align-items-center" key={Index}>
                    <div className="d-flex flex-column align-items-center  " >
                        <div className='' aria-label={translate('productPic')}>{item.product?.Attachment && item.product?.Attachment.length! > 0 ? <div className='productAvatar' style={{ backgroundImage: `url(${configure}/Global/GetFile/${item.product?.Attachment[0].path}?w=200&h=200)` }}></div> : <div className='productAvatar'></div>}</div>
                        <div className='' aria-label={translate('productName')}>{lang === 'ir' ? item.product?.name : item.product?.englishName}</div>


                    </div>
                    <div className='' aria-label={translate('quantity')}>{formatter.format(item.quantity!)}
                        {convertEnumToArray(MeasureUnit).filter(x => x.id === item.product.measureUnitId!).map(x => `${translate(x.name)}`)[0]}
                    </div>
                    <div className='' aria-label={translate('price')}>{formatter.format(item.price!)}
                        {translate('Rial')}
                    </div>

                    <div>
                        <ButtonComponent Class={["border-0", "bg-transparent", "non-hover",'delete']} Icon='fa-times-circle' MyTooltip='deleteItem' Onclick={() => handelDelete(item.productSupplyId)} />
                    </div>
                </div>
                <hr />

            </>
            ))}
            <div className="d-flex justify-content-center mt-1 mb-2 align-items-center">
                <h5>{translate('sumtopay')} :</h5>
                <div className='mx-1'>
                    {`${formatter.format(Total())} ${translate('Rial')}`}
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <div>
                    <ButtonComponent Class={['btn', 'btn-outline-danger', 'm-1']} Name={translate('completeDelete')} Onclick={() => handelDelete(undefined)} />

                </div>
                <div>
                    <ButtonComponent Class={['btn', 'btn-outline-success', 'm-1']} Name={translate('submitOrder')} Onclick={() => handelSubmit()} />

                </div>
            </div>
        </div>
    )
            }
            else{
                return(
                    <div className="myCartComponent">
                        <h5 className="text-center">{translate('emptyCart')}</h5>
                    </div>
                )
            }
}

export default CartComponent