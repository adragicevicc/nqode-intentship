import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const success = (message: string) => {
  toast.success(message, { position: toast.POSITION.TOP_RIGHT });
};

export const error = (message: string) => {
  toast.error(message, { position: toast.POSITION.TOP_RIGHT });
};
