import {
    useContext,
    createContext,
    useState,
    PropsWithChildren,
    useCallback,
} from "react";
import { Toast, ToastTypes } from "types/Toast";
import { v4 as uuid } from "uuid";

export type ShowToast = (newToast: {
    title: string;
    description?: string;
    type: ToastTypes;
}) => void;

type hideToast = (toast: Toast) => void;
interface ToastContextValue {
    toasts: Toast[];
    showToast: ShowToast;
    hideToast: hideToast;
}

const ToastContext = createContext<ToastContextValue>({
    toasts: [],
    hideToast: () => {},
    showToast: () => {},
});

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const showToast: ShowToast = useCallback(({ title, description, type }) => {
        const dateTime = Date().substring(0, 25);
        const newToast: Toast = {
            _id: uuid(),
            title,
            description: description || "",
            type,
            dateTime,
        };
        setToasts((toasts) => [...toasts, newToast]);
        setTimeout(
            () =>
                setToasts((toasts) =>
                    toasts.filter((toast) => toast._id !== newToast._id)
                ),
            3000
        );
    }, []);
    const hideToast: hideToast = useCallback(
        (currentToast) =>
            setToasts((toasts) =>
                toasts.filter((toast) => toast._id !== currentToast._id)
            ),
        []
    );

    return (
        <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
