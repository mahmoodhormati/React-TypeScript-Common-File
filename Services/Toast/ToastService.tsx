import { ToastInterface, ToastMode } from "./ToastProps";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function ToastService({ Mode, Message }: ToastInterface) {
  let toastData;

  switch (true) {
    case Mode === ToastMode.Success:
      toastData = toast.success(Message, {
        position: "top-right",
        closeOnClick: true,
      });
      break;
    case Mode === ToastMode.Warning:
      toastData = toast.warning(Message, {
        position: "top-right",
        closeOnClick: true,
      });
      break;

    case Mode === ToastMode.Error:
      toastData = toast.error(Message, {
        position: "top-right",
        closeOnClick: true,
      });
      break;
    default:
      break;
  }

  return(
    toastData
  )
}

export default ToastService;
export const NotifyContainer = () => (
    <ToastContainer
      position='top-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
    />
  );
  