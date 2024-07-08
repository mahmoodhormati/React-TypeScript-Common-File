import { useEffect } from "react";
import { useOutsideClick } from "../../../Utils/ClickOutSideHook";
import { ModalProps } from "../ModalProps";
import './AlertModal.scss'

const AlertModal = ({ props, children }: React.PropsWithChildren<{ props: ModalProps }>) => {



  

    const ref = useOutsideClick(() => {
      
       props.setShow(false)
    });





 
    

    return (




        <div className={props.show ? 'AlertModal' : ''}  >
          
            <div ref={ref} id={props.modalId}  className={props.show ? 'AlertcontentModal' : ''}>
            

                <div className={props.show?'Alertmodalcontent':''}>
               { props.show?<div className="d-block clearfix mb-2" onClick={()=> props.setShow(false)}><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x close"
                data-dismiss="alert"><line x1="18" y1="6"
                    x2="6"
                    y2="18"></line><line
                        x1="6" y1="6" x2="18" y2="18"></line></svg></div>:''}
                    
                    <div className='AlertModalinnerchild'>{props.show && children}</div>

                </div>
            </div>  </div>


    )
}

export default AlertModal