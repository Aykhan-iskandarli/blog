import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { generateGuid } from 'src/core/layouts/public/helpers/common-functions/common-functions';

export const successToast = (mes: string) => {
    toast.success(<div className='success toast-mes'>  <p>{mes}</p></div>, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        toastId: 'success' + generateGuid()
    });
}
export const warningToast = (mes: string) => {
    toast.warning(<div className='warning toast-mes'> <p>{mes}</p></div>, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        toastId: 'warning' + generateGuid()
    });
}
export const errorToast = (mes: string) => {
    toast.error(<div className='error toast-mes'> <p>{mes}</p></div>, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        toastId: 'error' + generateGuid()
    });
}
export const infoToast = (mes: string) => {
    toast.info(<div className='info toast-mes'> <p>{mes}</p></div>, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        toastId: 'info' + generateGuid()
    });
}
