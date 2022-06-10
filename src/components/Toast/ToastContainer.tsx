import { useToast } from "contexts/toast-context";
import { Toast } from "./Toast";

export const ToastContainer: React.FC = () => {
    const { toasts, hideToast } = useToast();
    return (
        <div
            className={`toast__container ${
                toasts.length !== 0 ? "toast__container--show" : ""
            }`}>
            {toasts.map((toast) => (
                <Toast
                    key={toast._id}
                    toastData={toast}
                    hideToast={hideToast}
                />
            ))}
        </div>
    );
};
