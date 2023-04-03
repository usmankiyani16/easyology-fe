import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = (message: string, type: 'success' | 'error' | 'warn' | 'info' = 'success', options?: ToastOptions) => {
  const defaultOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const mergedOptions = options ? { ...defaultOptions, ...options } : defaultOptions;

  return toast[type](message, mergedOptions);
};
