import { useState } from 'react'
import { QuantityCartProps } from './CartProps'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../Services/Store/ReduxHooks'
import './Qunatitycatr.scss'
import ButtonComponent from '../Button/ButtonComponent'
import { AddtoCartCommand } from '../../Model/Cart/CartModel'
import { MeasureUnit } from '../../Enum/MeasurUnitEnum'
import { ToastInterface, ToastMode } from '../../Services/Toast/ToastProps'
import ToastService from '../../Services/Toast/ToastService'
import { Increase } from '../../Services/Store/Slice/Counter/CounterSlice'
import { OrderService } from '../../../Admin/Sale/Orders/OrderService'

const QuantitySelectForCart = ({ ProductSupply, Condition }: QuantityCartProps) => {
    const { t: transalte } = useTranslation()
    const lang = useAppSelector(state => state.Language)
    const user = useAppSelector(state => state.User)
    const [Quantity, SetQuantity] = useState<number>(0)
    const dispatcher = useAppDispatch()
    const orderService = new OrderService()

    const handelAddToCart = () => {
        if (Quantity !== 0) {
            let params: AddtoCartCommand = {
                customerId: user.customer?.id!,
                measureUnitId: MeasureUnit.Kg,
                productId: ProductSupply?.productId!,
                productSupplyId: ProductSupply?.id!,
                productSupplyConditionId: Condition ? Condition.id : null,
                quantity: Quantity
            }

            orderService.AddToCart(params).then(res => {
                if (res) {
                    const toast: ToastInterface = {
                        Mode: ToastMode.Success,
                        Message: `${transalte('hBadded')}`
                    }
                    ToastService(toast)
                    dispatcher(Increase())
                    SetQuantity(0)
                }
            })
        }

    }
    return (
        <div className=''>

            <div className="d-flex align-items-center justify-content-around">


                <div className=''>
                    <p className="quantity-field" >

                        <button className="value-button increase-button" onClick={() => SetQuantity(Number(Quantity) + 1000)}>+
                        </button>
                        <input className="number" step={100}
                            type="text" value={Quantity} onChange={(e: any) => SetQuantity(Number(e.target.value))} />
                        <button className="value-button decrease-button " onClick={() => Quantity >= 1000 ? SetQuantity(Number(Quantity) - 1000) : ""}>--
                        </button>
                    </p>
                </div>

                <div className=''>
                    <ButtonComponent Class={["btn", "btn-outline-success"]} Icon=' fa-cart-plus' MyTooltip={transalte('addtocart')} Onclick={handelAddToCart} />
                </div>

            </div>


        </div>
    )
}

export default QuantitySelectForCart